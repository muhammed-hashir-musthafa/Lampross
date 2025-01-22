import { Users2, MessageSquare, Star } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    icon: <Users2 className="size-7" />,
    title: "Qualified Employees",
    description:
      "Our team consists of more than 4 qualified and experienced real estate brokers and property managers ready to help you",
  },
  {
    icon: <MessageSquare className="size-7" />,
    title: "Free Consultations",
    description:
      "Our acquaintance with a client always begins with a free consultation to find out what kind of property they are looking for.",
  },
  {
    icon: <Star className="size-7" />,
    title: "100% Guaranteed",
    description:
      "Our team consists of more than 4 qualified and experienced real estate brokers and property managers ready to help you.",
  },
];

export function BenefitsAndApp() {
  return (
    <section className="py-16 px-4 md:px-6 bg-section">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-2xl font-medium md:font-semibold text-center mb-12">
          Benefits
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-lg rounded-ee-3xl bg-[#FFE4CC] mb-4">
                <div className="absolute -top-2 -left-3">{benefit.icon}</div>
              </div>
              <h3 className="text-lg font-normal mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm md:font-light font-normal leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[600px_minmax(100px,_1fr)] gap-12 items-center">
          <div className="relative mx-auto lg:max-w-none ">
            <Image
              src="https://placehold.co/210x420"
              alt="Lampros App Interface"
              width={320}
              height={320}
              className="w-[320px]"
              priority
            />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-medium mb-4">
              The best of <span className="text-[#FF6B00]">Lampros</span> is in
              the app
            </h2>
            <p className="text-text font-medium mb-8 max-w-xl mx-auto lg:mx-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              pellentesque ac erat nec pretium.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#"
                className="inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/playstore-btn.png"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>
              <a
                href="#"
                className="inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/appstore-btn.png"
                  alt="Download on the App Store"
                  width={135}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
