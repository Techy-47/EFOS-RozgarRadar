import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import { DistrictData } from '../data/mockData'

type Props = {
  data: DistrictData[]
  onSelect: (d: DistrictData) => void
  selected?: string | null
}

function getName(props: any) {
  return (
    props.ST_NM || props.NAME_1 || props.name || props.NAME || props.STATE_NAME || props.DISTRICT || ''
  )
}

const colorFor = (v = 10) => {
  const t = Math.max(0, Math.min(1, v / 100))
  const r = Math.round(10 + 100 * t)
  const g = Math.round(30 + 160 * t)
  const b = Math.round(100 + 80 * (1 - t))
  return `rgb(${r}, ${g}, ${b})`
}

const IndiaMap: React.FC<Props> = ({ data, onSelect, selected }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [geo, setGeo] = useState<any | null>(null)

  useEffect(() => {
    // Expect a TopoJSON file at public/india.topo.json
    fetch('/india.topo.json')
      .then((r) => r.json())
      .then((topo) => {
        const key = Object.keys(topo.objects)[0]
        const g = feature(topo, topo.objects[key])
        setGeo(g)
      })
      .catch((err) => {
        // If the topojson isn't present, swallow the error (app will still render)
        // Console log for developer awareness
        // eslint-disable-next-line no-console
        console.warn('Could not load topojson /india.topo.json — map will fall back to placeholder.', err)
      })
  }, [])

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = svgRef.current.clientWidth || 800
    const height = Math.max(480, (width * 2) / 3)

    const g = svg.append('g').attr('class', 'map-group')

    if (!geo) {
      // fallback: draw state/district cards with data
      const cols = Math.max(3, Math.floor(width / 220))
      const w = Math.min(200, Math.floor((width - 80) / cols))
      const h = 140
      const containerWidth = w * cols + (cols - 1) * 20
      const startX = (width - containerWidth) / 2

      data.forEach((d, i) => {
        const row = Math.floor(i / cols)
        const col = i % cols
        const x = startX + col * (w + 20)
        const y = 40 + row * (h + 20)

        // Background rect
        g.append('rect')
          .attr('x', x)
          .attr('y', y)
          .attr('width', w)
          .attr('height', h)
          .attr('rx', 8)
          .attr('ry', 8)
          .attr('fill', colorFor(d.demandIntensity))
          .attr('stroke', selected === d.district ? 'rgba(0,255,240,0.95)' : 'rgba(255,255,255,0.06)')
          .attr('stroke-width', selected === d.district ? 3 : 1)
          .attr('class', 'cursor-pointer transition-opacity hover:opacity-80')
          .style('cursor', 'pointer')
          .on('click', () => onSelect(d))

        // District name
        g.append('text')
          .attr('x', x + w / 2)
          .attr('y', y + 28)
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .attr('font-weight', 'bold')
          .attr('font-size', '14px')
          .attr('pointer-events', 'none')
          .text(d.district)

        // Salary info
        g.append('text')
          .attr('x', x + w / 2)
          .attr('y', y + 50)
          .attr('text-anchor', 'middle')
          .attr('fill', 'rgba(255,255,255,0.8)')
          .attr('font-size', '11px')
          .attr('pointer-events', 'none')
          .text(d.salary)

        // Top skill
        const topSkill = d.skills[0] || 'N/A'
        g.append('text')
          .attr('x', x + w / 2)
          .attr('y', y + 70)
          .attr('text-anchor', 'middle')
          .attr('fill', 'rgba(255,255,255,0.7)')
          .attr('font-size', '10px')
          .attr('pointer-events', 'none')
          .text(`📍 ${topSkill}`)

        // Demand growth
        g.append('text')
          .attr('x', x + w / 2)
          .attr('y', y + 125)
          .attr('text-anchor', 'middle')
          .attr('fill', 'rgba(0,255,200,0.9)')
          .attr('font-weight', 'bold')
          .attr('font-size', '12px')
          .attr('pointer-events', 'none')
          .text(d.demandGrowth)
      })
      return
    }

    const projection = d3.geoMercator().fitSize([width, height], geo as any)
    const path = d3.geoPath().projection(projection as any)

    const getDatum = (name: string) =>
      data.find((d) => {
        if (!name) return false
        const n = name.toString().toLowerCase()
        return (
          (d.district && d.district.toLowerCase() === n) ||
          (d.state && d.state.toLowerCase() === n) ||
          (d.district && d.district.toLowerCase().includes(n))
        )
      })

    g.selectAll('path')
      .data((geo as any).features)
      .join('path')
      .attr('d', path as any)
      .attr('fill', (f: any) => {
        const name = getName(f.properties)
        const d = getDatum(name) || { demandIntensity: 10 }
        return colorFor(d.demandIntensity)
      })
      .attr('stroke', (f: any) => {
        const name = getName(f.properties)
        return selected === name ? 'rgba(0,255,240,0.95)' : 'rgba(255,255,255,0.06)'
      })
      .attr('stroke-width', 1)
      .on('mouseenter', function (event, f: any) {
        d3.select(this).attr('opacity', 0.9)
      })
      .on('mouseleave', function () {
        d3.select(this).attr('opacity', 1)
      })
      .on('click', function (event, f: any) {
        const name = getName(f.properties)
        const d = getDatum(name)
        if (d) onSelect(d)

        const bounds = path.bounds(f)
        const dx = bounds[1][0] - bounds[0][0]
        const dy = bounds[1][1] - bounds[0][1]
        const x = (bounds[0][0] + bounds[1][0]) / 2
        const y = (bounds[0][1] + bounds[1][1]) / 2
        const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)))
        const translate = [width / 2 - scale * x, height / 2 - scale * y]
        g.transition().duration(750).attr('transform', `translate(${translate}) scale(${scale})`)
      })

    const onResize = () => {
      const w = svgRef.current!.clientWidth
      const h = Math.max(480, (w * 2) / 3)
      svg.attr('viewBox', `0 0 ${w} ${h}`)
      projection.fitSize([w, h], geo)
      g.selectAll('path').attr('d', path as any)
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [geo, data, selected, onSelect])

  return (
    <div className="w-full h-full p-2">
      <svg ref={svgRef} className="map-svg w-full h-[520px] max-h-[70vh]" viewBox="0 0 800 600" />
    </div>
  )
}

export default IndiaMap
