import Navbar from "@/src/components/auth/home/navbar"
import LoginCard from "@/src/components/auth/loginCard"
import LoginCopy from "@/src/components/auth/loginCopy"

const LoginPage = async () => {
    return (<div className="relative">
            <Navbar />
            <div className="max-w-[85rem] px-4 pt-24 sm:px-6 lg:px-8 lg:pt-32 mx-auto ">
                <div className="grid items-center md:grid-cols-2 gap-8 lg:gap-12">
                    <LoginCopy />
                    <div className="flex image-full w-full h-full">
                        <LoginCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage