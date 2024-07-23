import "./App.css";
import { Box } from "@mui/material";
import TextEditor from "./components/TextEditor";
import Loader from "./components/Loader";

function App() {
  return (
    <Box className="App">
      <TextEditor />
    </Box>
  );
}

export default App;
