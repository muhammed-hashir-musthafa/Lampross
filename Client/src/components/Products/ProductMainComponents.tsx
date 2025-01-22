"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  title: string;
  image: string;
  slug: string;
}

interface TrendingProduct {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number;
  tags: string[];
}

const CategoryCard = ({ category }: { category: Category }) => (
  <Link
    href={`/products/${category.slug}`}
    className="relative group overflow-hidden rounded-lg"
  >
    <div className="relative h-48 w-full">
      <Image
        src={category.image}
        alt={category.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
      <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
        {category.title}
      </h3>
    </div>
  </Link>
);

const TrendingProductCard = ({ Product }: { Product: TrendingProduct }) => (
  <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="relative h-48">
      <Image
        src={Product.image}
        alt={Product.title}
        fill
        className="object-cover"
      />
      {Product.tags.map((tag) => (
        <span
          key={tag}
          className="absolute top-2 left-2 bg-white text-sm px-2 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
    <div className="p-4">
      <h3 className="font-medium mb-2">{Product.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{Product.location}</p>
      <p className="font-bold">₹{Product.price} Lacks</p>
    </div>
  </div>
);

const ProductMainPageComponent = () => {
  const categories: Category[] = [
    {
      id: "1",
      title: "Sanitary",
      image: "https://placehold.co/800x600.jpg",
      slug: "sanitary",
    },
    {
      id: "2",
      title: "Kitchen Fittings",
      image: "https://placehold.co/800x600",
      slug: "kitchen-fittings",
    },
    {
      id: "3",
      title: "Contractors",
      image: "https://placehold.co/800x600",
      slug: "contractors",
    },
    {
      id: "4",
      title: "Furniture",
      image: "https://placehold.co/800x600",
      slug: "furniture",
    },
    {
      id: "5",
      title: "Electronics",
      image: "https://placehold.co/800x600.jpg",
      slug: "electronics",
    },
    {
      id: "6",
      title: "Plumbing",
      image: "https://placehold.co/800x600",
      slug: "plumbing",
    },
    {
      id: "7",
      title: "Flooring",
      image: "https://placehold.co/800x600",
      slug: "flooring",
    },
  ];

  const trendingProducts: TrendingProduct[] = [
    {
      id: "1",
      title: "Modern Budget Kitchen Interior",
      image: "https://placehold.co/800x600",
      location: "Calicut, Kerala",
      price: 42,
      tags: ["Featured"],
    },
    {
      id: "2",
      title: "Stylish Wooden Flooring",
      image: "https://placehold.co/800x600",
      location: "Kochi, Kerala",
      price: 32,
      tags: ["New", "Popular"],
    },
    {
      id: "3",
      title: "Contemporary Dining Room Setup",
      image: "https://placehold.co/800x600",
      location: "Trivandrum, Kerala",
      price: 28,
      tags: ["Trending"],
    },
  ];

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
          home a brand new look. Explore exclusive interior Products and trends
          that are easy to implement as they are practical. Get best of interior
          ideas from our best interior.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
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
          {trendingProducts.map((Product) => (
            <TrendingProductCard key={Product.id} Product={Product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductMainPageComponent;
