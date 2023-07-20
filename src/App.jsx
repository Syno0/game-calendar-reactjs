import './App.css';
import { Calendar } from './components/';
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

function App() {
  return (
    <div className="App">
      <Grid container spacing={4}>
        Game Calendar
      </Grid>
      <Calendar/>
    </div>
  );
}

export default App;
