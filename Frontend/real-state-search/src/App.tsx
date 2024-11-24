import { useEffect, useState } from "react";
import { HouseInfo, Neighborhood } from "./api/types";
import { getHouseById, getNeighborhoods, getHouses } from "./api/houses";
import HouseBox from "./components/HouseBox";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const App = () => {
  const [houses, setHouses] = useState<HouseInfo[]>();
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>();

  const fetchHouses = async (neighborhood: any) => {
    try {
      const response = getHouses(neighborhood);
      setHouses(await response);
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };

  const fetchNeighborhoods = async () => {
    try {
      const response = getNeighborhoods();
      return await response;
    } catch (error) {
      console.error("Error fetching neighborhoods:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNeighborhoods();
      setNeighborhoods(data);
    };
    fetchData();

    fetchHouses("");
  }, []);

  return (
    <div>
      <Grid>
        <h1>Casas</h1>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Bairro</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Bairro"
            onChange={(e) => fetchHouses(e.target.value as string)}
          >
            {neighborhoods &&
              neighborhoods.map((neighborhood) => (
                <MenuItem
                  key={neighborhood.neighborhood}
                  value={neighborhood.neighborhood}
                >
                  {neighborhood.neighborhood} ({neighborhood.count})
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        container
        rowSpacing={3}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {houses ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {houses.map((house) => (
              <HouseBox
                key={house.id}
                title={house.adress}
                description={house.description}
                rent={house.rent}
                tax_hotel={house.tax_hotel}
                iptu={house.iptu}
                imageUrls={house.images}
                size={house.size}
              />
            ))}
          </Grid>
        ) : (
          <p>Loading...</p>
        )}
        <Pagination count={100} variant="outlined" shape="rounded" />
      </Grid>
    </div>
  );
};

export default App;
