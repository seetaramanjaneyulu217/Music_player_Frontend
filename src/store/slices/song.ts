import { createSlice } from "@reduxjs/toolkit";
import { Song } from "../../types";

interface InitialState {
  songs: Song[];
  filteredSongs: Song[];
  song: Song;
  songsType: string;
  songIndex: number;
  searchText: string;
}

const initialState: InitialState = {
  songs: [],
  filteredSongs: [],
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
    user_updated: "",
  },
  songsType: "For You",
  songIndex: 0,
  searchText: "",
};

const songsData = createSlice({
  name: "songs",
  initialState,
  reducers: {
    passSongsToStore: (state, action) => {
      state.songs = action.payload.songs;
    },
    passSongToStore: (state, action) => {
      state.song = action.payload.song;
    },
    passSongTypeToStore: (state, action) => {
      state.songsType = action.payload.songsType;
    },
    passInitialSongIndexToStore: (state, action) => {
      state.songIndex = action.payload.songIndex;
    },
    passSongIndexToStore: (state, action) => {
      const forYou = state.songs.filter((song: Song) => !song.top_track);
      const topTracks = state.songs.filter((song: Song) => song.top_track);

      if (state.songsType === "For You") {
        if (action.payload.songIndex < 0) {
          state.songIndex = forYou.length - 1;
          state.song = forYou[state.songIndex];
        } else if (action.payload.songIndex >= forYou.length) {
          state.songIndex = 0;
          state.song = forYou[state.songIndex];
        } else {
          state.song = forYou[action.payload.songIndex];
          state.songIndex = action.payload.songIndex;
        }
      } else {
        if (action.payload.songIndex < 0) {
          state.songIndex = topTracks.length - 1;
          state.song = topTracks[state.songIndex];
        } else if (action.payload.songIndex >= topTracks.length) {
          state.songIndex = 0;
          state.song = topTracks[state.songIndex];
        } else {
          state.song = topTracks[action.payload.songIndex];
          state.songIndex = action.payload.songIndex;
        }
      }
    },
    passSearchTextToStore: (state, action) => {
      state.searchText = action.payload.searchText;
    },
    passFilteredSongsToStore: (state, action) => {
      state.filteredSongs = action.payload.filteredSongs
    }
  },
});

export const {
  passSongsToStore,
  passSongToStore,
  passSongTypeToStore,
  passSongIndexToStore,
  passInitialSongIndexToStore,
  passSearchTextToStore,
  passFilteredSongsToStore
} = songsData.actions;
export default songsData.reducer;
