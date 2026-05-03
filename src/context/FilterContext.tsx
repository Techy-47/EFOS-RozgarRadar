import React, { createContext, useContext, useState } from 'react'

type Filters = {
  education: string | null
  industry: string | null
}

const FilterContext = createContext<{
  filters: Filters
  setFilters: (f: Partial<Filters>) => void
}>({ filters: { education: null, industry: null }, setFilters: () => {} })

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, set] = useState<Filters>({ education: null, industry: null })
  return <FilterContext.Provider value={{ filters, setFilters: (f) => set((s) => ({ ...s, ...f })) }}>{children}</FilterContext.Provider>
}

export const useFilters = () => useContext(FilterContext)
