import NightSky from './components/NightSky/NightSky.tsx';
import Hero from './components/Hero';
import NavBar from './components/NavBar/NavBar.tsx';
import Experience from './components/Sections/Experience/Experience.tsx';
import { useRef } from 'react';
import Title from './components/UI/Title/Title.tsx';
import GithubContribution from './components/UI/GithubContribution';
import { ModalProvider } from './components/UI/Modal/ModalProvider.tsx';
import ModalProject from './components/UI/Modal/ModalProject.tsx';
import ModalGithub from './components/UI/Modal/ModalGithub.tsx';
import { Contact } from './components/Sections/Contact';
import Shorty from './components/UI/Shorty';
import TechStackConstellation from './components/Sections/TechStack/TechStackConstellation.tsx';
import AboutMe from './components/Sections/AboutMe';
import Footer from './components/Sections/Footer';
import Socials from './components/UI/Socials';
import ProjectsV2 from './components/Sections/Projects/ProjectsV2.tsx';

function App() {
  const techStackRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const aboutMeRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <>
      <ModalProvider>
        <NavBar
          techStackRef={techStackRef}
          experienceRef={experienceRef}
          projectsRef={projectsRef}
          aboutMeRef={aboutMeRef}
          contactRef={contactRef}
        ></NavBar>
        <NightSky>
          <Hero></Hero>
          <section
            ref={experienceRef}
            id={'experience'}
            className={'flex flex-col gap-6'}
            data-aos={'fade'}
          >
            <Title title={'Experience'} number={'02'}></Title>
            <Experience></Experience>
          </section>
          <section
            ref={projectsRef}
            id={'projects'}
            className={'flex flex-col gap-6'}
            data-aos={'fade'}
          >
            <Title title={'Projects'} number={'03'}></Title>
            <ProjectsV2></ProjectsV2>
            {/*<Projects></Projects>*/}
          </section>
          <section
            ref={aboutMeRef}
            id={'about-me'}
            className={'flex flex-col gap-6 lg:px-32'}
            data-aos={'fade'}
          >
            <Title title={'About Me'} number={'04'}></Title>
            <AboutMe></AboutMe>
            <div className={'lg:self-center'}>
              <GithubContribution></GithubContribution>
            </div>
          </section>
          <section
            ref={techStackRef}
            id={'tech-stack'}
            className={'flex flex-col gap-6'}
            data-aos={'fade'}
          >
            <Title title={'Tech Stack'} number={'05'}></Title>
            <TechStackConstellation></TechStackConstellation>
          </section>
          <section
            ref={contactRef}
            id={'contact'}
            className={'flex flex-col gap-6 sm:px-32'}
            data-aos={'fade'}
          >
            <Title title={'Contact'} number={'06'}></Title>
            <Contact></Contact>
          </section>
          <Footer></Footer>
        </NightSky>
        <ModalProject modalId={'project-modal'}></ModalProject>
        <ModalGithub modalId={'github-modal'}></ModalGithub>
      </ModalProvider>
      <Socials></Socials>
      <Shorty
        projectRef={projectsRef}
        aboutMeRef={aboutMeRef}
        techStackRef={techStackRef}
        contactRef={contactRef}
        experienceRef={experienceRef}
      ></Shorty>
    </>
  );
}

export default App;
