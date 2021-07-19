import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styled from "styled-components";
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
    //.
    width: 12,
    height: 12,
    boxShadow: "0px 1px 1.5px 0.5px #00a19b",
  },
  track: {
    border: `1px ${theme.palette.grey[500]}`,
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

const HumanSearchContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const HumanSearch = ({ update, humanSearch, searchFor, setSearchFor }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setSearchFor({ ...searchFor, human: searchFor.human ? false : true });
  };

  return (
    <Fragment>
      <SubTitle className={classes.subTitle}>Human Search:</SubTitle>
      <Typography component="div" className={classes.subTitle}>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>OFF</Grid>
          <Grid item>
            <AntSwitch
              checked={searchFor.human}
              onChange={handleChange}
              name="checkedC"
            />
          </Grid>
          <Grid item>ON</Grid>
        </Grid>
      </Typography>
      <HumanSearchContainer>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Pants Color</InputLabel>
          <Select
            className={classes.select}
            MenuProps={MenuProps}
            disabled={!searchFor.human}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={humanSearch.pantsColor}
            onChange={(event) => {
              update({ ...humanSearch, pantsColor: event.target.value });
            }}
          >
            <MenuItem value="any">Any</MenuItem>
            <MenuItem value="black">Black</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="brown">Brown</MenuItem>
            <MenuItem value="grey">Grey</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="orange">Orange</MenuItem>
            <MenuItem value="purple">Purple</MenuItem>
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="white">White</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Shirt Color</InputLabel>
          <Select
            className={classes.select}
            MenuProps={MenuProps}
            disabled={!searchFor.human}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={humanSearch.shirtColor}
            onChange={(event) => {
              update({ ...humanSearch, shirtColor: event.target.value });
            }}
          >
            <MenuItem value="any">Any</MenuItem>
            <MenuItem value="black">Black</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="brown">Brown</MenuItem>
            <MenuItem value="grey">Grey</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="orange">Orange</MenuItem>
            <MenuItem value="purple">Purple</MenuItem>
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="white">White</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
          </Select>
        </FormControl>

      </HumanSearchContainer>

    </Fragment>
  );
};

export default HumanSearch;
