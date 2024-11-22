import React from "react";
import landing from "../../assets/landing.jpg";

const AboutSection = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl mb-10">
          About Us
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 lg:w-5/12">
            <img
              src={landing}
              alt="About Us Image"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-7/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-3xl mb-4">
              Nuxt development is carried out by passionate developers
            </h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum
              omnis voluptatem accusantium nemo perspiciatis delectus atque
              autem! Voluptatum tenetur beatae unde aperiam, repellat expedita
              consequatur! Officiis id consequatur atque doloremque!
            </p>
            <p className="text-gray-600">
              Nobis minus voluptatibus pariatur dignissimos libero quaerat iure
              expedita at? Asperiores nemo possimus nesciunt dicta veniam
              aspernatur quam mollitia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
