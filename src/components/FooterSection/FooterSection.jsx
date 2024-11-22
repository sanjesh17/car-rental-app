import React from "react";

const FooterSection = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h1 className="font-bold text-xl mb-4">Logo</h1>
            <p className="text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea cum
              fuga consectetur in pariatur voluptatum at, excepturi minima unde
              sed.
            </p>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-4">Services</h1>
            <ul className="space-y-2">
              {["Round trip", "Cab", "Goods", "Acting drivers"].map(
                (service) => (
                  <li key={service}>{service}</li>
                )
              )}
            </ul>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-4">Help</h1>
            <ul className="space-y-2">
              {["Contact", "Email", "FAQs"].map((help) => (
                <li key={help}>{help}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2024 Logo, all rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
