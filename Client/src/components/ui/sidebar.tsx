"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart2,
  User,
  Settings,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/seller/" },
  { icon: ShoppingCart, label: "Orders", href: "/seller/orders" },
  { icon: Package, label: "Products", href: "/seller/products" },
  { icon: BarChart2, label: "Analytics", href: "/seller/analytics" },
  { icon: User, label: "Profile", href: "/seller/profile" },
  { icon: Settings, label: "Setting", href: "/seller/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative ">
      <div className="md:hidden fixed top-4 left-4 md:z-40 z-50 ">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-100 rounded-lg focus:outline-none"
        >
          {isSidebarOpen ? (
            <CloseIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <MenuIcon className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      <aside
        className={`fixed inset-0 bg-white md:bg-white md:w-64 p-4 transition-all duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block z-40 mt-16`}
      >
        <div className="flex flex-col gap-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-800 opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
