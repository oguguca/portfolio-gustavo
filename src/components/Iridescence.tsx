import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle, Vec3 } from 'ogl'
import { useReducedMotion } from '../hooks/useReducedMotion'

const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = `
precision highp float;
uniform float uTime;
uniform vec3 uColor;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 m = (uMouse - 0.5) * uAmplitude;

  float t = uTime * uSpeed * 0.2;
  float wave = sin((uv.x + m.x) * 6.0 + t) + sin((uv.y + m.y) * 5.0 - t * 1.3);
  float wave2 = sin((uv.x - uv.y) * 8.0 + t * 0.7);

  vec3 shift = vec3(
    sin(wave * 1.2 + t) * 0.5 + 0.5,
    sin(wave * 1.2 + t + 2.094) * 0.5 + 0.5,
    sin(wave2 * 1.2 + t + 4.188) * 0.5 + 0.5
  );

  vec3 color = uColor + shift * 0.5;
  gl_FragColor = vec4(color, 1.0);
}
`

export interface IridescenceProps {
  color?: [number, number, number]
  speed?: number
  amplitude?: number
  mouseReact?: boolean
  className?: string
}

/**
 * Iridescence — matches the public API of reactbits.dev's Iridescence
 * background (https://reactbits.dev/backgrounds/iridescence), built on the
 * same underlying library: OGL, a lightweight WebGL wrapper.
 */
export default function Iridescence({
  color = [0.3, 0.2, 0.5],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = false,
  className = '',
}: IridescenceProps) {
  const ctnRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0.5, y: 0.5 })
  const reduced = useReducedMotion()

  useEffect(() => {
    const ctn = ctnRef.current
    if (!ctn) return

    const renderer = new Renderer()
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)

    let program: Program

    function resize() {
      renderer.setSize(ctn!.offsetWidth, ctn!.offsetHeight)
      if (program) {
        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height]
      }
    }
    window.addEventListener('resize', resize)

    const geometry = new Triangle(gl)
    program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Vec3(...color) },
        uResolution: { value: [gl.canvas.width, gl.canvas.height] },
        uMouse: { value: [mousePos.current.x, mousePos.current.y] },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    resize()

    let raf = 0
    let staticDrawn = false

    function update(t: number) {
      raf = requestAnimationFrame(update)
      if (reduced) {
        if (staticDrawn) return
        staticDrawn = true
      } else {
        program.uniforms.uTime.value = t * 0.001
      }
      program.uniforms.uMouse.value = [mousePos.current.x, mousePos.current.y]
      renderer.render({ scene: mesh })
    }
    raf = requestAnimationFrame(update)

    ctn.appendChild(gl.canvas)

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn!.getBoundingClientRect()
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
      }
    }
    if (mouseReact) ctn.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      if (mouseReact) ctn.removeEventListener('mousemove', handleMouseMove)
      if (ctn.contains(gl.canvas)) ctn.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [color, speed, amplitude, mouseReact, reduced])

  return (
    <div
      ref={ctnRef}
      className={`w-full h-full absolute inset-0 pointer-events-none ${className}`}
    />
  )
}
