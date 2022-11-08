import FormPage from "./components/Form";
import { Grid } from "@mui/material";

function App() {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <FormPage />
    </Grid>
  );
}

export default App;
