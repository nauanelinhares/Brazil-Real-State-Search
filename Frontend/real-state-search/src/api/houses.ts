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


async function getHouses(neighborhood: string, limit: number = 12, offset: number = 0, createdAt?: string) {
    let url = `http://127.0.0.1:8000/api/v1/houses?neighborhood=${neighborhood}&limit=${limit}&offset=${offset}`;
    if (createdAt) {
        url += `&created_at=${createdAt}`;
    }
    const response = await fetch(url);
    console.log(response.status);
    if (!response.ok) {
        throw new Error(`Error fetching houses in neighborhood ${neighborhood}: ${response.statusText}`);
    }
    const houses = await response.json();
    const housesTyped: HouseInfo[] = houses as HouseInfo[];
    return housesTyped;
}


async function getNeighborhoods(createdAt?: string) {
    let url = `http://127.0.0.1:8000/api/v1/house/neighborhoods?`
    if (createdAt) {
        url += `created_at=${createdAt}`;
        console.log(createdAt)
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching neighborhoods: ${response.statusText}`);
    }
    const neighborhoods = await response.json();
    const neighborhoodsTyped: Neighborhood[] = neighborhoods as Neighborhood[];
    return neighborhoodsTyped;

}

export { getHouseById, getNeighborhoods, getHouses };