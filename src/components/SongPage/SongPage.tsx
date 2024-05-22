import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header.tsx/Header";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import styles from "./SongPage.module.css";
import { Requests } from "../../API";
import { useEffect, useState } from "react";
import { Comment, User } from "../../types";

const SongPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { id } = useParams();
  const { allSongs, allComments, user } = useGlobalContext();
  const song = allSongs.find((song) => song.id == id);
  const comments = allComments.filter((comment) => comment.videoId == song?.id);
  const settingUsers = () => Requests.findUser().then(setUsers);
  const findUserInformation = (comment: Comment) =>
    users.find((user) => user.id == comment.userId);
  useEffect(() => {
    settingUsers();
  }, []);
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h2>{song?.songname}</h2>
        <h3>{song?.artistname}</h3>
        <iframe
          className={styles.video}
          src={song?.link}
          title={song?.songname}
          allow="accelerometer; autoplay; mute; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className={styles.comments}>
          <h4>Comments</h4>
          <div className={styles.commentsFlex}>
            {comments.length == 0 && <h2>No Comments</h2>}
            {comments.length > 0 &&
              comments.map((comment) => (
                <div className={styles.comment}>
                  <div className={styles.top}>
                    <div className={styles.profilePic}>
                      <img
                        src={findUserInformation(comment)?.profilePicture}
                        alt=""
                      />
                    </div>
                    <h5>{findUserInformation(comment)?.username}</h5>
                  </div>
                  <p>{comment.comment}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SongPage;
