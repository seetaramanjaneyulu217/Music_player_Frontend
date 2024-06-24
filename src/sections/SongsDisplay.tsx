import React, { useEffect, useState } from "react";
import "./SongsDisplay.css";
import search from "../assets/search.svg";
import { Song } from "../types";
import SongCard from "../components/SongCard";
import {
  passFilteredSongsToStore,
  passSearchTextToStore,
  passSongTypeToStore,
  passSongsToStore,
} from "../store/slices/song";
import { useDispatch, useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCancel } from "react-icons/md";

const SongsDisplay = () => {
  const dispatch = useDispatch();
  const searchText: string = useSelector(
    (state: any) => state.songs.searchText
  );
  let songs: Song[] = useSelector((state: any) => state.songs.songs);
  let filteredSongs: Song[] = useSelector(
    (state: any) => state.songs.filteredSongs
  );
  let forYou = songs.filter((song: Song) => !song.top_track);
  let topTracks = songs.filter((song: Song) => song.top_track);
  const songsType = useSelector((state: any) => state.songs.songsType);

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const filterOutSongsBySearchText = (songs: Song[]): Song[] => {
    const filteredSongs = songs.filter(
      (song: Song) =>
        song.name
          .replace(" ", "")
          .toLowerCase()
          .includes(searchText.replace(" ", "").toLowerCase()) ||
        song.artist
          .replace(" ", "")
          .toLowerCase()
          .includes(searchText.replace(" ", "").toLowerCase())
    );
    return filteredSongs;
  };

  useEffect(() => {
    if (!searchText) {
      dispatch(passFilteredSongsToStore({ filteredSongs: [] }));
      return;
    }

    if (songsType === "For You") {
      forYou = filterOutSongsBySearchText(forYou);
      dispatch(passFilteredSongsToStore({ filteredSongs: forYou }));
    } else if (songsType === "Top Tracks") {
      topTracks = filterOutSongsBySearchText(topTracks);
      dispatch(passFilteredSongsToStore({ filteredSongs: topTracks }));
    }
  }, [searchText, songsType]);

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
    <>
      <div className="w-full md:w-4/12 hidden md:block p-9">
        {/* for type of songs */}
        <div className="flex items-start flex-row lg:items-center gap-x-9 text-xl font-inter font-bold">
          <p
            onClick={() =>
              dispatch(passSongTypeToStore({ songsType: "For You" }))
            }
            className={`${
              songsType !== "For You" && "opacity-50 cursor-pointer"
            }`}
          >
            For You
          </p>
          <p
            onClick={() =>
              dispatch(passSongTypeToStore({ songsType: "Top Tracks" }))
            }
            className={`${
              songsType !== "Top Tracks" && "opacity-50 cursor-pointer"
            }`}
          >
            Top Tracks
          </p>
        </div>

        {/* for search */}
        <div className="relative mt-8 md:w-96 lg:w-full">
          <input
            type="text"
            onChange={(e) =>
              dispatch(passSearchTextToStore({ searchText: e.target.value }))
            }
            placeholder="Search Song, Artist"
            className="bg-[#FFFFFF14] border border-[#FFFFFF14] w-[360px] px-4 py-2 text-sm font-inter font-normal rounded-lg outline-none"
          />
          <img
            src={search}
            alt="search"
            className="absolute top-1/2 md:right-12 lg:right-24 transform -translate-y-1/2 text-[#FFFFFF14]"
          />
        </div>

        {/* for displaying songs */}
        <div className="mt-8 h-[550px] max-w-[360px] overflow-y-auto scrollbar">
          {songsType === "For You"
            ? searchText
              ? filteredSongs?.map((song: Song, index: number) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    index={index}
                    dispatch={dispatch}
                  />
                ))
              : forYou.map((song: Song, index: number) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    index={index}
                    dispatch={dispatch}
                  />
                ))
            : searchText
            ? filteredSongs?.map((song: Song, index: number) => (
                <SongCard
                  key={song.id}
                  song={song}
                  index={index}
                  dispatch={dispatch}
                />
              ))
            : topTracks.map((song: Song, index: number) => (
                <SongCard
                  key={song.id}
                  song={song}
                  index={index}
                  dispatch={dispatch}
                />
              ))}
        </div>
      </div>

      <div onClick={() => setOpenMenu(true)} className="md:hidden px-6">
        <RxHamburgerMenu size={30} />
      </div>

      {/* for mobile view */}
      <div
        className={`md:hidden ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 flex flex-col xs:w-6/12 sm:w-5/12 h-screen py-10 ease-in-out duration-500 bg-black z-10`}
      >
        <div>
          <MdOutlineCancel
            size={30}
            color="white"
            fill="white"
            className="ml-4 mb-3 text-white cursor-pointer"
            onClick={() => setOpenMenu(false)}
          />
        </div>

        <div>
          {songs.map((song: Song, index: number) => (
            <SongCard
              key={song.id}
              song={song}
              index={index}
              dispatch={dispatch}
              setOpenMenu={setOpenMenu}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SongsDisplay;
