// src/components/TruckCanvas.tsx
'use client'

import { Suspense, memo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'

type TruckGLTF = GLTF & {
  nodes?: Record<string, any>
  materials?: Record<string, any>
}

function TruckModel({ path = '/models/truck.glb' }: { path?: string }) {
  const gltf = useGLTF(path) as TruckGLTF
  return <primitive object={gltf.scene} />
}
// Preload, damit das Modell im Hintergrund geladen wird
useGLTF.preload('/models/truck.glb')

function TruckCanvasInner() {
  return (
    <div className="h-[480px] w-full overflow-hidden rounded-2xl border shadow-card">
      <Canvas camera={{ position: [4, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <Stage intensity={0.6} environment="city" adjustCamera>
            <TruckModel />
          </Stage>
        </Suspense>
        <OrbitControls autoRotate enablePan={false} />
      </Canvas>
    </div>
  )
}

export default memo(TruckCanvasInner)
