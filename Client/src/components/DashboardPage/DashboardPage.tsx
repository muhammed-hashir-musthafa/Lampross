import ProductTable from "../ui/productTable";
import Sidebar from "../ui/sidebar";
import { SalesChart } from "../ui/salesChart";
import { ActionButtons } from "../ui/actionButton";

const DashboardPage = () => {
  const products = [
    {
      id: 1,
      name: "Modern life smart Toilet",
      price: 1505,
      stock: 13,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Modern life smart toilet",
      price: 1425,
      stock: 43,
      status: "In Stock",
    },
    {
      id: 3,
      name: "Modern life smart toilet",
      price: 1325,
      stock: 23,
      status: "In Stock",
    },
  ];

  const salesData = [
    { month: "January", value: 5000 },
    { month: "February", value: 7000 },
    { month: "March", value: 8000 },
    { month: "April", value: 7500 },
    { month: "May", value: 9000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:ml-64">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3 bg-white p-4 rounded-xl shadow-sm">
              <SalesChart
                data={salesData}
                label="Sales Overview"
                performanceChange="+15%"
                height={350}
              />
            </div>
            <ActionButtons />
          </div>
          <ProductTable products={products} dateRange="This week" />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
