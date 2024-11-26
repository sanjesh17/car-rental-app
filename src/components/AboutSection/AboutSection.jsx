import React from "react";
import { 
  Target, 
  Users, 
  Award, 
  ArrowRight 
} from "lucide-react";
import landingImage from "../../assets/landing.jpg";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";

const AboutSection = () => {
  const companyFeatures = [
    {
      icon: <Target className="h-6 w-6 text-blue-600" />,
      title: "Our Mission",
      description: "Driving innovation through cutting-edge technology and passionate development"
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: "Our Team",
      description: "Collaborative experts dedicated to solving complex challenges"
    },
    {
      icon: <Award className="h-6 w-6 text-purple-600" />,
      title: "Our Commitment",
      description: "Delivering high-quality solutions that exceed client expectations"
    }
  ];

  return (
    <div className="min-h-screen relative bg-white">
     
      

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About Our Journey
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transforming ideas into innovative digital solutions
            </p>
          </div>

          {/* Content Container */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-8 items-center">
            {/* Enhanced Image Section */}
            <div className="relative p-4 md:p-6">
              <div className="relative overflow-hidden rounded-2xl group">
                {/* Image Container with Overlay */}
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 z-10 rounded-2xl"></div>
                  
                  <img
                    src={landingImage}
                    alt="Our Team"
                    className="w-full h-auto object-cover rounded-2xl 
                      transform transition-transform duration-300 
                      group-hover:scale-105 shadow-lg"
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-100 rounded-full 
                  opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-100 rounded-full 
                  opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Image Interaction Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-lg">
                    <ArrowRight className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Text & Features Section */}
            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nuxt Development Driven by Passion
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We are a team of passionate developers committed to pushing the 
                  boundaries of web technology. Our approach combines technical 
                  expertise with creative problem-solving to deliver exceptional 
                  digital experiences.
                </p>
              </div>

              {/* Company Features Grid */}
              <div className="grid gap-4">
                {companyFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl 
                      hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="pt-6 border-t border-gray-200">
                <button 
                  className="w-full flex items-center justify-center gap-3 
                    bg-blue-600 text-white px-6 py-4 rounded-xl 
                    hover:bg-blue-700 transition-colors duration-300 
                    shadow-lg shadow-blue-600/30"
                >
                  Learn More About Us
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "50+", label: "Completed Projects" },
              { value: "25+", label: "Team Members" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl text-center shadow-sm 
                  hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withFadeInAnimation(AboutSection);
