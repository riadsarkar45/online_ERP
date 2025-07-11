function analyzeColorDelivery(expected, received) {
  const expectedSet = new Set(expected.map(c => c.trim().toLowerCase()));
  const receivedSet = new Set(received.map(c => c.trim().toLowerCase()));

  const matches = [...receivedSet].filter(c => expectedSet.has(c));
  const missing = [...expectedSet].filter(c => !receivedSet.has(c));
  const extras = [...receivedSet].filter(c => !expectedSet.has(c));

  return {
    matches,
    missing,
    extras
  };
}

export default analyzeColorDelivery;
