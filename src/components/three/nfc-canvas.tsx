import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const FRONT = "/cards/vcarde-gilt.jpg";
const BACK = "/cards/vcarde-field.jpg";

function GoldCard() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const [front, back] = useTexture([FRONT, BACK]);

  front.colorSpace = THREE.SRGBColorSpace;
  back.colorSpace = THREE.SRGBColorSpace;
  front.anisotropy = 8;
  back.anisotropy = 8;
  front.wrapS = front.wrapT = THREE.ClampToEdgeWrapping;
  back.wrapS = back.wrapT = THREE.ClampToEdgeWrapping;

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const tx = state.pointer.x * 0.55;
    const ty = -state.pointer.y * 0.28;
    g.rotation.y += (tx - g.rotation.y) * 0.1;
    g.rotation.x += (ty - g.rotation.x) * 0.1;
    if (ring.current) {
      const t = (state.clock.elapsedTime % 2.4) / 2.4;
      ring.current.scale.setScalar(1 + t * 1.45);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.48 * (1 - t);
    }
  });

  const gold = { color: "#c9a84c", metalness: 0.9, roughness: 0.22 } as const;

  return (
    <group ref={group} rotation={[0.12, -0.35, 0]}>
      <mesh castShadow>
        <boxGeometry args={[2.35, 1.38, 0.048]} />
        <meshStandardMaterial attach="material-0" {...gold} />
        <meshStandardMaterial attach="material-1" {...gold} />
        <meshStandardMaterial attach="material-2" color="#8be64a" metalness={0.6} roughness={0.28} />
        <meshStandardMaterial attach="material-3" color="#8be64a" metalness={0.6} roughness={0.28} />
        <meshStandardMaterial attach="material-4" map={front} metalness={0.35} roughness={0.22} />
        <meshStandardMaterial attach="material-5" map={back} metalness={0.32} roughness={0.26} />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2.25, 0, 0]} position={[0.7, 0.04, 0.12]}>
        <ringGeometry args={[0.13, 0.19, 40]} />
        <meshBasicMaterial color="#8be64a" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.62} />
      <directionalLight position={[2.8, 3.4, 4.2]} intensity={1.35} color="#fff4d4" />
      <pointLight position={[-2.2, 1.1, 2]} intensity={1.5} color="#8be64a" />
      <pointLight position={[2.4, -0.5, 1.2]} intensity={0.9} color="#c9a84c" />
      <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.32}>
        <GoldCard />
      </Float>
      <ContactShadows position={[0, -1.05, 0]} opacity={0.4} scale={7} blur={2.4} far={2} />
    </>
  );
}

export function NfcCanvas() {
  const [ok, setOk] = useState<boolean | null>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setOk(Boolean(c.getContext("webgl") || c.getContext("webgl2")));
    } catch {
      setOk(false);
    }
  }, []);

  if (ok === false) {
    return (
      <div className="hero-3d">
        <img src={FRONT} alt="VCARDe gold and green NFC business card" width={1050} height={600} />
      </div>
    );
  }

  return (
    <div className="hero-3d">
      {ok ? (
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0.18, 3.05], fov: 34 }}
          frameloop={reduced ? "demand" : "always"}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      ) : (
        <img src={FRONT} alt="" width={1050} height={600} className="hero-3d-fallback" />
      )}
      <p className="hero-3d-hint">Move your cursor</p>
    </div>
  );
}
