"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCube() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(3, 2, 5);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Geometry — main cube
    const geo = new THREE.BoxGeometry(2, 2, 2);

    // Wireframe edges in gold
    const edges = new THREE.EdgesGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xc9a84c,
      transparent: true,
      opacity: 0.85,
    });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    scene.add(wireframe);

    // Glass-like mesh (very subtle fill)
    const meshMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1208,
      transparent: true,
      opacity: 0.08,
      roughness: 0.05,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, meshMat);
    scene.add(mesh);

    // Inner smaller cube (depth effect)
    const innerGeo = new THREE.BoxGeometry(1.1, 1.1, 1.1);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerLineMat = new THREE.LineBasicMaterial({
      color: 0xe4c97a,
      transparent: true,
      opacity: 0.25,
    });
    const innerWireframe = new THREE.LineSegments(innerEdges, innerLineMat);
    scene.add(innerWireframe);

    // Diagonal cross lines connecting corners
    const crossPoints = [
      new THREE.Vector3(-1, -1, -1),
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(1, -1, -1),
      new THREE.Vector3(-1, 1, 1),
    ];
    const crossGeo = new THREE.BufferGeometry().setFromPoints(crossPoints);
    const crossMat = new THREE.LineBasicMaterial({
      color: 0xc9a84c,
      transparent: true,
      opacity: 0.12,
    });
    const crossLines = new THREE.LineSegments(crossGeo, crossMat);
    scene.add(crossLines);

    // Ambient light
    const ambient = new THREE.AmbientLight(0xc9a84c, 0.3);
    scene.add(ambient);

    // Point light for subtle glow
    const pointLight = new THREE.PointLight(0xc9a84c, 1.5, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    // Animation
    let frameId: number;
    const clock = new THREE.Clock();

    function animate() {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow, smooth rotation
      wireframe.rotation.x = elapsed * 0.18;
      wireframe.rotation.y = elapsed * 0.25;
      mesh.rotation.x = elapsed * 0.18;
      mesh.rotation.y = elapsed * 0.25;
      innerWireframe.rotation.x = -elapsed * 0.22;
      innerWireframe.rotation.y = elapsed * 0.3;
      crossLines.rotation.x = elapsed * 0.18;
      crossLines.rotation.y = elapsed * 0.25;

      // Subtle breathing scale
      const scale = 1 + Math.sin(elapsed * 0.6) * 0.03;
      wireframe.scale.setScalar(scale);
      mesh.scale.setScalar(scale);

      renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    function handleResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      geo.dispose();
      edges.dispose();
      lineMat.dispose();
      meshMat.dispose();
      innerGeo.dispose();
      innerEdges.dispose();
      innerLineMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  );
}
