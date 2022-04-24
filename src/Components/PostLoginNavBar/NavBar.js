import styled from "styled-components";
import { GoogleLogout } from "react-google-login";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import MobileNavigation from "./MobileNav";
import { useState } from "react";
import Cookies from "universal-cookie";

const clientId =
  "12442857673-bo0253n62t5hcgls0te7un9q8c45cmst.apps.googleusercontent.com";
const cookies = new Cookies();

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const closeIcon = (
    <IoClose size="40px" color="#121212" onClick={() => setOpen(!open)} />
  );
  const openIcon = (
    <HiOutlineMenuAlt3
      size="40px"
      color="#121212"
      onClick={() => setOpen(!open)}
    />
  );
  const logout = () => {
    // destroy the cookie
    cookies.remove("googleProfile");
    // redirect user to the landing page
    window.location.href = "/login";
  };

  return (
    <Nav>
      <Logo className="text-align-text align-items-center justify-content-center">
        <a href="/home">
          <img src="/assets/images/logo.png" alt="Parjanya Modi" />
        </a>
      </Logo>
      <NavMenu>
        <GoogleLogout
          clientId={clientId}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <span>Logout</span>
            </Button>
          )}
          onLogoutSuccess={logout}
        ></GoogleLogout>
      </NavMenu>
      <MobiNav>
        {open ? closeIcon : openIcon}
        {open && <MobileNavigation />}
      </MobiNav>
    </Nav>
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
      color: #121212;
      font-size: 42px;
      font-weight: 800;
    }
  }
`;
const MobiNav = styled.div`
  @media (min-width: 992px) {
    display: none;
  }
`;
const Nav = styled.nav`
  @media (min-width: 992px) {
    padding: 0 8% 0;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 3;
  }
  @media (max-width: 992px) {
    padding: 0 5% 0;
    position: relative;
    flex-flow: row nowrap;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 3;
  }
`;

const Logo = styled.div`
  @media (min-width: 992px) {
    padding: 0;
    width: 250px;
    margin-top: 4px;
    margin-bottom: 4px;
    max-height: 70px;
    font-size: 0;
    display: flex;
    flex-flow: row nowrap;
    img {
      display: flex;
      width: 250px;
    }
  }
  @media (max-width: 992px) {
    padding: 0;
    width: 200px;
    margin-top: 4px;
    margin-bottom: 4px;
    max-height: 70px;
    font-size: 0;
    display: flex;
    flex-flow: row nowrap;
    img {
      display: flex;
      width: 100%;
    }
  }
`;

const NavMenu = styled.div`
  @media (min-width: 992px) {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: 0px;
    margin-left: 25px;
    a {
      display: flex;
      text-decoration: none;
      align-items: center;
      padding: 0 12px;
      span {
        color: #121212;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.5px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;
        transition: 0.3s;
      }
      &:hover {
        span {
          color: #d50704;
        }
      }
    }
  }
  @media (max-width: 992px) {
    display: none;
  }
`;

export default NavBar;
