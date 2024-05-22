import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import Header from "../Header.tsx/Header";
import toast from "react-hot-toast";
import { useEffect } from "react";
import styles from "./LoginPage.module.css";
const LoginPage = () => {
  const { userInformation, setUserInformation, userLogin, setUser } =
    useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("userlogin");
    if (!user) {
      return;
    }
    navigate("/music");
  }, [navigate]);
  return (
    <>
      <Header />
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              userLogin(userInformation)
                .then((user) => {
                  if (user?.password !== userInformation.password) {
                    toast.error("Password Incorrect");
                    return;
                  }
                  localStorage.setItem("userlogin", JSON.stringify(user));
                  setUser(user);
                  navigate("/music");
                })
                .catch(() => toast.error("Username Incorrect"));
            }}
          >
            <div className={styles.row}>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                id="username"
                value={userInformation.username}
                onChange={(e) => {
                  setUserInformation({
                    username: e.target.value,
                    password: userInformation.password,
                  });
                }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                id="username"
                onChange={(e) => {
                  setUserInformation({
                    username: userInformation.username,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <input type="submit" value="Login" />
            <p>
              If you are new here,{" "}
              <Link to="/register">click here to register.</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
