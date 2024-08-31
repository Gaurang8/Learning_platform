"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  title: string;
  link: string;
}

const SidebarItem = ({ icon: Icon, title, link }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === link || pathname?.startsWith(`${link}/`);

  return (
    <button
      onClick={() => router.push(link)}
      type="button"
      className={
        cn(
          "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
          isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200 hover:text-sky-700"
        )
      }
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={
          cn("text-slate-500", isActive && "text-sky-700")
        } />
        {title}
      </div>
      <div className={cn("ml-auto border-2 opacity-0 border-sky-700 h-full transition-all", isActive && "opacity-100")}/>
    </button>
  );
};

export default SidebarItem;
