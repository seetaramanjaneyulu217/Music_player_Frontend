import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Song } from "../types";
import options from "../assets/options.svg";
import backward from "../assets/backward.svg";
import play from '../assets/play.svg'
import pause from "../assets/pause.svg";
import forward from "../assets/forward.svg";
import sound from "../assets/sound.svg";

const CurrentlyPlayingSongDisplay = () => {
  const songRef = useRef<HTMLAudioElement>(null);
  const seekBar = useRef<HTMLHRElement>(null);
  const song: Song = useSelector((state: any) => state.songs.song);
  const [currentSongAction, setCurrentSongAction] = useState<string>("play")

  const changeColorOfTheSeeker = () => {
    if (songRef.current) {
      return Math.floor((songRef.current.currentTime / songRef.current?.duration) * 100);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout
    if(currentSongAction === "play") {
      interval = setInterval(() => {
        if (seekBar.current && song.duration) {
          const percentage = changeColorOfTheSeeker();
          console.log(percentage)
          seekBar.current.style.width = `${percentage}%`;
        }
      }, 1000);
    }

    return () => clearInterval(interval)
  }, [song, currentSongAction]);

  useEffect(() => {
    if(songRef.current) {
      if(currentSongAction === "pause")
        songRef.current.pause()
      else
        songRef.current.play()
    }
  }, [currentSongAction])


  return (
    <>
      {song.name ? (
        <div className="w-full md:w-6/12 px-20 py-24 mx-auto">
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
            {/* <input
              type="range"
              min="0"
              max={song.duration}
              // value={}
              className="w-full mt-2"
            /> */}
            <audio ref={songRef} src={song.url} autoPlay />
            <div className="bg-gray-600 rounded-full cursor-pointer">
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
              <img src={backward} alt="backward" className="cursor-pointer" />
              <div onClick={() => setCurrentSongAction(prev => prev === "play" ? "pause" : "play")} className="border rounded-full w-10 h-10 bg-white flex justify-center items-center cursor-pointer">
                <img src={currentSongAction === "play" ? pause : play} alt="options" />
              </div>
              <img src={forward} alt="forward" className="cursor-pointer" />
            </div>

            <div className="border rounded-full w-10 h-10 bg-[#FFFFFF1A] flex justify-center items-center cursor-pointer">
              <img src={sound} alt="options" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-4xl mx-auto">
          <p>Select any song to play</p>
        </div>
      )}
    </>
  );
};

export default CurrentlyPlayingSongDisplay;
