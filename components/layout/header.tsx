"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton } from "../auth/user-button";
import { Button } from "../ui/button";
import { 
  Plane, 
  Hotel, 
  Map, 
  Compass, 
  Menu, 
  X, 
  Sun, 
  Moon 
} from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { name: "Home", href: "/", icon: <Plane className="h-4 w-4 mr-2" /> },
  { name: "Destinations", href: "/destinations", icon: <Map className="h-4 w-4 mr-2" /> },
  { name: "Hotels", href: "/hotels", icon: <Hotel className="h-4 w-4 mr-2" /> },
  { name: "Activities", href: "/activities", icon: <Compass className="h-4 w-4 mr-2" /> },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">EasyVoyage</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden md:flex"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <div className="hidden md:block">
            <UserButton />
          </div>

          <Button variant="default" className="hidden md:flex">
            Plan Trip
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm pt-16 md:hidden">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-primary py-2",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              Plan Trip
            </Button>
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <UserButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}