import { addStyle } from './addStyle'
import { dragEvent } from './dragEvent'
import { isFn } from './isFn'
import { isStr } from './isStr'
import { randomRange } from './randomRange'

export function sliderValidation(url: string, container: HTMLElement | string, l: number | (() => void) = 42, callback: () => void) {
  if (isFn(l)) {
    callback = l as () => void
    l = 42
  }
  if (isStr(container))
    container = document.querySelector(container as string) as HTMLElement || container
  if (isStr(container))
    throw new Error(`${container} is not a HTMLElement`)
  const image = new Image()
  image.src = url
  image.onload = () => {
    const PI = Math.PI
    const canvas = document.createElement('canvas')
    const moveCanvas = canvas.cloneNode() as HTMLCanvasElement
    const moveCtx = moveCanvas.getContext('2d')!
    const ctx = canvas.getContext('2d')!
    const width = image.width
    const height = image.height
    const r = 9
    const L = +l + r * 2 + 3
    const rangeX = randomRange(L + 10, width - (L + 10))
    const rangeY = randomRange(10 + r * 2, height - (L + 10))
    const y1 = rangeY - r * 2 - 1
    const drawPath = (
      ctx: any,
      x: number,
      y: number,
      operation: 'fill' | 'clip',
    ) => {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.arc(x + +l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
      ctx.lineTo(x + +l, y)
      ctx.arc(x + +l + r - 2, y + +l / 2, r, 1.21 * PI, 2.78 * PI)
      ctx.lineTo(x + +l, y + +l)
      ctx.lineTo(x, y + +l)
      ctx.arc(x + r - 2, y + +l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
      ctx.lineTo(x, y)
      ctx.lineWidth = 2
      ctx.fillStyle = '#fff'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.stroke()
      ctx.globalCompositeOperation = 'destination-over'
      operation === 'fill' ? ctx.fill() : ctx.clip()
    }
    canvas.width = width
    canvas.height = height
    moveCanvas.width = width
    moveCanvas.height = height
    drawPath(ctx, rangeX, rangeY, 'fill')
    drawPath(moveCtx, rangeX, rangeY, 'clip')
    ctx.drawImage(image, 0, 0, width, height)
    moveCtx.drawImage(image, 0, 0, width, height)
    const ImageData = moveCtx.getImageData(rangeX - 3, y1, L, L)
    moveCanvas.width = L
    moveCtx.putImageData(ImageData, 0, y1)
    let offsetX: number
    dragEvent(moveCanvas, {
      dragStart(e) {
        offsetX = e.clientX - e.target.offsetLeft
      },
      dragMove(e) {
        const moveX = e.clientX - offsetX
        if (moveX < 0 || moveX > width - L)
          return
        moveCanvas.style.left = `${moveX}px`
      },
      dragEnd(e) {
        const moveX = e.clientX - offsetX
        if (moveX > rangeX - 10 && moveX < rangeX + 8) {
          moveCanvas.style.left = `${rangeX - 3}px`
          callback?.()
        }
        else {
          moveCanvas.className = 'animate-head-shake'
          moveCanvas.style.left = '0px'
          setTimeout(() => {
            moveCanvas.className = ''
          }, 200)
        }
      },
    })
    moveCanvas.style.position = 'absolute'
    moveCanvas.style.top = '0px';
    (container as HTMLElement).appendChild(canvas);
    (container as HTMLElement).appendChild(moveCanvas)
  }
}

addStyle(`@keyframes head-shake {
  0% {
    transform: translateX(0);
  }
  6.5% {
    transform: translateX(-6px) rotateY(-9deg);
  }
  18.5% {
    transform: translateX(5px) rotateY(7deg);
  }
  31.5% {
    transform: translateX(-3px) rotateY(-5deg);
  }
  43.5% {
    transform: translateX(2px) rotateY(3deg);
  }
  50% {
    transform: translateX(0);
  }
}
.animate-head-shake {
  animation: head-shake 1s ease-in-out 1;
}`)
