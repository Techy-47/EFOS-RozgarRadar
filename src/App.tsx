import React, { Suspense, useMemo, useState } from 'react'
import { FilterProvider, useFilters } from './context/FilterContext'
import { DistrictData } from './data/mockData'
import STATE_DATA from './data/stateData'
import ChatBot from './components/ChatBot'
import ResumeAnalyzer from './components/ResumeAnalyzer'

const IndiaMap = React.lazy(() => import('./components/IndiaMap'))
const DataPanel = React.lazy(() => import('./components/DataPanel'))
const ChartsPanel = React.lazy(() => import('./components/ChartsPanel'))
const Filters = React.lazy(() => import('./components/Filters'))

const MainApp: React.FC = () => {
  const [selected, setSelected] = useState<DistrictData | null>(null)
  const { filters } = useFilters()

  const filtered = useMemo(() => {
    // apply industry filter if set; otherwise use state-level data
    const base = STATE_DATA
    if (!filters.industry || filters.industry === 'Any') return base
    return base.filter((d) => d.skills.some((s) => s.toLowerCase().includes(filters.industry!.toLowerCase())))
  }, [filters])

  return (
    <div className="min-h-screen p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Rozgar Radar — Skill Salary Map</h1>
          <div className="text-sm text-slate-300">India district demand & salary insights</div>
        </div>
        <Suspense>
          <Filters />
        </Suspense>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <Suspense>
            <IndiaMap data={filtered} onSelect={setSelected} selected={selected?.district || null} />
          </Suspense>
        </section>

        <aside className="space-y-4">
          <Suspense>
            <DataPanel district={selected} onRecommend={(c) => alert(`Recommended course: ${c}`)} />
          </Suspense>
          <Suspense>
            <ChartsPanel district={selected} />
          </Suspense>
          <div className="glass p-4 rounded-lg">
            <div className="text-sm text-slate-300">Future Prediction</div>
            <div className="mt-2 font-semibold">In next 60 days, 2300+ Logistics jobs expected in this district</div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <FilterProvider>
      <Suspense fallback={<div className="p-6">Loading…</div>}>
        <MainApp />
      </Suspense>
      <ChatBot />
      <ResumeAnalyzer />
    </FilterProvider>
  )
}
