import type React from "react"

interface VideoBackgroundProps {
  videoSrc: string
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoSrc }) => {
  return (
    <>
      <video autoPlay loop muted className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full z-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            opacity: 0.2,
          }}
        ></div>
      </div>
    </>
  )
}

