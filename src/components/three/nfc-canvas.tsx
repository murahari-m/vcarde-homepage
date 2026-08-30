import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function makeCardTexture(side: "front" | "back") {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 640;
  const g = c.getContext("2d");
  if (!g) return new THREE.CanvasTexture(c);

  g.fillStyle = "#0c120e";
  g.fillRect(0, 0, 1024, 640);
  const lg = g.createLinearGradient(0, 0, 1024, 640);
  lg.addColorStop(0, "#121a14");
  lg.addColorStop(1, "#070907");
  g.fillStyle = lg;
  g.fillRect(0, 0, 1024, 640);

  g.strokeStyle = "#8be64a";
  g.lineWidth = 8;
  g.strokeRect(36, 36, 952, 568);

  g.fillStyle = "#8be64a";
  g.font = "700 72px Syne, sans-serif";
  g.fillText("VCARDe", 80, 150);

  g.fillStyle = "#c5d0c0";
  g.font = "400 32px Outfit, sans-serif";
  g.fillText(side === "front" ? "NFC BUSINESS CARD" : "TAP TO SHARE", 80, 210);

  if (side === "front") {
    g.fillStyle = "#9aa394";
    g.font = "400 26px Outfit, sans-serif";
    g.fillText("Hari · Chennai", 80, 520);
    g.fillText("vcarde.com", 80, 560);
    g.fillStyle = "#f3f6f1";
    g.fillRect(720, 360, 200, 200);
    g.fillStyle = "#070807";
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if ((x + y) % 2 === 0 || (x * y) % 3 === 0) {
          g.fillRect(736 + x * 22, 376 + y * 22, 18, 18);
        }
      }
    }
  } else {
    g.fillStyle = "#8be64a";
    g.beginPath();
    g.moveTo(430, 280);
    g.lineTo(512, 520);
    g.lineTo(594, 280);
    g.closePath();
    g.fill();
    g.fillStyle = "#9aa394";
    g.font = "400 24px Outfit, sans-serif";
    g.fillText("No app required  ·  Android & iOS", 80, 560);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function Card() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const textures = useMemo(
    () => ({ front: makeCardTexture("front"), back: makeCardTexture("back") }),
    [],
  );

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const tx = state.pointer.x * 0.55;
    const ty = -state.pointer.y * 0.35;
    g.rotation.y += (tx - g.rotation.y) * 0.08;
    g.rotation.x += (ty - g.rotation.x) * 0.08;
    if (ring.current) {
      const t = (state.clock.elapsedTime % 2.2) / 2.2;
      const s = 1 + t * 1.4;
      ring.current.scale.set(s, s, s);
      const mat = ring.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.45 * (1 - t);
    }
  });

  useEffect(() => {
    return () => {
      textures.front.dispose();
      textures.back.dispose();
    };
  }, [textures]);

  return (
    <group ref={group}>
      <mesh castShadow>
        <boxGeometry args={[2.2, 1.38, 0.045]} />
        <meshStandardMaterial attach="material-0" color="#1a221c" metalness={0.7} roughness={0.3} />
        <meshStandardMaterial attach="material-1" color="#1a221c" metalness={0.7} roughness={0.3} />
        <meshStandardMaterial attach="material-2" color="#8be64a" metalness={0.4} roughness={0.4} />
        <meshStandardMaterial attach="material-3" color="#8be64a" metalness={0.4} roughness={0.4} />
        <meshStandardMaterial
          attach="material-4"
          map={textures.front}
          metalness={0.35}
          roughness={0.28}
        />
        <meshStandardMaterial
          attach="material-5"
          map={textures.back}
          metalness={0.35}
          roughness={0.28}
        />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2.4, 0, 0]} position={[0.55, 0.05, 0.08]}>
        <ringGeometry args={[0.16, 0.2, 48]} />
        <meshBasicMaterial color="#8be64a" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const count = 280;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  useEffect(() => () => geo.dispose(), [geo]);

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#8be64a" size={0.018} transparent opacity={0.55} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#070807"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.35} color="#f3f6f1" />
      <pointLight position={[-3, 1, 2]} intensity={1.1} color="#8be64a" />
      <Particles />
      <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.55}>
        <Card />
      </Float>
      <ContactShadows position={[0, -1.15, 0]} opacity={0.45} scale={8} blur={2.4} far={2} />
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

  if (ok === null) {
    return <div className="hero-3d" aria-hidden />;
  }

  if (!ok) {
    return (
      <div className="hero-3d flex items-center justify-center">
        <img src="/nfc/hero-card.png" alt="NFC business card" className="w-4/5" />
      </div>
    );
  }

  return (
    <div className="hero-3d">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.15, 3.35], fov: 32 }}
        frameloop={reduced ? "demand" : "always"}
      >
        <Scene />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-fg-subtle">
        Move your cursor — 3D NFC business card
      </p>
    </div>
  );
}
