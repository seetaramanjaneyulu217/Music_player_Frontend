import React, { useEffect, useState } from "react";
import { Song } from "../types";
import { passInitialSongIndexToStore, passSongToStore } from "../store/slices/song";
import { useSelector } from "react-redux";

interface SongCardProps {
  song: Song;
  index: number;
  dispatch: any;
}

const SongCard = ({ song, index, dispatch }: SongCardProps) => {
  const currentlyPlayingSong = useSelector((state: any) => state.songs.song);
  const [songDuration, setSongDuration] = useState<string>("");

  useEffect(() => {
    const audio = new Audio(song.url);
    const handleSongMetaData = () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      setSongDuration(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    };
    audio.addEventListener("loadedmetadata", handleSongMetaData);
    return () => {
      audio.removeEventListener("loadedmetadata", handleSongMetaData);
    };
  }, [song]);

  return (
    <div
      onClick={() => {
        dispatch(passSongToStore({ song: { ...song, duration: songDuration } }))
        dispatch(passInitialSongIndexToStore({ songIndex: index }))
      }
      }
      className={`flex justify-between mb-3 cursor-pointer p-3 ${
        currentlyPlayingSong.id === song.id && "bg-[#FFFFFF14] rounded-lg"
      }`}
    >
      <div className="flex items-center gap-x-3">
        {/* for song cover image */}
        <div>
          <img
            src={`https://cms.samespace.com/assets/${song.cover}`}
            alt="song cover"
            className="h-12 w-12 rounded-full"
          />
        </div>

        {/* for song name and author name */}
        <div className="font-inter font-normal">
          <p className="text-lg">{song.name}</p>
          <p className="text-sm opacity-60">{song.artist}</p>
        </div>
      </div>

      {/* for duration of song */}
      <div className="opacity-60 mr-4 flex items-center">{songDuration}</div>
    </div>
  );
};

export default SongCard;
