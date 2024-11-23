import React from "react";
import useIntersectionObserver from "./useIntersectionObserver";

const withFadeInAnimation = (WrappedComponent) => {
  return function WithFadeInAnimation(props) {
    const [ref, isIntersecting] = useIntersectionObserver({
      threshold: 0.1,
    });

    return (
      <div
        ref={ref}
        className={`fade-in-container ${isIntersecting ? "animate" : ""}`}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withFadeInAnimation;
