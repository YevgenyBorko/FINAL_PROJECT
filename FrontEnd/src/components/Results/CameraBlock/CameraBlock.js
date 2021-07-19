import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CarObjectBlock from "./CarObjectBlock/CarObjectBlock";
import HumanObjectBlock from "./HumanObjectBlock/HumanObjectBlock";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";

const GreenCheckbox = withStyles({
  root: {
    color: "#32b1ac",
    "&$checked": {
      color: "#32b1ac",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CameraBlockContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: "center";
  min-width: 600px;
  width: 100%;
  border: 3px solid #00a19b;
  justify-content: flex-start;
  white-space: nowrap;
  overflow-y: auto;
  overflow-x: auto;
  margin: 0 auto;
  box-shadow: 0 0 0.5rem 0 black;
  border-radius: 10px;
  min-height: 192px;

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

  h3 {
    color: white;

  }

  button {
    margin-top: 16px;
    background-color: #00a19b;

    &:hover {
      background-color: #32b1ac;
    }
  }

  label {
    color: white;
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

const CameraBlockWrapper = styled.div`
  border-style: groove;
  border: 3px solid #32b1ac;
  border-radius: inherit;
  padding-right: inherit;
  padding-bottom: 8px;
  margin-bottom: 10px;
`;

const CameraBlock = ({ chosenCamera, name }) => {
  const [open, setOpen] = useState(false);
  const [blocks, setBlocks] = useState(null);
  const [filterBlocks, setFilterBlocks] = useState([]);
  const [isCarfilter, setIsCarFilter] = useState(true);
  const [isHumanfilter, setIsHumanFilter] = useState(true);
  const [resultCounter, setResultCounter] = useState();

  useEffect(() => {

    const objectsBlocks = chosenCamera.map((object, i) => {
      if (object.type === "vehicle")
        return <CarObjectBlock key={"object" + i} object={object} />;
      else return <HumanObjectBlock key={"humanObject" + i} object={object} />;
    });

    setBlocks(objectsBlocks);
    setResultCounter(objectsBlocks.length);
    setFilterBlocks(objectsBlocks);
  }, [chosenCamera]);
  const handleClick = () => {
    setOpen(!open);
    if (open) {
      setIsHumanFilter(true)
      setIsCarFilter(true)
    }
  };

  useEffect(() => { //when one of the filters checkbox checked\unchecked , the useEffect fires the filterHandler function.
    filterHandler(); 
  }, [isCarfilter, isHumanfilter]);

  const filterHandler = () => { //after one of the filter buttons clicked (call in useEffect)
    if (blocks) {
      if (isCarfilter && isHumanfilter) {
        setFilterBlocks([...blocks]);
      } else if (isCarfilter) {
        const carsOnly = blocks.map((block) => {
          if (block.props.object.type === "vehicle") return block;
        });
        setFilterBlocks(carsOnly);
      } else if (isHumanfilter) {
        const humansOnly = blocks.map((block) => {
          if (block.props.object.type === "person") {
            return block;
          }
        });
        setFilterBlocks(humansOnly);
      } else {
        setFilterBlocks([]);
      }
    }
  };

  return (
    <CameraBlockWrapper>
      <div
        style={{
          display: "flex",
          "flexDirection": "row",
          "justifyContent": "space-between",
        }}
      >
        <h3 style={{ "textAlign": "left", color: "white", fontSize: "20px" }}> {/*display the name of the camera*/}
          {name.toUpperCase()} ({resultCounter})
        </h3>


      </div>

      {open ? (
        <ExpandLess
          onClick={handleClick}
          style={{ color: "00a19b", fontSize: "40" }}
        />
      ) : (
        <ExpandMore
          onClick={handleClick}
          style={{ color: "#00a19b", fontSize: "40" }}
        />
      )}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              "justifyContent": "flex-start",
              "flexWrap": "wrap",
              "alignContent": "flex-start",
              "flexDirection": "column",
            }}
          >
            <span
              style={{
                display: "flex",
                "alignItems": "self-start",
                color: "white",
                "paddingLeft": "10px"
              }}
            >
              <label>Show Vehicles</label> {/*checkbox for filtering vihecles*/}
              <FormControlLabel
                control={
                  <GreenCheckbox
                    defaultChecked
                    onChange={() => setIsCarFilter((prevState) => !prevState)}
                    name="checkedG"
                  />
                }
              />
            </span>

            <span
              style={{
                display: "flex",
                "alignItems": "self-start",
                color: "white",
                "paddingLeft": "10px"
              }}
            >
              <label>Show Humans</label> {/*checkbox for filtering humans*/}
              <FormControlLabel
                control={
                  <GreenCheckbox
                    defaultChecked
                    onChange={() => setIsHumanFilter((prevState) => !prevState)}
                    name="checkedG"
                  />
                }
              />
            </span>
          </div>
          <CameraBlockContainer>{filterBlocks}</CameraBlockContainer> {/*displays the objects (human/cars) after filter*/}
        </div>
      </Collapse>
    </CameraBlockWrapper>
  );
};

export default CameraBlock;
