import Uploader from './components/Uploader'
import CanvasPreview from './components/CanvasPreview'
import MessageForm from './components/MessageForm'
import MessageList from './components/MessageList'
import { useState } from 'react'

export default function App() {
  const [image, setImage] = useState<File | null>(null)
  const [overlayFile, setOverlayFile] = useState('rainbow-flag.png') // 이미지 파일용
  const [overlayEmoji, setOverlayEmoji] = useState('🌈') // 이모지 저장

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen font-sans text-sm">
      {/* 왼쪽 고정 영역 */}
      <div className="w-full md:w-[360px] p-4 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col gap-4">
        <h1 className="text-lg font-semibold leading-6">캠페인 참여</h1>
        <Uploader onSelect={setImage} />

        {/* 이모지 선택 버튼 */}
        <div className="flex justify-center gap-3 my-2">
          {[ 
            { emoji: '🌈', file: 'rainbow-flag.png' },
            { emoji: '⭐', file: 'star.png' },
            { emoji: '❤️', file: 'heart.png' },
            { emoji: '💪', file: 'support.png' },
          ].map((item) => (
            <button
              key={item.file}
              onClick={() => {
                setOverlayFile(item.file)
                setOverlayEmoji(item.emoji)
              }}
              className={`w-10 h-10 rounded-full border text-xl flex items-center justify-center transition ${
                overlayFile === item.file ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
              }`}
            >
              {item.emoji}
            </button>
          ))}
        </div>

        {image && <CanvasPreview image={image} overlay={overlayFile} />}
        <MessageForm overlay={overlayEmoji} />
      </div>

      {/* 오른쪽 메시지 리스트 */}
      <div className="w-full flex-1 p-4 md:p-6 bg-gray-50">
        <h2 className="text-lg font-semibold leading-6 mb-4">💌 남겨진 메시지들</h2>
        <MessageList />
      </div>
    </div>
  )
}
