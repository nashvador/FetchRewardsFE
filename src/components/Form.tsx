import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  SelectChangeEvent,
  InputLabel,
  MenuItem,
  FormControl,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

type states = {
  name: string;
  abbreviation: string;
};

interface occupationAndStateDataType {
  occupations: Array<string>;
  states: Array<states>;
}

const FormPage = () => {
  const [occupationAndStateData, setOccupationAndStateData] =
    useState<occupationAndStateDataType>({
      occupations: [""],
      states: [{ name: "", abbreviation: "" }],
    });
  const [occupationValue, setOccupationValue] = useState<string>("");
  const [stateValue, setStateValue] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const setAndGetData = async () => {
      const response = await axios.get(
        "https://frontend-take-home.fetchrewards.com/form"
      );
      setOccupationAndStateData(response.data);
      setLoading(false);
    };
    setAndGetData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const user = {
        username: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        occupation: occupationValue,
        state: data.get("state"),
      };
      console.log(user);
    } catch (err: any) {}
  };
  const handleChange = (event: SelectChangeEvent) => {
    setOccupationValue(event.target.value as string);
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <Box component="form" onSubmit={handleSubmit} maxWidth="sm">
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="occupation-select">Occupation</InputLabel>
        <Select
          labelId="occupation-select"
          id="frontend-occupation-select"
          value={occupationValue}
          label="Occupation"
          onChange={handleChange}
        >
          {occupationAndStateData.occupations.map((occupation: string) => {
            return <MenuItem value={occupation}>{occupation}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <Autocomplete
        disablePortal
        value={stateValue}
        onChange={(event: any, newValue: string | null) => {
          event.preventDefault();
          setStateValue(newValue);
        }}
        id="state"
        fullWidth
        options={occupationAndStateData.states.map(
          (state: states) => state.name
        )}
        sx={{ mt: 3, mb: 2 }}
        renderInput={(params) => <TextField {...params} label="State" />}
      />{" "}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit Form
      </Button>
    </Box>
  );
};
export default FormPage;
