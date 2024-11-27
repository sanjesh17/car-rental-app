"use client";
import React from "react";

// Custom Image Component for non-Next.js projects
const Image = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} />
);

// Card Component
const Card = ({ card, index }) => {
  return (
    <div
      key={index}
      className="flex-shrink-0 snap-center w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] bg-white rounded-2xl overflow-hidden shadow-lg 
                 transition-all duration-300 transform hover:scale-[0.97] cursor-pointer"
    >
      <div className="relative h-64">
        <Image
          src={card.src}
          alt={card.title}
          className="w-full h-full object-cover rounded-t-2xl"
        />
        <div className="absolute bottom-4 left-4 bg-[#e3f2ff] bg-opacity-50 text-neutral-800 px-4 py-1 rounded-full text-sm">
          {card.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-800 mb-2">
          {card.title}
        </h3>
        <div className="text-neutral-600">{card.content}</div>
      </div>
    </div>
  );
};

// Carousel Component
const Carousel = ({ items }) => {
  return (
    <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 pb-8 -mx-6 scrollbar-hide">
      {items}
    </div>
  );
};

// FleetSection Component
function FleetSection() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section className="py-5 bg-[#e3f2ff] overflow-x-auto scrollbar-hide lg:pl-8">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="max-w-7xl px-2 lg:px-0 text-2xl md:text-3xl font-bold text-neutral-800 mb-6">
          Explore Our Cab Services
        </h2>
        {/* Carousel */}
        <Carousel items={cards} />
      </div>
    </section>
  );
}
export default FleetSection;

// Dummy Content for each card
const DummyContent = ({ description }) => {
  return <p className="text-neutral-600 text-base md:text-lg">{description}</p>;
};

// Card Data for Cab Services
const data = [
  {
    category: "Round Trip",
    title: "Comfortable Journeys Both Ways",
    src: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=3000&auto=format&fit=crop",
    content: (
      <DummyContent description="Plan your round trip with ease and comfort. Ideal for family vacations and business travels." />
    ),
  },
  {
    category: "Single Trip",
    title: "One-Way, Your Way",
    src: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=3000&auto=format&fit=crop",
    content: (
      <DummyContent description="Need a one-way ride? We've got you covered. Book reliable rides to your destination." />
    ),
  },
  {
    category: "Car Rental",
    title: "Self-Drive Options Available",
    src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=3000&auto=format&fit=crop",
    content: (
      <DummyContent description="Choose from our fleet of cars for self-drive rentals. Perfect for road trips and city rides." />
    ),
  },
  {
    category: "Goods Delivery",
    title: "Hassle-Free Goods Transport",
    src: "https://images.unsplash.com/photo-1581091870620-e6af13c9b7a7?q=80&w=3000&auto=format&fit=crop",
    content: (
      <DummyContent description="Reliable goods delivery services for all your business and personal needs." />
    ),
  },
  {
    category: "Premium Services",
    title: "Luxury Vehicles for Special Occasions",
    src: "https://images.unsplash.com/photo-1606312617440-391c66266dc4?q=80&w=3000&auto=format&fit=crop",
    content: (
      <DummyContent description="Celebrate in style with our premium fleet. Ideal for weddings, parties, and corporate events." />
    ),
  },
];
