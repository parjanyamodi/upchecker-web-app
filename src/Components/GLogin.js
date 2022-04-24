import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import styled from "styled-components";
import { ImGoogle3 } from "react-icons/im";
import Cookies from "universal-cookie";

import NavBar from "./PreLoginNavBar/NavBar";

const cookies = new Cookies();

const clientId =
  "12442857673-tpt89aun3q39us85u5g8rlr5gj451q5g.apps.googleusercontent.com";
const Login = () => {
  const [googleProfile, setGProfile] = useState({});
  const onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj);
    setGProfile(res.profileObj);
    fetch(
      `http://localhost:3405/login/${res.profileObj.googleId}/${res.profileObj.email}/${res.profileObj.name}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        cookies.set("googleProfile", res.profileObj, { path: "/" });
        window.location.replace("/dashboard");
      });
  };
  const onFailure = (res) => {
    console.log("[Login failed] res: ", res);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="mt-4"
              >
                <span>
                  Login with Google &nbsp;
                  <span>
                    <ImGoogle3 />
                  </span>
                </span>
              </Button>
            )}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            style={{ marginTop: "100px" }}
            isSignedIn={true}
          />
        </div>
      </div>
    </div>
  );
};
const GLogin = (props) => {
  return (
    <>
      <NavBar />
      <hr />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3"></div>
          <div className="col-md-6 ">
            <div className="card card-props">
              <div className="card-body">
                <div className="mt-2">
                  <Intro>
                    <span>
                      Welcome !<br />
                    </span>
                    <p>Monitoring websites made easy.</p>
                  </Intro>
                </div>
                <div className="mt-3">
                  <Tagline>
                    <Login />
                  </Tagline>
                </div>
                <div className="mt-5">
                  <Stack>
                    <span>
                      <SocialIcons></SocialIcons>
                    </span>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
        <div className="row footer-gb">
          <div className="col-12">
            <Footer>
              <hr />
              <span>
                Made with ❤️ &nbsp;by &nbsp;
                <a
                  href="http://parjanyamodi.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <strong>Parjanya H Modi</strong>
                </a>
                .
                <br /> &#169; {new Date().getFullYear()}{" "}
                <a
                  href="http://parjanyamodi.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <strong>Parjanya H Modi</strong>
                </a>
                .
              </span>
            </Footer>
          </div>
        </div>
      </div>
    </>
  );
};

const Intro = styled.div`
  @media (min-width: 992px) {
    margin-top: 7vh;
    span {
      color: #ffffff;
      font-size: 32px;
      font-weight: 900;
    }
    p {
      color: #ffffff;
      font-size: 20px;
      font-weight: 600;
    }
  }
  @media (max-width: 992px) {
    margin-top: 5vh;
    span {
      color: #ffffff;
      font-size: 24px;
      font-weight: 900;
    }
    p {
      color: #ffffff;
      font-size: 18px;
      font-weight: 600;
    }
  }
`;
const Tagline = styled.div`
  @media (min-width: 992px) {
    span {
      color: #ffffff;
      font-size: 56px;
      font-weight: 800;
    }
  }
  @media (max-width: 992px) {
    span {
      color: #ffffff;
      font-size: 42px;
      font-weight: 800;
    }
  }
`;
const Stack = styled.div`
  span {
    font-size: 16px;
    font-weight: 600;
    color: #b037fd;
  }
`;
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
const SocialIcons = styled.div`
  a {
    text-decoration: none;
    color: #121212;
    font-size: 24px;
    font-weight: 700;
    margin: 5px;
    &:hover {
      color: #772cfd;
    }
  }
`;
const Footer = styled.div`
  margin-bottom: 15px;
  background-color: #ffffff;
  @media (min-width: 1024px) {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    span {
      font-size: 14px;
      font-weight: 500;
      color: #121212;
      justify-content: center;
      text-align: center;
      align-items: center;
      a {
        font-size: 16px;
        color: #d50704;
        text-decoration: none;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    span {
      font-size: 14px;
      color: #121212;
      justify-content: center;
      text-align: center;
      align-items: center;
      a {
        font-size: 16px;
        color: #d50704;
        text-decoration: none;
      }
    }
  }
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    span {
      font-size: 14px;
      color: #121212;
      justify-content: center;
      text-align: center;
      align-items: center;
      a {
        font-size: 16px;
        color: #d50704;
        text-decoration: none;
      }
    }
  }
`;
export default GLogin;
