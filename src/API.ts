import { Like, RegisterUser, Song } from "./types";

const baseURL = "http://localhost:3000/";

export const Requests = {
  getAllSongs: () =>
    fetch(`${baseURL}songs`)
      .then((res) => res.json())
      .catch(() => {
        throw new Error("Couldn't load the songs");
      }),
  getAllComments: () => fetch(`${baseURL}comments`).then((res) => res.json()),
  getAllUsers: () => fetch(`${baseURL}user`).then((res) => res.json()),
  registerNewUser: (userInformation: RegisterUser) =>
    fetch(`${baseURL}user`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userInformation),
    }).catch(() => {
      throw new Error("Couldn't Register User");
    }),
  getAllLikes: () => fetch(`${baseURL}favorites`).then((res) => res.json()),
  addNewSong: (newSong: Omit<Song, "id">) =>
    fetch(`${baseURL}songs`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newSong),
    }).catch(() => {
      throw new Error("Couldn't upload song");
    }),
  findUser: () => fetch(`${baseURL}user`).then((res) => res.json()),
  likeSong: (like: Omit<Like, "id">) =>
    fetch(`${baseURL}favorites`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(like),
    }).catch(() => {
      throw new Error("Failed to like the video");
    }),
  unlikeSong: (likeId: string | undefined) =>
    fetch(`${baseURL}favorites/${likeId}`, { method: "DELETE" }).catch(() => {
      throw new Error("Failed to unlike");
    }),
};
