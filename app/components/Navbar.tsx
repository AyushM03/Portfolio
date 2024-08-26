"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mobilemenu } from "./Mobilemenu";

export const navigationItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Guestbook",
    href: "/guestbook",
  },
  {
    name: "Projects",
    href: "/projects",
  },
];
export function Navbar() {
    const pathname = usePathname();
  return (
    <nav className="max-w-7xl mx-auto px-4 md:px-8 py-5 grid grid-cols-12 ">
      <div className="col-span-6 flex md:col-span-3">
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            Ayush <span className="text-[#FFBA82]">Meshram</span>
          </h1>
        </Link>
      </div>
      <div className="hidden sm:flex justify-center items-center col-span-6">
        <NavigationMenu>
          <NavigationMenuList>
            {navigationItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink active={pathname === item.href} className={navigationMenuTriggerStyle()}>
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center justify-end md:col-span-3 col-span-6 ">
        <Button className="hidden  bg-gradient-to-r from-[#FFBB00] to-[#e09200]  
        hover:shadow-input-grow border-primary-700 active:shadow-input-shrink    transition-all duration-150 
    ease-in-out will-change-transform hover:-translate-y-0.5
     active:translate-y-0.5 active:duration-100 sm:flex" asChild>
          <a href="mailto:aayushmeshram9168@gmail.com">Contact Me</a>
        </Button>
        <div className="sm:hidden">
            <Mobilemenu />
        </div>
      </div>
    </nav>
  );
}
