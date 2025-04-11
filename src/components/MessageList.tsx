import { useEffect, useState } from 'react'

type Message = {
  email: string
  message: string
  timestamp: string
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
            className="bg-white p-4 rounded shadow-sm border border-gray-200"
          >
            <p className="font-medium text-gray-800">📧 {item.email}</p>
            <p className="my-2 text-gray-700 whitespace-pre-line">
              {item.message}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
