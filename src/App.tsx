import { MotionConfig } from 'framer-motion'

import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import MoltenMetal from './components/MoltenMetal/MoltenMetal'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="molten-background">
         <MoltenMetal
    color1="#5227FF"
    color2="#FF9FFC"
    color3="#FFFFFF"
    colorMode="molten"
    speed={0.35}
    scale={4}
    detail={3}
    glow={1.6}
    coreSize={0.1}
    swirl={1}
    fold={-0.2}
    blackPoint={0.05}
    brightness={1.3}
    grain
    grainIntensity={0.05}
    mouseInteraction
    mouseStrength={0.3}
        />
      </div>

      <ScrollProgress />
      <CustomCursor />
      <Header />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </MotionConfig>
  )
}