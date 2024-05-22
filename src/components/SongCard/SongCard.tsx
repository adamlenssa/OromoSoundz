import styles from "./song-card.module.css";
import { Song } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import { Requests } from "../../API";
import toast from "react-hot-toast";

const SongCard = ({ song }: { song: Song }) => {
  const { allLikes, user, getAllLikes } = useGlobalContext();
  const linkUrl = `/songs/${song.id}`;
  const checkIfLiked = () =>
    allLikes.find((like) => like.userid == user?.id && like.videoid == song.id);
  return (
    <div className={styles.songCard}>
      <iframe
        src={song.link}
        title={song.songname}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
      <div className={styles.text}>
        <Link to={linkUrl}>
          <h3>{song.songname}</h3>
        </Link>
        <h4>{song.artistname}</h4>
        <h4>
          Likes: {allLikes.filter((like) => like.videoid == song.id).length}
        </h4>
      </div>
      <div className={styles.ratings}>
        {user && (
          <FontAwesomeIcon
            icon={fas.faHeart}
            color={checkIfLiked() && "red"}
            onClick={() => {
              if (!checkIfLiked()) {
                return Requests.likeSong({
                  userid: user?.id,
                  videoid: song.id,
                })
                  .then(() => getAllLikes())
                  .then(() => toast.success("We Love this song too!"));
              }
              return Requests.unlikeSong(checkIfLiked()?.id)
                .then(() => getAllLikes())
                .then(() => toast.success("Unliked"));
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SongCard;
