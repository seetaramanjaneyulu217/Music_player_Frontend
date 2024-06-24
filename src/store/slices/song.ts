import { createSlice } from "@reduxjs/toolkit";
import { Song } from "../../types";

interface InitialState {
    songs: Song[];
    song: Song;
    songsType: string;
}

const initialState: InitialState = {
  songs: [],
  song: {
    accent: "",
    artist: "",
    cover: "",
    date_created: "",
    date_updated: "",
    duration: "",
    id: 0,
    name: "",
    sort: null,
    status: "",
    top_track: false,
    url: "",
    user_created: "",
    user_updated: ""
  },
  songsType: "For You"
};

const songsData = createSlice({
  name: "songs",
  initialState,
  reducers: {
    passSongsToStore: (state, action) => {
        state.songs = action.payload.songs
    },
    passSongToStore: (state, action) => {
        state.song = action.payload.song
    },
    passSongTypeToStore: (state, action) => {
      state.songsType = action.payload.songsType
    }
  }
});


export const { passSongsToStore, passSongToStore, passSongTypeToStore } = songsData.actions
export default songsData.reducer;