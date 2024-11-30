import { useEffect, useState } from "react";
import { HouseInfo, Neighborhood, HouseFilter } from "./api/types";
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
  Input,
  Button,
  Card,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
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
  const [houseFilter, setHouseFilter] = useState<HouseFilter>();
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const fetchHouses = async () => {
    try {
      const response = getHouses(
        selectedNeighborhood.neighborhood,
        selectedNeighborhood.count,
        houseFilter?.createdAt,
        houseFilter?.company,
        houseFilter?.size,
        houseFilter?.numberRooms,
        houseFilter?.numberBathrooms,
        houseFilter?.numberParkingSpaces,
        houseFilter?.minRent,
        houseFilter?.maxRent
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
    updateFieldHouseFilter("createdAt", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    fetchHouses();
  }, []);

  const updateHouseFilter = () => {
    fetchHouses();
  };

  const updateFieldHouseFilter = (field: string, value: any) => {
    setHouseFilter({
      ...houseFilter,
      [field]: value,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div
        style={{
          textAlign: "center",
          color: "#ffffff",
          backgroundColor: "gray",
        }}
      >
        <h1>Real state search to rent</h1>
      </div>
      <Grid
        columns={2}
        style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
      >
        <FormControl fullWidth style={{ maxWidth: 450, gap: "1rem" }}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
            }}
          >
            <Autocomplete
              options={neighborhoods || []}
              getOptionLabel={(option) =>
                `${option.neighborhood} (${option.count})`
              }
              onChange={(_, value) => {
                setSelectedNeighborhood({
                  neighborhood: value?.neighborhood ? value.neighborhood : "",
                  count: value?.count,
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Bairro" variant="outlined" />
              )}
            />
            <BasicDatePicker onChange={setSelectedDate} title="A partir de" />
            <Input
              onChange={(e) => updateFieldHouseFilter("size", e.target.value)}
              placeholder="Tamanho mínimo"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
              }}
            >
              <Input
                onChange={(e) =>
                  updateFieldHouseFilter("minRent", e.target.value)
                }
                placeholder="Aluguel mínimo"
              />
              <Input
                onChange={(e) =>
                  updateFieldHouseFilter("maxRent", e.target.value)
                }
                placeholder="Aluguel máximo"
              />
            </div>
            <div>
              <FormLabel id="demo-radio-buttons-group-label">
                Número de quartos
              </FormLabel>
              <RadioGroup row name="use-radio-group" defaultValue="first">
                <FormControlLabel value="1" label="1" control={<Radio />} />
                <FormControlLabel value="2" label="2" control={<Radio />} />
                <FormControlLabel value="3" label="3" control={<Radio />} />
                <FormControlLabel value="4+" label="4+" control={<Radio />} />
              </RadioGroup>
            </div>
            <div>
              <FormLabel id="demo-radio-buttons-group-label">
                Número de vagas de garagem
              </FormLabel>
              <RadioGroup row name="use-radio-group" defaultValue="first">
                <FormControlLabel value="1" label="1" control={<Radio />} />
                <FormControlLabel value="2" label="2" control={<Radio />} />
                <FormControlLabel value="3" label="3" control={<Radio />} />
                <FormControlLabel value="4+" label="4+" control={<Radio />} />
              </RadioGroup>
            </div>
            <Button
              variant="contained"
              onClick={updateHouseFilter}
              style={{ backgroundColor: "#f9b342" }}
            >
              Atualizar Resultados
            </Button>
          </Card>
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
