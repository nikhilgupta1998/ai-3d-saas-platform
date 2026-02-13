'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Model3DViewerProps {
  modelUrl?: string;
  autoRotate?: boolean;
  enableZoom?: boolean;
  showGrid?: boolean;
  backgroundColor?: string;
}

export default function Model3DViewer({
  modelUrl,
  autoRotate = false,
  enableZoom = true,
  showGrid = true,
  backgroundColor = '#1a1a1a',
}: Model3DViewerProps) {
  return (
    <div className="w-full h-full" style={{ backgroundColor }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Environment */}
        <Environment preset="studio" />
        
        {/* Grid */}
        {showGrid && (
          <Grid
            args={[20, 20]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#6b7280"
            sectionSize={2}
            sectionThickness={1}
            sectionColor="#4b5563"
            fadeDistance={25}
            fadeStrength={1}
            infiniteGrid
          />
        )}
        
        {/* Default Model (if no modelUrl provided) */}
        <Suspense fallback={<LoadingModel />}>
          {modelUrl ? (
            <LoadedModel url={modelUrl} />
          ) : (
            <DefaultModel />
          )}
        </Suspense>
        
        {/* Controls */}
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enableZoom={enableZoom}
          enablePan={true}
          minDistance={2}
          maxDistance={50}
          makeDefault
        />
      </Canvas>
    </div>
  );
}

function DefaultModel() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  );
}

function LoadedModel({ url }: { url: string }) {
  // In production, use GLTFLoader from drei
  // For now, show placeholder
  return <DefaultModel />;
}

function LoadingModel() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#6b7280" wireframe />
    </mesh>
  );
}
