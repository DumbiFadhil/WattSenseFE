import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

export const uploadDataset = async (file: File, question: string) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('question', question)

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response
  } catch (error) {
    toast.error('Failed to upload dataset')
    console.error('Upload error:', error)
    throw error
  }
}

export const chatWithAI = async (query: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, { query })
    
    let answer = response.data.answer
    if (answer.startsWith('Assistant: ')) {
      answer = answer.replace(/^Assistant: /, '')
    }
    answer = answer.replace(/^\n+/, '')
    
    return answer
  } catch (error) {
    toast.error('Failed to get AI response')
    console.error('Chat error:', error)
    throw error
  }
}