import React from "react";
import CarSearch from "../SearchTypes/CarSearch/CarSearch";
import HumanSearch from "../SearchTypes/HumanSearch/HumanSearch";
import Dates from "./FormsTypes/Date/Date";
import Cameras from "../Cameras/Cameras";
import axios from "axios";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import moment from "moment";

const FormContainer = styled.div`
  border-radius: 16px;
  height: 500px;
  box-shadow: 0 0 2rem 0 #00a19b;
  padding: 4em;
  min-width: 650px; 
  width: 65%;
  margin: 1em auto;
  background-color: #283131;
  color: white;
  display: table;
  
  button {
    background-color: #00a19b;
    margin: 0;

    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    &:hover {
      background-color: #32b1ac;
    }
  }

  h1 {
    color: #00a19b;
    text-align: center;
    -webkit-text-stroke: 1px #f8f8f8;
    text-shadow: 0px 1px 4px #00a19b;
    font-size: 45px;

    /* text-shadow: 0px 1px 4px #23430C; */
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #00a19b;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .MuiFormLabel-root {
    color: rgb(0 166 154);
    padding: 0;
    font-size: 1rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em;
}
`;

const SearchBlock = styled.div`
  margin-bottom: 50px;
  border-style: inset;
  border-color: #029f9b;
  border-radius: 16px;
    justify-content: space-between;
    background-color: #081b19;
`;

const AllSearchBlocks = styled.div`

  display: flex;
  justify-content: space-between;
`;

const LeftWing = styled.div`

display: block;
display: inline-block;
`;

const RightWing = styled.div`

display: inline-block;

`;

const ButtonsSection = styled.div`

display: flex;
flex-direction: column;
align-items: stretch;

`;

// ************************* FORMS **********************************
const Forms = (props) => {


  const buttonClicked = () => {
    props.setShowResults(true);
    const data = {

      cam: props.selectedCameras,

      start: moment(props.dateSearch.startDate, ["YYYY-MM-DDThh:mm:ss A",]).format("YYYY-MM-DDTHH:mm:ss"),
      end: moment(props.dateSearch.endDate, ["YYYY-MM-DDThh:mm:ss A"]).format("YYYY-MM-DDTHH:mm:ss"),

      searchCar: props.searchFor.cars,
      make: props.carSearch.manufacturer,
      model: props.carSearch.model,
      color: props.carSearch.color,
      carType: props.carSearch.carType,

      searchHuman: props.searchFor.human,
      shirtColor: props.humanSearch.shirtColor,
      pantsColor: props.humanSearch.pantsColor,

    };

    axios
      .post(`http://localhost:3000/query`, data)
      .then((response) => {
        console.log(`SERVER RESPONSE::Number of expected results: ${response.data}`)
        if (response.data !== 0) {
          props.setNumberOfExpectedResults(response.data);

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FormContainer>
      <AllSearchBlocks>
        <LeftWing>
        <SearchBlock>
          <Dates update={props.setDateSearch} dateSearch={props.dateSearch} /></SearchBlock>
        <SearchBlock>
          <Cameras
            setCameras={props.setCameras}
            cameras={props.cameras}
            selectedCameras={props.selectedCameras}
            setSelectedCameras={props.setSelectedCameras}
          />
        </SearchBlock>
        </LeftWing>
        <RightWing>
        <SearchBlock>
          <CarSearch
            update={props.setCarSearch}
            carSearch={props.carSearch}
            searchFor={props.searchFor}
            setSearchFor={props.setSearchFor}
          />
        </SearchBlock>
        <SearchBlock>
          <HumanSearch
            update={props.setHumanSearch}
            humanSearch={props.humanSearch}
            searchFor={props.searchFor}
            setSearchFor={props.setSearchFor}
          />
        </SearchBlock>
        </RightWing>
      </AllSearchBlocks>
      <ButtonsSection>
      <Button
        disabled={
          !props.selectedCameras.length ||
          (!props.searchFor.cars && !props.searchFor.human) ||
          !props.serverStatus
        }
        variant="contained"
        color="primary"
        onClick={buttonClicked}
      >
        SEARCH
      </Button>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={props.clearAllStates}
      >
        CLEAR ALL
      </Button>
      </ButtonsSection>
    </FormContainer>
  );
};

export default Forms;
