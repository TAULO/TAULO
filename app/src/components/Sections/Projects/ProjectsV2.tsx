import ProjectsItem from './ProjectsItem.tsx';
import { projects } from './project.data.ts';
import ProjectInputFilter from './ProjectInputFilter.tsx';

const ProjectsV2 = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <ProjectInputFilter></ProjectInputFilter>
      <div
        className={
          'grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'
        }
      >
        {projects.map((project, index) => {
          const delay = (index % 3) * 150;
          return (
            <div data-aos="zoom-in-up" data-aos-delay={delay} key={index}>
              <ProjectsItem {...project} selectedStacks={[]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsV2;
