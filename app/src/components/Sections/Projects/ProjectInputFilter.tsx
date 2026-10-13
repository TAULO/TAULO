import { useEffect, useMemo, useRef, useState } from 'react';
import {
  projects,
  allUniqTechStacks,
  IProject,
  ProjectStatus,
} from './project.data.ts';

interface IOperator {
  name: string;
  operator: string;
  multi: boolean;
}

interface IAttribute<T> {
  name: string;
  operators: IOperator[];
  values: Array<T>;
}

export interface IFilterToken {
  attribute: string;
  operator: IOperator;
  values: string[];
}

interface IDraft<T> {
  attribute?: IAttribute<T>;
  operator?: IOperator;
  values: string[];
}

const operatorEquals: IOperator = { name: 'is', operator: '=', multi: false };
const operatorNotEquals: IOperator = {
  name: 'is not',
  operator: '!=',
  multi: false,
};
const operatorOr: IOperator = {
  name: 'is one of',
  operator: '||',
  multi: true,
};
const operatorAnd: IOperator = {
  name: 'has all of',
  operator: '&&',
  multi: true,
};

const attributeLanguage: IAttribute<string> = {
  name: 'Language',
  operators: [operatorOr, operatorAnd],
  values: allUniqTechStacks.map((language) => language.name),
};

const attributeTitle: IAttribute<string> = {
  name: 'Title',
  operators: [operatorEquals, operatorNotEquals, operatorOr],
  values: projects.map((project) => project.name),
};

const attributeState: IAttribute<ProjectStatus> = {
  name: 'State',
  operators: [operatorEquals, operatorNotEquals],
  values: ['In Production', 'In Development', 'Abandoned', 'On Hold'],
};

const attributes = [attributeLanguage, attributeTitle, attributeState];

const matchesToken = (project: IProject, token: IFilterToken) => {
  let owned: string[];
  switch (token.attribute) {
    case 'Language':
      owned = project.techStack.map((stack) => stack.name);
      break;
    case 'Title':
      owned = [project.name];
      break;
    case 'State':
      owned = [project.projectStatus];
      break;
    default:
      return true;
  }
  switch (token.operator.operator) {
    case '=':
      return owned.includes(token.values[0]);
    case '!=':
      return !owned.includes(token.values[0]);
    case '||':
      return token.values.some((value) => owned.includes(value));
    case '&&':
      return token.values.every((value) => owned.includes(value));
    default:
      return true;
  }
};

export const filterProjects = (tokens: IFilterToken[]) =>
  projects.filter((project) => tokens.every((t) => matchesToken(project, t)));

