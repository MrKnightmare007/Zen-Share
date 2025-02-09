"use client"
import { File, Shield, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


function SideNav({ onTrigger }) {
    const menuList = [
        {
            id: 1,
            name: 'Upload',
            icon: Upload,
            path: '/upload'
        },
        {
            id: 2,
            name: 'Files',
            icon: File,
            path: '/files'
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: Shield,
            path: '/upgrade'
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    return (
        <div className='shadow-sm border-r h-full'>
            <div className='p-5 border-b flex'>
                <Image src="/logo.svg" alt="logo" width={40} height={40} />
                <h1 className='text-2xl pl-2 pt-1 text-teal-300 hidden md:block'>ZenShare</h1>
            </div>
            <div className='flex flex-col float-left w-full'>
                {menuList.map((item, index) => (
                    <button
                        key={item.id}  // Add key prop
                        className={`flex gap-2 p-4 md:pl-3 px-0 hover:bg-teal-300 hover:text-gray-950 w-full ${activeIndex === index ? 'bg-blue-100 text-primary' : null}`}
                        onClick={() => {
                            setActiveIndex(index);
                            onTrigger();  // Close the SideNavBar
                            router.push(`${item.path}`);
                        }}
                    >
                        <item.icon />
                        <h2>{item.name}</h2>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SideNav;
