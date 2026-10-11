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
  const projects = [];

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
      values: [],
    },
    {
      name: 'Title',
      operators: [operatorEquals],
      values: [],
    },
    {
      name: 'State',
      operators: [operatorEquals],
      values: [],
    },
  ];

  return (
    <div>
      <input></input>
    </div>
  );
};

export default ProjectInputFilter;
