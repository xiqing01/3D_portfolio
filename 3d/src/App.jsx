import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero"
import About from "./components/About"
import Experience from "./components/Experience"
import Tech from "./components/Tech"
import Works from "./components/Works"
import Feedbacks from "./components/Feedbacks"
import Contact from "./components/Contact"
import StarsCanvas from "./components/canvas/Stars"


const App = () => {
  return (
      <BrowserRouter>
      <div className='relative z-0' style={{
        backgroundColor: 'var(--color-primary)',
      }}>
        <div className='bg-cover bg-no-repeat bg-center' style={{ backgroundImage:'var(--background-hero-pattern)' }}>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
      </BrowserRouter>
  )
}

export default App