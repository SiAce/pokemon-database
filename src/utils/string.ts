export function capitalizeFirstLetter(s?: string | null) {
  return s ? s[0].toUpperCase() + s.slice(1) : "";
}

export function capitalizeSnakeCase(snakeCase?: string | null) {
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

const IGNORE_WORDS = new Set(["The", "of", "Let's", "Go,"])
export function versionAbbreviation(version: string) {
  const spaceSeparated = version.replace(/([a-zA-Z])([A-Z])/g, '$1 $2');
  const letters: string[] = []
  spaceSeparated.split(" ").forEach(word => {
    if (!IGNORE_WORDS.has(word)) {
      letters.push(word[0].toUpperCase())
    }
  })
  return letters.join("")
}