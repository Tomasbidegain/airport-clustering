var ObjectId = require("mongodb").ObjectId;
const { client } = require("../mongo/index");

const getAllAirports = (req, res) => {
  const db = client.db(); // Obtenemos la instancia de la base de datos desde el objeto client
  db.collection("airport-data")
    .find()
    .toArray()
    .then((airports) => {
      res.status(200).json(airports);
    })
    .catch((error) => {
      console.error("Error al obtener los aeropuertos:", error);
      res.status(500).json({ error: "Error al obtener los aeropuertos" });
    });
};

const getAirport = (req, res) => {
  const {id} = req.body;

  const db = client.db(); // Obtenemos la instancia de la base de datos desde el objeto client
  db.collection("airport-data")
    .findOne({ _id: new ObjectId(id)})
    .then((airport) => {
      if (!airport) {
        res.status(404).json({ error: "Aeropuerto no encontrado" });
        return;
      }
      else res.json(airport);
    })
};

const createAirport = (req, res) => {
  const {
    name,
    city,
    iata_faa,
    icao,
    lat,
    lng,
    alt,
    tz
  } = req.body;

  const airport = {
    name,
    city,
    iata_faa,
    icao,
    lat,
    lng,
    alt,
    tz
  };

  console.log(airport)
  const db = client.db();

  db.collection("airport-data")
    .insertOne(airport)
    .then((result) => {
      res.status(200).json({msg: "Aeropuerto creado con éxito", data: result});
    })
    .catch((error) => {
      console.error("Error al crear el aeropuerto:", error);
      res.status(500).json({ msg: "Error al crear el aeropuerto", error: error });
    });
};

const deleteAirport = (req, res) => {
  const { id } = req.body;

  const db = client.db(); // Obtener la instancia de la base de datos desde el objeto client

  db.collection("airport-data")
    .findOne({ _id: new ObjectId(id)})
    .then((airport) => {
      if (!airport) {
        res.status(404).json({ error: "Aeropuerto no encontrado" });
        return;
      }

      db.collection("airport-data")
        .deleteOne({_id: new ObjectId(id) })
        .then(() => {
          res.status(200).json({ msg: "Aeropuerto eliminado correctamente" });
        })
        .catch((error) => {
          console.error("Error al actualizar el Aeropuerto:", error);
          res.status(500).json({ error: "Error al eliminar el Aeropuerto" });
        });
    })
    .catch((error) => {
      console.error("Error al obtener el Aeropuerto:", error);
      res.status(500).json({ error: "Error al obtener el Aeropuerto" });
    });
};

module.exports = {
  getAllAirports,
  getAirport,
  createAirport,
  deleteAirport
};
