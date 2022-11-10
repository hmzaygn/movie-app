import Box from "@mui/material/Box";
import React from "react";

const VideoSection = ({ videoKey }) => {
  const videoAdress = videoKey.results[0].key;

  return (
    <Box>
      <iframe
        className="rounded-xl"
        src={`https://www.youtube.com/embed/${videoAdress}?autoplay=1&mute=1`}
        title="YouTube video"
        allowFullScreen
        style={{ width: "600px", height: "350px" }}
      ></iframe>
    </Box>
  );
};

export default VideoSection;
