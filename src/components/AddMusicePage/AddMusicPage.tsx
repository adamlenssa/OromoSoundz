import toast from "react-hot-toast";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import styles from "./AddMusicPage.module.css";
import Header from "../Header.tsx/Header";
import { useNavigate } from "react-router-dom";

const AddMusicPage = () => {
  const { newSong, setNewSong, addNewSong, getAllSongs, user } =
    useGlobalContext();
  const makeEmbedded = (link: string) => {
    const newLink = link.replace("watch?v=", "embed/");
    return newLink;
  };
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }
  return (
    <>
      <Header />
      <section>
        <div className={styles.container}>
          <h1>Add New Music</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNewSong(newSong)
                .then(() => {
                  setNewSong({
                    artistname: "",
                    songname: "",
                    link: "",
                    type: "Wallaga",
                    likes: 0,
                  });
                  toast.success("Successfully added songs");
                  getAllSongs();
                })
                .catch((err) => toast.error(err.message));
            }}
          >
            <div className={styles.row}>
              <label htmlFor="songname">Song Name: </label>
              <input
                type="text"
                value={newSong.songname}
                required
                onChange={(e) =>
                  setNewSong({ ...newSong, songname: e.target.value })
                }
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="artistname">Artist Name: </label>
              <input
                type="text"
                value={newSong.artistname}
                required
                onChange={(e) =>
                  setNewSong({ ...newSong, artistname: e.target.value })
                }
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="Link">Link: </label>
              <input
                type="text"
                value={newSong.link}
                required
                onChange={(e) =>
                  setNewSong({ ...newSong, link: makeEmbedded(e.target.value) })
                }
              />
            </div>
            <p>Make sure to paste the url from the youtube video!</p>
            <div className={styles.row}>
              <label htmlFor="type">Type: </label>
              <select
                name="type"
                id="type"
                required
                onChange={(e) =>
                  setNewSong({ ...newSong, type: e.target.value })
                }
              >
                <option>Wallaga</option>
                <option>Shewa</option>
                <option>Arsi</option>
                <option>Hararghe</option>
                <option>Ilu Ababora</option>
                <option>Jimmaa</option>
                <option>Balee</option>
                <option>Borana</option>
                <option>Wallo</option>
                <option>Oldies</option>
                <option>Modern</option>
              </select>
            </div>
            <input type="submit" value="Add Song" />
          </form>
        </div>
      </section>
    </>
  );
};

export default AddMusicPage;
