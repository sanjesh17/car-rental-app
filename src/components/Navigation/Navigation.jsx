import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navLinks = [
    { label: "HOME", href: "/" },
    {
      label: "BOOKING",
      dropdown: [
        { label: "TAXI", href: "#taxi" },
        { label: "SELF DRIVING", href: "#self-driving" },
        { label: "ACTING", href: "#acting" },
        { label: "GOODS", href: "#goods" },
      ],
    },
    { label: "DRIVER DASH", href: "/driver-dashboard" },
    { label: "ADMIN DASH", href: "/admin-dashboard" },
  ];

  return (
    <nav className="relative bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a
              href="/"
              className="text-2xl font-bold text-gray-800 tracking-wider hover:text-gray-600 transition-colors"
            >
              LOGO
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 -my-2 lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => link.dropdown && setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center"
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:rotate-180 transition-transform" />
                  )}
                </a>

                {/* Dropdown */}
                {link.dropdown && activeDropdown === index && (
                  <div className="absolute z-10 mt-3 transform px-2 w-56 max-w-xs sm:px-0">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        {link.dropdown.map((dropItem) => (
                          <a
                            key={dropItem.label}
                            href={dropItem.href}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">
                                {dropItem.label}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Sign In/Up Button */}
          <div className="hidden lg:flex items-center justify-end md:flex-1 lg:w-0">
            <a
              href="/auth/signup"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-800 hover:bg-gray-700 transition-all duration-200"
            >
              SIGN IN/UP
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full inset-x-0 p-2 transition transform origin-top-right lg:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="space-y-6">
                {navLinks.map((link, index) => (
                  <div key={index}>
                    {link.dropdown ? (
                      <div>
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === index ? null : index
                            )
                          }
                          className="w-full flex items-center justify-between text-base font-medium text-gray-900 hover:text-gray-700"
                        >
                          {link.label}
                          <ChevronDown
                            className={`h-5 w-5 transform transition-transform ${
                              activeDropdown === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {activeDropdown === index && (
                          <div className="mt-3 space-y-1">
                            {link.dropdown.map((dropItem) => (
                              <a
                                key={dropItem.label}
                                href={dropItem.href}
                                className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              >
                                {dropItem.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        className="block text-base font-medium text-gray-900 hover:text-gray-700"
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  SIGN IN/UP
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
