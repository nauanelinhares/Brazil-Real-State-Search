interface HouseInfo {
    id: number;
    rent: number;
    tax_hotel: number;
    iptu: number;
    adress: string;
    neighborhood: string;
    company: string;
    size: number;
    number_rooms: number;
    number_bathrooms: number;
    number_parking_spaces: number;
    images: string[];
    description: string;
    created_at: string;
    updated_at: string;
    url: string;
}

interface Neighborhood {
    neighborhood: string;
    count?: number;
}

export type {HouseInfo, Neighborhood};

