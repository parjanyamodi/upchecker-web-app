import styled from "styled-components";
import { GoogleLogout } from "react-google-login";
import Cookies from "universal-cookie";

const clientId =
  "12442857673-bo0253n62t5hcgls0te7un9q8c45cmst.apps.googleusercontent.com";
const cookies = new Cookies();

const MobileNavigation = (props) => {
  const logout = () => {
    // destroy the cookie
    cookies.remove("googleProfile");
    // redirect user to the landing page
    window.location.href = "/login";
  };
  return (
    <MobileNav>
      <GoogleLogout
        clientId={clientId}
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <span>Logout</span>
          </Button>
        )}
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </MobileNav>
  );
};
const Button = styled.button`
  width: 150px;
  height: 50px;
  margin-left: 50px;
  border: none;
  border-radius: 10px;
  background-color: #d50704;
  color: #ffffff;
  text-decoration: none;
  span {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    text-decoration: none;
  }
  &:hover {
    background-color: #121212;
    span {
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
    }
  }
`;
const MobileNav = styled.nav`
  @media (min-width: 992px) {
    display: none;
  }
  @media (max-width: 992px) {
    background-color: #ffffff;
    align-items: right;
    display: flex;
    flex-flow: column nowrap;
    position: fixed;
    top: 0;
    right: 0;
    margin-top: 90px;
    padding-top: 5vh;
    height: 100vh;
    width: 100vw;
    a {
      display: flex;
      margin-left: 15%;
      text-decoration: none;
      align-items: center;
      span {
        color: #121212;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.5px;
        line-height: 2;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;
      }
      &:hover {
        span {
          color: #d50704;
        }
      }
    }
  }
`;

export default MobileNavigation;
