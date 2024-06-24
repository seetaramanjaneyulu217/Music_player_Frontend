import React from 'react';
import LogoAndProfileSection from './sections/LogoAndProfileSection';
import SongsDisplay from './sections/SongsDisplay';
import CurrentlyPlayingSongDisplay from './sections/CurrentlyPlayingSongDisplay';
import { useSelector } from 'react-redux';
import { Song } from './types';

function App() {

  const song: Song = useSelector((state: any) => state.songs.song)

  return (
    <div className={`text-white h-screen flex flex-col md:flex-row ${song.accent ? `bg-gradient-to-r from-[#331E00] to-black` : 'bg-black'} `}>
      <LogoAndProfileSection/>
      <SongsDisplay/>
      <CurrentlyPlayingSongDisplay/>
    </div>
  )
}

export default App;
