import React from "react";
import { 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  HelpCircle 
} from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-blue-100 border-t border-blue-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Truck className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Logistics Solutions</h2>
            </div>
            <p className="text-sm text-gray-600">
              Delivering innovative transportation and logistics solutions with a commitment to reliability and customer satisfaction.
            </p>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Services</h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              {["Round Trip", "Cab Services", "Goods Transportation", "Driver Network"].map(
                (service) => (
                  <li key={service} className="hover:text-blue-600 transition">{service}</li>
                )
              )}
            </ul>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Support</h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                { icon: Phone, text: "Contact Us" },
                { icon: Mail, text: "Customer Support" },
                { icon: HelpCircle, text: "Frequently Asked Questions" }
              ].map((item) => (
                <li key={item.text} className="flex items-center hover:text-blue-600 transition">
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 pt-6 border-t border-blue-200">
          <p className="text-sm text-gray-500">&copy; 2024 Logistics Solutions. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;