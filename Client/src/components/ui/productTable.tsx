import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: string;
}

interface ProductTableProps {
  products: Product[];
  dateRange: string;
}

const ProductTable = ({ products, dateRange }: ProductTableProps) => {
  return (
    <div className="bg-white p-6 rounded-lg mt-6 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Selling Products</h2>
        <select className="p-2 border rounded-lg">
          <option>{dateRange}</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-gray-600 text-sm sm:text-base">
              <th className="pb-4 pr-6">Product Name</th>
              <th className="pb-4 pr-6">Price</th>
              <th className="pb-4 pr-6">Stock</th>
              <th className="pb-4 pr-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t text-sm sm:text-base">
                <td className="py-4 pr-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <span className="truncate">{product.name}</span>
                </td>
                <td className="py-4 pr-6">₹{product.price}</td>
                <td className="py-4 pr-6">{product.stock} pcs</td>
                <td className="py-4 pr-6">
                  <span
                    className={`flex items-center gap-2 ${
                      product.status === "In Stock"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        product.status === "In Stock"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
