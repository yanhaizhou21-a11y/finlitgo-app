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
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export default function NavbarDemo() {
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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setProfileData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (!isConfirmed) return;

    try {
      await signOut(auth);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const displayName = profileData?.username || profileData?.fullName || user?.displayName || "User";
  const photoURL = profileData?.photoUrl || user?.photoURL;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative w-full z-50">
      <Navbar className="bg-transparent border-none">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          
          <div className="flex items-center gap-3 relative z-20">
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
                  <span className="text-sm font-medium hidden md:block text-white">{displayName}</span>
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
