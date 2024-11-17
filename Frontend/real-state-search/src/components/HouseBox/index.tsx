import React from "react";
import {
  HouseBoxContainer,
  HouseDescription,
  HouseDetails,
  HouseImage,
  HousePrice,
  HouseTitle,
} from "./styles";

interface HouseBoxProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

const HouseBox = ({ title, description, price, imageUrl }: HouseBoxProps) => {
  return (
    <HouseBoxContainer className="house-box">
      <HouseImage src={imageUrl} alt={title} className="house-image" />
      <HouseDetails className="house-info">
        <HouseTitle className="house-title">{title}</HouseTitle>
        <HouseDescription className="house-description">
          {description}
        </HouseDescription>
        <HousePrice className="house-price">{price}</HousePrice>
      </HouseDetails>
    </HouseBoxContainer>
  );
};

export default HouseBox;