const ProjectInputFilter = ({
  onChange,
}: {
  onChange?: (tokens: IFilterToken[]) => void;
}) => {
  const [tokens, setTokens] = useState<IFilterToken[]>([]);
  const [draft, setDraft] = useState<IDraft<string>>({ values: [] });
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const step = !draft.attribute
    ? 'attribute'
    : !draft.operator
      ? 'operator'
      : 'value';

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list =
      step === 'attribute'
        ? attributes.map((a) => a.name)
        : step === 'operator'
          ? draft.attribute!.operators.map((o) => o.name)
          : draft.attribute!.values;
    return list.filter((item) => item.toLowerCase().includes(q));
  }, [step, query, draft]);

  const commit = (next: IFilterToken[]) => {
    setTokens(next);
    onChange?.(next);
  };

  const finishDraft = (values = draft.values) => {
    if (draft.attribute && draft.operator && values.length) {
      commit([
        ...tokens,
        { attribute: draft.attribute.name, operator: draft.operator, values },
      ]);
    }
    setDraft({ values: [] });
    setQuery('');
    setActive(0);
  };

  const pick = (option: string) => {
    if (step === 'attribute') {
      setDraft({
        values: [],
        attribute: attributes.find((a) => a.name === option),
      });
    } else if (step === 'operator') {
      setDraft({
        ...draft,
        operator: draft.attribute!.operators.find((o) => o.name === option),
      });
    } else if (draft.operator!.multi) {
      setDraft({
        ...draft,
        values: draft.values.includes(option)
          ? draft.values.filter((v) => v !== option)
          : [...draft.values, option],
      });
    } else {
      finishDraft([option]);
      return;
    }
    setQuery('');
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      const d = e.key === 'ArrowDown' ? 1 : -1;
      setActive((i) => (i + d + options.length) % Math.max(options.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (
        options[active] &&
        !(step === 'value' && !query && draft.values.length)
      ) {
        pick(options[active]);
      } else if (draft.values.length) {
        finishDraft();
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'Backspace' && !query) {
      if (draft.values.length)
        setDraft({ ...draft, values: draft.values.slice(0, -1) });
      else if (draft.operator)
        setDraft({ values: [], attribute: draft.attribute });
      else if (draft.attribute) setDraft({ values: [] });
      else if (tokens.length) commit(tokens.slice(0, -1));
    }
  };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const chip =
    'flex items-center overflow-hidden rounded-md border border-border text-sm';
  const hasAnything = tokens.length > 0 || draft.attribute;

  return (
    <div ref={rootRef} className="relative w-full">
      <div
        onClick={() => {
          inputRef.current?.focus();
          setOpen(true);
        }}
        className={`bg-secondary flex min-h-12 cursor-text flex-wrap items-center gap-2 rounded-xl border px-3 py-2 transition ${
          open
            ? 'border-tertiary/60 shadow-[0_0_0_3px_rgb(112_164_255/0.12)]'
            : 'border-border hover:border-border-hover'
        }`}
      >
        <span className="material-icons text-xl! text-white/40">
          filter_list
        </span>

        {tokens.map((token, i) => (
          <span key={i} className={chip}>
            <span className="bg-white/5 px-2 py-1 text-white/70">
              {token.attribute}
            </span>
            <span className="border-border text-tertiary border-x px-2 py-1">
              {token.operator.name}
            </span>
            <span className="bg-white/5 px-2 py-1 text-white/70">
              {token.values.join(', ')}
            </span>
            <button
              aria-label={`Remove ${token.attribute} filter`}
              className="flex h-full cursor-pointer items-center px-1.5 text-white/40 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                commit(tokens.filter((_, idx) => idx !== i));
              }}
            >
              <span className="material-icons text-base!">close</span>
            </button>
          </span>
        ))}

        {draft.attribute && (
          <span className={`${chip} border-tertiary/50 border-dashed`}>
            <span className="bg-white/5 px-2 py-1 text-white/70">
              {draft.attribute.name}
            </span>
            {draft.operator && (
              <span className="border-border text-tertiary border-l px-2 py-1">
                {draft.operator.name}
              </span>
            )}
            {draft.values.length > 0 && (
              <span className="border-border border-l px-2 py-1 text-white">
                {draft.values.join(', ')}
              </span>
            )}
          </span>
        )}

        <input
          ref={inputRef}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder={hasAnything ? '' : 'Filter projects...'}
          className="min-w-32 flex-1 bg-transparent py-1 text-sm text-white outline-none placeholder:text-white/30"
        />

        {hasAnything && (
          <button
            aria-label="Clear all filters"
            className="text-white/40 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              commit([]);
              setDraft({ values: [] });
              setQuery('');
            }}
          >
            <span className="material-icons text-xl!">cancel</span>
          </button>
        )}
      </div>

      {open && (
        <div className="border-border bg-primary/95 absolute z-20 mt-2 w-full max-w-sm overflow-hidden rounded-xl border shadow-2xl backdrop-blur">
          <div className="border-border border-b px-3 py-2 text-xs uppercase tracking-wide text-white/40">
            {step === 'attribute' && 'Filter by'}
            {step === 'operator' && `${draft.attribute!.name} …`}
            {step === 'value' &&
              (draft.operator!.multi
                ? 'Pick one or more · Enter to apply'
                : 'Pick a value')}
          </div>
          <ul className="max-h-64 overflow-y-auto p-1">
            {options.length === 0 && (
              <li className="px-3 py-2 text-sm text-white/40">No matches</li>
            )}
            {options.map((option, i) => {
              const selected = draft.values.includes(option);
              return (
                <li key={option}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      pick(option);
                      inputRef.current?.focus();
                    }}
                    className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                      i === active
                        ? 'bg-tertiary/15 text-white'
                        : 'text-white/70'
                    }`}
                  >
                    {step === 'value' && draft.operator!.multi && (
                      <span className="material-icons text-base! text-tertiary">
                        {selected ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    )}
                    {option}
                    {step === 'operator' && (
                      <code className="ml-auto text-xs text-white/30">
                        {
                          draft.attribute!.operators.find(
                            (o) => o.name === option
                          )?.operator
                        }
                      </code>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          {step === 'value' && draft.operator!.multi && (
            <div className="border-border flex justify-between border-t p-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDraft({ values: draft.values });
                }}
                className="cursor-pointer rounded-md bg-red-500/50 px-3 py-1 text-sm text-white/40 transition hover:bg-red-500/60"
              >
                Cancel
              </button>
              <button
                disabled={!draft.values.length}
                onClick={() => {
                  finishDraft();
                  setOpen(false);
                }}
                className="bg-tertiary/20 text-tertiary enabled:hover:bg-tertiary/30 cursor-pointer rounded-md px-3 py-1 text-sm transition disabled:opacity-40"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectInputFilter;
