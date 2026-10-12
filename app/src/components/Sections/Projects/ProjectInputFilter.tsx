import { projects, allUniqTechStacks } from './project.data.ts';

interface IOperator {
  name: string;
  operator: string;
}

interface IAttribute {
  name: string;
  operators: IOperator[];
  values: string[];
}

const ProjectInputFilter = () => {
  const projectNames = projects.map((project) => project.name);
  const languageNames = allUniqTechStacks.map((language) => language.name);

  const operatorEquals: IOperator = {
    name: 'Is',
    operator: '=',
  };

  const operatorNotEquals: IOperator = {
    name: 'Is not one of',
    operator: '!=',
  };

  const operatorOr: IOperator = {
    name: 'Is one of',
    operator: '||',
  };

  const operatorAnd: IOperator = {
    name: 'Has one of',
    operator: '&&',
  };

  const operators: IOperator[] = [
    operatorEquals,
    operatorNotEquals,
    operatorOr,
    operatorAnd,
  ];

  const attributes: IAttribute[] = [
    {
      name: 'Language',
      operators,
      values: languageNames,
    },
    {
      name: 'Title',
      operators: [operatorEquals],
      values: projectNames,
    },
    {
      name: 'State',
      operators: [operatorEquals],
      values: ['In Production', 'Abandon', 'Deprecated', 'In development'], 
    },
  ];

  console.log(attributes)

  return (
    <div>
      <input></input>
    </div>
  );
};

export default ProjectInputFilter;
