import React from "react";
import { Link, useLocation } from "react-router-dom";

const AppNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: "fa-home" },
    { path: "/tasks", label: "Tasks", icon: "fa-tasks" },
    { path: "/calender", label: "Calendar", icon: "fa-calendar-alt" },
    { path: "/StudyNotes", label: "Notes", icon: "fa-sticky-note" },
    { path: "/settings", label: "Settings", icon: "fa-cog" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between items-center px-2 py-2 z-40">
      {navItems.map(({ path, label, icon }) => (
        <Link
          key={path}
          to={path}
          className={`flex flex-col items-center justify-center flex-1 py-1 cursor-pointer ${
            location.pathname === path ? "text-blue-500" : "text-gray-500"
          }`}
        >
          <i className={`fas ${icon} text-xl`}></i>
          <span className="text-xs mt-1">{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default AppNavigation;
