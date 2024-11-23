import React, { useState } from "react";
import speedo from "../../assets/speedo.jpg";
import { Link } from "react-router-dom";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";

const FleetSection = () => {
  const carDetails = [
    {
      image: speedo,
      name: "Toyota Innova",
      fuel: "Diesel",
      seats: "7 seater",
      price: "₹0000.00",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 md:mt-14">
      <div className="flex md:flex-row justify-center items-start md:items-center mb-6 sm:mb-10">
        <p className="font-semibold text-3xl sm:text-4xl">Our Fleet Cars</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="border-2 border-solid border-gray-900 overflow-hidden group"
          >
            <img
              src={carDetails[0].image}
              alt={carDetails[0].name}
              className="w-full h-48 sm:h-64 object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="bg-white p-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
                  {carDetails[0].name}
                </h3>
                <h3 className="text-sm text-gray-700">{carDetails[0].fuel}</h3>
                <h3 className="text-sm text-gray-700">{carDetails[0].seats}</h3>
              </div>
              <div>
                <p>
                  <span className="tracking-wider text-gray-900">
                    {carDetails[0].price}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link to="/car-selection">
          <button className="bg-gray-900 text-white p-2 w-32">See More</button>
        </Link>
      </div>
    </div>
  );
};

export default withFadeInAnimation(FleetSection);
