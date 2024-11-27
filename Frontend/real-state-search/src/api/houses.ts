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


async function getHouses(
    neighborhood?: string,
    limit: number = 100000,
    createdAt?: string,
    company?: string,
    size?: number,
    numberRooms?: number,
    numberBathrooms?: number,
    numberParkingSpaces?: number,
    minRent?: number,
    maxRent?: number,

) {
    let url = `http://127.0.0.1:8000/api/v1/houses?limit=${limit}`;
    if (neighborhood) url += `&neighborhood=${neighborhood}`;
    if (createdAt) url += `&created_at=${createdAt}`;
    if (company) url += `&company=${company}`;
    if (size) url += `&size=${size}`;
    if (numberRooms) url += `&number_rooms=${numberRooms}`;
    if (numberBathrooms) url += `&number_bathrooms=${numberBathrooms}`;
    if (numberParkingSpaces) url += `&number_parking_spaces=${numberParkingSpaces}`;
    if (minRent) url += `&min_rent=${minRent}`;
    if (maxRent) url += `&max_rent=${maxRent}`;

    const response = await fetch(url);
    console.log(response.status);
    if (!response.ok) {
        throw new Error(`Error fetching houses: ${response.statusText}`);
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