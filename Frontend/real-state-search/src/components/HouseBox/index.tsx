import React from "react";

interface HouseBoxProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

const HouseBox = ({ title, description, price, imageUrl }: HouseBoxProps) => {
  return (
    <div className="house-box">
      <img src={imageUrl} alt={title} className="house-image" />
      <div className="house-info">
        <h2 className="house-title">{title}</h2>
        <p className="house-description">{description}</p>
        <p className="house-price">{price}</p>
      </div>
    </div>
  );
};

export default HouseBox;
