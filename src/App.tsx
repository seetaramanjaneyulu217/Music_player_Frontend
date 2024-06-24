import React from "react";
import LogoAndProfileSection from "./sections/LogoAndProfileSection";
import SongsDisplay from "./sections/SongsDisplay";
import CurrentlyPlayingSongDisplay from "./sections/CurrentlyPlayingSongDisplay";
import { useSelector } from "react-redux";
import { Song } from "./types";

function App() {
  const song: Song = useSelector((state: any) => state.songs.song);

  return (
    <div
      style={{
        background: song.accent
          ? `linear-gradient(to right, ${song.accent} , black)`
          : "black",
      }}
      className={`text-white h-screen flex flex-col md:flex-row`}
    >
      <LogoAndProfileSection />
      <SongsDisplay />
      <CurrentlyPlayingSongDisplay />
    </div>
  );
}

export default App;
