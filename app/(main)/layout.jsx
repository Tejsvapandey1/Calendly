"use client";
import { useUser } from "@clerk/nextjs";
import { BarChart2, Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BarLoader } from "react-spinners";

const AppLayout = ({ children }) => {
  const { isLoaded } = useUser();

  const pathName = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart2 },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/meetings", label: "Meetings", icon: Users },
    { href: "/availability", label: "Availability", icon: Clock },
  ];

  return (
    <>
      {!isLoaded && <BarLoader width="100%" color="#36d7b7" />}
      <div className="flex flex-col h-screen bg-blue-50 md:flex-row">
        <aside className="hidden md:block w-64 bg-white">
          <nav className="mt-8">
            <ul>
              {navItems.map((item, idx) => (
                <li key={item.idx}>
                  <Link
                    key={idx}
                    href={item.href}
                    className={`flex items-center px-4 py-4 text-gray-700 hover:bg-gray-200 ${pathName === item.href ? "bg-gray-200" : ""}`}
                  >
                    {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4 overflow-y md:p-8">
          <header>
            <h2 className="text-5xl md:text-6xl gradient-title pt-2 md:pt-0 text-center md:text-left">
              {navItems.find((item) => item.href === pathName).label ||
                "Dashboard"}
            </h2>
          </header>
          {children}
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md">
        <ul className="flex justify-around">
          {navItems.map((item, idx) => (
            <li key={item.idx}>
              <Link
                key={idx}
                href={item.href}
                className={`flex flex-col items-center px-4 py-2 text-blue-600 hover:text-gray-600 ${pathName === item.href ? "bg-gray-200" : ""}`}
              >
                {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default AppLayout;
