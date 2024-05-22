import { fas } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/Logo.png";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileDisplay from "../ProfileDisplay/ProfileDisplay";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <header className={styles.header}>
      <div className={styles.images}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.text}>Oromo Soundz</div>
      </div>
      <div className="menu">
        <nav>
          <ul className={styles.nav}>
            <FontAwesomeIcon
              icon={fas.faBars}
              className={styles.hamburgerMenu}
            />
            <div
              className="music"
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              <Link to="/music">
                <li>Music</li>
              </Link>
              {hover && (
                <ul className={styles.options}>
                  <Link to="/music/Wallaga">
                    <li>Wallaga</li>
                  </Link>
                  <Link to="/music/Shewa">
                    <li>Shewa</li>
                  </Link>
                  <Link to="/music/Arsi">
                    <li>Arsi</li>
                  </Link>
                  <Link to="/music/Haraghe">
                    <li>Haraghe</li>
                  </Link>
                  <Link to="/music/Ilu Ababora">
                    <li>Ilu Ababora</li>
                  </Link>
                  <Link to="/music/Jimmaa">
                    <li>Jimmaa</li>
                  </Link>
                  <Link to="/music/Balee">
                    <li>Balee</li>
                  </Link>
                  <Link to="/music/Borana">
                    <li>Borana</li>
                  </Link>
                  <Link to="/music/Wallo">
                    <li>Wallo</li>
                  </Link>
                  <Link to="/music/Oldies">
                    <li>Oldies</li>
                  </Link>
                  <Link to="/music/Modern">
                    <li>Modern</li>
                  </Link>
                </ul>
              )}
            </div>
            <Link to="/addmusic">
              <li>Add Music</li>
            </Link>
            <li>
              <ProfileDisplay />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
