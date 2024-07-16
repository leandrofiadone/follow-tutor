import create from "zustand"

interface VideoInfo {
  duration: number
  playedTime: number
  playedPercentage: number
  videoUrl: string
  title: string // Nuevo campo para el título
  thumbnail: string // Nuevo campo para la miniatura
}

interface VideoState {
  videoInfo: VideoInfo
  saveVideoInfo: (info: VideoInfo) => void
}

export const useVideoStore = create<VideoState>((set) => ({
  videoInfo: {
    duration: 0,
    playedTime: 0,
    playedPercentage: 0,
    videoUrl: "",
    title: "", // Inicializado como cadena vacía
    thumbnail: "" // Inicializado como cadena vacía
  },
  saveVideoInfo: (info) => {
    console.log("Información del video guardada desde Zustand:", info)
    set({videoInfo: info})
  }
}))
