import { useContext } from "react";
import { ThemeContext } from "./CreateContext";
import { LightIcon, DarkIcon } from "../components/Icons";

const ThemeButtonToggle: React.FC = () => {
  const context = useContext(ThemeContext);

  const { theme, toggleTheme } = context;

  return (
    <div
      onClick={toggleTheme}
      className={theme === "light" ? "light-theme" : "dark-theme"}
    >
      {theme === "light" ? <DarkIcon /> : <LightIcon />}
    </div>
  );
};

export default ThemeButtonToggle;
