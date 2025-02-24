import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef<null | HTMLCanvasElement>(null)
  const [globalCtx, setGlobalCtx] = useState<null | CanvasRenderingContext2D>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/ws")
    ws.onopen = () => setSocket(ws)
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    }
  }, [])
  const [disableCanvas, setDisableCanvas] = useState<boolean>(false)
  useEffect(() => {
    if (socket) {
      socket.onmessage = (msg) => {
        if (globalCtx && canvasRef.current) {
          if (msg.data === "clear") {
            console.log(msg.data + "0")
            globalCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          } else if ((msg.data as string).endsWith("start")) {
            console.log(msg.data + "1")
            const [x, y] = msg.data.split(",").map(Number)
            globalCtx.moveTo(x, y)
          } else if (msg.data === "disable") {
            console.log(msg.data + "2")
            setDisableCanvas(true)
          } else if (msg.data === "enable") {
            console.log(msg.data + "3")
            globalCtx.beginPath()
          } else {
            console.log(msg.data + "4")
            const [x, y] = msg.data.split(",").map(Number)
            globalCtx.lineTo(x, y);
            globalCtx.stroke()
          }
        }
      }
      return () => {
        socket.onmessage = null;
      };
    }
  }, [globalCtx, socket])

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setGlobalCtx(ctx)
    ctx.strokeStyle = "red";

    const start = (event: MouseEvent) => {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.warn("WebSocket is not open yet");
        return;
      }
      ctx.beginPath()
      ctx.moveTo(event.offsetX, event.offsetY)
      socket?.send("disable")
      socket?.send([event.offsetX, event.offsetY].toString() + ",start")
      setIsDrawing(true);
      console.log("ws 1 2")
    }
    const draw = (event: MouseEvent) => {
      if (!isDrawing) return;
      ctx.lineTo(event.offsetX, event.offsetY)
      socket?.send([event.offsetX, event.offsetY].toString())
      ctx.stroke()
    }

    const stop = () => {
      socket?.send("enable")
      setIsDrawing(false);
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
  }, [isDrawing, socket])

  function handleClear() {
    if (globalCtx && canvasRef.current) {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.warn("WebSocket is not open yet");
        return;
      }
      socket?.send("clear")
      globalCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }
  return (
    <>
      <canvas ref={canvasRef} width="600" height="600" style={{ pointerEvents: disableCanvas ? "none" : undefined }}></canvas>
      <button onClick={handleClear}>Clear Canvas</button>
    </>
  )
}

export default App
