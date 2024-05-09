import { useEffect, useState, useRef } from "react";
import "./App.css";
import Header from "./ui/Header";
import MusicPlayer from "./ui/MusicPlayer";

import { RingLoader } from "react-spinners";

//Icons
import { FaPause, FaPlay, FaVolumeHigh } from "react-icons/fa6";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";

//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [onPlaylistCilck, setOnPlaylistClick] = useState(false);
  const [currTrackIndex, setCurrTrackIndex] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsplaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [music, setMusic] = useState("");
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(0);

  // music && !isPlaying ? audioRef.current.play() : audioRef.current.pause();
  const toggleAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsplaying(true);
    } else {
      audioRef.current.pause();
      setIsplaying(false);
    }
  };

  useEffect(() => {
    getTrack("indian hop-hop");
  }, []);

  useEffect(() => {
    let timerId;
    if (isPlaying) {
      timerId = setTimeout(() => {
        setCurrentTime(audioRef.current.currentTime);
        console.log(audioRef.current.currentTime);
      }, 1000);
    } else {
      clearTimeout(timerId);
    }

    if (currentTime > 29) {
      setIsplaying(false);
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setCurrentTime(0);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isPlaying, audioRef.current.currentTime]);

  const getTrack = async (q) => {
    setIsLoading(true);
    setPlayerVisibility(false);
    setCurrTrackIndex();
    // await fetch(
    //   `https://v1.nocodeapi.com/krish_hub/spotify/XYmheUWMVlyXVPrr/search?q=${q}&type=track`
    // ).then(async (res) => {
    //   const jsonRes = await res.json();
    //   console.log(jsonRes.tracks.items);

    //   setTracks(jsonRes.tracks.items);
    // });
    await fetch(
      `https://itunes.apple.com/search?term=${q}&country=in&music=musicTrack`
    )
      .then(async (res) => {
        const jsonRes = await res.json();
        console.log(jsonRes.results);
        // console.log(jsonRes.results.length);
        setTracks(jsonRes.results);
      })
      .catch(() => {
        toast.error(
          "music API expired you cant litsen songs right now contact developer:("
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const playNext = () => {
    if (
      currTrackIndex >= 0 &&
      (onPlaylistCilck
        ? currTrackIndex < playlist.length - 1
        : currTrackIndex < tracks.length - 1)
    ) {
      setMusic(tracks[currTrackIndex + 1].previewUrl);
      setCurrTrackIndex((value) => value + 1);
      toggleAudio();
      setIsplaying(false);
      setCurrentTime(0);
      audioRef.current.setCurrentTime = 0;
    }
    console.log(currTrackIndex, tracks.length);
  };

  const playPrevious = () => {
    if (currTrackIndex > 0) {
      setMusic(tracks[currTrackIndex - 1].previewUrl);
      setCurrTrackIndex((value) => value - 1);
      toggleAudio();
      setIsplaying(false);
      setCurrentTime(0);
      audioRef.current.setCurrentTime = 0;
    }
  };

  const handleChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const handleChangeVolume = (e) => {
    audioRef.current.volume = e.target.value;
    setVolume(e.target.value);
  };

  return (
    <div className="App">
      <ToastContainer position="top-center" theme="dark" />
      <Header getTrack={getTrack} />

      <button
        id="bottone1"
        onClick={() => {
          setOnPlaylistClick((value) => !value);
          setIsplaying(false);
          setPlayerVisibility(false);
          audioRef.current.pause();
          setCurrTrackIndex(null);
        }}
      >
        {onPlaylistCilck ? (
          <strong> Go to Home</strong>
        ) : (
          <strong>Go to your playlist</strong>
        )}
      </button>

      <div className="main">
        <RingLoader color="#98fb98" loading={isLoading} size="3em" />
        {!isLoading &&
          (onPlaylistCilck
            ? playlist.map((elements, index) => {
                return (
                  <MusicPlayer
                    key={index}
                    index={index}
                    playlist={playlist}
                    setPlaylist={setPlaylist}
                    elements={elements}
                    currTrackIndex={currTrackIndex}
                    setCurrentTime={setCurrentTime}
                    setCurrTrackIndex={setCurrTrackIndex}
                    setMusic={setMusic}
                    setPlayerVisibility={setPlayerVisibility}
                    image={elements.artworkUrl100}
                    name={elements.trackName}
                    music={elements.previewUrl}
                    artistName={elements.artistName}
                    gerneName={elements.primaryGenreName}
                    setIsplaying={setIsplaying}
                    setOnPlaylistClick={true}
                  />
                );
              })
            : tracks.map((elements, index) => {
                return (
                  <MusicPlayer
                    key={index}
                    index={index}
                    playlist={playlist}
                    setPlaylist={setPlaylist}
                    elements={elements}
                    currTrackIndex={currTrackIndex}
                    setCurrentTime={setCurrentTime}
                    setCurrTrackIndex={setCurrTrackIndex}
                    setMusic={setMusic}
                    setPlayerVisibility={setPlayerVisibility}
                    image={elements.artworkUrl100}
                    name={elements.trackName}
                    music={elements.previewUrl}
                    artistName={elements.artistName}
                    gerneName={elements.primaryGenreName}
                    setIsplaying={setIsplaying}
                  />
                );
              }))}
      </div>

      <div
        className="player"
        style={
          playerVisibility === true
            ? { height: "10%", visibility: "visible" }
            : { height: "0%", visibility: "hidden" }
        }
      >
        <audio ref={audioRef} src={music}></audio>
        <input
          type="range"
          value={currentTime}
          min="0"
          max={30}
          className="slider"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <div className="player-btn">
          <GiPreviousButton
            size="23"
            className="pl-btn"
            onClick={() => playPrevious()}
          />
          {isPlaying ? (
            <FaPause
              size="23"
              className="pl-btn"
              onClick={() => toggleAudio()}
            />
          ) : (
            <FaPlay
              size="23"
              className="pl-btn"
              onClick={() => toggleAudio()}
            />
          )}
          <GiNextButton
            size="23"
            className="pl-btn"
            onClick={() => playNext()}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0 30px",
              right: "20%",
            }}
          >
            <FaVolumeHigh size="23" className="pl-btn" />
            <input
              type="range"
              className="slider"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleChangeVolume}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
