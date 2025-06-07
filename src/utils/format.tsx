/* eslint-disable @typescript-eslint/no-explicit-any */
export function formatNumber(value:any): string {
  if (value === null || value === undefined || value === "") return ""

  const num = typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value

  if (isNaN(num)) return ""

  return num.toLocaleString("en-AU")
}
