"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot, Root } from "react-dom/client";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  MapCameraChangedEvent,
  Pin,
} from "@vis.gl/react-google-maps";

type Poi = { key: string; location: google.maps.LatLngLiteral };
const initialLocations: Poi[] = [];

interface MapsProps {
  latitude: number;
  longitude: number;
  onMarkerClick: (lat: number, lng: number) => void;
  onCameraChange: (lat: number, lng: number) => void;
}

const Maps: React.FC<MapsProps> = ({
  latitude,
  longitude,
  onMarkerClick,
  onCameraChange,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<Root | null>(null);
  const [locations, setLocations] = useState(initialLocations);
  const [
    markerPosition,
    setMarkerPosition,
  ] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !rootRef.current) {
      rootRef.current = createRoot(mapContainerRef.current);
      rootRef.current.render(
        <MapsComponent
          latitude={latitude}
          longitude={longitude}
          locations={locations}
          onMarkerClick={onMarkerClick}
          onCameraChange={onCameraChange}
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
        />
      );
    }
  }, [latitude, longitude, locations, markerPosition]);

  const handleNewLocation = (lat: number, lng: number) => {
    setLocations([
      ...locations,
      { key: `new-location-${locations.length}`, location: { lat, lng } },
    ]);
  };

  return (
    <div
      ref={mapContainerRef}
      id="map"
      style={{ height: "100vh", width: "100%" }}
    />
  );
};

const PoiMarkers: React.FC<{ pois: Poi[]; map: google.maps.Map | null }> = ({
  pois,
  map,
}) => {
  const handleClick = useCallback(
    (ev: google.maps.MapMouseEvent) => {
      if (!map) return;
      if (!ev.latLng) return;
      console.log("Marker clicked:", ev.latLng.toString());
      map.panTo(ev.latLng);
    },
    [map]
  );

  return (
    <>
      {pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={handleClick}
        >
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

interface MapsComponentProps {
  latitude: number;
  longitude: number;
  locations: Poi[];
  onMarkerClick: (lat: number, lng: number) => void;
  onCameraChange: (lat: number, lng: number) => void;
  markerPosition: google.maps.LatLngLiteral | null;
  setMarkerPosition: (position: google.maps.LatLngLiteral | null) => void;
}

const MapsComponent: React.FC<MapsComponentProps> = ({
  latitude,
  longitude,
  locations,
  onMarkerClick,
  onCameraChange,
  markerPosition,
  setMarkerPosition,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  return (
    <APIProvider
      apiKey={"AIzaSyBRoFvJPRY_5ochzxh-L9OG6JELJuAlyis"} // Reemplaza con tu propia API key
    >
      <Map
        mapId="a1ad806cecbfeee1"
        defaultZoom={15}
        defaultCenter={{ lat: latitude, lng: longitude }}
        onCameraChanged={(ev: MapCameraChangedEvent) => {
          const { lat, lng } = ev.detail.center;
          onCameraChange(lat, lng);
        }}
      >
        <PoiMarkers pois={locations} map={mapRef.current} />
        {markerPosition && (
          <AdvancedMarker position={markerPosition}>
            <Pin
              background={"#FBBC04"}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
        )}
        <AdvancedMarker
          position={{ lat: latitude, lng: longitude }}
          onClick={() => onMarkerClick(latitude, longitude)}
        >
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
};

export default Maps;
