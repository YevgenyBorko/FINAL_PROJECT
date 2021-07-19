import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { SubTitle } from "../../../../common/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: "black",
      "& + $track": {
        opacity: 1,
        backgroundColor: "#00a19b",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "0px 1px 1.5px 0.5px #00a19b",
  },
  track: {
    border: `1px  ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "0 18px 0 18px",
    minWidth: 120,
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

const CarSearchContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const CarSearch = ({ update, carSearch, searchFor, setSearchFor }) => {
  const classes = useStyles();
  const handleChange = (event) => {
    setSearchFor({ ...searchFor, cars: searchFor.cars ? false : true });
  };

  return (
    <div>
      <SubTitle className={classes.subTitle}>Vehicle Search:</SubTitle>
      <Typography component="div" className={classes.subTitle}>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>OFF</Grid>
          <Grid item>
            <AntSwitch
              checked={searchFor.cars}
              onChange={handleChange}
              name="checkedC"
            />
          </Grid>
          <Grid item>ON</Grid>
        </Grid>
      </Typography>

      <CarSearchContainer>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label" >Manufacture</InputLabel>
          <Select
            className={classes.select}
            disabled={!searchFor.cars}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carSearch.manufacturer}
            MenuProps={MenuProps}
            onChange={(event) => {
              update({ ...carSearch, manufacturer: event.target.value });
            }}
          >
            <MenuItem value="any">Any</MenuItem>
            <MenuItem value="acura">Acura</MenuItem>
            <MenuItem value="audi">Audi</MenuItem>
            <MenuItem value="bmw">BMW</MenuItem>
            <MenuItem value="chevrolet">Chevrolet</MenuItem>
            <MenuItem value="chrysler">Chrysler</MenuItem>
            <MenuItem value="dodge">Dodge</MenuItem>
            <MenuItem value="ford">Ford</MenuItem>
            <MenuItem value="gmc">GMC</MenuItem>
            <MenuItem value="honda">Honda</MenuItem>
            <MenuItem value="hyundai">Hyundai</MenuItem>
            <MenuItem value="infinity">Infinity</MenuItem>
            <MenuItem value="jeep">Jeep</MenuItem>
            <MenuItem value="kia">Kia</MenuItem>
            <MenuItem value="lexus">Lexus</MenuItem>
            <MenuItem value="mazda">Mazda</MenuItem>
            <MenuItem value="mercedes">Mercedes</MenuItem>
            <MenuItem value="nissan">Nissan</MenuItem>
            <MenuItem value="subaru">Subaru</MenuItem>
            <MenuItem value="toyota">Toyota</MenuItem>
            <MenuItem value="volkswagen">Volkswagen</MenuItem>

          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Color</InputLabel>
          <Select
            className={classes.select}
            MenuProps={MenuProps}
            disabled={!searchFor.cars}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carSearch.color}
            onChange={(event) => {
              update({ ...carSearch, color: event.target.value });
            }}
          >
            <MenuItem value="any">Any</MenuItem>
            <MenuItem value="black">Black</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="Brown">Brown</MenuItem>
            <MenuItem value="gold">Gold</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="grey">Grey</MenuItem>
            <MenuItem value="maroon">Maroon</MenuItem>
            <MenuItem value="orange">Orange</MenuItem>
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="silver">Silver</MenuItem>
            <MenuItem value="white">White</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>

          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            className={classes.select}
            MenuProps={MenuProps}
            disabled={!searchFor.cars}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={carSearch.carType}
            onChange={(event) => {
              update({ ...carSearch, carType: event.target.value });
            }}
          >
            <MenuItem value="any">Any</MenuItem>
            <MenuItem value="suv">SUV</MenuItem>
            <MenuItem value="truck">Truck</MenuItem>
            <MenuItem value="sedan">Sedan</MenuItem>
            <MenuItem value="largevihecle">Large vihecle</MenuItem>
            <MenuItem value="cupe">Cupe</MenuItem>
          </Select>
        </FormControl>


      </CarSearchContainer>
    </div>
  );
};

export default CarSearch;
