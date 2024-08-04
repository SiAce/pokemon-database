export function capitalizeFirstLetter(s?: String | null) {
  return s ? s[0].toUpperCase() + s.slice(1) : "";
}

export function capitalizeSnakeCase(snakeCase?: String | null) {
  return snakeCase
    ? snakeCase
        .split("-")
        .map((word) => capitalizeFirstLetter(word))
        .join(" ")
    : "";
}

export function abbreviation(s: string) {
  return s.slice(0, 3).toUpperCase();
}
