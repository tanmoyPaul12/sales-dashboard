export default function ChartCard({ children }: any) {
  return (
    <div className="p-5 bg-white dark:bg-gray-800 shadow rounded-xl transition">
      {children}
    </div>
  );
}