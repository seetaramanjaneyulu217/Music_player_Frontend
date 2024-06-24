import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Song } from "../types";
import options from "../assets/options.svg";
import backward from "../assets/backward.svg";
import play from "../assets/play.svg";
import pause from "../assets/pause.svg";
import forward from "../assets/forward.svg";
import sound from "../assets/sound.svg";
import { passSongIndexToStore } from "../store/slices/song";

const CurrentlyPlayingSongDisplay = () => {
  const dispatch = useDispatch();
  const songRef = useRef<HTMLAudioElement>(null);
  const seekBar = useRef<HTMLHRElement>(null);
  const divRef = useRef<HTMLDivElement>(null)
  const songIndex = useSelector((state: any) => state.songs.songIndex);
  const song: Song = useSelector((state: any) => state.songs.song);
  const [currentSongAction, setCurrentSongAction] = useState<"play" | "pause">(
    "play"
  );

  const changeColorOfTheSeeker = () => {
    if (songRef.current) {
      return Math.floor(
        (songRef.current.currentTime / songRef.current.duration) * 100
      );
    }
  };


  const handleSeekBarClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (songRef.current && divRef.current) {
      songRef.current.currentTime = (e.nativeEvent.offsetX / divRef.current.offsetWidth) * songRef.current.duration
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentSongAction === "play") {
      interval = setInterval(() => {
        if (seekBar.current) {
          const percentage = changeColorOfTheSeeker();
          if (percentage! >= 100) {
            setCurrentSongAction("pause");
            clearInterval(interval);
          }
          seekBar.current.style.width = `${percentage}%`;
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [song, currentSongAction]);

  useEffect(() => {
    if (seekBar.current) seekBar.current.style.width = "0%";
  }, [songIndex])

  useEffect(() => {
    if (songRef.current) {
      if (currentSongAction === "pause") songRef.current.pause();
      else songRef.current.play();
    }
  }, [currentSongAction]);

  return (
    <>
      {song.name ? (
        <div className="w-full flex flex-col justify-end items-center md:w-6/12 xs:px-0 xs:py-0 md:px-16 md:py-14 lg:px-20 lg:py-24 mx-auto">
          {/* for song name and author name */}
          <div className="font-inter">
            <p className="font-bold text-3xl">{song.name}</p>
            <p className="font-normal opacity-60">{song.artist}</p>
          </div>

          {/* for image */}
          <div className="mt-4">
            <img
              src={`https://cms.samespace.com/assets/${song.cover}`}
              alt="cover"
              className="h-96 w-96 rounded-lg"
            />
          </div>

          {/* for seeker */}
          <div className="w-96 mt-6">
            <audio
              ref={songRef}
              src={song.url}
              autoPlay={currentSongAction === "play" ? true : false}
            />
            <div
              ref={divRef}
              className="bg-gray-600 rounded-full cursor-pointer"
              onClick={handleSeekBarClick}
            >
              <hr
                ref={seekBar}
                className={`border-none bg-white p-0.5 rounded-full`}
              ></hr>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between w-96">
            <div className="border rounded-full w-10 h-10 bg-[#FFFFFF1A] flex justify-center items-center cursor-pointer">
              <img src={options} alt="options" />
            </div>

            <div className="flex items-center gap-x-3">
              <img
                onClick={() =>
                  dispatch(passSongIndexToStore({ songIndex: songIndex - 1 }))
                }
                src={backward}
                alt="backward"
                className="cursor-pointer"
              />
              <div
                onClick={() =>
                  setCurrentSongAction((prev) =>
                    prev === "play" ? "pause" : "play"
                  )
                }
                className="border rounded-full w-10 h-10 bg-white flex justify-center items-center cursor-pointer"
              >
                <img
                  src={currentSongAction === "play" ? pause : play}
                  alt="options"
                />
              </div>
              <img
                onClick={() =>
                  dispatch(passSongIndexToStore({ songIndex: songIndex + 1 }))
                }
                src={forward}
                alt="forward"
                className="cursor-pointer"
              />
            </div>

            <div className="border rounded-full w-10 h-10 bg-[#FFFFFF1A] flex justify-center items-center cursor-pointer">
              <img src={sound} alt="options" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center my-auto text-4xl mx-auto">
          <p>Select any song to play</p>
        </div>
      )}
    </>
  );
};

export default CurrentlyPlayingSongDisplay;
