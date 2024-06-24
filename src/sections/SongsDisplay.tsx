import React, { useEffect } from "react";
import "./SongsDisplay.css";
import search from "../assets/search.svg";
import { Song } from "../types";
import SongCard from "../components/SongCard";
import { passSongTypeToStore, passSongsToStore } from "../store/slices/song";
import { useDispatch, useSelector } from "react-redux";

const SongsDisplay = () => {
  const dispatch = useDispatch();
  const songs: Song[] = useSelector((state: any) => state.songs.songs);
  let forYou = songs.filter((song: Song) => !song.top_track);
  let topTracks = songs.filter((song: Song) => song.top_track);
  const songsType = useSelector((state: any) => state.songs.songsType);

  useEffect(() => {
    const fetchSongs = () => {
      fetch("https://cms.samespace.com/items/songs", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((songs) => {
          dispatch(passSongsToStore({ songs: songs.data }));
        });
    };
    fetchSongs();
  }, []);

  return (
    <div className="w-full md:w-4/12 p-9">
      {/* for type of songs */}
      <div className="flex flex-col items-start lg:flex-row lg:items-center lg:gap-x-9 text-xl font-inter font-bold">
        <p
          onClick={() =>
            dispatch(passSongTypeToStore({ songsType: "For You" }))
          }
          className={`${songsType !== "For You" && "opacity-50 cursor-pointer"}`}
        >
          For You
        </p>
        <p
          onClick={() =>
            dispatch(passSongTypeToStore({ songsType: "Top Tracks" }))
          }
          className={`${songsType !== "Top Tracks" && "opacity-50 cursor-pointer"}`}
        >
          Top Tracks
        </p>
      </div>

      {/* for search */}
      <div className="relative mt-8">
        <input
          type="text"
          placeholder="Search Song, Artist"
          className="bg-[#FFFFFF14] border border-[#FFFFFF14] w-[360px] px-4 py-2 text-sm font-inter font-normal rounded-lg outline-none"
        />
        <img
          src={search}
          alt="search"
          className="text-[#FFFFFF14] absolute top-1/4 right-28"
        />
      </div>

      {/* for displaying songs */}
      <div className="mt-8 h-[550px] max-w-[360px] overflow-y-auto scrollbar">
        {songsType === "For You"
          ? forYou.map((song: Song) => (
              <SongCard key={song.id} song={song} dispatch={dispatch} />
            ))
          : topTracks.map((song: Song) => (
              <SongCard key={song.id} song={song} dispatch={dispatch} />
            ))}
      </div>
    </div>
  );
};

export default SongsDisplay;
