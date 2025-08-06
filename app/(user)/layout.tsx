"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, FilePlus, FileText, LucideIcon, Menu } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Link } from "next-view-transitions";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import ThemeToggle from "@/components/ThemeToggle";
import UserAccount from "@/components/UserAccount";

interface SidebarItem {
  href: string;
  icon: LucideIcon;
  text: string;
}

interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Student",
    items: [
      { href: "/user/my-projects", icon: FileText, text: "My Projects" },
      { href: "/user/submit", icon: FilePlus, text: "Submit Project" },
      { href: "/user/articles", icon: BookOpen, text: "Articles" }
    ]
  }
];

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const { data: session } = useSession();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectedSidebarItem");
    if (saved === "Dashboard") {
      setSelected("Dashboard");
    } else if (saved) {
      setSelected(saved);
    }
  }, []);

  useEffect(() => {
    if (selected) localStorage.setItem("selectedSidebarItem", selected);
  }, [selected]);

  return (
    <div className="space-y-4 md:space-y-6 relative z-20 flex flex-col h-full">
      <div className="flex-grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-2 md:mb-8">
              <p className="text-xs font-medium leading-6 text-muted-foreground">
                {category}
              </p>
              <div className="-mx-2 flex flex-1 flex-col">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-400 hover:bg-gray-50 transition mt-1 hover:bg-muted-foreground/10",
                      selected === item.text && "border inset-shadow-sm"
                    )}
                    onClick={() => {
                      if (onClose) onClose();
                      setSelected(item.text);
                    }}
                  >
                    <item.icon className="size-4" />
                    {item.text}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col w-full">
        <div className="w-fit">
          <ThemeToggle />
        </div>
        <hr className="my-4 md:my-6 w-full h-px" />
        <UserAccount user={session?.user} />
      </div>
    </div>
  );
};

const UserPageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="relative h-screen flex flex-col md:flex-row overflow-hidden md:space-x-6">
      <div className="hidden md:block w-64 lg:w-80 border-r p-6 h-full text-brand-900 relative z-10 bg-muted-foreground/5">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="md:hidden flex items-center justify-between p-4 border-b">
          LOGO
          <button onClick={() => setIsDrawerOpen(true)}>
            <Menu className="size-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 relative md:rounded-3xl z-10 md:shadow-sm bg-white dark:bg-zinc-950/80">
          <div className="h-full w-full">{children}</div>
        </div>

        <Modal
          className="p-4"
          showModal={isDrawerOpen}
          setShowModal={setIsDrawerOpen}
        >
          <div className="flex justify-between items-center mb-4">LOGO</div>

          <Sidebar />
        </Modal>
      </div>
    </div>
  );
};

export default UserPageLayout;
