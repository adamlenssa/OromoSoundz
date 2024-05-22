import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProfileDisplay.module.css";
import { useState } from "react";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import { Link } from "react-router-dom";

const ProfileDisplay = () => {
  const [hover, setHover] = useState<boolean>(false);
  const { user, setUser } = useGlobalContext();
  if (!user) {
    return (
      <div className={styles.wrapper}>
        <Link to="/login">
          <h2>Sign In</h2>
        </Link>
      </div>
    );
  }
  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className={styles.profileDisplay}>
        <div className={styles.profilePicture}>
          <img src={user.profilePicture} alt="" />
        </div>
        <div className={styles.text}>
          <p>{user.name}</p>
          {!hover && <FontAwesomeIcon icon={fas.faCaretDown} />}
          {hover && <FontAwesomeIcon icon={fas.faCaretUp} />}
        </div>
        {hover && (
          <div className={styles.menu}>
            <Link to="/profile">
              <p>Profile</p>
            </Link>
            <Link to="/">
              <p
                onClick={() => {
                  localStorage.removeItem("userlogin");
                  setUser(null);
                }}
              >
                Logout
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDisplay;
