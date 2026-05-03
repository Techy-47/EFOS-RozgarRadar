import { PARSED_ROZGAR } from './parseRozgar'
import { DistrictData } from './mockData'

// Aggregate predicted openings by state and convert to DistrictData format
const byState: Record<string, { sumOpenings: number; count: number; avgConfidence?: number }> = {}
for (const e of PARSED_ROZGAR) {
  if (!e.state) continue
  const st = e.state
  if (!byState[st]) byState[st] = { sumOpenings: 0, count: 0, avgConfidence: 0 }
  const val = e.predictedJobOpenings || 0
  byState[st].sumOpenings += val
  byState[st].count += 1
  if (typeof e.confidence === 'number') {
    byState[st].avgConfidence = ((byState[st].avgConfidence || 0) * (byState[st].count - 1) + e.confidence) / byState[st].count
  }
}

// Compute scale: map openings to 0-100 demandIntensity
let maxOpenings = 0
for (const s in byState) maxOpenings = Math.max(maxOpenings, byState[s].sumOpenings)
if (maxOpenings === 0) maxOpenings = 1

function suggestForState(name: string, intensity: number) {
  const n = name.toLowerCase()
  // default suggestions
  let skills = ['General Skills']
  let salary = '₹15,000 - ₹60,000'
  let courses = ['Career Foundations']

  if (n.includes('bangalore') || n.includes('karnataka') || n.includes('bengaluru')) {
    skills = ['Software Dev', 'Data Science', 'Cloud']
    salary = '₹45,000 - ₹180,000'
    courses = ['Full Stack Bootcamp', 'Data Science Program']
  } else if (n.includes('mumbai') || n.includes('maharashtra')) {
    skills = ['Finance', 'Sales', 'Digital Marketing']
    salary = '₹30,000 - ₹150,000'
    courses = ['Finance Analytics', 'Digital Marketing Pro']
  } else if (n.includes('delhi') || n.includes('new delhi')) {
    skills = ['Software Dev', 'Product Management', 'Sales']
    salary = '₹35,000 - ₹160,000'
    courses = ['Product Management', 'Full Stack Bootcamp']
  } else if (n.includes('hyderabad') || n.includes('telangana')) {
    skills = ['Software Dev', 'Cloud', 'AI']
    salary = '₹40,000 - ₹170,000'
    courses = ['Cloud Engineering', 'AI Foundations']
  } else if (n.includes('chennai') || n.includes('tamil')) {
    skills = ['Auto Tech', 'Design', 'Manufacturing']
    salary = '₹22,000 - ₹90,000'
    courses = ['Auto CAD', 'Industrial Design']
  } else if (n.includes('kolkata') || n.includes('west bengal')) {
    skills = ['Logistics', 'Retail', 'Customer Support']
    salary = '₹15,000 - ₹70,000'
    courses = ['Logistics Essentials', 'Retail Management']
  } else if (n.includes('pune') || n.includes('ahmedabad') || n.includes('gujarat')) {
    skills = ['Manufacturing', 'Engineering', 'IT Services']
    salary = '₹25,000 - ₹120,000'
    courses = ['Industrial Training', 'Software Dev Bootcamp']
  } else if (n.includes('uttar pradesh') || n.includes('kanpur') || n.includes('lucknow')) {
    skills = ['Manufacturing', 'Logistics', 'Retail']
    salary = '₹12,000 - ₹65,000'
    courses = ['Vocational Training', 'Logistics Essentials']
  } else if (n.includes('rajasthan') || n.includes('jaipur')) {
    skills = ['Tourism', 'Hospitality', 'Retail']
    salary = '₹14,000 - ₹70,000'
    courses = ['Hospitality Basics', 'Retail Management']
  } else if (n.includes('kerala') || n.includes('kochi')) {
    skills = ['Healthcare', 'IT Services', 'Customer Support']
    salary = '₹18,000 - ₹90,000'
    courses = ['Healthcare Support', 'Customer Success']
  }

  // tweak salary up for high intensity
  if (intensity > 80) {
    salary = salary.replace(/₹([0-9,]+)/, (m, p1) => `₹${Math.round(Number(p1.replace(/,/g, '')) * 1.2)}`)
  }

  return { skills, salary, courses }
}

export const STATE_DATA: DistrictData[] = Object.keys(byState).map((st) => {
  const item = byState[st]
  const intensity = Math.round((item.sumOpenings / maxOpenings) * 100)
  const suggested = suggestForState(st, intensity)
  return {
    district: st,
    skills: suggested.skills,
    salary: suggested.salary,
    demandGrowth: `${Math.round((item.avgConfidence || 0) || 0)}%`,
    courses: suggested.courses,
    demandIntensity: intensity,
  }
})

export default STATE_DATA

// export raw metrics so UI can show numeric predictions
export const STATE_METRICS: Record<
  string,
  { sumOpenings: number; count: number; avgConfidence: number; predictedNext60: number }
> = Object.keys(byState).reduce((acc, k) => {
  const v = byState[k]
  const avgConfidence = v.avgConfidence || 0
  // naive next-60-days estimate: 60% of aggregated predicted openings
  const predictedNext60 = Math.round(v.sumOpenings * 0.6)
  acc[k] = { sumOpenings: v.sumOpenings, count: v.count, avgConfidence, predictedNext60 }
  return acc
}, {} as any)
