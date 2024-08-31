
import Logo from './Logo'
import SidebarOption from './sidebar-options'


const Sidebar = () => {
    return (
        <div className="h-full  border-r flex flex-col overflow-y-auto bg-white w-60 ">
            <div className="p-6">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarOption />
            </div>
        </div>
    )
}

export default Sidebar