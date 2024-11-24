import {
  HouseDescription,
  HouseDetails,
  HouseImage,
  HousePrice,
  HouseTitle,
} from "./styles";
import Card from "@mui/material/Card";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { HouseBoxProps } from "./types";
import { blue, grey } from "@mui/material/colors";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
  },
};

const HouseBox = ({
  title,
  description,
  rent,
  tax_hotel,
  iptu,
  imageUrls,
  size,
}: HouseBoxProps) => {
  return (
    <Card
      className="house-box0"
      style={{
        width: "300px",
      }}
    >
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {imageUrls.map((url, index) => (
          <HouseImage
            key={index}
            src={url}
            alt={`${title} image ${index + 1}`}
            className="house-image"
          />
        ))}
      </Carousel>
      <HouseDetails className="house-info">
        <HouseTitle className="house-title">{title}</HouseTitle>
        <div>Aluguel: R$ {rent}</div>
        <div>Condomínio: R$ {tax_hotel}</div>
        <div>IPTU: R$ {iptu}</div>
        <div>Tamanho {size} m²</div>
        <HousePrice className="house-price">
          Aluguel: R${rent + tax_hotel + iptu}
        </HousePrice>

        {/* <HouseDescription className="house-description">
          {description}
        </HouseDescription> */}
      </HouseDetails>
    </Card>
  );
};

export default HouseBox;
