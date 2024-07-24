export function capitalizeFirstLetter(s: String) {
  return s[0].toUpperCase() + s.slice(1)
}

export function capitalizeSnakeCase(snakeCase: String) {
  return snakeCase.split("-").map(word => capitalizeFirstLetter(word)).join(" ")
}