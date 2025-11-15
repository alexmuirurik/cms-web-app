'use client'

import { useState } from 'react'
import { FaDiscord, FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa'

const Navbar = () => {
    const [active, setActive] = useState('#home')

    const routes = [
        {
            name: 'Home',
            href: '#home',
        },
        {
            name: 'About',
            href: '#about',
        },
        {
            name: 'Services',
            href: '#services',
        },
        {
            name: 'Features',
            href: '#features',
        },
        {
            name: 'Contact',
            href: '#contact',
        },
    ]

    const socialLinks = [
        {
            name: 'Github',
            href: 'https://github.com/writercms',
            icon: FaGithub,
        },
        {
            name: 'Twitter',
            href: 'https://twitter.com/writercms',
            icon: FaTwitter,
        },
        {
            name: 'Discord',
            href: 'https://discord.gg/writercms',
            icon: FaDiscord,
        },
        {
            name: 'Youtube',
            href: 'https://www.youtube.com/channel/UC3-4x9h-1-y-8-0-9-5-2-3',
            icon: FaYoutube,
        }
    ]

    return (
        <div className="bg-[#171c35] fixed w-full py-5 h-20 z-50 text-white rounded-none">
            <div className="flex items-center justify-between mx-28">
                <h1 className="font-serif font-extrabold text-2xl me-32">SlackApp</h1>
                <div className="">
                    <ul className="flex items-center space-x-10 text-base">
                        {routes.map((route) => (
                            <li key={route.name}>
                                <a
                                    href={route.href}
                                    className={`text-gray-400 hover:text-white ${active === route.href ? 'text-white' : ''}`}
                                    onClick={() => setActive(route.href)}
                                >
                                    {route.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="">
                    <ul className="flex items-center gap-3">
                        {socialLinks.map((social) => (
                            <li key={social.name}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gray-400 hover:text-white"
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
