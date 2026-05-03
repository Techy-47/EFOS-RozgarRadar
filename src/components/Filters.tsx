import React from 'react'
import { useFilters } from '../context/FilterContext'

const educationLevels = ['Any', 'High School', 'Diploma', 'Graduate', 'Postgraduate']
const industries = ['Any', 'IT', 'Manufacturing', 'Textile', 'Logistics', 'Finance']

export default function Filters() {
  const { filters, setFilters } = useFilters()

  return (
    <div className="flex gap-3 items-center">
      <div className="glass p-2 rounded-md">
        <select
          className="bg-transparent text-sm outline-none px-2 py-1"
          value={filters.education || 'Any'}
          onChange={(e) => setFilters({ education: e.target.value === 'Any' ? null : e.target.value })}
        >
          {educationLevels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div className="glass p-2 rounded-md">
        <select
          className="bg-transparent text-sm outline-none px-2 py-1"
          value={filters.industry || 'Any'}
          onChange={(e) => setFilters({ industry: e.target.value === 'Any' ? null : e.target.value })}
        >
          {industries.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
