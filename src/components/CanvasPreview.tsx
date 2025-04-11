import { useEffect, useRef, useState } from 'react'

type Props = {
  image: File
}

export default function CanvasPreview({ image }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const baseImage = new Image()
    const overlay = new Image()

    baseImage.onload = () => {
      const size = 320
      canvas.width = size
      canvas.height = size

      // 정사각형 안에 비율 유지하며 중앙 정렬
      const ratio = Math.min(size / baseImage.width, size / baseImage.height)
      const w = baseImage.width * ratio
      const h = baseImage.height * ratio
      const x = (size - w) / 2
      const y = (size - h) / 2
      ctx.drawImage(baseImage, x, y, w, h)

      overlay.onload = () => {
        const badgeSize = size / 3
        ctx.drawImage(overlay, size - badgeSize - 12, 12, badgeSize, badgeSize)
        setDownloadUrl(canvas.toDataURL('image/png'))
      }

      overlay.onerror = () => {
        console.error('❌ overlay image failed to load')
      }

      overlay.src = import.meta.env.BASE_URL + 'rainbow-flag.png'
    }

    baseImage.src = URL.createObjectURL(image)
  }, [image])

  return (
    <div className="mt-6 text-center">
      <h2 className="text-base font-semibold mb-3">미리보기</h2>
      <canvas
        ref={canvasRef}
        className="mx-auto mb-4 border border-gray-300 rounded bg-white"
        style={{ width: 320, height: 320 }}
      />
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
