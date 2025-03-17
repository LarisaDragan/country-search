import Navbar from "react-bootstrap/NavBar";
import ThemeButtonToggle from "../../themeContext/ThemeButtonToggle";
import "./style.css";

const NavBar = () => {
  return (
    <Navbar className="navbar shadow-sm">
      Where in the world?
      <ThemeButtonToggle />
    </Navbar>
  );
};

export default NavBar;
