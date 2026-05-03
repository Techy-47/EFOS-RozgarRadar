import React, { useState } from 'react'

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-neon text-slate-900 shadow-lg hover:shadow-xl transition-all flex items-center justify-center font-bold text-xl hover:scale-110"
        title="Open EFOS Saathi Chatbot"
      >
        💬
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="glass rounded-2xl w-full max-w-2xl h-[90vh] max-h-[600px] flex flex-col overflow-hidden neon border border-neon/20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neon/20">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <div>
                  <h3 className="font-bold text-neon">EFOS Saathi</h3>
                  <p className="text-xs text-slate-300">Career Guidance Chatbot</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-neon transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src="https://efos-saathi.vercel.app/"
                className="w-full h-full border-none"
                title="EFOS Saathi Chatbot"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot
