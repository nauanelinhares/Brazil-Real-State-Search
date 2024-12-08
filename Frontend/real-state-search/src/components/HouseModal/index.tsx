import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import style, { TypographyStyled } from "./styles";
import { HouseBoxProps } from "../HouseBox/types";
import Grid from "@mui/material/Grid2";
import HomeIcon from "@mui/icons-material/Home";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ShowerIcon from "@mui/icons-material/Shower";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Carousel from "react-multi-carousel";
import { HouseImage } from "../HouseBox/styles";
export default function BasicModal({
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
}: HouseBoxProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size="small">
        Ver detalhes
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="house-modal-title"
        aria-describedby="house-modal-description"
      >
        <Box
          sx={{
            ...style,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            maxHeight: "80vh",
            gap: "16px",
          }}
        >
          <Typography id="house-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <div>
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
                  style={{ width: "100%", height: "300px" }}
                  key={index}
                  src={url}
                  alt={`${title} image ${index + 1}`}
                  className="house-image"
                />
              ))}
            </Carousel>
          </div>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid size={6}>
              <TypographyStyled>
                <HomeIcon />
                &nbsp; Aluguel R$ {rent}
              </TypographyStyled>
            </Grid>

            <Grid size={6}>
              <TypographyStyled>
                <ApartmentIcon />
                &nbsp; Condomínio R$ {tax_hotel}
              </TypographyStyled>
            </Grid>

            <Grid size={6}>
              <TypographyStyled>
                <MonetizationOnIcon /> &nbsp; R$ {iptu}
              </TypographyStyled>
            </Grid>

            <Grid size={6}>
              <TypographyStyled>
                <AspectRatioIcon /> &nbsp; Área {size} m²
              </TypographyStyled>
            </Grid>

            <Grid size={6}>
              <TypographyStyled>
                <AirlineSeatIndividualSuiteIcon /> &nbsp; {numberRooms} Quartos
              </TypographyStyled>
            </Grid>
            <Grid size={6}>
              <TypographyStyled>
                <ShowerIcon /> &nbsp; {numberBathrooms} Banheiros
              </TypographyStyled>
            </Grid>

            <Grid size={6}>
              <TypographyStyled>
                <DirectionsCarIcon /> &nbsp;{numberParkingSpaces} Vagas
              </TypographyStyled>
            </Grid>
          </Grid>
          <TypographyStyled>Bairro: {neighborhood}</TypographyStyled>
          <TypographyStyled>Empresa: {company}</TypographyStyled>
          <Typography
            style={{
              display: "flex",
              textAlign: "justify",
              backgroundColor: "rgba(0, 0, 0, 0.0)",
              boxShadow: "0 0 2px rgba(0, 0, 0, 0.5)",
              padding: "16px",
            }}
          >
            {description}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
