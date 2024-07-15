import React, {useState} from "react"
import axios from "axios"
import { formatTime } from '../utils/formatTime'
import { parseDuration } from '../utils/parseDuration'
import { extractTimeParam } from '../utils/excractTimeParams'
import { extractVideoId } from '../utils/excractVideoId'

const API_KEY = "AIzaSyCdjQpVdnmkoepj-0YZy-zTKJipJDFIpFM"
const API_URL = "https://www.googleapis.com/youtube/v3/videos"

interface YouTubeApiResponse {
  items: Array<{
    contentDetails: {
      duration: string
    }
  }>
}

const YouTubeDuration: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [duration, setDuration] = useState<number>(0)
  const [playedTime, setPlayedTime] = useState<number>(0)
  const [playedPercentage, setPlayedPercentage] = useState<number>(0)

  const getVideoDuration = async (): Promise<void> => {
    try {
      const videoId = extractVideoId(videoUrl)

      if (!videoId) {
        setDuration(0)
        setPlayedTime(0)
        setPlayedPercentage(0)
        return
      }

      const response = await axios.get<YouTubeApiResponse>(API_URL, {
        params: {
          part: "contentDetails",
          id: videoId,
          key: API_KEY
        }
      })

      if (response.data.items.length > 0) {
        const videoDuration = response.data.items[0].contentDetails.duration
        const totalDuration = parseDuration(videoDuration)
        setDuration(totalDuration)

        // Obtener el tiempo reproducido
        const timeParam = extractTimeParam(videoUrl)
        const played = timeParam ? parseInt(timeParam) : 0
        setPlayedTime(played)

        // Calcular el porcentaje reproducido
        const percentage =
          totalDuration > 0 ? (played / totalDuration) * 100 : 0
        setPlayedPercentage(Math.min(100, Math.round(percentage * 100) / 100))
      } else {
        setDuration(0)
        setPlayedTime(0)
        setPlayedPercentage(0)
      }
    } catch (error) {
      console.error("Error al obtener la duración del video:", error)
      setDuration(0)
      setPlayedTime(0)
      setPlayedPercentage(0)
    }
  }


return (
  <div>
    <input
      type="text"
      value={videoUrl}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setVideoUrl(e.target.value)
      }
      placeholder="Pega el enlace de YouTube aquí"
    />
    <button onClick={getVideoDuration}>Obtener Duración</button>
    {duration > 0 && <p>Duración total del video: {formatTime(duration)}</p>}
    {playedTime > 0 && <p>Tiempo reproducido: {formatTime(playedTime)}</p>}
    {playedPercentage > 0 && (
      <div>
        <p>Porcentaje reproducido: {playedPercentage}%</p>
        <div
          style={{
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "5px",
            overflow: "hidden"
          }}>
          <div
            style={{
              width: `${playedPercentage}%`,
              height: "20px",
              backgroundColor: "green",
              transition: "width 0.5s ease-in-out"
            }}></div>
        </div>
      </div>
    )}
  </div>
)

}

export default YouTubeDuration
