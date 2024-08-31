"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";


const NavbarRoutes = () => {

    const pathname = usePathname();

    let isTeacherPage = pathname?.startsWith("/teacher");
    let isPlayerPage = pathname?.includes("/chapter");

    return ( 
        <div className="flex gap-x-2 ml-auto">

            {
                isTeacherPage || isPlayerPage ? (
                    <Link href="/">
                        <Button variant={"ghost"} size={"sm"}>
                            <LogOut className="h-4 w-4 mr-2"/>
                            Exit
                        </Button>
                    </Link>
                ) : (
                    <Link href="/teacher/courses">
                        <Button variant={"ghost"} size={"sm"}>
                            Teacher Mode
                        </Button>
                    </Link>
                )
            }

            <UserButton />
        </div>
     );
}
 
export default NavbarRoutes;