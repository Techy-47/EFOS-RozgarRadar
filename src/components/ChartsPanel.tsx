import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { DistrictData } from '../data/mockData'

const COLORS = ['#00FFF0', '#00A3C4', '#0ABF8A', '#FFB86B', '#FF6B6B']

export default function ChartsPanel({ district }: { district: DistrictData | null }) {
  const growth = district
    ? [
        { day: 'T-5', val: Math.max(0, Number(district.demandGrowth.replace('%', '')) - 5) },
        { day: 'T-4', val: Math.max(0, Number(district.demandGrowth.replace('%', '')) - 2) },
        { day: 'T-3', val: Math.max(0, Number(district.demandGrowth.replace('%', '')) - 1) },
        { day: 'T-2', val: Math.max(0, Number(district.demandGrowth.replace('%', '')) + 1) },
        { day: 'T-1', val: Number(district.demandGrowth.replace('%', '')) }
      ]
    : []

  const salaryCmp = district
    ? [
        { name: 'Min', value: parseInt(district.salary.replace(/[^0-9\-]/g, '').split('-')[0] || '0') },
        { name: 'Max', value: parseInt(district.salary.replace(/[^0-9\-]/g, '').split('-')[1] || '0') }
      ]
    : []

  const skillDist = district
    ? district.skills.map((s, i) => ({ name: s, value: Math.max(5, 40 - i * 8) }))
    : []

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="glass p-4 rounded-lg">
        <div className="text-sm text-slate-300">Demand Growth Trend</div>
        <div style={{ height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growth}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="val" stroke="#00FFF0" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass p-4 rounded-lg">
        <div className="text-sm text-slate-300">Salary Comparison</div>
        <div style={{ height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryCmp}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00A3C4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass p-4 rounded-lg">
        <div className="text-sm text-slate-300">Skill Distribution</div>
        <div style={{ height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={skillDist} dataKey="value" nameKey="name" innerRadius={30} outerRadius={60}>
                {skillDist.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
