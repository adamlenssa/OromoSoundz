import { Link } from "react-router-dom";
import { Song } from "../../types";
import SongCard from "../SongCard/SongCard";
import styles from "./SongRow.module.css";

const SongRow = ({ songs, title }: { songs: Song[]; title: string }) => {
  const linkurl = `/music/${title}`;
  if (songs.length == 0) {
    return (
      <div className={styles.songRow}>
        <Link to={linkurl}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
        <p>No Songs Available</p>
      </div>
    );
  }
  return (
    <div className={styles.songRow}>
      <Link to={linkurl}>
        <h3 className={styles.title}>{title}</h3>
      </Link>
      <div className={styles.row}>
        {songs.map((song) => (
          <SongCard song={song} key={song.id} />
        ))}
      </div>
    </div>
  );
};

export default SongRow;
