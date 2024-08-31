

import Navbar from "./_component/Navbar";
import Sidebar from "./_component/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full" >
      <div className="h-[80px] md:pl-60 fixed inset-y-0 w-full z-50 ">
        <Navbar />
      </div>
      <div className="hidden md:flex w-60 flex-col fixed inset-y-0 z-50 h-full border border-solid shadow">
        <Sidebar />
      </div>
     <div className="md:pl-60 pt-[80px] h-full">
       {children}
     </div>
    </div>
  );
};

export default DashboardLayout;