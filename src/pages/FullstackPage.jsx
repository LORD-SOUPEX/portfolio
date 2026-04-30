import FullstackHero from '../components/fullstack/FullstackHero';
import CloudStack from '../components/fullstack/CloudStack';
import ArchDiagram from '../components/fullstack/ArchDiagram';
import LilyShowcase from '../components/fullstack/LilyShowcase';
import TechStack from '../components/fullstack/TechStack';
import Contact from '../components/home/Contact';

export default function FullstackPage() {
  return (
    <>
      <FullstackHero />
      <CloudStack />
      <ArchDiagram />
      <LilyShowcase />
      <TechStack />
      <Contact />
    </>
  );
}
