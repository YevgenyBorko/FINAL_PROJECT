import React from "react";
import "./App.css";
import { Logo } from "./common/icons";
import Main from "./components/Main/Main";

import styled from "styled-components";
import name from "../src/images/name2.png";

const AppContainer = styled.div`
  background-color: #283131;

  .logo {
    display: block;
    margin-left: 550px;
    margin-right: auto;
    position: initial;

  }

`;



const App = () => {

  return (
    <AppContainer>
        <div style={{display: 'flex'}}>
          <Logo />
          <img src={name} className='logo' alt='logo'/>     
        </div>
        <Main />
    </AppContainer>
  );
};

export default App;
