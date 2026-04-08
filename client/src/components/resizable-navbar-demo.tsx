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
import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import logoUrl from "../assets/logo.svg";

type NavbarVariant = "default" | "learning";

export default function NavbarDemo({ variant = "default" }: { variant?: NavbarVariant }) {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Class", link: "/class" },
    { name: "Blog", link: "/blog" },
    { name: "AI Assist", link: "/ai-assist" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from('users').select('*').eq('id', session.user.id).single()
          .then(({ data }) => setProfileData(data));
      } else {
        setProfileData(null);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from('users').select('*').eq('id', session.user.id).single()
          .then(({ data }) => setProfileData(data));
      } else {
        setProfileData(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (!isConfirmed) return;

    try {
      await supabase.auth.signOut();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const displayName = profileData?.full_name || profileData?.fullName || user?.user_metadata?.full_name || "User";
  const photoURL = profileData?.avatar_url || profileData?.photoUrl || user?.user_metadata?.avatar_url;
  const initial = displayName.charAt(0).toUpperCase();

  if (variant === "learning") {
    return (
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img src={logoUrl} alt="FinLitGo Logo" className="h-8 w-8 object-contain" />
            <span className="font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>FinLitGo</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-300 md:flex">
            {navItems.map((item) => (
              <a key={item.name} href={item.link} className="transition-colors hover:text-white">
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <>
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-violet-400/30 bg-gradient-to-br from-violet-600 to-purple-400 shadow-[0_0_10px_rgba(124,58,237,0.2)]">
                    {photoURL ? (
                      <img src={photoURL} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-white">{initial}</span>
                    )}
                  </div>
                  <span className="max-w-[120px] truncate text-sm font-medium text-white">{displayName}</span>
                </div>

                <a
                  href="/dashboard"
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:-translate-y-0.5"
                >
                  Dashboard
                </a>

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
                  Login
                </a>
                <a
                  href="/register"
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:-translate-y-0.5"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full z-50">
      <Navbar className="bg-transparent border-none">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          
          <div className="relative z-20 flex shrink-0 items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile Avatar */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 overflow-hidden flex items-center justify-center border-2 border-violet-400/30 shadow-[0_0_10px_rgba(124,58,237,0.2)]">
                    {photoURL ? (
                      <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-bold text-xs">{initial}</span>
                    )}
                  </div>
                  <span className="hidden max-w-[120px] truncate text-sm font-medium text-white xl:block">{displayName}</span>
                </div>
                
                {/* Dashboard Button */}
                <NavbarButton variant="primary" href="/dashboard">
                  Dashboard
                </NavbarButton>
                
                {/* Logout */}
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavbarButton variant="secondary" href="/login">Login</NavbarButton>
                <NavbarButton variant="primary" href="/register">Sign Up</NavbarButton>
              </>
            )}
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
            
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800 flex w-full flex-col gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-2 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 overflow-hidden flex items-center justify-center">
                      {photoURL ? (
                        <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white font-bold text-lg">{initial}</span>
                      )}
                    </div>
                    <span className="font-medium dark:text-white">{displayName}</span>
                  </div>
                  
                  <NavbarButton
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full text-center"
                  >
                    Dashboard
                  </NavbarButton>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2 px-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg font-medium hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
