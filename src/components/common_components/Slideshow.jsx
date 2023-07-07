import React, { useState, useEffect } from 'react';

const Slideshow = ({ images, interval }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Move to the next image after the specified interval
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [currentImageIndex, images.length, interval]);

  return <img src={images[currentImageIndex]} alt="Slideshow" />;
};

export default Slideshow;