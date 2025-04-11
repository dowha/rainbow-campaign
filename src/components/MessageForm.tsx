import React, { useState } from 'react'

export default function MessageForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('제출 시도 중...')

    const form = new URLSearchParams()
    form.append('email', email)
    form.append('message', message)

    try {
      const res = await fetch(import.meta.env.VITE_GAS_URL, {
        method: 'POST',
        body: form,
      })

      const text = await res.text()
      console.log('응답:', text)

      if (res.ok && text.includes('success')) {
        setSubmitted(true)
      } else {
        alert('제출 실패! 응답코드: ' + res.status)
      }
    } catch (err) {
      console.error('제출 중 오류 발생:', err)
      alert('제출 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="mt-6">
      {submitted ? (
        <p className="text-green-600 text-sm">
          지지 메시지가 제출되었습니다! 감사합니다 💌
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              지지 메시지
            </label>
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
          >
            제출
          </button>
        </form>
      )}
    </div>
  )
}
