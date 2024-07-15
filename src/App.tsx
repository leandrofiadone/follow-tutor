import React from "react"
import YouTubeDuration from "./components/YoutubeDuration"
import "./App.css" // Asegúrate de que la ruta sea correcta

const App: React.FC = () => {
  return (
    <div className="App">
      {" "}
      {/* Usa la clase definida en el CSS */}
      <h1>Duración de Video de YouTube</h1>
      <YouTubeDuration />
    </div>
  )
}

export default App
