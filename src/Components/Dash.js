import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";

import NavBar from "./PostLoginNavBar/NavBar";

const cookies = new Cookies();

const clientId =
  "12442857673-tpt89aun3q39us85u5g8rlr5gj451q5g.apps.googleusercontent.com";

const Dash = () => {
  const [URL, setURL] = useState("");
  const [inputInvalidCSS, setIInvalidCSS] = useState("invisible");
  const [urlList, setUList] = useState({});
  const [urlStats, setUStats] = useState({});
  const googleProfile = cookies.get("googleProfile");
  // get token generated on login

  const validation = () => {
    const http = URL.startsWith("http://");
    const https = URL.startsWith("https://");
    if (http || https) {
      setIInvalidCSS("visible");
    } else {
      setIInvalidCSS("invisible");
    }
  };
  const handleAddURL = (e) => {
    e.preventDefault();
    const http = URL.startsWith("http://");
    const https = URL.startsWith("https://");
    if (http || https) {
      alert("Remove http:// protocol from URL!");
      setIInvalidCSS("visible");
    } else {
      fetch(`http://localhost:4500/addurl/${googleProfile.googleId}/${URL}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
      setIInvalidCSS("invisible");
    }
  };
  useEffect(() => {
    fetch(`http://localhost:4500/urllist/${googleProfile.googleId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <>
      <NavBar />
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-12 text-start">
            <h1></h1>

            {/* displaying our message from our API call */}
            <h2 className="text-danger">
              <strong>Add URL</strong>
            </h2>
            <form onSubmit={handleAddURL}>
              <label htmlFor="URL">URL</label>
              <input
                type="text"
                value={URL}
                onChange={(e) => {
                  setURL(e.target.value);
                  validation();
                }}
                id="URL"
                className="form-control mt-2"
              />
              <div className="form-text">
                Please don't add http or https in the link.
              </div>
              <button type="submit" className="btn btn-danger mt-3">
                Submit
              </button>
            </form>
            <div
              class={inputInvalidCSS + " alert alert-danger mt-3"}
              role="alert"
            >
              <strong>Error</strong> : <strong>http://</strong> or{" "}
              <strong>https://</strong> detected in the URL.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const Button = styled.button`
  width: 250px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  color: #121212;
  text-decoration: none;
  span {
    font-size: 16px;
    font-weight: 600;
    color: #121212;
    text-decoration: none;
  }
  &:hover {
    background-color: #d50704;
    span {
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
    }
  }
`;
export default Dash;
