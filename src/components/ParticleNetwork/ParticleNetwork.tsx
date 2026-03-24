import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleNetwork = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Particles
    const PARTICLE_COUNT = 120;
    const positions: THREE.Vector3[] = [];

    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 4;
      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;
      positions.push(new THREE.Vector3(x, y, z));
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Connection lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.15,
    });

    const MAX_DISTANCE = 2.5;
    const lineGroup = new THREE.Group();

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < MAX_DISTANCE) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            positions[i],
            positions[j],
          ]);
          lineGroup.add(new THREE.Line(lineGeo, lineMaterial));
        }
      }
    }
    scene.add(lineGroup);

    // Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const nw = mountRef.current.clientWidth;
      const nh = mountRef.current.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // Animation
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;
      lineGroup.rotation.y += 0.0008;
      lineGroup.rotation.x += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

export default ParticleNetwork;