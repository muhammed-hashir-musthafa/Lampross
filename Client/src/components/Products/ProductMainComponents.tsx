"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductsApi } from "@/api/product";
import { AxiosError } from "axios";

interface Category {
  _id: string;
  category: {
    name: string;
    slug: string;
    image: string;
  };
}

interface TrendingProduct {
  _id: string;
  title: string;
  image: string;
  location: string;
  price: number;
  tags: string[];
}

const CategoryCard = ({ category }: { category: Category }) => (
  <Link
    href={`/products/${category.category.name}`}
    className="relative group overflow-hidden rounded-lg"
  >
    <div className="relative h-48 w-full">
      <Image
        src={category.category.image || "https://placehold.co/800x600.jpg"}
        alt={category.category.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
      <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
        {category.category.name}
      </h3>
    </div>
  </Link>
);

const TrendingProductCard = ({ product }: { product: TrendingProduct }) => (
  <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="relative h-48">
      <Image
        src={product.image || "https://placehold.co/800x600.jpg"}
        alt={product.title}
        fill
        className="object-cover"
      />
      {product.tags.map((tag) => (
        <span
          key={tag}
          className="absolute top-2 left-2 bg-white text-sm px-2 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
    <div className="p-4">
      <h3 className="font-medium mb-2">{product.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.location}</p>
      <p className="font-bold">₹{product.price} Lacks</p>
    </div>
  </div>
);

const ProductMainPageComponent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

 
  const trendingProducts: TrendingProduct[] = [
    {
      _id: "1",
      title: "Modern Budget Kitchen Interior",
      image: "https://placehold.co/800x600",
      location: "Calicut, Kerala",
      price: 42,
      tags: ["Featured"],
    },
    {
      _id: "2",
      title: "Stylish Wooden Flooring",
      image: "https://placehold.co/800x600",
      location: "Kochi, Kerala",
      price: 32,
      tags: ["New", "Popular"],
    },
    {
      _id: "3",
      title: "Contemporary Dining Room Setup",
      image: "https://placehold.co/800x600",
      location: "Trivandrum, Kerala",
      price: 28,
      tags: ["Trending"],
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getProductsApi({});
        if (response.data.success) {
          setCategories(response.data.products);
          // console.log(response.data.products);
        } else {
          setError("Failed to fetch categories.");
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          setError("Error fetching categories.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          <p className="text-xl text-gray-700 font-semibold">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex mb-4 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900">Products</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="text-gray-600 max-w-3xl">
          We bring you carefully curated interior Product ideas, to give your
          home a brand new look.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Trending in Kitchen Interiors
          </h2>
          <Link
            href="/products/kitchen"
            className="text-orange-500 hover:text-orange-600"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <TrendingProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductMainPageComponent;
