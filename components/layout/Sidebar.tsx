"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-56 h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-5 transition-colors duration-300">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6 px-1">
        Menu
      </h2>
      <nav className="flex flex-col gap-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
          </svg>
          Dashboard
        </Link>
      </nav>
    </div>
  );
}