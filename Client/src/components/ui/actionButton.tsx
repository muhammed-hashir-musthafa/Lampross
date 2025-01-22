import { Layout, Plus } from "lucide-react";
import Link from "next/link";

export const ActionButtons = () => {
  return (
    <div className="lg:col-span-1 flex flex-col gap-4">
      <Link href="/seller/addProduct" className="block">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <span className="font-medium text-gray-900">Add Product</span>
                <p className="text-sm text-gray-500">Create new listing</p>
              </div>
            </div>
            <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
              →
            </div>
          </div>
        </div>
      </Link>

      <Link href="/products" className="block">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-2 rounded-lg group-hover:bg-purple-100 transition-colors">
                <Layout className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <span className="font-medium text-gray-900">All Products</span>
                <p className="text-sm text-gray-500">View inventory</p>
              </div>
            </div>
            <div className="text-gray-400 group-hover:text-purple-600 transition-colors">
              →
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
