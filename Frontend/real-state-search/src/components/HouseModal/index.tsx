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
            overflow: "auto",
            maxHeight: "80vh",
          }}
        >
          <Typography id="house-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
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
              boxShadow: "0 0 1px rgba(0, 0, 0, 0.15)",
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
