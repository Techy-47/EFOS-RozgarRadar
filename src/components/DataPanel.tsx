import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { DistrictData } from '../data/mockData'
import { STATE_METRICS } from '../data/stateData'

type Props = {
  district: DistrictData | null
  onRecommend?: (course: string) => void
}

const DataPanel: React.FC<Props> = ({ district, onRecommend }) => {
  const panel = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (district) {
      gsap.fromTo(
        panel.current,
        { x: 200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
    }
  }, [district])

  if (!district)
    return (
      <div className="glass p-4 rounded-lg min-h-[160px]">
        <div className="text-sm text-slate-300">Select a district to view details</div>
      </div>
    )

  return (
    <div ref={panel} className="glass p-6 rounded-xl neon border-neon/10">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">{district.district}</h3>
        <div className="text-sm text-green-300">{district.demandGrowth} demand</div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-slate-300">Top Skills</div>
          <ul className="mt-2 space-y-1">
            {district.skills.map((s) => (
              <li key={s} className="text-sm">• {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs text-gray-300">Salary Range</div>
          <div className="mt-2 text-lg font-medium">{district.salary}</div>
          <div className="mt-3">
            <button
              onClick={() => onRecommend?.(district.courses[0])}
              className="mt-2 px-4 py-2 bg-neon text-slate-900 rounded-lg font-semibold"
            >
              Recommended Course
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-slate-900/30 p-4 rounded-lg">
        <div className="text-sm text-slate-300">Future Prediction</div>
        <div className="mt-2">
          {(() => {
            const metrics = STATE_METRICS[district.district]
            if (!metrics) {
              return <div className="font-semibold">In next 60 days, estimated {Math.max(100, Math.round(district.demandIntensity * 30))}+ jobs expected in this district</div>
            }
            const jobs = metrics.predictedNext60
            const conf = Math.round(metrics.avgConfidence)
            const top = district.skills.slice(0, 3).join(', ')
            return (
              <div>
                <div className="font-semibold text-lg">In next 60 days, ~{jobs.toLocaleString()} jobs expected</div>
                <div className="text-sm text-slate-300 mt-1">Confidence: {conf}% • Top sectors: {top}</div>
                <div className="mt-3 text-sm">Expected salary band: <span className="font-medium">{district.salary}</span></div>
                <div className="mt-3">
                  <button
                    onClick={() => onRecommend?.(district.courses[0])}
                    className="mt-2 px-3 py-2 bg-neon text-slate-900 rounded-md font-semibold"
                  >
                    Recommended Course: {district.courses[0]}
                  </button>
                </div>
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}

export default DataPanel
