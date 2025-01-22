import Image from "next/image";
import React from "react";

function AboutApp() {
  return (
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
          The best of <span className="text-[#FF6B00]">Lampros</span> is in the
          app
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
  );
}

export default AboutApp;
