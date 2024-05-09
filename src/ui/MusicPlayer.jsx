import React from "react";
import "./MusicPlayer.css";

//alert
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PiPlaylist } from "react-icons/pi";

const MusicPlayer = ({
  index,
  image,
  name,
  music,
  setPlayerVisibility,
  setMusic,
  artistName,
  gerneName,
  setIsplaying,
  setCurrTrackIndex,
  currTrackIndex,
  setCurrentTime,
  playlist,
  setPlaylist,
  setOnPlaylistClick,
  elements,
}) => {
  const deleteTrackFromPlaylist = () => {
    const newPlaylist = [...playlist];
    newPlaylist.splice(index, 1);
    setPlaylist(newPlaylist);
  };

  const addTrackToPlaylist = () => {
    if (!(playlist && playlist.includes(elements))) {
      setOnPlaylistClick
        ? deleteTrackFromPlaylist()
        : setPlaylist((value) => [elements, ...value]);
    } else {
      toast.warning("Song already added to playlist");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" theme="dark" />
      <div
        className="card"
        onClick={() => {
          setCurrTrackIndex(index);
          setMusic(music);
          music && setPlayerVisibility(true);
          setIsplaying(false);
          setCurrentTime(0);
        }}
        style={
          currTrackIndex === index
            ? { backgroundColor: "#98fb98", color: "black" }
            : {}
        }
      >
        <img src={image} alt="not found" />

        <div style={{ width: "100%" }}>
          {name.length > 35 ? (
            <marquee>
              <p>{name}</p>
            </marquee>
          ) : (
            <p>{name}</p>
          )}
          <p
            className="desc"
            style={
              currTrackIndex === index ? { color: "black" } : { color: "white" }
            }
          >
            {artistName}, {gerneName}
          </p>
          <div
            className="list-btn"
            onClick={() => {
              setOnPlaylistClick
                ? deleteTrackFromPlaylist()
                : addTrackToPlaylist();
            }}
          >
            <PiPlaylist className="addList" />
            <p
              className="desc"
              style={
                currTrackIndex === index
                  ? { color: "black", margin: "0 10px" }
                  : { color: "white", margin: "0 10px" }
              }
            >
              {setOnPlaylistClick
                ? "delete from playlist"
                : playlist && playlist.includes(elements)
                ? "Added"
                : "Add to playlist"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
