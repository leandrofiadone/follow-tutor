// YouTubeDuration.tsx
import React, {useState} from "react"
import {getVideoDuration} from "../utils/youtubeApi" // Importa la función
import {formatTime} from "../utils/formatTime"
import "./YoutubeDuration.css"

const YouTubeDuration: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState("")
  const [videoInfo, setVideoInfo] = useState({
    duration: 0,
    playedTime: 0,
    playedPercentage: 0
  })

  const fetchVideoDuration = async () => {
    const durationInfo = await getVideoDuration(videoUrl)
    setVideoInfo(durationInfo)
  }

  return (
    <div>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Pega el enlace de YouTube aquí"
      />
      <button onClick={fetchVideoDuration}>Obtener Duración</button>
      {videoInfo.duration > 0 && (
        <>
          <p>Duración total del video: {formatTime(videoInfo.duration)}</p>
          <p>Tiempo reproducido: {formatTime(videoInfo.playedTime)}</p>
          <p>Porcentaje reproducido: {videoInfo.playedPercentage}%</p>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{width: `${videoInfo.playedPercentage}%`}}></div>
          </div>
        </>
      )}
    </div>
  )
}

export default YouTubeDuration
