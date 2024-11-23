import React from "react";
import car from "../../assets/car.webp";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";

const OrderSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center">
      <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl mb-4">
        Exclusive Offer
      </h1>
      <p className="text-sm sm:text-base mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        <br />
        accusamus deserunt, inventore assumenda distinctio corrupti aaaaaa
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-1">
        {[1, 2, 3].map((_, index) => (
          <img
            key={index}
            src={car}
            alt={`Car image ${index + 1}`}
            className="h-auto w-full border-solid border-2 border-gray-900"
          />
        ))}
      </div>
    </div>
  );
};

export default withFadeInAnimation(OrderSection);
