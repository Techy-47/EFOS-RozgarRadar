import rozgarRaw from './rozgar_radar_data.txt?raw'

export type RawEntry = {
  city: string
  state: string
  districtId?: string
  predictedJobOpenings?: number
  confidence?: number
}

export function parseRozgar(text: string): RawEntry[] {
  const entries: RawEntry[] = []
  // Split by CITY PROFILE markers
  const parts = text.split(/CITY PROFILE:/g)
  for (const part of parts) {
    const m = part.match(/\s*([^,\n]+),\s*([A-Za-z &]+)\s*/)
    if (!m) continue
    const city = m[1].trim()
    const state = m[2].trim()
    const districtIdMatch = part.match(/District ID:\s*(\S+)/i)
    const predictedMatch = part.match(/Predicted Job Openings:\s*([0-9,]+)/i)
    const confMatch = part.match(/Confidence Score:\s*([0-9.]+)/i)
    const predicted = predictedMatch ? parseInt(predictedMatch[1].replace(/,/g, '')) : undefined
    const confidence = confMatch ? parseFloat(confMatch[1]) : undefined
    entries.push({ city, state, districtId: districtIdMatch ? districtIdMatch[1] : undefined, predictedJobOpenings: predicted, confidence })
  }
  return entries
}

// also export parsed from the bundled file
export const PARSED_ROZGAR = parseRozgar(rozgarRaw)
