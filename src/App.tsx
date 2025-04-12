import { useState, useEffect, useRef } from 'react'
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
  const [isSticky, setIsSticky] = useState(false)

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // 💡 모바일에서 왼쪽 영역 지나가면 메시지 제목 sticky 처리
  useEffect(() => {
    const sentinel = sentinelRef.current
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    )

    if (sentinel) observer.observe(sentinel)

    return () => {
      if (sentinel) observer.unobserve(sentinel)
    }
  }, [])

  return (
    <div className="flex flex-col md:flex-row font-sans text-sm min-h-screen md:h-screen">
      {/* 왼쪽 고정 영역 */}
      <div className="w-full md:w-[360px] p-6 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col gap-4 md:h-screen overflow-y-auto">
        <h1 className="text-lg font-semibold leading-6 text-center">
          🌈 캠페인 참여하기
        </h1>

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

        {/* 👉 모바일 기준점 (스크롤 감지용) */}
        <div ref={sentinelRef} className="h-1" />
      </div>

      {/* 오른쪽 메시지 리스트 */}
      <div className="w-full flex-1 p-4 md:p-6 bg-gray-50 overflow-y-auto">
        <h2
          className={`text-lg font-semibold leading-6 mb-4 text-center transition-all ${
            isSticky ? 'sticky top-0 bg-gray-50 z-10' : ''
          }`}
        >
          💌 남겨진 응원 메시지
        </h2>
        <MessageList />
      </div>
    </div>
  )
}
