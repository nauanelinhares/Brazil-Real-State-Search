import { HouseInfo } from "./types";

async function getHouseById(id: string) {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/house/id/${id}/`);
    console.log(response.status);
    if (!response.ok) {
        throw new Error(`Error fetching house with id ${id}: ${response.statusText}`);
    }
    const house = await response.json();
    const houseTyped: HouseInfo = house as HouseInfo;
    return houseTyped;
}

export { getHouseById };