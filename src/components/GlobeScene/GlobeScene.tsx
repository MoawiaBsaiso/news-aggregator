import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlobeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Globe
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: 0x1a56db,
      emissive: 0x072ac8,
      emissiveIntensity: 0.1,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireGlobe = new THREE.Mesh(geometry, wireMat);
    scene.add(wireGlobe);

    // News hotspots (lat/lng converted to 3D points)
    const hotspots = [
      { lat: 40.7, lng: -74.0 },   // New York
      { lat: 51.5, lng: -0.1 },    // London
      { lat: 35.6, lng: 139.6 },   // Tokyo
      { lat: 48.8, lng: 2.3 },     // Paris
      { lat: 31.2, lng: 121.4 },   // Shanghai
      { lat: -33.8, lng: 151.2 },  // Sydney
      { lat: 55.7, lng: 37.6 },    // Moscow
      { lat: 19.4, lng: -99.1 },   // Mexico City
      { lat: -23.5, lng: -46.6 },  // São Paulo
      { lat: 28.6, lng: 77.2 },    // New Delhi
      { lat: 1.3, lng: 103.8 },    // Singapore
      { lat: 30.0, lng: 31.2 },    // Cairo
    ];

    const dotGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });

    hotspots.forEach(({ lat, lng }) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.set(
        -(Math.sin(phi) * Math.cos(theta)),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      );
      scene.add(dot);
    });

    // Atmosphere glow
    const atmosGeometry = new THREE.SphereGeometry(1.05, 64, 64);
    const atmosMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    scene.add(new THREE.Mesh(atmosGeometry, atmosMaterial));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x60a5fa, 1.5, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(0x1e40af, 0.8, 10);
    backLight.position.set(-3, -3, -3);
    scene.add(backLight);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const nw = mountRef.current.clientWidth;
      const nh = mountRef.current.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      wireGlobe.rotation.y += 0.002;
      globe.rotation.x += (mouseY - globe.rotation.x) * 0.02;
      globe.rotation.y += (mouseX - globe.rotation.y) * 0.02;
      wireGlobe.rotation.x = globe.rotation.x;
      wireGlobe.rotation.y = globe.rotation.y;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default GlobeScene;