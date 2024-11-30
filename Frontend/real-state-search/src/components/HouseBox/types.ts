interface HouseBoxProps {
  title: string;
  description: string;
  rent: number;
  tax_hotel: number;
  iptu: number;
  imageUrls: string[];
  size: number;
  numberRooms: number;
  numberBathrooms: number;
  numberParkingSpaces: number;
  neighborhood: string;
  company: string;
  created_at: string;
  url: string;
}

export type { HouseBoxProps };