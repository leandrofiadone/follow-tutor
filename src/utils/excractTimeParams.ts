export const extractTimeParam = (url: string): string | null => {
  const regExp = /[?&]t=(\d+)/
  const match = url.match(regExp)
  return match ? match[1] : null
}
