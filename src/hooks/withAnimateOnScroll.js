import React, { useState, useEffect } from 'react';

const withAnimateOnScroll = (WrappedComponent, animationClass = 'animate__fadeIn') => {
  return (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const checkVisibility = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    };

    useEffect(() => {
      const handleScroll = () => {
        const element = document.getElementById(props.id);
        if (element && checkVisibility(element)) {
          setIsVisible(true);
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check visibility on initial render

      return () => window.removeEventListener('scroll', handleScroll);
    }, [props.id]);

    return (
      <div
        id={props.id}
        className={`transition-all duration-500 ${isVisible ? animationClass : ''}`}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withAnimateOnScroll;
