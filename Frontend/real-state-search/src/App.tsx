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
  Autocomplete,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import BasicDatePicker from "./components/DatePicker";

const App = () => {
  const [houses, setHouses] = useState<HouseInfo[]>();
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>();
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<Neighborhood>({
      neighborhood: "",
    });
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const fetchHouses = async (neighborhood?: any) => {
    try {
      setSelectedNeighborhood({
        neighborhood: neighborhood.neighborhood,
        count: neighborhood.count,
      });
      const response = getHouses(
        neighborhood.neighborhood,
        neighborhood.count,
        undefined,
        selectedDate
      );
      setHouses(await response);
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };

  const fetchNeighborhoods = async () => {
    try {
      const response = getNeighborhoods(selectedDate);
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
    fetchHouses(selectedNeighborhood);
  }, [selectedDate]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h1>Casas</h1>
      <Grid
        columns={2}
        style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
      >
        <FormControl fullWidth style={{ maxWidth: 450, gap: "1rem" }}>
          <Autocomplete
            options={neighborhoods || []}
            getOptionLabel={(option) =>
              `${option.neighborhood} (${option.count})`
            }
            onChange={(_, value) => {
              if (value) {
                fetchHouses(value);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Bairro" variant="outlined" />
            )}
          />
          <BasicDatePicker onChange={setSelectedDate} title="A partir de" />
        </FormControl>

        <Grid
          container
          rowSpacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {houses ? (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {houses
                .slice(12 * (selectedPage - 1), 12 * selectedPage)
                .map((house) => (
                  <HouseBox
                    key={house.id}
                    title={house.adress}
                    description={house.description}
                    rent={house.rent}
                    tax_hotel={house.tax_hotel}
                    iptu={house.iptu}
                    imageUrls={house.images}
                    size={house.size}
                    created_at={house.created_at}
                    url={house.url}
                  />
                ))}
            </Grid>
          ) : (
            <p>Loading...</p>
          )}
          <Pagination
            count={Math.ceil(houses ? houses.length / 10 : 1)}
            variant="outlined"
            shape="rounded"
            style={{ display: "flex", justifyContent: "center" }}
            onChange={(_, page) => {
              setSelectedPage(page);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
