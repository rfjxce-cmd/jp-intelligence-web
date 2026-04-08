"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCube() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 200);
    camera.position.set(3.2, 2.2, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Outer cube wireframe ───────────────────────────────────────────────
    const outerGeo = new THREE.BoxGeometry(2, 2, 2);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    });
    const outerWire = new THREE.LineSegments(outerEdges, outerMat);
    scene.add(outerWire);

    // Outer cube glass fill
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0a,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    });
    const glassMesh = new THREE.Mesh(outerGeo, glassMat);
    scene.add(glassMesh);

    // ── Inner icosahedron ──────────────────────────────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(0.72, 0);
    const icoEdges = new THREE.EdgesGeometry(icoGeo);
    const icoMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.55,
    });
    const icoWire = new THREE.LineSegments(icoEdges, icoMat);
    scene.add(icoWire);

    // ── Second inner cube (smaller, tilted) ────────────────────────────────
    const innerGeo = new THREE.BoxGeometry(1.15, 1.15, 1.15);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
    });
    const innerWire = new THREE.LineSegments(innerEdges, innerMat);
    innerWire.rotation.set(0.4, 0.4, 0.1);
    scene.add(innerWire);

    // ── Vertex particles ───────────────────────────────────────────────────
    const corners = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
    ];
    const particleGroup = new THREE.Group();
    const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    corners.forEach(([x, y, z]) => {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      particleGroup.add(dot);
    });
    scene.add(particleGroup);

    // ── Floating ambient particles ─────────────────────────────────────────
    const pCount = 80;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 8;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Ground grid plane ──────────────────────────────────────────────────
    const gridHelper = new THREE.GridHelper(7, 10, 0x1a1a1a, 0x111111);
    gridHelper.position.y = -1.5;
    (gridHelper.material as THREE.LineBasicMaterial).transparent = true;
    (gridHelper.material as THREE.LineBasicMaterial).opacity = 0.4;
    scene.add(gridHelper);

    // ── Edge glow (wide white lines behind the main wireframe) ────────────
    const glowMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.06,
      linewidth: 1,
    });
    const glowWire = new THREE.LineSegments(outerEdges, glowMat);
    glowWire.scale.setScalar(1.05);
    scene.add(glowWire);

    // ── Lights ─────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pt = new THREE.PointLight(0xffffff, 1.2, 12);
    pt.position.set(4, 4, 4);
    scene.add(pt);

    // ── Mouse parallax ────────────────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      // normalise to [-1, 1]
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation loop ────────────────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();
    const pivot = new THREE.Group();
    scene.add(pivot);
    pivot.add(outerWire, glassMesh, icoWire, innerWire, particleGroup, glowWire);

    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Base rotation
      pivot.rotation.x = t * 0.20;
      pivot.rotation.y = t * 0.28;

      // Mouse parallax offset (lerp toward target)
      pivot.rotation.x += mouseRef.current.y * 0.18;
      pivot.rotation.y += mouseRef.current.x * 0.18;

      // Counter-rotate inner elements for visual depth
      icoWire.rotation.x = -t * 0.38;
      icoWire.rotation.y =  t * 0.52;
      innerWire.rotation.x = t * 0.30 + 0.4;
      innerWire.rotation.y = -t * 0.22 + 0.4;

      // Breathing scale
      const s = 1 + Math.sin(t * 0.7) * 0.025;
      pivot.scale.setScalar(s);

      // Particles drift slowly
      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.02;

      renderer.render(scene, camera);
    }
    animate();

    // ── Resize ─────────────────────────────────────────────────────────────
    function handleResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      [outerGeo, outerEdges, icoGeo, icoEdges, innerGeo, innerEdges,
       dotGeo, pGeo].forEach(g => g.dispose());
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" aria-hidden="true" />;
}
