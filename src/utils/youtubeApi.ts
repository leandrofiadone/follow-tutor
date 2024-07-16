// youtubeApi.ts
import axios from "axios"
import {parseDuration} from "../utils/parseDuration"
import {extractTimeParam} from "../utils/excractTimeParams"
import {extractVideoId} from "../utils/extractVideoId"

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const API_URL = "https://www.googleapis.com/youtube/v3/videos"

export const getVideoDuration = async (videoUrl: string) => {
  const videoId = extractVideoId(videoUrl)
  if (!videoId) {
    return {
      duration: 0,
      playedTime: 0,
      playedPercentage: 0,
      thumbnail: "",
      title: ""
    }
  }

  try {
    const {data} = await axios.get(API_URL, {
      params: {
        part: "contentDetails,snippet",
        id: videoId,
        key: API_KEY
      }
    })

    if (data.items.length > 0) {
      const totalDuration = parseDuration(data.items[0].contentDetails.duration)
      const played = parseInt(extractTimeParam(videoUrl) || "0")
      const percentage =
        totalDuration > 0 ? Math.min(100, (played / totalDuration) * 100) : 0

      return {
        duration: totalDuration,
        playedTime: played,
        playedPercentage: Math.round(percentage * 100) / 100,
        thumbnail: data.items[0].snippet.thumbnails.default.url,
        title: data.items[0].snippet.title
      }
    }
  } catch (error) {
    console.error("Error al obtener la información del video:", error)
  }

  // Retorna valores por defecto en caso de error
  return {
    duration: 0,
    playedTime: 0,
    playedPercentage: 0,
    thumbnail: "",
    title: ""
  }
}
