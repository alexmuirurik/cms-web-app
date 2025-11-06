import Contact from '@/components/auth/home/contact'
import Hero from '@/components/auth/home/hero'
import Navbar from '@/components/auth/home/navbar'

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
