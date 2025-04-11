import { useEffect, useState } from 'react'

type Message = {
  email: string
  message: string
  overlay?: string
  timestamp: string
}

const emojiBgMap: Record<string, string> = {
  '🌈': 'bg-pink-100',
  '⭐': 'bg-yellow-100',
  '❤️': 'bg-red-100',
  '💪': 'bg-green-100',
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    fetch(import.meta.env.VITE_GAS_URL)
      .then((res) => res.json())
      .then((data) => setMessages(data.reverse()))
      .catch((err) => console.error('메시지 불러오기 실패:', err))
  }, [])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {messages.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-start gap-3"
          >
            {item.overlay && (
              <div className={`text-xl w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full ${
                emojiBgMap[item.overlay] || 'bg-gray-100'
              }`}>
                {item.overlay}
              </div>
            )}
            <div className="flex-1">
              <p className="font-medium text-gray-800">📧 {item.email}</p>
              <p className="text-gray-700 whitespace-pre-line">{item.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}