import React, { useState } from 'react'
import STATE_DATA from '../data/stateData'

interface AnalysisResult {
  skills: string[]
  atsScore: number
  atsBreakdown: {
    formatting: number
    keywords: number
    structure: number
    experience: number
  }
  matchedDistricts: Array<{
    district: string
    salary: string
    demandGrowth: string
    match: number
  }>
  recommendations: string[]
  issues: string[]
}

const ResumeAnalyzer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [resumeText, setResumeText] = useState('')
  const [fileName, setFileName] = useState('')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)

  const extractTextFromFile = async (file: File): Promise<string> => {
    const fileType = file.type
    
    if (fileType === 'text/plain') {
      return file.text()
    } else if (fileType === 'application/pdf') {
      return extractFromPDF(file)
    } else if (fileType.includes('wordprocessingml') || fileType.includes('word') || file.name.endsWith('.docx')) {
      return extractFromDOCX(file)
    } else {
      throw new Error('Unsupported file format. Please upload TXT, PDF, or DOCX')
    }
  }

  const extractFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const text = new TextDecoder().decode(arrayBuffer)
      // Basic PDF text extraction - this is a simple approach
      // For production, use a library like pdfjs-dist
      return text.replace(/[^\w\s.,@#$%&*()[\]{}+-]/g, ' ').trim()
    } catch {
      throw new Error('Error reading PDF file')
    }
  }

  const extractFromDOCX = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const text = new TextDecoder().decode(arrayBuffer)
      // Basic DOCX text extraction
      return text.replace(/[^\w\s.,@#$%&*()[\]{}+-]/g, ' ').trim()
    } catch {
      throw new Error('Error reading DOCX file')
    }
  }

  const extractSkills = (text: string): string[] => {
    const skillKeywords = [
      'python', 'javascript', 'react', 'nodejs', 'angular', 'vue', 'typescript',
      'java', 'c++', 'c#', 'go', 'rust', 'kotlin', 'swift', 'php', 'ruby',
      'sql', 'mongodb', 'postgresql', 'mysql', 'firebase', 'dynamodb',
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git',
      'machine learning', 'deep learning', 'ai', 'nlp', 'computer vision',
      'data science', 'analytics', 'tableau', 'power bi', 'excel',
      'project management', 'scrum', 'agile', 'jira', 'confluence',
      'html', 'css', 'bootstrap', 'tailwind', 'webpack', 'vite',
      'rest api', 'graphql', 'microservices', 'devops', 'linux',
      'sales', 'marketing', 'digital marketing', 'seo', 'content writing',
      'design', 'ui/ux', 'figma', 'photoshop', 'illustrator',
      'data entry', 'sheets', 'communication', 'leadership',
      'finance', 'accounting', 'gst', 'tally', 'sap'
    ]

    const found: string[] = []
    const lowerText = text.toLowerCase()
    
    skillKeywords.forEach(skill => {
      if (lowerText.includes(skill) && !found.includes(skill)) {
        found.push(skill.charAt(0).toUpperCase() + skill.slice(1))
      }
    })

    return found
  }

  const calculateATSScore = (text: string, skills: string[]): { score: number; breakdown: AnalysisResult['atsBreakdown'] } => {
    let formattingScore = 50
    let keywordScore = 0
    let structureScore = 0
    let experienceScore = 0

    // Formatting analysis (file type bonus)
    if (fileName.endsWith('.docx') || fileName.endsWith('.pdf')) formattingScore += 20
    if (text.length > 500) formattingScore += 10
    if (text.length > 2000) formattingScore += 10
    formattingScore = Math.min(100, formattingScore)

    // Keyword scoring (skills + ATS keywords)
    const atsKeywords = ['experience', 'skills', 'education', 'project', 'responsibility', 'achievement', 'certification', 'summary']
    let keywordMatches = 0
    atsKeywords.forEach(kw => {
      if (text.toLowerCase().includes(kw)) keywordMatches++
    })
    keywordScore = (keywordMatches / atsKeywords.length) * 50 + (Math.min(skills.length, 15) / 15) * 50
    keywordScore = Math.min(100, keywordScore)

    // Structure analysis (presence of key sections)
    const sections = {
      contact: /\b[\w\.-]+@[\w\.-]+\.\w+\b/,
      phone: /\b\d{10,}\b/,
      education: /\b(?:bachelor|master|b\.?tech|m\.?tech|b\.?s|m\.?s|diploma|degree)\b/i,
      experience: /\b(?:year|worked|responsible|led|managed|developed|implemented)\b/i
    }

    let structureMatches = 0
    Object.values(sections).forEach(regex => {
      if (regex.test(text)) structureMatches++
    })
    structureScore = (structureMatches / Object.keys(sections).length) * 100

    // Experience scoring
    const experienceKeywords = ['worked', 'led', 'managed', 'developed', 'implemented', 'achieved', 'improved', 'increased']
    let expMatches = 0
    experienceKeywords.forEach(kw => {
      const matches = text.toLowerCase().match(new RegExp(kw, 'g'))
      expMatches += matches ? matches.length : 0
    })
    experienceScore = Math.min(100, (expMatches / 10) * 100)

    const totalScore = Math.round((formattingScore + keywordScore + structureScore + experienceScore) / 4)

    return {
      score: totalScore,
      breakdown: {
        formatting: Math.round(formattingScore),
        keywords: Math.round(keywordScore),
        structure: Math.round(structureScore),
        experience: Math.round(experienceScore)
      }
    }
  }

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      alert('Please upload or paste your resume')
      return
    }

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const detectedSkills = extractSkills(resumeText)
    const { score: atsScore, breakdown: atsBreakdown } = calculateATSScore(resumeText, detectedSkills)
    
    const matchedDistricts = STATE_DATA
      .map(district => {
        const skillMatches = detectedSkills.filter(skill =>
          district.skills.some(s =>
            s.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(s.toLowerCase())
          )
        ).length
        
        const matchPercentage = (skillMatches / Math.max(detectedSkills.length, 1)) * 100

        return {
          district: district.district,
          salary: district.salary,
          demandGrowth: district.demandGrowth,
          match: Math.round(matchPercentage)
        }
      })
      .filter(d => d.match > 0)
      .sort((a, b) => b.match - a.match)
      .slice(0, 5)

    const { recommendations, issues } = generateRecommendations(detectedSkills, matchedDistricts, atsScore)

    setAnalysis({
      skills: detectedSkills,
      atsScore,
      atsBreakdown,
      matchedDistricts,
      recommendations,
      issues
    })

    setLoading(false)
  }

  const generateRecommendations = (skills: string[], districts: any[], atsScore: number) => {
    const recs: string[] = []
    const issues: string[] = []

    // ATS Score recommendations
    if (atsScore >= 80) {
      recs.push('✅ Excellent ATS compatibility! Your resume will pass most tracking systems')
    } else if (atsScore >= 60) {
      recs.push('⚠️ Good ATS score. Improve key sections and formatting')
      issues.push('Clarify contact information and education details')
    } else {
      recs.push('🔧 Low ATS score. Add Email, Phone, and Education sections')
      issues.push('Formatting needs improvement')
    }

    // Skill recommendations
    if (skills.length >= 10) {
      recs.push('🎯 Good skill set! You\'re qualified for diverse opportunities')
    } else if (skills.length >= 5) {
      recs.push('💡 Consider adding more skills - this will increase match chances')
      issues.push(`Only ${skills.length} skills found. Aim to reach at least 10-15`)
    } else {
      recs.push('⚠️ Resume lacks skills. List all your skills in detail')
      issues.push(`Only ${skills.length} skills found - add more details`)
    }

    if (districts.length > 0 && districts[0].match >= 80) {
      recs.push(`✨ Perfect match! ${districts[0].district} has excellent opportunities for you`)
    }

    if (!skills.some(s => ['Communication', 'Leadership', 'Project Management'].includes(s))) {
      issues.push('Highlight soft skills (Communication, Leadership)')
    }

    if (skills.some(s => ['Aws', 'Azure', 'Gcp', 'Docker', 'Kubernetes'].includes(s))) {
      recs.push('☁️ Cloud skills are in high demand - this is a powerful advantage!')
    }

    return { recommendations: recs.slice(0, 4), issues: issues.slice(0, 3) }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      try {
        const text = await extractTextFromFile(file)
        setResumeText(text)
      } catch (error) {
        alert(error instanceof Error ? error.message : 'File upload failed')
      }
    }
  }

  const getATSScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <>
      {/* Resume Analyzer Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-neon text-slate-900 shadow-lg hover:shadow-xl transition-all flex items-center justify-center font-bold text-xl hover:scale-110"
        title="Open Resume Analyzer"
      >
        📄
      </button>

      {/* Resume Analyzer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="glass rounded-2xl w-full max-w-3xl my-8 flex flex-col neon border border-neon/20">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neon/20 sticky top-0 bg-slate-900/20 backdrop-blur rounded-t-2xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📄</span>
                <div>
                  <h3 className="font-bold text-neon text-xl">Resume Analyzer</h3>
                  <p className="text-xs text-slate-300">ATS Score & Job Match Analysis</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setAnalysis(null)
                  setResumeText('')
                  setFileName('')
                }}
                className="text-slate-300 hover:text-neon transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 flex-1 overflow-y-auto max-h-[calc(90vh-140px)]">
              {!analysis ? (
                <>
                  {/* Input Section */}
                  <div className="space-y-4">
                    <div className="bg-neon/10 border border-neon/30 rounded-lg p-4">
                      <p className="text-sm text-slate-300">📁 Supported Files: TXT, PDF, DOCX</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Upload File</label>
                      <input
                        type="file"
                        accept=".txt,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                        onChange={handleFileUpload}
                        className="w-full p-3 bg-slate-900/30 border border-neon/20 rounded-lg text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-neon file:text-slate-900 file:font-semibold hover:file:opacity-80 cursor-pointer"
                      />
                      {fileName && <p className="text-xs text-neon mt-2">✓ {fileName} loaded</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Or paste directly</label>
                      <textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume... Include skills, experience, projects, etc."
                        className="w-full h-48 p-3 bg-slate-900/30 border border-neon/20 rounded-lg text-sm text-slate-300 placeholder-slate-500 focus:border-neon focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      onClick={analyzeResume}
                      disabled={loading}
                      className="w-full py-3 px-4 bg-neon text-slate-900 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-all"
                    >
                      {loading ? '⚙️ Analyzing...' : '🔍 Analyze Resume'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Analysis Results */}
                  <div className="space-y-6">
                    {/* ATS Score Card */}
                    <div className="p-6 bg-gradient-to-br from-neon/20 to-blue-500/20 border border-neon/30 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-neon text-lg">📊 ATS Score</h4>
                        <div className={`text-5xl font-bold ${getATSScoreColor(analysis.atsScore)}`}>
                          {analysis.atsScore}
                        </div>
                      </div>
                      <div className="w-full h-3 bg-slate-900/50 rounded-full overflow-hidden mb-4">
                        <div
                          className="h-full bg-gradient-to-r from-neon to-blue-400"
                          style={{ width: `${analysis.atsScore}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-slate-900/40 p-3 rounded-lg text-center">
                          <p className="text-xs text-slate-300">Formatting</p>
                          <p className="text-lg font-bold text-neon">{analysis.atsBreakdown.formatting}</p>
                        </div>
                        <div className="bg-slate-900/40 p-3 rounded-lg text-center">
                          <p className="text-xs text-slate-300">Keywords</p>
                          <p className="text-lg font-bold text-neon">{analysis.atsBreakdown.keywords}</p>
                        </div>
                        <div className="bg-slate-900/40 p-3 rounded-lg text-center">
                          <p className="text-xs text-slate-300">Structure</p>
                          <p className="text-lg font-bold text-neon">{analysis.atsBreakdown.structure}</p>
                        </div>
                        <div className="bg-slate-900/40 p-3 rounded-lg text-center">
                          <p className="text-xs text-slate-300">Experience</p>
                          <p className="text-lg font-bold text-neon">{analysis.atsBreakdown.experience}</p>
                        </div>
                      </div>
                    </div>

                    {/* Issues */}
                    {analysis.issues.length > 0 && (
                      <div>
                        <h4 className="font-bold text-red-400 mb-3">⚠️ Areas to Improve</h4>
                        <div className="space-y-2">
                          {analysis.issues.map((issue, idx) => (
                            <div key={idx} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-300">
                              • {issue}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Detected Skills */}
                    <div>
                      <h4 className="font-bold text-neon mb-3">🎯 Detected Skills ({analysis.skills.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.skills.map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-neon/20 border border-neon/40 rounded-full text-sm text-neon font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Matched Districts */}
                    {analysis.matchedDistricts.length > 0 && (
                      <div>
                        <h4 className="font-bold text-neon mb-3">📍 Top Job Matches</h4>
                        <div className="space-y-3">
                          {analysis.matchedDistricts.map((district) => (
                            <div key={district.district} className="p-4 bg-slate-900/30 border border-neon/20 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h5 className="font-bold text-white">{district.district}</h5>
                                  <p className="text-sm text-slate-300">{district.salary}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-neon">{district.match}%</div>
                                  <p className="text-xs text-slate-300">Match</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-300">Demand: {district.demandGrowth}</span>
                                <div className="w-24 h-2 bg-slate-900/50 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-neon to-blue-400"
                                    style={{ width: `${district.match}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    {analysis.recommendations.length > 0 && (
                      <div>
                        <h4 className="font-bold text-neon mb-3">💡 Recommendations</h4>
                        <div className="space-y-2">
                          {analysis.recommendations.map((rec, idx) => (
                            <div key={idx} className="p-3 bg-neon/10 border border-neon/20 rounded-lg text-sm text-slate-200">
                              {rec}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setAnalysis(null)
                        setResumeText('')
                        setFileName('')
                      }}
                      className="w-full py-2 px-4 bg-slate-900/50 text-neon rounded-lg font-semibold hover:bg-slate-900/70 transition-all border border-neon/20"
                    >
                      ← Analyze Another Resume
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ResumeAnalyzer

