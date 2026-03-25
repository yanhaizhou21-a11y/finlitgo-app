"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export default function NavbarDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Class",
      link: "/class",
    },
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "Ai assist",
      link: "/ai-assist",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full z-50">
      <Navbar className="bg-transparent border-none">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" href="/login">Login</NavbarButton>
            <NavbarButton variant="primary" href="/register">Sign Up</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full text-center"
              >
                Login
              </NavbarButton>
              <NavbarButton
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full text-center"
              >
                Sign Up
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
