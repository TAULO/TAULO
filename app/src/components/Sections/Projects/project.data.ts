import {
  bootstrapSVG,
  csharpSVG,
  cssSVG,
  dotnetcoreSVG,
  firebaseSVG,
  golangSVG,
  htmlSVG,
  javascriptSVG,
  litSVG,
  nodejsSVG,
  nuxtSVG,
  openAPISVG,
  postgressqlSVG,
  reactSVG,
  tailwindSVG,
  typescriptSVG,
  vitestSVG,
  vueSVG,
} from '../TechStack/TechSVG.tsx';
import { JSX } from 'react';
import { useProjectAssets } from '../../../hooks/useProjectAssets.ts';

export interface IProject {
  name: string;
  description: string;
  hrefCode: string;
  hrefLive?: string;
  techStack: Array<{ svg: JSX.Element; name: string }>;
  images: Array<{ src: string; alt: string }>;
  architecture?: IProjectArchitecture;
  projectStatus: ProjectStatus;
}

interface IProjectArchitecture {
  classDiagram?: string;
  architecture?: string;
}

type ProjectStatus = 'In Development' | 'In Production' | 'On Hold' | 'Abandoned';

const budgetpipeImages = useProjectAssets('budgetpipe');
const athleticaImages = useProjectAssets('athletica');
const hvordanErVejretImages = useProjectAssets('hvordanervejret');
const gitSnakeImages = useProjectAssets('gitsnake');
const gitGraffitiImages = useProjectAssets('gitgraffiti');
const biavlerImages = useProjectAssets('biavler');
const shortyImages = useProjectAssets('shorty');
const skipAdsImages = useProjectAssets('adskipper');
const taskMiningImages = useProjectAssets('taskmining');
const kanplaAPIImages = useProjectAssets('kanplaapi');
const kanplaRaycastExtenstionImages = useProjectAssets(
  'kanplaraycastextenstion'
);
const kanplaMCPImages = useProjectAssets('kanplamcp');

const athelticaArchitecture = `
  architecture-beta
    group frontend(cloud)[Frontend]
    group backend(cloud)[Backend]
    group infra(cloud)[Infrastructure]
    
    %% Frontend
    service nuxt(icon:nuxt)[Nuxt 3] in frontend
    service vue(icon:vue)[VueJS] in frontend
    service router(icon:vue)[Vue Router] in frontend
    service pinia(icon:vue)[Pinia Stores] in frontend
    service vitest(icon:vitest)[Vitest] in frontend
    
    service openapi(icon:openapi)[OpenAPI]
    
    %% Backend
    service db(icon:postgresql)[PostgreSQL] in backend
    service dotnet(icon:dotnet)[dotNET Aspire] in backend
    service keycloak(icon:openid)[Keycloak] in backend
    
    %% Infrastructure
    service docker(icon:docker)[Docker] in infra
    
   %% Frontend internal connections
    nuxt:L --> R:vue
    router:R --> L:vue
    pinia:R --> L:vue
    vitest:R --> L:vue

    %% Frontend to Contract
    nuxt:B --> T:openapi

    %% Contract to Backend
    openapi:R --> L:dotnet

    %% Backend internal connections
    dotnet:R --> L:db
    keycloak:B --> T:dotnet

    %% Auth - Nuxt to Keycloak
    nuxt:R --> L:keycloak

    %% Infra
    docker:L --> R:db
    docker:L --> R:keycloak
`;

const budgetpipeProject: IProject = {
  name: 'budgetpipe',
  description:
    'budgetpipe is a CLI tool that automates the process of importing bank transactions into a personal Excel budget. I’ve maintained my own personal budget for years, but manually mapping bank transactions to budget categories and calculating expenses was always a tedious and repetitive task. Therefor, I decided to build a CLI tool to automate that workflow.',
  hrefCode: 'https://github.com/TAULO/budgetpipe',
  hrefLive: 'https://github.com/TAULO/budgetpipe',
  techStack: [
    {
      svg: golangSVG,
      name: 'Golang',
    },
  ],
  images: budgetpipeImages,
  projectStatus: 'In Production',
};

