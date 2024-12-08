import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMapEvents } from "react-leaflet/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";

const GOOGLE_API_KEY = "AIzaSyCqLa-99b9kiQUH6pMu8mUSo36peQ9o_T4";

async function geocodeAddress(address: string) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_API_KEY}`
  );
  const data = await response.json();
  if (data.status === "OK" && data.results.length > 0) {
    const location = data.results[0].geometry.location;
    return {
      lat: location.lat,
      lon: location.lng,
    };
  }
  throw new Error(`Endereço não encontrado: ${address}`);
}

function LocationMarker({
  number,
  address,
}: {
  number?: number;
  address?: string;
}) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useEffect(() => {
    geocodeAddress(address || "")
      .then((data) => {
        const latLng = new L.LatLng(data.lat, data.lon);
        setPosition(latLng);
      })
      .catch((error) => console.error("Erro ao geocodificar endereço:", error));
  }, [address]);

  return position === null ? null : (
    <Marker
      icon={
        new L.DivIcon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
          className: "custom-div-icon",
          html: `<div class="custom-div-icon">${number}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        })
      }
      position={position}
    >
      <Popup>{address}</Popup>
    </Marker>
  );
}

export default function Map({
  numbers,
  addresses,
}: {
  numbers?: number[];
  addresses?: string[];
}) {
  console.log({ numbers, addresses });
  return (
    <MapContainer
      center={{ lat: -23.2, lng: -45.87 }}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {numbers &&
        addresses &&
        numbers.map((number: number, index: number) => (
          <LocationMarker
            key={index}
            number={number}
            address={addresses[index] + " São José dos Campos"}
          />
        ))}
    </MapContainer>
  );
}
