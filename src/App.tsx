import { useState } from 'react'
import Uploader from './components/Uploader'
import CanvasPreview from './components/CanvasPreview'
import MessageForm from './components/MessageForm'
import MessageList from './components/MessageList'

type OverlayPosition = 'top-left' | 'top-right' | 'bottom-right'

export default function App() {
  const [image, setImage] = useState<File | null>(null)
  const [overlayFile, setOverlayFile] = useState('rainbow-flag.png')
  const [overlayEmoji, setOverlayEmoji] = useState('🌈')
  const [overlayPosition, setOverlayPosition] =
    useState<OverlayPosition>('top-right')

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans text-sm overflow-hidden">
      {/* 왼쪽 고정 영역 */}
      <div className="w-full md:w-[360px] p-4 pt-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col gap-4 overflow-y-auto">
        <h1 className="text-lg font-semibold leading-6 text-center">🌈 캠페인 참여하기</h1>
        <Uploader onSelect={setImage} />
        {/* 이모지 선택 */}
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
                overlayFile === item.file
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-white border-gray-300 hover:bg-gray-100'
              }`}
            >
              {item.emoji}
            </button>
          ))}
        </div>
        {image && (
          <CanvasPreview
            image={image}
            overlay={overlayFile}
            position={overlayPosition}
            setPosition={setOverlayPosition}
          />
        )}
        <MessageForm overlay={overlayEmoji} />
      </div>
      {/* 오른쪽 메시지 리스트 */}
      <div className="w-full flex-1 p-4 md:p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-lg font-semibold leading-6 mb-4 text-center">
          💌 남겨진 응원 메시지
        </h2>
        <MessageList />
      </div>
    </div>
  )
}
