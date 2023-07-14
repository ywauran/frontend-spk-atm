export function calculateNormalizedMatrix(weights, decisionMatrix) {
  const normalizedMatrix = [];

  for (const alternative of decisionMatrix) {
    const row = alternative?.value;

    const maxValues = row.map((value, index) => {
      if (weights[index]?.benefit) {
        return Math.max(
          ...decisionMatrix.map((alternative) => alternative.value[index])
        );
      } else {
        return Math.min(
          ...decisionMatrix.map((alternative) => alternative.value[index])
        );
      }
    });

    const normalizedRow = row.map((value, index) => {
      const weight = weights[index]?.value;
      if (weights[index]?.benefit) {
        return value / maxValues[index];
      } else {
        return maxValues[index] / value;
      }
    });

    normalizedMatrix.push({
      name: alternative.name,
      values: normalizedRow,
    });
  }

  return normalizedMatrix;
}

export function calculateFinalScores(normalizedMatrix, weights) {
  return normalizedMatrix.map((alternative) => {
    const finalScore = alternative?.values?.reduce(
      (sum, value, index) => sum + value * weights[index]?.value,
      0
    );
    return {
      name: alternative.name,
      finalScore: finalScore,
    };
  });
}

export function generateRanking(finalScores) {
  const ranking = finalScores
    .map((alternative, index) => ({
      name: alternative.name,
      finalScore: alternative.finalScore,
      rank: index + 1,
    }))
    .sort((a, b) => b.finalScore - a.finalScore);

  return ranking;
}
