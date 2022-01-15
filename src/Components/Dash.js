import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Chart } from "react-google-charts";

import NavBar from "./PostLoginNavBar/NavBar";

const cookies = new Cookies();

const clientId =
  "12442857673-tpt89aun3q39us85u5g8rlr5gj451q5g.apps.googleusercontent.com";

const Dash = () => {
  const [URL, setURL] = useState("");
  const [inputInvalidCSS, setIInvalidCSS] = useState("invisible");
  const [urlList, setUList] = useState([]);
  const [urlStats, setUStats] = useState({});

  var uStats = {};

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
          setURL("");
        });
      setIInvalidCSS("invisible");
    }
  };
  useEffect(() => {
    fetch(`http://localhost:4500/urllist/${googleProfile.googleId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.urllist);
        setUList(data.urllist);
        data.urllist.length !== 0
          ? data.urllist.map((val) => {
              fetch(`http://localhost:4500/urlstats/${val.url_id}`)
                .then((res) => res.json())
                .then((d) => {
                  uStats[val.url] = d.scans;
                  setUStats(uStats);
                });
            })
          : console.log("No URLs for stats");
      });
    setInterval(() => {
      fetch(`http://localhost:4500/urllist/${googleProfile.googleId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.urllist);
          setUList(data.urllist);
          data.urllist.length !== 0
            ? data.urllist.map((val) => {
                fetch(`http://localhost:4500/urlstats/${val.url_id}`)
                  .then((res) => res.json())
                  .then((d) => {
                    uStats[val.url] = d.scans;
                    setUStats(uStats);
                  });
              })
            : console.log("No URLs for stats");
        });
    }, 100000);
  }, []);

  return googleProfile ? (
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
            <form onSubmit={handleAddURL} autoComplete="off">
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
                autoComplete="off"
                required
              />
              <div className="form-text">
                Please don't add http or https in the link.
              </div>
              <button type="submit" className="btn btn-danger mt-3">
                Submit
              </button>
            </form>
            <div
              className={inputInvalidCSS + " alert alert-danger mt-2"}
              role="alert"
            >
              <strong>Error</strong> : <strong>http://</strong> or{" "}
              <strong>https://</strong> detected in the URL.
            </div>
          </div>
        </div>
        <div className="row">
          <>
            {urlList.length !== 0 ? (
              urlList.map((val) => {
                const options = {
                  hAxis: {
                    title: "Date & Time",
                    textPosition: "none",
                  },
                  vAxis: {
                    minValue: 0,
                    maxValue: 10,
                    title: "Duration (sec)",
                    scaleType: "linear",
                    gridlines: { count: 10 },
                  },
                  curveType: "function",
                  series: [{ color: "#0B6EFD" }],
                  legend: "none",
                  pointSize: 4,
                  crosshair: { trigger: "both", color: "#121212" },
                };
                var data = [["Time", "Total Time taken to load website"]];
                console.log(urlStats[val.url]);
                urlStats[val.url]
                  ? urlStats[val.url].map((element) => {
                      data.push([
                        element.time_stamp.slice(0, -31),
                        Number(element.task_duration) * 10,
                      ]);
                    })
                  : data.push(["", 0]);
                return (
                  <div className="col-12 text-start mt-3">
                    <h2 className="text-primary">
                      <strong>{val.url}</strong>
                    </h2>
                    <span className="text-muted">
                      The graph may take a while to load.
                    </span>
                    <Chart
                      chartType="LineChart"
                      width="100%"
                      height="80vh"
                      data={data}
                      options={options}
                    />
                    <hr />
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-start mt-3">
                <h2 className="text-primary">
                  <strong>No URLs detected.</strong>
                </h2>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  ) : (
    window.location.replace("/login")
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