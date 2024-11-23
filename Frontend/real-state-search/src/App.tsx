import React, { useEffect, useState } from "react";
import { HouseInfo } from "./api/types"; // Import the House type
import { getHouseById } from "./api/houses";
import HouseBox from "./components/HouseBox";

const App = () => {
  const [house, setHouse] = useState<HouseInfo>();
  const [houseId, setHouseId] = useState<string>("2756055244");

  const changeHouseId = (id: string) => {
    setHouseId(id);
  };

  const fetchHouse = async (id: string) => {
    try {
      const response = getHouseById(id);
      setHouse(await response);
      console.log(house?.description);
    } catch (error) {
      console.error("Error fetching house:", error);
    }
  };

  useEffect(() => {
    fetchHouse(houseId);
  }, [houseId]);

  return (
    <div>
      <h1>House Details</h1>

      <input
        type="text"
        placeholder="Enter house ID"
        style={{ margin: "10px 0px" }}
        onChange={(e) => changeHouseId(e.target.value)}
      />

      {house ? (
        <div>
          <HouseBox
            title={house.adress}
            description={house.description}
            rent={house.rent}
            tax_hotel={house.tax_hotel}
            iptu={house.iptu}
            imageUrls={house.images}
            size={house.size}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
