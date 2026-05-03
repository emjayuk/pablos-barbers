'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Module-level scroll state (browser-only, updated by listener) ── */
const scrollState = { progress: 0 }

/* ── Barber pole CanvasTexture ───────────────────────────────────── */
function makeBarberTexture(): THREE.CanvasTexture {
  const W = 512, H = 1024
  const canvas = document.createElement('canvas')
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  const colors = ['#ffffff', '#C1121F', '#ffffff', '#1B4332', '#ffffff', '#F4A11D']
  const stripeW = W / colors.length
  // Diagonal shear — positive slant creates classic barber-pole spiral on Y-rotation
  const slant = H * 0.6

  for (let rep = -2; rep <= 4; rep++) {
    colors.forEach((color, i) => {
      const x = (rep * colors.length + i) * stripeW
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(x - slant,           0)
      ctx.lineTo(x - slant + stripeW, 0)
      ctx.lineTo(x          + stripeW, H)
      ctx.lineTo(x,                    H)
      ctx.closePath()
      ctx.fill()
    })
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.needsUpdate = true
  return tex
}

/* ── Barber Pole mesh ────────────────────────────────────────────── */
function BarberPole() {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useMemo(() => makeBarberTexture(), [])

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.008
    const s = scrollState.progress
    meshRef.current.position.z = -s * 4
    meshRef.current.scale.setScalar(1 - s * 0.4)
  })

  return (
    <mesh ref={meshRef} position={[1.5, 0, -0.5]}>
      <cylinderGeometry args={[0.4, 0.4, 8, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

/* ── Gold particles (InstancedMesh for performance) ─────────────── */
const PARTICLE_COUNT = 200

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const matRef  = useRef<THREE.MeshStandardMaterial>(null)
  const timeRef = useRef(0)

  const { positions, phases } = useMemo(() => {
    const positions: [number, number, number][] = []
    const phases: number[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 1 + Math.random() * 5        // 1–6 units radius
      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ])
      phases.push(Math.random() * Math.PI * 2)
    }
    return { positions, phases }
  }, [])

  /* Seed initial positions */
  useEffect(() => {
    if (!meshRef.current) return
    const dummy = new THREE.Object3D()
    positions.forEach(([x, y, z], i) => {
      dummy.position.set(x, y, z)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [positions])

  useFrame((_, delta) => {
    if (!meshRef.current || !matRef.current) return
    timeRef.current += delta
    const s     = scrollState.progress
    const dummy = new THREE.Object3D()

    positions.forEach(([x, y, z], i) => {
      const floatY  = Math.sin(timeRef.current * 0.45 + phases[i]) * 0.18
      const spread  = 1 + s * 0.8                // 1 → 1.8
      dummy.position.set(x * spread, y * spread + floatY, z * spread)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    matRef.current.opacity = Math.max(0, 1 - s * 0.8)  // 1 → 0.2
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshStandardMaterial
        ref={matRef}
        color="#F4A11D"
        emissive="#F4A11D"
        emissiveIntensity={0.6}
        transparent
        opacity={1}
      />
    </instancedMesh>
  )
}

/* ── Scene contents ─────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} color="#fff8f0" />
      <pointLight color="#F4A11D" position={[2, 3, 4]} intensity={1.2} />
      <BarberPole />
      <Particles />
    </>
  )
}

/* ── Canvas wrapper (default export — dynamically imported) ───────── */
export default function HeroScene() {
  /* Track scroll progress 0→1 over the first viewport height */
  useEffect(() => {
    function onScroll() {
      scrollState.progress = Math.min(window.scrollY / window.innerHeight, 1)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 6] }}
      gl={{ antialias: true, alpha: true }}
      frameloop="always"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Scene />
    </Canvas>
  )
}
