import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { MarkerClusterGroup } from "leaflet.markercluster";
import { Box } from "@mui/system";
import Form from "./Form";

const Map = () => {
  const [airports, setAirports] = useState([]);

  const fetchAirports = async () => {
    try {
      const response = await fetch("http://localhost:4000/getAllAirports");
      const result = await response.json();
      setAirports(result);
    } catch (error) {
      console.error("Error al obtener los aeropuertos:", error);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  useEffect(() => {
    const map = L.map("map").setView([36.3932, 25.4615], 10);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
  
    const markerColors = {
      America: "red",
      Europe: "blue",
      Asia: "green",
      Australia: "orange",
      Indian: "violet",
      Atlantic: "yellow",
      Pacific: "grey",
      Africa: "black",
      Antarctica: "lightblue",
    };

    const markerIcon = (color) => (
      L.icon({
        iconUrl: color === "black" ?  process.env.PUBLIC_URL + "/iconBlack.svg" :
        color === "blue" ?  process.env.PUBLIC_URL + "/iconBlue.svg" :
        color === "green" ?  process.env.PUBLIC_URL + "/iconGreen.svg" :
        color === "grey" ?  process.env.PUBLIC_URL + "/iconGrey.svg" :
        color === "lightblue" ?  process.env.PUBLIC_URL + "/iconLightBlue.svg" :
        color === "orange" ?  process.env.PUBLIC_URL + "/iconOrange.svg" :
        color === "red" ?  process.env.PUBLIC_URL + "/iconRed.svg" :
        color === "violet" ?  process.env.PUBLIC_URL + "/iconViolet.svg" :  process.env.PUBLIC_URL + "/iconYellow.svg",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })
    );
    
    const markerClusterGroup = L.markerClusterGroup();
  
    airports.forEach((airport) => {
      const marker = L.marker([airport.lat, airport.lng], { id: airport._id,
        icon: markerIcon(markerColors[airport.tz.split("/")[0]]),
      });
        
      marker.bindPopup(
        `<strong>${airport.name}</strong><br>
        City: ${airport.city}<br>
        IATA/FAA Code: ${airport.iata_faa}<br>
        ICAO Code: ${airport.icao}<br>
        Latitude: ${airport.lat}<br>
        Longitude: ${airport.lng}<br>
        Altitude: ${airport.alt}<br>
        TZ: ${airport.tz}<br>
        <button class="deleteBtn" data-id="${airport._id}">Eliminar aeropuerto</button>`
      );
  
      marker.on("popupopen", () => {
        const deleteButton = document.querySelector(`button[data-id="${airport._id}"]`);
        if (deleteButton) {
          deleteButton.addEventListener("click", () => {
            deleteAirport(airport._id, markerClusterGroup);
          });
        }
      });
  
      markerClusterGroup.addLayer(marker);
    });
  
    markerClusterGroup.addTo(map);
  
    return () => {
      map.remove();
    };
  }, [airports]);
  

  const deleteAirport = async (id, markerClusterGroup) => {
    try {
      const response = await fetch("http://localhost:4000/deleteAirport", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
  
      if (response.ok) {
        console.log("Eliminando aeropuerto con ID:", id);
  
        const markerToRemove = markerClusterGroup.getLayers().find((marker) => {
          const airportId = marker.options.id;
          return airportId === id;
        });
  
        if (markerToRemove) {
          markerClusterGroup.removeLayer(markerToRemove);
          console.log("Aeropuerto eliminado correctamente");
        } else {
          console.log("No se encontró el marcador del aeropuerto");
        }
      } else {
        console.error("Error al eliminar el aeropuerto:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <Box sx={{ display:"flex", justifyContent: "space-around", alignItems:"center", width:'100%', height:"100%"}}>
      <Box
        id="map"
        sx={{
          height: "500px",
          width: "60%",
          borderRadius: "10px",
        }}
      ></Box>
      <Form fetchAirport={fetchAirports}/>
    </Box>
  );
};

export default Map;
