import Layout from "@/components/layout/Layout";
import SalesChart from "@/components/organisms/SalesChart";

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Sales Dashboard
      </h1>
   
      <SalesChart />
    </Layout>
  );
}