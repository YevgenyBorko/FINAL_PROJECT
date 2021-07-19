import React, { Fragment, useEffect,useState} from "react";
import styled from "styled-components";
import CameraBlock from "../Results/CameraBlock/CameraBlock";
import socketIOClient from "socket.io-client";
import CircularProgress from "@material-ui/core/CircularProgress";

const ENDPOINT = "http://127.0.0.1:3000"; //the adress that the socket listen to.

const ResultsContainer = styled.div`
  border-radius: 10px;
  padding: 4em;
  min-width: 450px;
  width: 90%;
  height: 480px;
  margin: 1em auto;
  overflow-y: auto;
  align-items: "center";
  box-shadow: 0 0 1.75rem 0 #00a19b;
  padding-bottom: 8px;

  table {
    border: 2px solid #00a19b;
    align-content: center;

    th,
    td {
      padding: 4px;
      border: 2px solid #00a19b;
    }
  }

  h1 {
    color: #00a19b;
    text-align: center;
    -webkit-text-stroke: 1px #f8f8f8;
    text-shadow: 0px 1px 4px #00a19b;
    font-size: 45px;
    margin-top: 0;
  }
  h2 {
    color: #00a19b;
    text-align: center;
    -webkit-text-stroke: 1px #f8f8f8;
    text-shadow: 0px 1px 4px #00a19b;
    font-size: 35px;
  }

  h3 {
    color: white;
    text-shadow: 0px 1px 4px #00a19b;
    font-size: 20px;
    padding-left: 10px;
  }

  button {
    margin-top: 16px;
    background-color: #00a19b;

    &:hover {
      background-color: #32b1ac;
    }
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
`;

const Results = (props) => {


  const [resultsCounter,setResultsCounter] = useState(0);
  const [hasResults,setHasResults] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(props.numberOfExpectedResults === resultsCounter) setLoading(false);
  },[resultsCounter]);

  useEffect(() => {
    //socket is listen to results
    setLoading(true);
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      const newResponse = props.responses;
      if(data === "no results" && !hasResults){
        setResultsCounter(prev=> prev + 1);   
      }else{
        setHasResults(true);
        setLoading(false);

        if (!(data["camName"] in newResponse)) {
          // if the camera is not exist in responses then create a new array for it.
          newResponse[data["camName"]] = [];
          if(props.loading === true){
          }
        }
  
        if (newResponse) {
          // add the data that return from the server to the correct camera array.
          newResponse[data["camName"]].push(...data["result"]);
          props.setResponses(newResponse);
          if(props.loading === true){
          }
        }
      }
    });
  }, []);

  return (
    <ResultsContainer>
      {loading ? (
          <div style={{ display: "flex", "justifyContent": "space-around" }}>
            <CircularProgress style={{ color: "#00a19b" }} />
          </div>
        ) : hasResults ? (
        Object.keys(props.responses).map((camera, i) => {
          // if there is responses to display then run on the responses.
          return (
            <Fragment key={"fragment" + i}>
              <CameraBlock 
                key={"camera" + i}
                chosenCamera={props.responses[camera]}
                name={camera}
              />
            </Fragment>
          );
        })
      ) : (
        <Fragment>
          <h1>NO RESULTS</h1>
        </Fragment>
      )}
    </ResultsContainer>
  );
};

export default Results;
