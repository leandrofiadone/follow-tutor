import React, {useState} from "react"
import {getVideoDuration} from "../utils/youtubeApi"
import {formatTime} from "../utils/formatTime"
import "./YoutubeDuration.css"
import {useVideoStore} from "../stores/useVideoStore"

const YouTubeDuration: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState("")
  const [videoInfo, setVideoInfo] = useState({
    duration: 0,
    playedTime: 0,
    playedPercentage: 0,
    thumbnail: "",
    title: ""
  })
  const [showSaveButton, setShowSaveButton] = useState(false)

  const saveVideoInfoToStore = useVideoStore((state) => state.saveVideoInfo)

  const fetchVideoDuration = async () => {
    const durationInfo = await getVideoDuration(videoUrl)
    setVideoInfo(durationInfo)
    setShowSaveButton(true)
  }

  const saveVideoInfo = () => {
    const infoToSave = {
      ...videoInfo,
      videoUrl
    }
    saveVideoInfoToStore(infoToSave)
    alert("Información del video guardada.")
  }

  return (
    <div>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Pega el enlace de YouTube aquí"
      />
      <button onClick={fetchVideoDuration}>Obtener Información</button>
      {videoInfo.duration > 0 && (
        <>
          <h2>{videoInfo.title}</h2>
          <img src={videoInfo.thumbnail} alt="Video thumbnail" />
          <p>Duración total del video: {formatTime(videoInfo.duration)}</p>
          <p>Tiempo reproducido: {formatTime(videoInfo.playedTime)}</p>
          <p>Porcentaje reproducido: {videoInfo.playedPercentage}%</p>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{width: `${videoInfo.playedPercentage}%`}}></div>
          </div>
          {showSaveButton && <button onClick={saveVideoInfo}>Guardar</button>}
        </>
      )}
    </div>
  )
}

export default YouTubeDuration
