import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import Header from "../Header.tsx/Header";
import SearchBar from "../SearchBar/SearchBar";
import SongCard from "../SongCard/SongCard";
import SongRow from "../SongRow/SongRow";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { sections, allSongs, searchingSongs, isSearching, user } =
    useGlobalContext();
  const searchedSongs = allSongs.filter(
    (song) =>
      song.songname.toUpperCase().includes(searchingSongs.toUpperCase()) ||
      song.artistname.toUpperCase().includes(searchingSongs.toUpperCase()) ||
      song.type.toUpperCase().includes(searchingSongs.toUpperCase())
  );
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }
  return (
    <>
      <Header />
      <SearchBar />
      {!isSearching &&
        sections.map((section, index) => (
          <SongRow songs={section.songs} title={section.name} key={index} />
        ))}
      {isSearching && (
        <div className={styles.filteredVideos}>
          {searchedSongs.map((song) => (
            <SongCard song={song} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
