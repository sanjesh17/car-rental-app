import React from "react";
import { Link } from "react-router-dom";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";
import speedo from "../../assets/speedo.jpg";

const FleetSection = () => {
  const carDetails = [
    {
      image: speedo,
      name: "Toyota Innova",
      fuel: "Diesel",
      seats: "7 Passengers",
      price: "₹2,500",
      tag: "Most Popular",
    },
    {
      image: speedo,
      name: "Honda City",
      fuel: "Petrol",
      seats: "5 Passengers",
      price: "₹1,800",
      tag: "Best Value",
    },
  ];

  const handleBookNow = (car) => {
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Explore Our Fleet
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully curated selection of comfortable and
            reliable vehicles
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {carDetails.map((car, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {car.tag}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {car.name}
                  </h3>
                  <span className="text-blue-600 font-semibold text-lg">
                    {car.price}/day
                  </span>
                </div>

                <div className="flex justify-between text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 011 1v3a1 1 0 01-2 0V8a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {car.fuel}
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    {car.seats}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      handleBookNow(car);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/fleet"
            className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors inline-block"
          >
            View Full Fleet
          </Link>
        </div>
      </div>
    </section>
  );
};

export default withFadeInAnimation(FleetSection);
