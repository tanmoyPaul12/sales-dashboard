"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-gray-200 dark:bg-gray-900 p-5 transition">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Dashboard
      </h2>

      <nav className="flex flex-col gap-3">
        <Link href="/dashboard" className="text-black dark:text-white">
          Dashboard
        </Link>
      </nav>
    </div>
  );
}