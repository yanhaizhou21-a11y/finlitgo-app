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
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IconLogout } from "@tabler/icons-react";
import { useAuth } from "../store/AuthContext";
import logoUrl from "../assets/logo.svg";

type NavbarVariant = "default" | "learning";

export default function NavbarDemo({
  variant = "default",
}: {
  variant?: NavbarVariant;
}) {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Class", link: "/class" },
    { name: "Blog", link: "/blog" },
    { name: "AI Assist", link: "/ai-assist" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user, profile: profileData, logout } = useAuth();
  const navigate = useNavigate();

  const runLogout = async () => {
    setShowLogoutConfirm(false);
    try {
      await logout();
      setIsMobileMenuOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const logoutModal = (
    <AnimatePresence>
      {showLogoutConfirm && (
        <motion.div
          className="fixed inset-0 z-[400] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Tutup"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogoutConfirm(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#14141f] via-[#1a1528] to-[#0f0f14] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 ring-1 ring-violet-400/30">
              <IconLogout className="text-violet-300" size={28} stroke={1.5} />
            </div>
            <h2 id="logout-title" className="text-center text-lg font-bold text-white">
              Keluar dari FinLitGo?
            </h2>
            <p className="mt-2 text-center text-sm text-zinc-400 leading-relaxed">
              Sesi kamu di perangkat ini akan berakhir. Kamu bisa masuk lagi kapan saja.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="order-2 w-full rounded-xl border border-zinc-600 bg-zinc-900/80 px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-800 sm:order-1 sm:w-auto"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => void runLogout()}
                className="order-1 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 sm:order-2 sm:w-auto"
              >
                Ya, keluar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const displayName = profileData?.full_name || profileData?.fullName || user?.user_metadata?.full_name || "User";
  const photoURL = profileData?.avatar_url || profileData?.photoUrl || user?.user_metadata?.avatar_url;
  const initial = displayName.charAt(0).toUpperCase();

  if (variant === "learning") {
    return (
      <>
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
                  type="button"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-red-400"
                >
                  Logout
                </button>
                {/* {ThemeToggleButton} */}
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
      {logoutModal}
      </>
    );
  }

  return (
    <>
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
                  type="button"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavbarButton variant="secondary" href="/login">Login</NavbarButton>
                <NavbarButton variant="primary" href="/register">Sign Up</NavbarButton>
                {/* {ThemeToggleButton} */}
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

            <div className="w-full px-2">
              {/* {ThemeToggleButton} */}
            </div>
            
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
                    type="button"
                    onClick={() => setShowLogoutConfirm(true)}
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
    {logoutModal}
    </>
  );
}
