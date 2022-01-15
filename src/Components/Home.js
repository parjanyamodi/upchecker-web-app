import NavBar from "./PreLoginNavBar/NavBar";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Home = () => {
  return (
    <>
      {cookies.remove("googleProfile")}
      <NavBar />
      <p>Home</p>
    </>
  );
};
export default Home;
