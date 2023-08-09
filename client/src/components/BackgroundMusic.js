import React, { useState } from 'react';
import backgroundMusic from '../background.mp3';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio ref={audioRef} src={backgroundMusic} loop />
      <button onClick={togglePlay}>{isPlaying ? 'Pause music' : 'Play music'}</button>
    </div>
  );
};

export default BackgroundMusic;
