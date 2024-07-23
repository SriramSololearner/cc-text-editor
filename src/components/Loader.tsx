import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface IState {
  obj: {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
  }[];
}

const Loader = () => {
  const [age, setAge] = React.useState("");
  const [list, setList] = useState<IState["obj"]>([]);
  const [loader, setLoader] = useState(true);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);

    switch (event.target.value) {
      case "Newest": {
        getData();
        break;
      }
      case "priceLow": {
        setList(
          [...list].sort(function (one, two) {
            return one.price - two.price;
          })
        );
        break;
      }
      case "priceHigh": {
        setList(
          [...list].sort(function (one, two) {
            return two.price - one.price;
          })
        );
        break;
      }
      case "a-z": {
        setList(
          [...list].sort(function (one, two) {
            return one.title.localeCompare(two.title);
          })
        );
        break;
      }
      case "z-a": {
        setList(
          [...list].sort(function (one, two) {
            return two.title.localeCompare(one.title);
          })
        );
        break;
      }
      default: {
        getData();
        break;
      }
    }
  };

  const getData = async () => {
    setLoader(true);
    await fetch("https://dummyjson.com/products")
      .then((resovle) => resovle.json())
      .then((json) => {
        setLoader(false);
        setList(json.products);
      })
      .catch((error) => setLoader(true));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box data-testid="home" width={"100%"} height={"100vh"}>
      {loader ? (
        <Box
          //   sx={homeSx.loader}
          data-testid="loader"
        >
          <Box
            component={"img"}
            src="https://i.gifer.com/ZKZg.gif"
            width={"10%"}
          />
        </Box>
      ) : (
        <Stack width={"100%"} direction={"row"} justifyContent={"center"}>
          <FormControl>
            <Select
              data-testid="select-field"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="">Sort by</MenuItem>
              <MenuItem value={"Newest"} data-testid="select-option">
                Newest
              </MenuItem>
              <MenuItem value={"priceLow"}>Price(Low-high)</MenuItem>
              <MenuItem value={"priceHigh"}>Price(high-Low)</MenuItem>
              <MenuItem value={"a-z"}>Name(A-Z)</MenuItem>
              <MenuItem value={"z-a"}>Name(Z-A)</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}
    </Box>
  );
};

export default Loader;
