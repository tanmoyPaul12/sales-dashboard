"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }: any) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(d => !d);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 dark:bg-zinc-950 min-h-screen transition-colors duration-300">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full border transition-colors duration-300 ${
              dark ? "bg-zinc-700 border-zinc-600" : "bg-zinc-100 border-zinc-200"
            }`}
          >
            <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 shadow-sm ${
              dark ? "translate-x-7 bg-zinc-900 text-white" : "translate-x-0 bg-white text-zinc-500"
            }`}>
              {dark ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
            </span>
          </button>

        </div>
        {children}
      </div>
    </div>
  );
}