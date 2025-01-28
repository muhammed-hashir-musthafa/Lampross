"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import FeedbackForm from "../ui/feedbackForm";

interface Professional {
  id: string;
  title: string;
  image: string;
  price: number;
  style: string;
  category: string;
  city: string;
  builtUpArea: string;
  layout: string;
  tags: string[];
}

interface FilterOptions {
  type: string[];
  category: string[];
  city: string[];
  builtUpArea: string[];
  layout: string[];
  cost: string[];
}

const FilterDropdown = ({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full bg-white border border-gray-200 rounded-md px-4 py-2 pr-8 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

const ProfessionalCard = ({ professional }: { professional: Professional }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-64">
        <Image
          src={professional.image}
          alt={professional.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2">
          {professional.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-white text-sm px-2 py-1 rounded-full mr-2 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{professional.title}</h3>
        <div className="text-sm text-gray-500 mb-2">
          Style: {professional.style} | {professional.city}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">₹{professional.price} Lacks</span>
        </div>
      </div>
    </div>
  );
};

const ProfessionalPageComponent = () => {
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    city: "",
    builtUpArea: "",
    layout: "",
    cost: "",
  });

  const [sortBy, setSortBy] = useState("featured");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const router = useParams();
  const professionalType = router?.type;

  const professionals: Professional[] = [
    {
      id: "1",
      title: "Modern Budget Living Room Interior",
      image: "https://placehold.co/800x600",
      price: 42,
      style: "Modern",
      category: "Budget",
      city: "Kochi",
      builtUpArea: "1000-1500 sqft",
      layout: "Open",
      tags: ["Featured"],
    },
    {
      id: "2",
      title: "Modern Budget Living Room Interior",
      image: "https://placehold.co/800x600",
      price: 42,
      style: "Modern",
      category: "Budget",
      city: "Kochi",
      builtUpArea: "1000-1500 sqft",
      layout: "Open",
      tags: ["Featured"],
    },
    {
      id: "3",
      title: "Modern Budget Living Room Interior",
      image: "https://placehold.co/800x600",
      price: 42,
      style: "Modern",
      category: "Budget",
      city: "Kochi",
      builtUpArea: "1000-1500 sqft",
      layout: "Open",
      tags: ["Featured"],
    },
    {
      id: "4",
      title: "Modern Budget Living Room Interior",
      image: "https://placehold.co/800x600",
      price: 42,
      style: "Modern",
      category: "Budget",
      city: "Kochi",
      builtUpArea: "1000-1500 sqft",
      layout: "Open",
      tags: ["Featured"],
    },
  ];

  const filterOptions: FilterOptions = {
    type: ["Modern", "Classic", "Vintage"],
    category: ["Budget", "Premium", "Luxury"],
    city: ["Kochi", "Calicut", "Trivandrum"],
    builtUpArea: ["<1000 sqft", "1000-1500 sqft", ">1500 sqft"],
    layout: ["Open", "Traditional", "Mixed"],
    cost: ["<30L", "30-50L", ">50L"],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <nav className="text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link
            href="/professionals"
            className="text-gray-500 hover:text-gray-700"
          >
            Professionals
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{professionalType}</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-[#FF7800]">
            {professionalType?.toString().charAt(0).toUpperCase()}
            {professionalType?.toString().slice(1)}{" "}
          </span>
          Professionals
        </h1>
        <p className="text-gray-600">
          Discover a wide range of handpicked {professionalType} interior
          professionals and décor ideas at Livspace. We bring you{" "}
          {professionalType} professionals that are customizable, practical and
          trendy.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <FilterDropdown
            label="Sort By"
            options={["Featured", "Price Low to High", "Price High to Low"]}
            value={sortBy}
            onChange={setSortBy}
            className="w-full md:w-48"
          />

          <span className="text-gray-600 text-sm hidden md:block">
            Filter by
          </span>

          {Object.entries(filterOptions).map(([key, options]) => (
            <FilterDropdown
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              options={options}
              value={filters[key as keyof typeof filters]}
              onChange={(value) => setFilters({ ...filters, [key]: value })}
              className="w-full md:w-48"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {professionals.map((professional) => (
          <ProfessionalCard key={professional.id} professional={professional} />
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center space-x-4 text-sm">
        <span>Did you find what you are looking for?</span>
        <button
          className="px-4 py-2 border rounded-full hover:bg-gray-50"
          onClick={() => setShowFeedbackForm(false)}
        >
          Yes
        </button>
        <button
          className="px-4 py-2 border rounded-full hover:bg-gray-50"
          onClick={() => setShowFeedbackForm(true)}
        >
          No
        </button>
      </div>

      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default ProfessionalPageComponent;