const athleticaProject: IProject = {
  name: 'Athletica',
  description:
    "Athletica is a workout tracker I co-built with a friend. The goal was simple: design everything ourselves and experiment with some new technologies we hadn't used before. It's still in beta, but we're actively improving the experience and adding features.",
  hrefCode: 'https://github.com/mahnac/Athletica',
  techStack: [
    {
      svg: vueSVG,
      name: 'VueJS',
    },
    {
      svg: nuxtSVG,
      name: 'Nuxt',
    },
    {
      svg: vitestSVG,
      name: 'Vitest',
    },
    {
      svg: typescriptSVG,
      name: 'TypeScript',
    },
    {
      svg: tailwindSVG,
      name: 'Tailwind CSS',
    },
    {
      svg: dotnetcoreSVG,
      name: '.NET Aspire',
    },
    {
      svg: csharpSVG,
      name: 'C#',
    },
    {
      svg: postgressqlSVG,
      name: 'PostgreSQL',
    },
    {
      svg: openAPISVG,
      name: 'OpenAPI',
    },
  ],
  images: athleticaImages,

  architecture: {
    architecture: athelticaArchitecture,
  },

  projectStatus: 'In Development',
};

const heyShortyProject: IProject = {
  name: 'HeyShorty',
  description:
    'A global search and command palette built as a web component with Lit and TypeScript. Published on npm as @taulo1999/heyshorty. Try it on this page with Ctrl/CMD + K.',
  hrefCode: 'https://github.com/TAULO/hey-shorty',
  hrefLive: 'https://www.npmjs.com/package/@taulo1999/heyshorty',
  techStack: [
    {
      svg: litSVG,
      name: 'Lit',
    },
    {
      svg: typescriptSVG,
      name: 'TypeScript',
    },
    {
      svg: htmlSVG,
      name: 'HTML',
    },
    {
      svg: cssSVG,
      name: 'CSS',
    },
  ],
  images: shortyImages,
  projectStatus: 'In Production',
};

const kanplaAPIProject: IProject = {
  name: 'Kanpla API',
  description:
    'Kanpla is the food provider for the canteen where I worked at Sirenia. I thought it would be cool to build a public integration that allows me and others to access menu information in their own solutions. The project required some reverse engineering to figure out how to interact with the Kanpla API.',
  hrefLive: 'https://www.npmjs.com/package/@taulo1999/kanpla-api',
  hrefCode: 'https://github.com/TAULO/kanpla-api',
  techStack: [
    {
      svg: typescriptSVG,
      name: 'TypeScript',
    },
    {
      name: 'NodeJS',
      svg: nodejsSVG,
    },
  ],
  images: kanplaAPIImages,
  projectStatus: 'In Production',
};

const kanplaRaycastExtenstionProject: IProject = {
  name: 'Kanpla Raycast Extenstion',
  description:
    "A Raycast extension that lets you view your canteen's menu directly from Raycast. Built on top of my Kanpla API package.",
  hrefCode: 'https://github.com/TAULO/kanpla-raycast-extenstion',
  techStack: [
    {
      svg: typescriptSVG,
      name: 'TypeScript',
    },
    {
      svg: reactSVG,
      name: 'React',
    },
  ],
  images: kanplaRaycastExtenstionImages,
  projectStatus: 'In Production',
};

const kanplaMCPProject: IProject = {
  name: 'Kanpla MCP Server',
  description:
    'I built a simple MCP server that talks to my KanplaAPI npm package, so that I can ask e.g. Claude for "What is on the menu at my local canteen today?" or "What is for lunch this friday?".',
  hrefCode: 'https://github.com/TAULO/kanpla-mcp',
  techStack: [
    {
      svg: typescriptSVG,
      name: 'TypeScript',
    },
    {
      svg: nodejsSVG,
      name: 'NodeJS',
    },
  ],
  images: kanplaMCPImages,
  projectStatus: 'In Production',
};

const hvordanErVejretProject: IProject = {
  name: 'Hvordan Er Vejret',
  description:
    'A close friend group of mine started a podcast and needed somewhere to promote it. I built them a simple landing page with Vue and Tailwind - nothing fancy, just clean and easy to update.',
  hrefCode: 'https://github.com/TAULO/HvordanErVejret',
  hrefLive: 'https://hvordanervejret.dk/forside/',
  techStack: [
    {
      svg: vueSVG,
      name: 'VueJS',
    },
    {
      svg: typescriptSVG,
      name: 'TypeScript',
    },
    {
      svg: tailwindSVG,
      name: 'Tailwind CSS',
    },
  ],
  images: hvordanErVejretImages,
  projectStatus: 'Abandoned',
};

