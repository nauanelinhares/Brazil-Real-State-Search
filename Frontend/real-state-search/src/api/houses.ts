import { HouseInfo, Neighborhood } from "./types";

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


async function getHouses(neighborhood: string) {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/houses?neighborhood=${neighborhood}`);
    console.log(response.status);
    if (!response.ok) {
        throw new Error(`Error fetching house with id ${neighborhood}: ${response.statusText}`);
    }
    const houses = await response.json();
    const housesTyped: HouseInfo[] = houses as HouseInfo[];
    return housesTyped;
}


async function getNeighborhoods() {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/house/neighborhoods`);
    console.log(response.status);
    if (!response.ok) {
        throw new Error(`Error fetching neighborhoods: ${response.statusText}`);
    }
    const neighborhoods = await response.json();
    const neighborhoodsTyped: Neighborhood[] = neighborhoods as Neighborhood[];
    return neighborhoodsTyped;

}

export { getHouseById, getNeighborhoods, getHouses };