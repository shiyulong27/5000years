export function buildRulerTransitions(startingRulers = [], endingRulers = []) {
  const usedEndingRulers = new Set()

  return startingRulers.map((next) => {
    const previous = endingRulers.find((candidate) => (
      !usedEndingRulers.has(candidate)
      && candidate.rootId === next.rootId
      && candidate.dynasty === next.dynasty
      && candidate.temple_name !== next.temple_name
    ))

    if (!previous) return `${next.temple_name}即位`
    usedEndingRulers.add(previous)
    return `${previous.temple_name} → ${next.temple_name}`
  })
}
