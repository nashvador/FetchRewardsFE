import { useState, useEffect, SyntheticEvent, ChangeEventHandler, ChangeEvent } from "react";
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
  Alert
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
  // This is the state for the API call
  const [occupationAndStateData, setOccupationAndStateData] =
    useState<occupationAndStateDataType>({
      occupations: [""],
      states: [{ name: "", abbreviation: "" }],
    });

  // These are the states for the form info
  const [nameValue, setNameValue] = useState<string | null>(null)
  const [emailValue, setEmailValue] = useState<string | null>(null)
  const [passwordValue, setPasswordValue] = useState<string | null>(null)
  const [occupationValue, setOccupationValue] = useState<string>("");
  const [stateValue, setStateValue] = useState<string | null>("");

  // These are the message and loading component states
  const [loading, setLoading] = useState<boolean>(true);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

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
      const submitFormInformation = await axios.post(
        `https://frontend-take-home.fetchrewards.com/form`,
        {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
          occupation: occupationValue,
          state: stateValue,
        }
      );
      if (submitFormInformation.status === 201) {
        setSubmitMessage("Successful Submission!")
        setTimeout(() => {
          setSubmitMessage(null);
        }, 3000);
        setNameValue("")
        setEmailValue("")
        setPasswordValue("")
        setOccupationValue("")
        setStateValue("")
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <Box component="form" onSubmit={handleSubmit} maxWidth="sm">
      {submitMessage ? <Alert severity="success">{submitMessage}</Alert> : 
      "" }
      <TextField
        margin="normal"
        value={nameValue}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setNameValue(event.target.value as string)}
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
        value={emailValue}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setEmailValue(event.target.value as string)}
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
        value={passwordValue}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setPasswordValue(event.target.value as string)}
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControl fullWidth sx={{ mt: 2, mb:1  }}>
        <InputLabel id="occupation-select">Occupation</InputLabel>
        <Select
          labelId="occupation-select"
          id="frontend-occupation-select"
          value={occupationValue}
          label="Occupation"
          onChange={(event: SelectChangeEvent) => {
            setOccupationValue(event.target.value as string);
          }}
          required
        >
          {occupationAndStateData.occupations.map(
            (occupation: string, key: number) => {
              return (
                <MenuItem key={key} value={occupation}>
                  {occupation}
                </MenuItem>
              );
            }
          )}
        </Select>
      </FormControl>
      <Autocomplete
        disablePortal
        value={stateValue}
        onChange={(event: SyntheticEvent, newValue: string | null) => {
          event.preventDefault();
          setStateValue(newValue);
        }}
        id="state"
        fullWidth
        options={occupationAndStateData.states.map(
          (state: states) => state.name
        )}
        sx={{ mt: 2, mb: 1}}
        
        renderInput={(params) => <TextField required  {...params} label="State" />}
      />{" "}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1}}>
        Submit Form
      </Button>
    </Box>
  );
};
export default FormPage;
