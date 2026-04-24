import Sidebar from "./Sidebar";
// import ThemeToggle from "../atoms/ThemeToggle";

export default function Layout({ children }: any) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-950 min-h-screen transition">
        {/* <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div> */}

        {children}
      </div>
    </div>
  );
}