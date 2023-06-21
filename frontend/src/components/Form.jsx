import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  Grid,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

const Form = ({ fetchAirport }) => {
  const [newAirport, setNewAirport] = useState({
    name: "",
    city: "",
    iata_faa: "",
    icao: "",
    lat: 0,
    lng: 0,
    alt: 0,
    tz: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setNewAirport({
      ...newAirport,
      [e.target.name]: e.target.value,
    });
  };

  const addAirport = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/createAirport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAirport),
      });
      if (response.ok) {
        setNewAirport({
          name: "",
          city: "",
          iata_faa: "",
          icao: "",
          lat: 0,
          lng: 0,
          alt: 0,
          tz: "",
        });
        setLoading(false);
        fetchAirport();
        console.log("aeropuerto creado con éxito");
      } else {
        console.error("Error al crear el aeropuerto:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <Card sx={{ width: "32%", height: "500px" }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "center", color: "#333" }}
            >
              Nuevo aeropuerto
            </Typography>
          </Grid>
          <Grid sm={6} item>
            <TextField
              name="name"
              label="Name"
              value={newAirport.name}
              onChange={handleInputChange}
              sx={{ marginRight: "10px", width: "100%" }}
            />
          </Grid>
          <Grid sm={6} item>
            <TextField
              name="city"
              label="City"
              value={newAirport.city}
              onChange={handleInputChange}
              sx={{ marginRight: "10px", width: "100%" }}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              name="iata_faa"
              label="IATA/FAA Code"
              value={newAirport.iata_faa}
              onChange={handleInputChange}
              sx={{ marginRight: "10px", width: "100%" }}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              name="lat"
              label="Latitud"
              value={newAirport.lat}
              onChange={handleInputChange}
              sx={{ marginRight: "10px", width: "100%" }}
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              name="lng"
              label="Longitud"
              value={newAirport.lng}
              onChange={handleInputChange}
              sx={{ marginRight: "10px", width: "100%" }}
            />
          </Grid>
          <Grid sm={12} item>
            <TextField
              name="alt"
              label="ALT"
              value={newAirport.alt}
              onChange={handleInputChange}
              sx={{ marginRight: "10px", width: "100%" }}
            />
          </Grid>
          <Grid sm={12} item>
            <TextField
              name="tz"
              label="TZ"
              value={newAirport.tz}
              onChange={handleInputChange}
              sx={{ marginRight: "10px", width: "100%" }}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              name="icao"
              label="ICAO Code"
              value={newAirport.icao}
              onChange={handleInputChange}
              sx={{ marginRight: "10px", width: "100%" }}
            />
          </Grid>

          <Grid item sm={12}>
            <Button
              variant="contained"
              onClick={addAirport}
              sx={{ width: "100%" }}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : (
                "Agregar Aeropuerto"
              )}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Form;
