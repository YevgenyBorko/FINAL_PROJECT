import React, { useState, useEffect, Fragment, useRef } from "react";
import Forms from "../Search/Forms/Forms";
import Results from "../Results/Results";
import moment from "moment";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import axios from "axios";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import Alert from "@material-ui/lab/Alert";

const MainContainer = styled.div`
  background-color: #232525;

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
  h1 {
    color: #00a19b;
    text-align: center;
    -webkit-text-stroke: 1px #f8f8f8;
    text-shadow: 0px 1px 4px #00a19b;
    font-size: 45px;
  }
  h2 {
    color: #00a19b;
    text-align: center;
    -webkit-text-stroke: 1px #f8f8f8;
    text-shadow: 0px 1px 4px #00a19b;
    font-size: 35px;
  }

  button {
    margin-top: 16px;
    background-color: #00a19b;
    align-items: "center";
    background-color: #00a19b;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    &:hover {
      background-color: #32b1ac;
    }
  }
`;

const Main = () => {
  const [numberOfExpectedResults, setNumberOfExpectedResults] = useState();

  const [carSearch, setCarSearch] = useState({
    manufacturer: "any",
    color: "any",
    model: "any",
    carType: "any",
  });

  const [humanSearch, setHumanSearch] = useState({
    shirtColor: "any",
    pantsColor: "any",
  });

  const [dateSearch, setDateSearch] = useState({
    startDate: moment().format("YYYY-MM-DDThh:mm:ss A"),
    endDate: moment().format("YYYY-MM-DDThh:mm:ss A"),
  });

  const [cameras, setCameras] = useState([]);

  const [selectedCameras, setSelectedCameras] = useState([]);

  const [responses, setResponses] = useState({});

  const [searchFor, setSearchFor] = useState({
    human: false,
    cars: false,
  });

  const [showResults, setShowResults] = useState(false);

  const [status, setStatus] = useState({
    serverStatus: true,
    color: "#00a19b",
  });

  function useInterval(callback, delay) {
    const intervalId = useRef(null);
    const savedCallback = useRef(callback);
    useEffect(() => {
      savedCallback.current = callback;
    });
    useEffect(() => {
      const tick = () => savedCallback.current();
      if (typeof delay === "number") {
        intervalId.current = window.setInterval(tick, delay);
        return () => window.clearInterval(intervalId.current);
      }
    }, [delay]);
    return intervalId.current;
  }

  useInterval(() => {
    getStatus();
  }, 5000);

  // useEffect(() => {
  //   //for debug.
  //   console.log(carSearch, dateSearch, humanSearch, searchFor, responses);
  // }, [carSearch, dateSearch, humanSearch, searchFor, responses]);

  const getStatus = () => {
    axios
      .get("http://localhost:3000/status")
      .then((response) => {
        if (response.data === "OK") {
          setStatus(
            {
            color: "#00a19b",
            serverStatus: true,
          });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
        setStatus({
          color: "red",
          serverStatus: false,
        });
      });
  };

  const clearAllStates = () => {
    setCarSearch({
      manufacturer: "any",
      color: "any",
      model: "any",
      carType: "any",
    });
    setHumanSearch({ shirtColor: "any", pantsColor: "any" });
    setDateSearch({
      startDate: moment().format("YYYY-MM-DDThh:mm:ss A"),
      endDate: moment().format("YYYY-MM-DDThh:mm:ss A"),
    });
    setResponses({});
    setSearchFor({ human: false, cars: false });
    setSelectedCameras([]);
  };

  return (
    <Fragment>
      <MainContainer>
        <br />
        {status.serverStatus ? null : (
          <Alert severity="error">ERROR - Cannot connect to the sever!</Alert>
        )}
        {showResults && numberOfExpectedResults ? ( //if boolean "showResults state is true then diplay the results , else - the forms "
          <Fragment>
            <Results
              responses={responses}
              setResponses={setResponses}
              numberOfExpectedResults={numberOfExpectedResults}
              setNumberOfExpectedResults={setNumberOfExpectedResults}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setResponses({}); // clear the responses that came from the server.
                setShowResults(false); // Stop diplay the results page and return to the search page.
              }}
            >
              BACK TO SEARCH
            </Button>
          </Fragment>
        ) : (
          <Forms
            carSearch={carSearch}
            setCarSearch={setCarSearch}
            humanSearch={humanSearch}
            setHumanSearch={setHumanSearch}
            dateSearch={dateSearch}
            setDateSearch={setDateSearch}
            cameras={cameras}
            setCameras={setCameras}
            responses={responses}
            setResponses={setResponses}
            selectedCameras={selectedCameras}
            setSelectedCameras={setSelectedCameras}
            searchFor={searchFor}
            setSearchFor={setSearchFor}
            clearAllStates={clearAllStates}
            serverStatus={status.serverStatus}
            showResults={showResults}
            setShowResults={setShowResults}
            setNumberOfExpectedResults={setNumberOfExpectedResults}
          />
        )}

        <div>
          <pre
            className="tab"
            style={{
              color: "#00a19b",
              fontSize: "15px",
              margin: "0 center",
              borderColor: "#00a19b",
              borderRadius: "12px",
              borderWidth: "5px",
              "justifyContent": "flex-end",
            }}
          >
            {" "}
            Server Status: <SpeakerNotesIcon style={{ color: status.color }} />
          </pre>
        </div>
      </MainContainer>
    </Fragment>
  );
};

export default Main;
