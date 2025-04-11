import React, { useState } from 'react'

export default function MessageForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return
    setIsSubmitting(true)

    const form = new URLSearchParams()
    form.append('email', email)
    form.append('message', message)

    try {
      const res = await fetch(import.meta.env.VITE_GAS_URL, {
        method: 'POST',
        body: form,
      })

      const text = await res.text()
      if (res.ok && text.includes('success')) {
        alert('메시지가 성공적으로 제출되었습니다! 💌')
        setEmail('')
        setMessage('')
      } else {
        alert('제출에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (err) {
      console.error('제출 오류:', err)
      alert('오류가 발생했습니다. 네트워크 상태를 확인해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">지지 메시지</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full text-white text-sm font-medium py-2 px-4 rounded ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? '제출 중...' : '제출'}
      </button>
    </form>
  )
}
