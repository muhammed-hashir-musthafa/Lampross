"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import BookingModal from "../consultationFormModal/ConsultationForm";

const slides = [
  {
    title: "India's first virtual",
    highlight: "Build mart.",
    description:
      "Lampros helps homeowners build their dream homes with expert services, products, and properties-available on our app and social media as India's first virtual build mart.",
    image: "https://placehold.co/800x600",
  },
  {
    title: "Transform your space",
    highlight: "With experts.",
    description:
      "Connect with professional designers and architects to bring your vision to life. Get personalized solutions for your dream home.",
    image: "https://placehold.co/800x600",
  },
  {
    title: "Quality products",
    highlight: "Delivered.",
    description:
      "Browse through our curated collection of premium building materials and home products. We ensure quality and timely delivery.",
    image: "https://placehold.co/800x600",
  },
];

export default function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="container px-4 md:px-6 flex flex-col-reverse lg:flex-row items-center gap-8 py-12 lg:py-20">
                  <div className="flex-1 space-y-8 mb-1">
                    <div className="space-y-4">
                      <h1 className="text-4xl md:text-5xl font-bold tracking-normal">
                        {slide.title}{" "}
                        <span className="text-[#FF6B00] whitespace-pre">
                          {slide.highlight}
                        </span>
                      </h1>
                      <p className="text-gray-500 md:text-xl max-w-[600px]">
                        {slide.description}
                      </p>
                    </div>
                    <div className="space-y-12">
                      <Button
                        onClick={openBookingModal}
                        variant={"outline"}
                        className="border-primary hover:text-white hover:bg-[#FF6B00]/90 rounded-md px-8"
                      >
                        Get Free Consultation
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <Image
                      src={slide.image}
                      alt="Modern home"
                      width={800}
                      height={600}
                      className="rounded-lg shadow-lg"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === current ? "bg-[#FF6B00]" : "bg-gray-300"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </section>
  );
}
