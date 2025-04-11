import { useEffect, useRef, useState } from 'react'

type Props = {
  image: File
  overlay: string
  position: 'top-left' | 'top-right' | 'bottom-right'
}

export default function CanvasPreview({ image, overlay, position, setPosition }: Props & { setPosition?: (pos: Props['position']) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const baseImage = new Image()
    const overlayImg = new Image()

    baseImage.onload = () => {
      const size = 320
      canvas.width = size
      canvas.height = size

      const ratio = Math.min(size / baseImage.width, size / baseImage.height)
      const w = baseImage.width * ratio
      const h = baseImage.height * ratio
      const x = (size - w) / 2
      const y = (size - h) / 2
      ctx.drawImage(baseImage, x, y, w, h)

      overlayImg.onload = () => {
        const badgeSize = size / 3
        let ox = 0
        let oy = 0

        if (position === 'top-left') {
          ox = 12
          oy = 12
        } else if (position === 'top-right') {
          ox = size - badgeSize - 12
          oy = 12
        } else if (position === 'bottom-right') {
          ox = size - badgeSize - 12
          oy = size - badgeSize - 12
        }

        ctx.drawImage(overlayImg, ox, oy, badgeSize, badgeSize)
        setDownloadUrl(canvas.toDataURL('image/png'))
      }

      overlayImg.onerror = () => {
        console.error('❌ overlay image failed to load')
      }

      overlayImg.src = import.meta.env.BASE_URL + overlay
    }

    baseImage.src = URL.createObjectURL(image)
  }, [image, overlay, position])

  return (
    <div className="mt-6 text-center">
      <h2 className="text-base font-semibold mb-3">미리보기</h2>
      <canvas
        ref={canvasRef}
        className="mx-auto mb-4 border border-gray-300 rounded bg-white"
        style={{ width: 320, height: 320 }}
      />
      {setPosition && (
        <div className="flex justify-center gap-3 mb-4">
          {[
            { label: '왼쪽 위', value: 'top-left' },
            { label: '오른쪽 위', value: 'top-right' },
            { label: '오른쪽 아래', value: 'bottom-right' },
          ].map((opt) => (
            <label
              key={opt.value}
              className="text-sm flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-100 transition"
            >
              <input
                type="radio"
                name="overlayPosition"
                value={opt.value}
                checked={position === opt.value}
                onChange={() => setPosition(opt.value as Props['position'])}
                className="accent-blue-500"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download="campaign-image.png"
          className="inline-block px-4 py-2 text-sm text-white bg-gray-800 rounded hover:bg-gray-700 transition"
        >
          이미지 다운로드
        </a>
      )}
    </div>
  )
}