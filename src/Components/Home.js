import NavBar from "./PreLoginNavBar/NavBar";
import Cookies from "universal-cookie";
import styled from "styled-components";

const cookies = new Cookies();

const Home = () => {
  return (
    <HomeDiv>
      {cookies.remove("googleProfile")}
      <NavBar />
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10 mt-5">
          <h1>The Only Tool You’ll Ever Need</h1>
          <span>
            Observe all your websites performance metrics at one place.
          </span>
          <br />
          <span>
            Already a user? <a href="/login">Login In</a>
          </span>
        </div>
        <div className="col-1"></div>
      </div>
    </HomeDiv>
  );
};
const HomeDiv = styled.div`
  overflow-x: hidden;
  @media (min-width: 992px) {
    div {
      div {
        h1 {
          padding-top: 50px;
          font-size: 54px;
          font-weight: 600;
        }
        span {
          font-size: 24px;
          font-weight: 500;
        }
      }
    }
  }
  @media (max-width: 992px) {
    div {
      div {
        h1 {
          padding-top: 50px;
          font-size: 34px;
          font-weight: 600;
        }
        span {
          font-size: 20px;
          font-weight: 500;
        }
      }
    }
  }
`;
export default Home;
