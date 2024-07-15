export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  let result = ""

  if (hours > 0) {
    result += `${hours} hora${hours > 1 ? "s" : ""}, `
  }
  if (hours > 0 || minutes > 0) {
    result += `${minutes} minuto${minutes !== 1 ? "s" : ""} y `
  }
  result += `${remainingSeconds} segundo${remainingSeconds !== 1 ? "s" : ""}`

  return result
}
