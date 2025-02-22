import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef<null | HTMLCanvasElement>(null)
  const [globalCtx, setGlobalCtx] = useState<null | CanvasRenderingContext2D>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setGlobalCtx(ctx)
    ctx.strokeStyle = "red";

    const start = (event: MouseEvent) => {
      ctx.beginPath()
      ctx.moveTo(event.offsetX, event.offsetY)
      setIsDrawing(true)
    }
    const draw = (event: MouseEvent) => {
      if (!isDrawing) return
      ctx.lineTo(event.offsetX, event.offsetY)
      ctx.stroke()
    }

    const stop = () => {
      setIsDrawing(false)
      ctx.beginPath()
    }

    canvas.addEventListener("mousedown", start)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", stop)

    return () => {
      canvas.removeEventListener("mousedown", start)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", stop)
    }
  }, [isDrawing])
  function handleClear() {
    if (globalCtx && canvasRef.current) {
      globalCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }
  return (
    <>
      <canvas ref={canvasRef} width="600" height="600"></canvas>
      <button onClick={handleClear}>Clear Canvas</button>
    </>
  )
}

export default App
