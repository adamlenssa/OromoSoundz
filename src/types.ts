import React from "react";

export type Song = {
  id: string;
  songname: string;
  artistname: string;
  link: string;
  likes: number;
  type: string;
};

export type Comment = {
  id: string;
  userId: string;
  videoId: string;
  comment: string;
};

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  profilePicture: string;
};

export type UserLogin = {
  username: string;
  password: string;
};

export type RegisterUser = {
  username: string;
  password: string;
  email: string;
  profilePicture: string;
  name: string;
};

export type Like = {
  userid: string | undefined;
  videoid: string;
  id: string;
};

export type TGlobalContext = {
  allSongs: Song[];
  setAllSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  searchingSongs: string;
  setSearchingSongs: React.Dispatch<React.SetStateAction<string>>;
  shewaMusic: Song[];
  wallagaMusic: Song[];
  baleeMusic: Song[];
  iluAbaboraMusic: Song[];
  walloMusic: Song[];
  jimmaaMusic: Song[];
  modernMusic: Song[];
  sections: {
    name: string;
    songs: Song[];
  }[];
  allComments: Comment[];
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  userInformation: User | UserLogin;
  setUserInformation: React.Dispatch<React.SetStateAction<User | UserLogin>>;
  userLogin: (userInformation: UserLogin) => Promise<User | undefined>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  registerUser: RegisterUser;
  setRegisterUser: React.Dispatch<React.SetStateAction<RegisterUser>>;
  registerUserInformation: (userInformation: RegisterUser) => Promise<Response>;
  checkIfLoggedIn: () => void;
  newSong: Omit<Song, "id">;
  setNewSong: React.Dispatch<React.SetStateAction<Omit<Song, "id">>>;
  addNewSong: (song: Omit<Song, "id">) => Promise<Response>;
  getAllSongs: () => Promise<string | void>;
  getAllLikes: () => Promise<string | void>;
  allLikes: Like[];
};
