import { IProject } from './project.data';
import { useModal } from '../../UI/Modal/ModalProvider.tsx';

const ProjectsItem = ({
  ...project
}: IProject) => {
  const { openModal } = useModal<IProject>('project-modal');

  return (
    <div
      id={'project-card'}
      className={
        'bg-secondary border-border hover:border-border-hover h-full overflow-hidden rounded-3xl border transition-all duration-300 ease-out hover:-translate-y-1 hover:cursor-pointer'
      }
      onClick={() => openModal(project)}
    >
      <img
        src={project.images[0]?.src}
        alt={project.images[0]?.alt}
        className={
          'object-top-left border-border h-40 w-full border-b object-cover lg:h-52'
        }
      />
      {/*<div className={'bg-tertiary/75 flex items-center gap-2 px-4 py-1'}>*/}
      {/*  <div className={'bg-tertiary size-2 animate-pulse rounded-full'}></div>*/}
      {/*  <p className={'text-xs font-light text-white/50'}>Production</p>*/}
      {/*</div>*/}
      <div
        id={'project-card-body'}
        className={'flex flex-1 flex-col gap-2 px-4 py-6'}
      >
        <div className={'grid grid-cols-[1fr_auto] gap-2'}>
          <h1 className={'mt-2 truncate text-xl font-bold text-white'}>
            {project.name}
          </h1>
          <div className={'self-end'} onClick={(e) => e.stopPropagation()}>
            <a
              href={project.hrefCode}
              target="_blank"
              rel="noopener noreferrer"
              className={
                'group/link text-tertiary hover:text-tertiary/80 flex items-center gap-1 text-sm transition-colors'
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className={
                  'h-4 w-4 transform transition-transform group-hover/link:scale-110'
                }
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              View Code
            </a>
          </div>
        </div>
        <div className={'mb-1 flex flex-wrap gap-2'}>
          {project.techStack.map((stack, index) => (
            <div
              key={index}
            >
              {stack.svg}
            </div>
          ))}
        </div>
        <p className={'mt-auto line-clamp-3 text-sm text-white/50'}>
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectsItem;