const biavlerProject: IProject = {
  name: "Odense Beekeepers' Association",
  description:
    'Built for the Odense Beekeepers Association, where my brother was a member. He asked me if I could build a small community hub with an admin panel for managing recipes, events, galleries, and more. Vue, Firebase, and Bootstrap under the hood.',
  hrefCode: 'https://github.com/TAULO/BiavlerFrontApp',
  techStack: [
    {
      svg: vueSVG,
      name: 'VueJS',
    },
    {
      svg: javascriptSVG,
      name: 'JavaScript',
    },
    {
      svg: bootstrapSVG,
      name: 'Bootstrap',
    },
    {
      svg: firebaseSVG,
      name: 'Firebase',
    },
  ],
  images: biavlerImages,
  projectStatus: 'Abandoned',
};

const gitSnakeProject: IProject = {
  name: 'GitSnake',
  description:
    'A Chrome extension that turns your GitHub contribution graph into a game of Snake.',
  hrefCode: 'https://github.com/TAULO/GitSnake',
  techStack: [
    {
      svg: javascriptSVG,
      name: 'JavaScript',
    },
    {
      svg: htmlSVG,
      name: 'HTML',
    },
    {
      svg: cssSVG,
      name: 'CSS',
    },
  ],
  images: gitSnakeImages,
  projectStatus: 'In Production',
};

const gitGraffitiProject: IProject = {
  name: 'GitGraffiti',
  description:
    'A Chrome extension that lets you fake your GitHub contribution graph. For bragging, of course.',
  hrefCode: 'https://github.com/TAULO/GitGraffiti',
  techStack: [
    {
      svg: javascriptSVG,
      name: 'JavaScript',
    },
  ],
  images: gitGraffitiImages,
  projectStatus: 'In Production',
};

const adSkipperProject: IProject = {
  name: 'YouTube and TV2 Ads Skipper',
  description:
    'I was tired that most ad-blocking extension was blocked by YT, so I built a small chrome extension that listens to the YouTube player, and if an Ad is playing, skips it. Same story for the TV2 Player.',
  hrefCode: 'https://github.com/TAULO/ytp-hide-ads-extension',
  techStack: [
    {
      svg: javascriptSVG,
      name: 'JavaScript',
    },
    {
      svg: htmlSVG,
      name: 'HTML',
    },
    {
      svg: cssSVG,
      name: 'CSS',
    },
  ],
  images: skipAdsImages,
  projectStatus: 'In Production',
};

// @ts-ignore
const taskMiningProject: IProject = {
  name: 'Task Mining',
  description:
    'My thesis project at EAAA. At Sirenia we wanted to build data analyser tool, that analyzes user activity to identify automation opportunities - known in the industry as task mining.',
  hrefCode: 'https://github.com/TAULO/TaskMiningReactApp',
  techStack: [
    {
      svg: reactSVG,
      name: 'react',
    },
    {
      svg: javascriptSVG,
      name: 'JavaScript',
    },
    {
      svg: csharpSVG,
      name: 'C#',
    },
    {
      svg: dotnetcoreSVG,
      name: '.NET Framework',
    },
    {
      svg: tailwindSVG,
      name: 'Tailwind CSS',
    },
  ],
  images: taskMiningImages,
};

const projects: Array<IProject> = [
  athleticaProject,
  heyShortyProject,
  kanplaRaycastExtenstionProject,
  budgetpipeProject,
  kanplaAPIProject,
  kanplaMCPProject,
  hvordanErVejretProject,
  biavlerProject,
  gitSnakeProject,
  gitGraffitiProject,
  adSkipperProject,
  // taskMiningProject, // NOTE: I need to find more materials for this project, therefore exclude it for now.'
];

const allUniqTechStacks = projects
  .flatMap((project) => project.techStack)
  .filter(
    (value, index, self) =>
      self.findIndex((stack) => stack.svg === value.svg) === index
  );

export { projects, allUniqTechStacks };
