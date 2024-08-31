

import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./Mobile-sidebar";

const Navbar = () => {
    return (
    <div className="p-4 bg-white flex items-center border-b h-full shadow-sm">
        <MobileSidebar/>
        <NavbarRoutes/>
    </div>);
}

export default Navbar;