export type DistrictData = {
  district: string
  skills: string[]
  salary: string
  demandGrowth: string
  courses: string[]
  demandIntensity: number // 0-100
}

export const MOCK_DATA: DistrictData[] = [
  { district: 'Ludhiana', skills: ['Textile', 'CNC Operator', 'Logistics'], salary: '₹18,000 - ₹35,000', demandGrowth: '+23%', courses: ['Industrial Training'], demandIntensity: 78 },
  { district: 'Bengaluru Urban', skills: ['Software Dev', 'Data Science', 'Cloud'], salary: '₹45,000 - ₹180,000', demandGrowth: '+34%', courses: ['Full Stack Bootcamp'], demandIntensity: 92 },
  { district: 'Mumbai Suburban', skills: ['Finance', 'Sales', 'Digital Marketing'], salary: '₹30,000 - ₹120,000', demandGrowth: '+18%', courses: ['Digital Marketing Pro'], demandIntensity: 65 },
  { district: 'Kolkata', skills: ['Logistics', 'Customer Support', 'Retail'], salary: '₹15,000 - ₹45,000', demandGrowth: '+12%', courses: ['Logistics Essentials'], demandIntensity: 40 },
  { district: 'Chennai', skills: ['Auto Tech', 'Design', 'Manufacturing'], salary: '₹22,000 - ₹90,000', demandGrowth: '+20%', courses: ['Auto CAD'], demandIntensity: 55 }
]
