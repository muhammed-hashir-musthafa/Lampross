"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  MenuIcon,
  Package,
  Paintbrush,
  Search,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  href: string;
}

interface MenuItemsSection {
  title?: string;
  items: MenuItem[];
}

interface MenuSection {
  icon: React.ReactNode;
  title: string;
  mainItems: MenuItemsSection[];
}

const menuSections: MenuSection[] = [
  {
    icon: <Paintbrush className="h-5 w-5" />,
    title: "Designs",
    mainItems: [
      {
        items: [
          { title: "All Designs", href: "/designs" },
          { title: "Bedroom designs", href: "/designs/bedroom" },
          { title: "Kitchen designs", href: "/designs/kitchen" },
          { title: "Bathroom designs", href: "/designs/bathroom" },
          { title: "Living room designs", href: "/designs/living-room" },
          { title: "Dining area designs", href: "/designs/dining-area" },
          { title: "Furniture designs", href: "/designs/furniture" },
          { title: "Storage area designs", href: "/designs/storage" },
        ],
      },
      {
        title: "By Layout",
        items: [
          { title: "1BHK", href: "/designs/1bhk" },
          { title: "2BHK", href: "/designs/2bhk" },
          { title: "3BHK", href: "/designs/3bhk" },
          { title: "4BHK", href: "/designs/4bhk" },
        ],
      },
      {
        title: "Others",
        items: [{ title: "Floor plan", href: "/designs/floor-plan" }],
      },
    ],
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Professionals",
    mainItems: [
      {
        items: [
          { title: "Architect", href: "/professionals/architect" },
          { title: "Civil engineer", href: "/professionals/civil-engineer" },
          {
            title: "Interior designers",
            href: "/professionals/interior-designers",
          },
          { title: "Surveyor", href: "/professionals/surveyor" },
          { title: "Electrician", href: "/professionals/electrician" },
          { title: "Contractors", href: "/professionals/contractors" },
          { title: "Plumber", href: "/professionals/plumber" },
          { title: "Carpenter", href: "/professionals/carpenter" },
          { title: "Painter", href: "/professionals/painter" },
          {
            title: "HAVC technicians",
            href: "/professionals/havc-technicians",
          },
          { title: "Masons", href: "/professionals/masons" },
          { title: "Roofers", href: "/professionals/roofers" },
          {
            title: "Flooring Specialist",
            href: "/professionals/flooring-specialist",
          },
          { title: "Landscapers", href: "/professionals/landscapers" },
          {
            title: "Smart home technicians",
            href: "/professionals/smart-home-technicians",
          },
          {
            title: "Solar panel installer",
            href: "/professionals/solar-panel-installer",
          },
        ],
      },
    ],
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: "Products",
    mainItems: [
      {
        title: "Shop by categories",
        items: [
          { title: "All Products", href: "/products" },
          { title: "Sanitary", href: "/products/sanitary" },
          { title: "Kitchen Fittings", href: "/products/kitchen-fittings" },
          { title: "Contractors", href: "/products/contractors" },
          {
            title: "Flooring Specialist",
            href: "/products/flooring-specialist",
          },
          { title: "Electronics", href: "/products/electronics" },
          { title: "Flooring", href: "/products/flooring" },
          { title: "HVAC Technicians", href: "/products/HVAC-technicians" },
          { title: "Landscapers", href: "/products/landscapers" },
          { title: "Plumbing", href: "/products/plumbing" },
          { title: "Furniture", href: "/products/furniture" },
          { title: "Masons", href: "/products/masons" },
          {
            title: "Smart Home Technicians",
            href: "/products/smart-home-technicians",
          },
          { title: "Doors", href: "/products/doors" },
          { title: "Painting", href: "/products/painting" },
          { title: "Roofers", href: "/products/roofers" },
          {
            title: "Solar Panel Installer",
            href: "/products/solar-panel-installer",
          },
        ],
      },
    ],
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Properties & Land",
    mainItems: [
      {
        items: [
          { title: "Ready to move in Homes", href: "/properties/ready-homes" },
          { title: "Apartments", href: "/properties/apartments" },
          { title: "Villas", href: "/properties/villas" },
          { title: "Land", href: "/properties/land" },
        ],
      },
    ],
  },
];
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<MenuSection | null>(null);

  return (
    <header className="sticky top-0 left-0 right-0 bg-white border-b z-50">
      <div className="flex items-center justify-between px-4 md:px-16 h-[76px]">
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="xl:hidden">
                <MenuIcon />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <SheetHeader className="my-3">
                    <SheetTitle></SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>
                  {activeSection ? (
                    <>
                      <div className="absolute left-8 top-6 rounded-sm">
                        <div
                          onClick={() => setActiveSection(null)}
                          className="mr-2 flex gap-x-2"
                        >
                          <ArrowLeft className="h-6 w-6" />
                          <span className="sr-only">Back</span>
                          <span className="font-medium">Back</span>
                        </div>
                      </div>
                      <div className="flex-1 overflow-auto">
                        <div className="flex items-center justify-between px-0 p-4">
                          <div className="flex items-center gap-3">
                            {activeSection.icon}
                            <span className="font-semibold">
                              {activeSection.title}
                            </span>
                          </div>
                          <Link
                            href={`/${activeSection.title.toLowerCase()}`}
                            className="text-sm font-normal text-primary flex items-center"
                            onClick={() => setIsOpen(false)}
                          >
                            view all
                            <ArrowUpRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                        <div className="flex flex-col">
                          {activeSection.mainItems.map((item, index) => (
                            <div key={index} className="flex flex-col">
                              {item.title && (
                                <div className="mt-4 ms-2 font-semibold text-sm">
                                  {item.title}
                                </div>
                              )}
                              {item.items.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  className="px-4 py-3 text-sm hover:bg-muted transition-colors font-normal border-b"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <SheetClose className="absolute left-8 top-6 rounded-sm ring-offset-background transition-opacity opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                        <X className="size-6" />
                        <span className="sr-only">Close</span>
                      </SheetClose>
                      <div className="flex-1 overflow-auto">
                        {menuSections.map((section) => (
                          <div
                            key={section.title}
                            className=""
                            onClick={() => setActiveSection(section)}
                          >
                            <div className="flex items-center p-4 px-0 justify-between">
                              <div className="flex items-center gap-3">
                                {section.icon}
                                <span className="font-semibold">
                                  {section.title}
                                </span>
                              </div>
                              <span
                                className="iconamoon--arrow-right-2-fill relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex flex-col">
                              {section.mainItems.map((item, index) => (
                                <div key={index} className="flex flex-col">
                                  {item.items.slice(0, 3).map((item) => (
                                    <Link
                                      key={item.title}
                                      href={item.href}
                                      className="px-4 py-3 text-sm hover:bg-muted transition-colors font-normal border-l"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {item.title}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                              <Link
                                href={`/${section.title.toLowerCase()}`}
                                className="px-4 py-3 text-sm text-primary transition-colors hover:text-primary/80"
                                onClick={() => setIsOpen(false)}
                              >
                                View All
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="p-4 border-t mt-auto">
                    <div className="flex flex-col gap-2">
                      <Link href={"/login"}>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href={"/signup"}>
                        <Button className="w-full justify-start">
                          Become a partner
                          <UserPlus className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
          <Link href={"/"}>
            <Image
              src="/assets/logo.png"
              alt="Lampros"
              width={127}
              height={127}
              priority
              className="w-auto"
            />
          </Link>
        </div>

        <nav className="hidden xl:block flex-1 max-w-[909px] mx-8">
          <NavigationMenu>
            <NavigationMenuList>
              {menuSections.map((section, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger>
                    {section.title}
                    <span
                      className="iconamoon--arrow-down-2-fill relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[800px] p-6">
                      <div className="space-y-6">
                        {section.mainItems.map((item, index) => (
                          <div key={index}>
                            {item.title && (
                              <h3 className="text-sm font-medium mb-2">
                                {item.title}
                              </h3>
                            )}
                            <div className="grid grid-cols-4 gap-4">
                              {item.items.map((item, index) => (
                                <NavigationMenuLink asChild key={index}>
                                  <Link
                                    href={item.href}
                                    className="block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:text-primary py-3"
                                  >
                                    <div className="text-sm font-normal leading-none">
                                      {item.title}
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <Link href={"/login"}>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    Login
                    <span
                      className="solar--login-bold relative top-[1px] ml-1 h-3 w-3"
                      aria-hidden="true"
                    />
                  </NavigationMenuTrigger>
                </NavigationMenuItem>
              </Link>
              <NavigationMenuItem>
                <Link href="/signup">
                  <Button className="h-10">
                    Become a partner
                    <UserPlus />
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-8">
          <Search className="h-6 w-6" />
          <Button className="h-10 hidden xl:hidden xs:flex" asChild>
            <Link href="/docs">
              Join as Pro
              <UserPlus />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
