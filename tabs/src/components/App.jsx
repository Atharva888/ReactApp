import React from "react";
import { useState } from "react";
import axios from 'axios';
// https://fluentsite.z22.web.core.windows.net/quick-start
// import { Provider, teamsTheme } from "@fluentui/react-northstar";
// import { HashRouter as Router, Redirect, Route } from "react-router-dom";
// import Privacy from "./Privacy";
// import TermsOfUse from "./TermsOfUse";
// import Tab from "./Tab";
import "./App.css";
// import TabConfig from "./TabConfig";
// import { useTeams } from "@microsoft/teamsfx-react";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseData, setResponseData] = useState("");
  // const [status, setStatus] = useState("");

  // User Login info
  // const database = [
  //   {
  //     agentID: "user1",
  //     password: "pass1"
  //   },
  //   {
  //     agentID: "user2",
  //     password: "pass2"
  //   }
  // ];

  // const errors = {
  //   uname: "invalid username",
  //   pass: "invalid password"
  // };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    // let socket = new WebSocket("ws://localhost:7083/ws");

    // socket.onopen = (event) => {
    //   console.log("Websocket Connected SuccessFully!!")
    //   // socket.send(JSON.stringify({ agentID, password, stationID }));
    // };

    // socket.onmessage = (event) => {
    //   let message = JSON.parse(event.data);
    //   console.log("Message : " + message);
    //   setStatus(message);
    //   socket.close();
    // };

    var { msg } = document.forms[0];

    // Find user login info
    // const userData = database.find((user) => user.agentID === msg.value);

    // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     setIsSubmitted(true);
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
    axios.post("https://localhost:7083/api/login",{mssg : msg.value}).then((res) => {
        setResponseData(res.data);
    });

  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Message: </label>
          <input type="text" name="msg" required />
          {renderErrorMessage("msg")}
        </div>
        {/* <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div> */}
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {/* <div className="title">Sign In</div> */}
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        <label>Response : </label>
        <p>{responseData}</p>
      </div>
    </div>
  );
}
