export function getFormattedDate (time) {
  return time.toString().slice(0, 10)
}

export function getDateMinusDays (time, days) {
  return new Date(time.getFullYear(), time.getMonth(), time.getDate() - days)
}