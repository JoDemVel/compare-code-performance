export function getColorByPercentage(percentage: number): string {
  if (percentage >= 90) return "text-green-500";
  if (percentage >= 70) return "text-lime-500";
  if (percentage >= 50) return "text-yellow-400";
  if (percentage >= 30) return "text-orange-400";
  return "text-red-400";
}