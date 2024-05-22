import Header from "../Header.tsx/Header";
import styles from "./RegistrationPage.module.css";
import { profilePictureOptions } from "../../Constants/pictures.ts";
import { useGlobalContext } from "../../Providers/GlobalProvider.tsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const {
    registerUser,
    setRegisterUser,
    registerUserInformation,
    checkIfLoggedIn,
  } = useGlobalContext();
  return (
    <>
      <Header />
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <h1>Registration</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerUserInformation(registerUser)
                .then(() => {
                  setRegisterUser({
                    username: "",
                    password: "",
                    email: "",
                    profilePicture: "./public/ProfilePictureOptions/9.jpg",
                    name: "",
                  });
                  localStorage.setItem(
                    "userlogin",
                    JSON.stringify(registerUser)
                  );
                  checkIfLoggedIn();
                  navigate("/music");
                })
                .catch((e) => toast.error(e.message));
            }}
          >
            <div className={styles.row}>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                value={registerUser.username}
                onChange={(e) => {
                  setRegisterUser({
                    ...registerUser,
                    username: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                value={registerUser.password}
                onChange={(e) => {
                  setRegisterUser({
                    ...registerUser,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                value={registerUser.name}
                onChange={(e) => {
                  setRegisterUser({ ...registerUser, name: e.target.value });
                }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={registerUser.email}
                onChange={(e) => {
                  setRegisterUser({ ...registerUser, email: e.target.value });
                }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="picture">Profile Picture:</label>
              <select
                name="picture"
                id=""
                value={registerUser.profilePicture}
                onChange={(e) => {
                  setRegisterUser({
                    ...registerUser,
                    profilePicture: e.target.value,
                  });
                }}
              >
                {profilePictureOptions.map((option) => (
                  <option value={option.picture} key={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </section>
    </>
  );
};

export default RegistrationPage;
