"use client";

import { BarChart, Compass, Layout, List, LucideIcon } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";



const sidebarMenu = [
    {
        icon: Layout,
        title: "Dashboard",
        link: "/"
    },
    {
        icon: Compass,
        title: "Explore",
        link: "/search"
    }
]

const teacherRoutes = [
    {
        icon : List,
        title: "Courses",
        link: "/teacher/courses"
    },{
        icon : BarChart,
        title: "Analytics",
        link: "/teacher/analytics"
    }
]

const SidebarOption = () => {

    let pathname = usePathname();

    let isTeacherPage = pathname?.startsWith("/teacher");

    let routes = isTeacherPage ? teacherRoutes : sidebarMenu;

    return (
        <div className="flex flex-col w-full">
            {
                routes.map((option, index) => (
                    <SidebarItem 
                        key={index} 
                        icon={option.icon} 
                        title={option.title} 
                        link={option.link} />
                )) 

            }
        </div>
    )
}

export default SidebarOption;