import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Comment,
  Like,
  RegisterUser,
  Song,
  TGlobalContext,
  User,
  UserLogin,
} from "../types";
import { Requests } from "../API";
import toast from "react-hot-toast";

const GlobalContext = createContext<TGlobalContext>({} as TGlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [allLikes, setAllLikes] = useState<Like[]>([]);
  const [searchingSongs, setSearchingSongs] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [userInformation, setUserInformation] = useState<UserLogin | User>({
    username: "",
    password: "",
  });
  const [user, setUser] = useState<User | null>(null);
  const [registerUser, setRegisterUser] = useState<RegisterUser>({
    username: "",
    password: "",
    email: "",
    profilePicture: "./public/ProfilePictureOptions/9.jpg",
    name: "",
  });
  const [newSong, setNewSong] = useState<Omit<Song, "id">>({
    artistname: "",
    songname: "",
    link: "",
    type: "Wallaga",
    likes: 0,
  });
  const shewaMusic = allSongs.filter((song) => song.type == "Shewa");
  const wallagaMusic = allSongs.filter((song) => song.type == "Wallaga");
  const walloMusic = allSongs.filter((song) => song.type == "Wallo");
  const jimmaaMusic = allSongs.filter((song) => song.type == "Jimmaa");
  const baleeMusic = allSongs.filter((song) => song.type == "Balee");
  const iluAbaboraMusic = allSongs.filter((song) => song.type == "Ilu Ababora");
  const modernMusic = allSongs.filter((song) => song.type == "Modern");
  const arsiMusic = allSongs.filter((song) => song.type == "Arsi");
  const harargheMusic = allSongs.filter((song) => song.type == "Hararghe");
  const boranaMusic = allSongs.filter((song) => song.type == "Borana");
  const oldiesMusic = allSongs.filter((song) => song.type == "Oldies");
  const getAllSongs = () =>
    Requests.getAllSongs()
      .then(setAllSongs)
      .catch((err) => toast.error(err.message));
  const getAllComments = () =>
    Requests.getAllComments()
      .then(setAllComments)
      .catch((err) => console.log(err));
  const getAllLikes = () =>
    Requests.getAllLikes()
      .then(setAllLikes)
      .catch((err) => toast.error(err.message));
  const userLogin = async (userInformation: UserLogin) => {
    const user = await Requests.getAllUsers().then((users) =>
      users.find((user: User) => user.username == userInformation.username)
    );
    if (!user) {
      throw new Error("Username Incorrect");
    }
    return user;
  };
  const checkIfLoggedIn = () => {
    const loggedin = localStorage.getItem("userlogin");
    if (!loggedin) {
      return;
    }
    setUser(JSON.parse(loggedin));
  };
  const registerUserInformation = (userInformation: RegisterUser) =>
    Requests.registerNewUser(userInformation);
  const addNewSong = (song: Omit<Song, "id">) => Requests.addNewSong(song);

  const sections = [
    { name: "Wallaga", songs: wallagaMusic },
    { name: "Shewa", songs: shewaMusic },
    { name: "Jimma", songs: jimmaaMusic },
    { name: "Balee", songs: baleeMusic },
    { name: "Wallo", songs: walloMusic },
    { name: "Modern", songs: modernMusic },
    { name: "Ilu Ababora", songs: iluAbaboraMusic },
    { name: "Arsi", songs: arsiMusic },
    { name: "Hararghe", songs: harargheMusic },
    { name: "Borana", songs: boranaMusic },
    { name: "Oldies", songs: oldiesMusic },
  ];
  useEffect(() => {
    getAllSongs();
    getAllComments();
    getAllLikes();
    checkIfLoggedIn();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        allSongs,
        setAllSongs,
        searchingSongs,
        setSearchingSongs,
        shewaMusic,
        wallagaMusic,
        baleeMusic,
        walloMusic,
        iluAbaboraMusic,
        jimmaaMusic,
        modernMusic,
        sections,
        allComments,
        focus,
        setFocus,
        isSearching,
        setIsSearching,
        userInformation,
        setUserInformation,
        userLogin,
        user,
        setUser,
        registerUser,
        setRegisterUser,
        registerUserInformation,
        checkIfLoggedIn,
        newSong,
        setNewSong,
        addNewSong,
        getAllSongs,
        getAllLikes,
        allLikes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalProvider;
