import { useEffect, useState } from 'react'

type Message = {
  email: string
  message: string
  overlay?: string
  timestamp: string
}

const emojiBorderMap: Record<string, string> = {
  '🌈': 'border-pink-400',
  '⭐': 'border-yellow-400',
  '❤️': 'border-red-400',
  '💪': 'border-green-500',
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
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4">
        {messages.map((item, idx) => (
          <div
            key={idx}
            className={`bg-white p-4 rounded shadow-sm border border-gray-200 flex items-start gap-3 ${
              item.overlay ? emojiBorderMap[item.overlay] || '' : ''
            }`}
          >
            {item.overlay && (
              <div className={`text-xl w-8 h-8 flex items-center justify-center rounded-full border ${
                emojiBorderMap[item.overlay] || 'border-gray-300'
              }`}>
                {item.overlay}
              </div>
            )}
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.email}</p>
              <p className="text-gray-700">{item.message}</p>
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
