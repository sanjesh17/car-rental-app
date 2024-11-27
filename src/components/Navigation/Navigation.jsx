import React, { useState } from "react";
import {
  Home,
  Car,
  Shield,
  User,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../mobileHeader/MobileHeader";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const desktopNavLinks = [
    { label: "Home", href: "/" },
    { label: "Drive with us", href: "/driver-dashboard" },
    { label: "Contact Us", href: "/safety" },
    { label: "Safety", href: "/safety" },
  ];

  const mobileNavLinks = [
    { label: "Home", href: "/", icon: <Home className="h-4.5 w-4.5" /> },
    {
      label: "Drive",
      href: "/driver-dashboard",
      icon: <Car className="h-4.5 w-4.5" />,
    },
    {
      label: "Safety",
      href: "/safety",
      icon: <Shield className="h-4.5 w-4.5" />,
    },
    {
      label: "Profile",
      href: "/auth/signup",
      icon: <User className="h-4.5 w-4.5" />,
    },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block w-full top-0 z-50 sticky bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="text-2xl font-bold text-gray-900 tracking-tight hover:text-[#6850A4]
                         transition-colors duration-200"
              >
                LOGO
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-1">
              {desktopNavLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-[15px] font-medium text-gray-600 flex items-center py-2.5 px-4 
                           rounded-xl hover:text-[#6850A4] hover:bg-blue-50/80 
                           transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-2">
              <button
                className="text-sm font-medium text-gray-600 hover:text-[#6850A4] px-4 py-2.5 
                           rounded-xl hover:bg-blue-50/80 transition-all duration-200 
                           flex items-center gap-2"
              >
                <HelpCircle className="h-4 w-4" />
                Help
              </button>
              <button
                onClick={() => navigate("/auth/signup")}
                className="flex items-center gap-2 text-sm font-medium bg-[#6850A4] text-white 
                           px-5 py-2.5 rounded-xl hover:bg-[#B858A2] active:bg-[#6850A4]
                           transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <User className="h-4 w-4" />
                <span>Sign in</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 font-custom">
        <div className="bg-white/70 backdrop-blur-xl shadow-2xl border-t border-gray-100">
          <div className="flex justify-between px-6 py-2">
            {mobileNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex flex-col items-center justify-center 
                           text-gray-600 hover:text-[#6850A4] 
                           transition-colors duration-200 
                           group relative"
              >
                <div className="relative">
                  {link.icon}
                  <span
                    className="absolute -top-1 -right-1 
                               bg-[#6850A4] text-white 
                               w-5 h-5 rounded-full 
                               flex items-center justify-center 
                               text-[8px] 
                               opacity-0 group-hover:opacity-100 
                               transition-opacity duration-200"
                  >
                    •
                  </span>
                </div>
                <span className="text-sm font-semibold mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
