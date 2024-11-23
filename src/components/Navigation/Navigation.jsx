import React, { useState } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth/signup");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      dropdown: [
        { label: "Book a Ride", href: "#taxi", icon: "🚗" },
        { label: "Self-Drive", href: "#self-driving", icon: "🎮" },
        { label: "Delivery", href: "#goods", icon: "📦" },
        { label: "Business", href: "#business", icon: "💼" },
      ],
    },
    { label: "Drive with us", href: "/driver-dashboard" },
    { label: "Safety", href: "/safety" },
  ];

  return (
    <>
      {/* Spacer to avoid white space overlap */}
      <div className="h-16"></div>

      <nav className="fixed w-full top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-0">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="text-2xl font-bold text-black tracking-tight hover:text-gray-800"
              >
                LOGO
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navLinks.map((link, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    className="text-[16px] font-medium text-gray-900 hover:text-black flex items-center py-2 px-3 rounded-full hover:bg-gray-100 transition-all"
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform" />
                    )}
                  </a>

                  {/* Dropdown */}
                  {link.dropdown && activeDropdown === index && (
                    <div className="absolute left-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-2">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <span className="mr-3">{item.icon}</span>
                            <span>{item.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Buttons */}
            <div className="hidden lg:flex items-center space-x-2">
              <button className="text-sm font-medium text-gray-900 hover:text-black px-4 py-2 rounded-full hover:bg-gray-100 transition-all">
                Help
              </button>
              <button
                className="flex items-center space-x-2 text-sm font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all"
                onClick={handleClick}
              >
                <User className="h-4 w-4" />
                <span>Sign in</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-50">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link, index) => (
              <div key={index} className="py-2">
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === index ? null : index
                        )
                      }
                      className="w-full flex items-center justify-between py-2 text-base font-medium text-gray-900"
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === index && (
                      <div className="mt-2 space-y-2">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                          >
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={link.href}
                    className="block py-2 text-base font-medium text-gray-900"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
            <div className="pt-4">
              <button
                className="w-full text-center py-3 px-4 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-all"
                onClick={handleClick}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
