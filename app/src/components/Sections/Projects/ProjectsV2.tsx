import ProjectsItem from './ProjectsItem.tsx';
import { IProject, projects } from './project.data.ts';
import ProjectInputFilter from './ProjectInputFilter.tsx';
import { useState } from 'react';
import { filterProjects } from './ProjectInputFilter.tsx';

const ProjectsV2 = () => {
  const [allProjects, setAllProjects] = useState<IProject[]>(projects);

  return (
    <div className={'flex flex-col gap-4'}>
      <ProjectInputFilter
        onChange={(tokens) => setAllProjects(filterProjects(tokens))}
      ></ProjectInputFilter>
      <div
        className={
          'grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'
        }
      >
        {allProjects.map((project, index) => {
          return (
            <div key={index}>
              <ProjectsItem {...project} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsV2;
