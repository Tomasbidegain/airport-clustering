import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Map from './components/Maps';

function App() {
  return (
    <Box className="App" sx={{ bgcolor: "#1e1e1e", display:"flex", flexDirection:'column', justifyContent:"center", alignItems:'center', width:"100%", height:'100vh' }}>
      <Typography variant="h1" sx={{color:"#fff", fontSize:"28px", fontWeight:"bold", padding:"20px"}}>Mapa de aeropuertos</Typography>
      <Map />
    </Box>
  );
}

export default App;
