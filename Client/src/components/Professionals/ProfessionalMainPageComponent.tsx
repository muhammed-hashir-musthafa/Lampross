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

interface TrendingProfessional {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number;
  tags: string[];
}

const CategoryCard = ({ category }: { category: Category }) => (
  <Link
    href={`/professionals/${category.slug}`}
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

const LayoutOption = ({ bhk }: { bhk: string }) => (
  <Link
    href={`/professionals/layout/${bhk}`}
    className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-center"
  >
    {bhk}
  </Link>
);

const TrendingprofessionalCard = ({ professional }: { professional: TrendingProfessional }) => (
  <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="relative h-48">
      <Image
        src={professional.image}
        alt={professional.title}
        fill
        className="object-cover"
      />
      {professional.tags.map((tag) => (
        <span
          key={tag}
          className="absolute top-2 left-2 bg-white text-sm px-2 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
    <div className="p-4">
      <h3 className="font-medium mb-2">{professional.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{professional.location}</p>
      <p className="font-bold">₹{professional.price} Lacks</p>
    </div>
  </div>
);

const ProfessionalMainPageComponent = () => {
  const categories: Category[] = [
    {
      id: "1",
      title: "Living Room",
      image: "https://placehold.co/800x600.jpg",
      slug: "living-room",
    },
    {
      id: "2",
      title: "Bedroom",
      image: "https://placehold.co/800x600",
      slug: "bedroom",
    },
    {
      id: "3",
      title: "Kitchen",
      image: "https://placehold.co/800x600",
      slug: "kitchen",
    },
    {
      id: "4",
      title: "Elevation",
      image: "https://placehold.co/800x600",
      slug: "elevation",
    },
    {
      id: "5",
      title: "Dining Room",
      image: "https://placehold.co/800x600.jpg",
      slug: "dining-room",
    },
    {
      id: "6",
      title: "Furniture",
      image: "https://placehold.co/800x600",
      slug: "furniture",
    },
    {
      id: "7",
      title: "Bathroom",
      image: "https://placehold.co/800x600",
      slug: "bathroom",
    },
  ];

  const layouts = ["1 BHK", "2 BHK", "3 BHK", "4 BHK"];

  const trendingprofessionals: TrendingProfessional[] = [
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
      title: "Modern Budget Kitchen Interior",
      image: "https://placehold.co/800x600",
      location: "Calicut, Kerala",
      price: 42,
      tags: ["Featured"],
    },
    {
      id: "3",
      title: "Modern Budget Kitchen Interior",
      image: "https://placehold.co/800x600",
      location: "Calicut, Kerala",
      price: 42,
      tags: ["Featured"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex mb-4 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900">professionals</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Professionals</h1>
        <p className="text-gray-600 max-w-3xl">
          We bring you carefully curated interior professional ideas, to give your
          home a brand new look. Explore exclusive interior professionals and trends
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

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Explore by layout</h2>
        <div className="flex flex-wrap gap-4">
          {layouts.map((layout) => (
            <LayoutOption key={layout} bhk={layout} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Trending in Kitchen Interiors
          </h2>
          <Link
            href="/professionals/kitchen"
            className="text-orange-500 hover:text-orange-600"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingprofessionals.map((professional) => (
            <TrendingprofessionalCard key={professional.id} professional={professional} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfessionalMainPageComponent;
