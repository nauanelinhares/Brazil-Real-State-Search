import {
  HouseDescription,
  HouseDetails,
  HouseImage,
  HousePrice,
  HouseTitleLink,
  TextField,
} from "./styles";
import Card from "@mui/material/Card";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { HouseBoxProps } from "./types";
import { formatDate } from "../../utils/format-date";

import BasicModal from "../HouseModal";

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
  numberRooms,
  numberBathrooms,
  numberParkingSpaces,
  neighborhood,
  company,
  created_at,
  url,
}: HouseBoxProps) => {
  return (
    <Card
      className="house-box0"
      style={{
        width: "250px",
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
      <HouseDetails
        className="house-info"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <HouseTitleLink className="house-title" href={url} underline="none">
          {title}
        </HouseTitleLink>
        <TextField>Aluguel: R$ {rent}</TextField>
        <TextField>Condomínio: R$ {tax_hotel}</TextField>
        <TextField>IPTU: R$ {iptu}</TextField>
        <TextField>Tamanho {size} m²</TextField>
        <TextField>Lançado: {formatDate(created_at)}</TextField>
        <HousePrice className="house-price">
          Total: R${rent + tax_hotel + iptu}
        </HousePrice>
        <div>
          <BasicModal
            title={title}
            description={description}
            rent={rent}
            tax_hotel={tax_hotel}
            iptu={iptu}
            imageUrls={imageUrls}
            size={size}
            numberRooms={numberRooms}
            numberBathrooms={numberBathrooms}
            numberParkingSpaces={numberParkingSpaces}
            neighborhood={neighborhood}
            company={company}
            created_at={created_at}
            url={url}
          />
        </div>
      </HouseDetails>
    </Card>
  );
};

export default HouseBox;
