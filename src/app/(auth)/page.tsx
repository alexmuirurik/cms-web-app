import Contact from '@/src/components/auth/home/contact'
import Hero from '@/src/components/auth/home/hero'
import Navbar from '@/src/components/auth/home/navbar'

const HomePage = async () => {
    return (
        <div className="main ">
            <Navbar />
            <Hero />
            <Contact />
        </div>
    )
}

export default HomePage
