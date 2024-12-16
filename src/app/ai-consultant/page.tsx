/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { chatWithAI } from '@/lib/api'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'

type ChatMessage = {
  id: string
  type: 'user' | 'ai'
  message: string
  timestamp: number
}

export default function AIChatConsultantPage() {
  const [query, setQuery] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedChats = localStorage.getItem('chatHistory')
    if (storedChats) {
      setChatHistory(JSON.parse(storedChats))
    }
  }, [])

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
    }
  }, [chatHistory])

  const handleSendMessage = async () => {
    if (!query.trim()) {
      toast.error('Please enter a message')
      return
    }

    const newUserMessage: ChatMessage = { 
      id: `user-${Date.now()}`,
      type: 'user', 
      message: query,
      timestamp: Date.now()
    }

    const updatedChatHistory = [...chatHistory, newUserMessage]
    setChatHistory(updatedChatHistory)
    setQuery('')
    setIsLoading(true)

    try {
      const aiResponse = await chatWithAI(query)
      const newAIMessage: ChatMessage = { 
        id: `ai-${Date.now()}`,
        type: 'ai', 
        message: aiResponse,
        timestamp: Date.now()
      }

      setChatHistory(prev => [...prev, newAIMessage])
    } catch (error) {
      toast.error('Failed to get response')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteChat = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete the entire chat history?')
    
    if (confirmDelete) {
      setChatHistory([])
      localStorage.removeItem('chatHistory')
      toast.success('Chat history deleted')
    }
  }

  const handleDeleteMessage = (idToRemove: string) => {
    const updatedChatHistory = chatHistory.filter(msg => msg.id !== idToRemove)
    setChatHistory(updatedChatHistory)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center flex-grow">AI Consultant</h1>
        {chatHistory.length > 0 && (
          <button 
            onClick={handleDeleteChat}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Delete Entire Chat"
          >
            <Trash2 className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4 h-96 overflow-y-auto border rounded p-4">
          {chatHistory.length === 0 ? (
            <div className="text-center text-gray-500">
              No chat history. Start a conversation!
            </div>
          ) : (
            chatHistory.map((msg) => (
              <div 
                key={msg.id}
                className={`relative mb-2 p-2 rounded group
                  ${msg.type === 'user' ? 'bg-primary/40 text-right' : 'bg-tertiary/30 text-left'}
                `}
              >
                <button 
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="absolute top-1 right-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  title="Delete Message"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {msg.type === 'ai' ? (
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-2" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-semibold mb-2" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-lg font-medium mb-2" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                      em: ({node, ...props}) => <em className="italic" {...props} />,
                      p: ({node, ...props}) => <p className="mb-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2" {...props} />,
                    }}
                  >
                    {msg.message}
                  </ReactMarkdown>
                ) : (
                  msg.message
                )}
              </div>
            ))
          )}
        </div>

        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask your AI consultant..."
            className="flex-grow p-2 border rounded-l"
          />
          <button 
            onClick={handleSendMessage} 
            disabled={isLoading}
            className="bg-green-500 text-white p-2 rounded-r hover:bg-green-600 transition duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}
