import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";
import { SubTitle } from "../../../common/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiCheckbox: {
      colorSecondary: {
        color: "#00a19b",
        "&$checked": {
          color: "#00a19b",
        },
      },
    },
  },
  
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },

  select: {
    "&:after": {
      borderBottomColor: "#00a19b",
    },
    "&:before": {
      borderBottomColor: "white",
    },
    "& .MuiSvgIcon-root": {
      color: "white",
    },
    "& .MuiInputBase-input":{
      color:'white'
    }
  },


  subTitle: {
    marginBottom: "15px",
    marginTop: '10px',
    paddingLeft: '10px'
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CamerasContainer = styled.div`
  display: flex;
  margin: 0 18px 16px 18px;
  
`;

const Cameras = ({
  cameras,
  setCameras,
  setSelectedCameras,
  selectedCameras,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setSelectedCameras(event.target.value);
  };


  useEffect(() => {
    getCameras();
  }, []);

  const getCameras = () => {
    axios
      .get("http://localhost:3000/getCameras")
      .then((response) => {
        if(cameras.length === 0){
          setCameras(response.data);
        }    
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <SubTitle className={classes.subTitle}>Cameras selection: </SubTitle>
      <MuiThemeProvider theme={theme}>
        <CamerasContainer>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Cameras</InputLabel>
            <Select
              className={classes.select}
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={selectedCameras}
              onChange={handleChange}
              // input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {cameras.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    className={classes.root}
                    checked={selectedCameras.indexOf(name) > -1}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CamerasContainer>
      </MuiThemeProvider>
    </Fragment>
  );
};

export default Cameras;
