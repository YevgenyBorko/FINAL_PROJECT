import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components"; //lalala
import moment from "moment";
import { SubTitle } from "../../../../../common/styles";

const DateSearchContainer = styled.div`
  display: flex;
  stroke-width: 30px;
  align-items: center;
  margin: 16px 8px;
`;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "end",
  },

  textField: {
    marginLeft: theme.spacing(1),
    width: 250,
    "& .MuiInputBase-input": {
      color: "white",
      backgroundColor: "#383a3a75",
      borderRadius: "10px",
      paddingLeft:"10px"
    },

    "& .MuiSvgIcon-root": {
      color: "white",
    },

    "& .MuiInput-underline": {
      "&:after": { borderBottom: "2px solid #00a69a" },

      "&:before": {
        borderBottomColor: "white",
      },
    },
  },

  subTitle: {
    marginBottom: "15px",
    marginTop: "10px",
    paddingLeft: "10px",
  },
}));

const Dates = ({ update, dateSearch }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <SubTitle className={classes.subTitle}>Dates:</SubTitle>
      <DateSearchContainer>
        <form className={classes.container} style={{ margin: 0 }} noValidate>
          <TextField
            id="datetime-local"
            label="From"
            type="datetime-local"
            value={moment(dateSearch.startDate, "YYYY-MM-DDThh:mm:ss A").format(
              "YYYY-MM-DDTHH:mm:ss"
            )}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              const date = moment(event.target.value).format(
                "YYYY-MM-DDThh:mm:ss A"
              );
              update({ ...dateSearch, startDate: date });
            }}
          />
        </form>
        <form className={classes.container} noValidate>
          <TextField
            id="datetime-local2"
            label="To"
            value={moment(dateSearch.endDate, "YYYY-MM-DDThh:mm:ss A").format(
              "YYYY-MM-DDTHH:mm:ss"
            )}
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              const date = moment(event.target.value).format(
                "YYYY-MM-DDThh:mm:ss A"
              );
              update({ ...dateSearch, endDate: date });
            }}
          />
        </form>
      </DateSearchContainer>
    </Fragment>
  );
};

export default Dates;
