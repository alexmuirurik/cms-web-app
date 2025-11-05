import About from '@/components/auth/home/about'
import Contact from '@/components/auth/home/contact'
import Features from '@/components/auth/home/features'
import Hero from '@/components/auth/home/hero'
import Navbar from '@/components/auth/home/navbar'
import Services from '@/components/auth/home/services'

const HomePage = () => {
    return (
        <div className="main ">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Features />
            <Contact />
        </div>
    )
}

export default HomePage
