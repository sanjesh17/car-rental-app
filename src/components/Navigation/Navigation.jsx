import React, { useState } from "react";
import { Menu, X, ChevronDown, User, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Drive with us", href: "/driver-dashboard" },
    { label: "Contact Us", href: "/safety" },
    { label: "Safety", href: "/safety" },
  ];

  return (
    <>
      <div className="h-16"></div>

      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="text-2xl font-bold text-gray-900 tracking-tight hover:text-blue-600 
                         transition-colors duration-200"
              >
                LOGO
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navLinks.map((link, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    className="text-[15px] font-medium text-gray-600 flex items-center py-2.5 px-4 
                             rounded-xl group-hover:text-blue-600 group-hover:bg-blue-50/80 
                             transition-all duration-200"
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                    )}
                  </a>

                  {/* Dropdown with animation */}
                  {link.dropdown && activeDropdown === index && (
                    <div
                      className="absolute left-0 mt-2 w-72 rounded-2xl bg-white shadow-xl 
                                  border border-gray-100 overflow-hidden opacity-0 translate-y-2 
                                  animate-[dropdownEnter_0.2s_ease-out_forwards]"
                    >
                      <div className="py-2">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="group flex items-center px-4 py-3 hover:bg-gray-50"
                          >
                            <span
                              className="flex items-center justify-center w-10 h-10 
                                         rounded-xl bg-blue-50 group-hover:bg-blue-100 
                                         transition-colors duration-200"
                            >
                              {item.icon}
                            </span>
                            <div className="ml-3">
                              <p
                                className="text-sm font-medium text-gray-800 group-hover:text-blue-600 
                                          transition-colors duration-200"
                              >
                                {item.label}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.desc}
                              </p>
                            </div>
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
              <button
                className="text-sm font-medium text-gray-600 hover:text-blue-600 px-4 py-2.5 
                               rounded-xl hover:bg-blue-50/80 transition-all duration-200 
                               flex items-center gap-2"
              >
                <HelpCircle className="h-4 w-4" />
                Help
              </button>
              <button
                onClick={() => navigate("/auth/signup")}
                className="flex items-center gap-2 text-sm font-medium bg-blue-600 text-white 
                         px-5 py-2.5 rounded-xl hover:bg-blue-700 active:bg-blue-800 
                         transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <User className="h-4 w-4" />
                <span>Sign in</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl text-gray-600 hover:text-blue-600 
                         hover:bg-blue-50/80 transition-all duration-200"
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

      {/* Mobile Menu with slide animation */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-20 bg-white z-50 
                     animate-[slideDown_0.3s_ease-out_forwards]"
        >
          <div className="px-4 py-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-auto">
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
                      className="w-full flex items-center justify-between py-2 text-base 
                               font-medium text-gray-800 hover:text-blue-600"
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 
                                  ${
                                    activeDropdown === index ? "rotate-180" : ""
                                  }`}
                      />
                    </button>
                    <div
                      className={`mt-2 space-y-2 pl-4 overflow-hidden transition-all duration-300
                                ${
                                  activeDropdown === index
                                    ? "max-h-96 opacity-100"
                                    : "max-h-0 opacity-0"
                                }`}
                    >
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-center px-4 py-3 rounded-xl hover:bg-blue-50"
                        >
                          <span
                            className="flex items-center justify-center w-10 h-10 
                                       rounded-xl bg-blue-50"
                          >
                            {item.icon}
                          </span>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800">
                              {item.label}
                            </p>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={link.href}
                    className="block py-2 text-base font-medium text-gray-800 
                             hover:text-blue-600 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
            <div className="pt-4">
              <button
                onClick={() => navigate("/auth/signup")}
                className="w-full text-center py-3 px-4 rounded-xl bg-blue-600 text-white 
                         font-medium hover:bg-blue-700 active:bg-blue-800 transition-all 
                         duration-200 shadow-sm hover:shadow-md"
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
