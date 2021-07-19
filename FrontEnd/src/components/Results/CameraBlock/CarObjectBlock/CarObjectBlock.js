import React from "react";
import styled from "styled-components";
import moment from "moment";

const ObjectBlockContainer = styled.div`
  box-shadow: 0 0 0.5rem 0 black;
  padding: 1em;
  float: left;
  margin: 7px;
  border: 2px solid #00a19b;
  list-style: none;
  max-width:250px;
  transition: 1s transform;
  -webkit-transition: 1s -webkit-transform;
  transform-origin: 0px 0px;
  -webkit-transform-origin: 0px 0px;
  backface-visibility: hidden;
  border-radius: 10px;

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
  }
  img {
    color: #00a19b;
    border-style:double;
    text-align: center;
    -webkit-text-stroke: 1px #f8f8f8;
    text-shadow: 0px 1px 4px #00a19b;
    font-size: 35px;
    width: 98%;
    height: 100px;
    margin: 0 auto;
  }

  button {
    margin-top: 16px;
    background-color: #00a19b;

    &:hover {
      background-color: #32b1ac;
    }
  }

  div {


}

:hover {
  transform: scale(1.05);
  -webkit-transform: scale(1.05);
}
`;

const CarObjectBlock = ({object}) => {



   let date = moment(object.timestamp).format('DD-MM-YYYY');
    let time = moment(object.timestamp).format('hh:mm:ss');

  return (
    <ObjectBlockContainer>
      <div>
          <img src={`data:image/jpeg;base64,${object.image}`} alt="pic" />
          <div style={{color:'white',marginTop:'10px'}}>
          <div style={{fontWeight: 'bold'}}>Date: <span style={{fontWeight: 'normal'}}>{date}</span> </div> 
          <div style={{fontWeight: 'bold'}}>Time: <span style={{fontWeight: 'normal'}}>{time}</span> </div> 
          <div style={{color:'#029f9b',marginTop: '5px'}}>
          <div style={{fontWeight: 'bold',fontSize:'12px'}}>Manufacture: <span style={{fontWeight: 'normal',fontSize:'12px'}}>{object.make? object.make : "No Info"}</span> </div>
          <div style={{fontWeight: 'bold',fontSize:'12px'}}>Type: <span style={{fontWeight: 'normal',fontSize:'12px'}}>{object.carType? object.carType : "No Info"}</span> </div>  
          <div style={{fontWeight: 'bold',fontSize:'12px'}}>Color: <span style={{fontWeight: 'normal',fontSize:'12px'}}>{object.color? object.color : "No Info"}</span> </div> 
          </div>
          </div>
      </div>
    </ObjectBlockContainer>
  );
};

export default CarObjectBlock;