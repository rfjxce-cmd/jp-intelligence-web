"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────────────
   Helper: build a LineSegments object from a list of [start, end] Vector3 pairs
───────────────────────────────────────────────────────────────────────────── */
function makeLines(
  pairs: [THREE.Vector3, THREE.Vector3][],
  color: number,
  opacity: number
): THREE.LineSegments {
  const pts: number[] = [];
  for (const [a, b] of pairs) {
    pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  return new THREE.LineSegments(geo, mat);
}

/* ─────────────────────────────────────────────────────────────────────────────
   All 8 corners of a unit cube (±1)
───────────────────────────────────────────────────────────────────────────── */
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const CORNERS = [
  V(-1,-1,-1), V( 1,-1,-1), V( 1, 1,-1), V(-1, 1,-1), // back face
  V(-1,-1, 1), V( 1,-1, 1), V( 1, 1, 1), V(-1, 1, 1), // front face
];

export default function HeroCube() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene / Camera / Renderer ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42, mount.clientWidth / mount.clientHeight, 0.1, 200
    );
    camera.position.set(3.4, 2.2, 5.8);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Pivot group (everything rotates together) ────────────────────────
    const pivot = new THREE.Group();
    scene.add(pivot);

    // ═══════════════════════════════════════════════════════════════════
    // 1. OUTER CUBE — bright wireframe edges
    // ═══════════════════════════════════════════════════════════════════
    const outerGeo   = new THREE.BoxGeometry(2, 2, 2);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerWire  = new THREE.LineSegments(
      outerEdges,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.92 })
    );
    pivot.add(outerWire);

    // Glass fill
    const glassMesh = new THREE.Mesh(
      outerGeo,
      new THREE.MeshPhysicalMaterial({
        color: 0x080808, transparent: true, opacity: 0.05, side: THREE.DoubleSide,
      })
    );
    pivot.add(glassMesh);

    // Glow halo (slightly larger copy, very faint)
    const glowWire = new THREE.LineSegments(
      outerEdges,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.07 })
    );
    glowWire.scale.setScalar(1.06);
    pivot.add(glowWire);

    // ═══════════════════════════════════════════════════════════════════
    // 2. INNER CUBE — rotated 45° on all axes, rotates OPPOSITE to outer
    // ═══════════════════════════════════════════════════════════════════
    const innerGeo   = new THREE.BoxGeometry(1.25, 1.25, 1.25);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerWire  = new THREE.LineSegments(
      innerEdges,
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 })
    );
    // Start tilted so it's visually interesting from frame 0
    innerWire.rotation.set(Math.PI / 4, Math.PI / 4, 0);
    pivot.add(innerWire);

    // ═══════════════════════════════════════════════════════════════════
    // 3. INTERNAL SPACE DIAGONALS — lines connecting every pair of
    //    opposite vertices through the center (4 main body diagonals)
    // ═══════════════════════════════════════════════════════════════════
    const bodyDiagonalPairs: [THREE.Vector3, THREE.Vector3][] = [
      [CORNERS[0], CORNERS[6]], // (-1,-1,-1) → ( 1, 1, 1)
      [CORNERS[1], CORNERS[7]], // ( 1,-1,-1) → (-1, 1, 1)
      [CORNERS[2], CORNERS[4]], // ( 1, 1,-1) → (-1,-1, 1)
      [CORNERS[3], CORNERS[5]], // (-1, 1,-1) → ( 1,-1, 1)
    ];
    const bodyDiags = makeLines(bodyDiagonalPairs, 0xffffff, 0.18);
    pivot.add(bodyDiags);

    // ═══════════════════════════════════════════════════════════════════
    // 4. FACE DIAGONALS — two crossing diagonals on each of the 6 faces
    // ═══════════════════════════════════════════════════════════════════
    const faceDiagonalPairs: [THREE.Vector3, THREE.Vector3][] = [
      // Front face (z = +1)
      [V(-1,-1, 1), V( 1, 1, 1)], [V( 1,-1, 1), V(-1, 1, 1)],
      // Back face  (z = -1)
      [V(-1,-1,-1), V( 1, 1,-1)], [V( 1,-1,-1), V(-1, 1,-1)],
      // Left face  (x = -1)
      [V(-1,-1,-1), V(-1, 1, 1)], [V(-1, 1,-1), V(-1,-1, 1)],
      // Right face (x = +1)
      [V( 1,-1,-1), V( 1, 1, 1)], [V( 1, 1,-1), V( 1,-1, 1)],
      // Top face   (y = +1)
      [V(-1, 1,-1), V( 1, 1, 1)], [V( 1, 1,-1), V(-1, 1, 1)],
      // Bottom face (y = -1)
      [V(-1,-1,-1), V( 1,-1, 1)], [V( 1,-1,-1), V(-1,-1, 1)],
    ];
    const faceDiags = makeLines(faceDiagonalPairs, 0xffffff, 0.13);
    pivot.add(faceDiags);

    // ═══════════════════════════════════════════════════════════════════
    // 5. VERTEX DOTS — glowing points at all 8 corners
    // ═══════════════════════════════════════════════════════════════════
    const dotGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    CORNERS.forEach(({ x, y, z }) => {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      pivot.add(dot);
    });

    // ═══════════════════════════════════════════════════════════════════
    // 6. EDGE MIDPOINT MARKERS — small dots at midpoint of each edge
    // ═══════════════════════════════════════════════════════════════════
    const edgeMidpoints: THREE.Vector3[] = [
      // Bottom edges
      V(0,-1,-1), V(1,-1,0), V(0,-1,1), V(-1,-1,0),
      // Top edges
      V(0, 1,-1), V(1, 1,0), V(0, 1,1), V(-1, 1,0),
      // Vertical edges
      V(-1,0,-1), V(1,0,-1), V(1,0,1), V(-1,0,1),
    ];
    const midGeo = new THREE.SphereGeometry(0.028, 6, 6);
    const midMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 });
    edgeMidpoints.forEach(({ x, y, z }) => {
      const dot = new THREE.Mesh(midGeo, midMat);
      dot.position.set(x, y, z);
      pivot.add(dot);
    });

    // ═══════════════════════════════════════════════════════════════════
    // 7. CENTER CROSS-HAIRS — 3 axis lines through origin
    // ═══════════════════════════════════════════════════════════════════
    const axisPairs: [THREE.Vector3, THREE.Vector3][] = [
      [V(-1.1, 0, 0), V(1.1, 0, 0)],
      [V(0, -1.1, 0), V(0, 1.1, 0)],
      [V(0, 0, -1.1), V(0, 0, 1.1)],
    ];
    const axisLines = makeLines(axisPairs, 0xffffff, 0.1);
    pivot.add(axisLines);

    // ═══════════════════════════════════════════════════════════════════
    // 8. FLOATING PARTICLES
    // ═══════════════════════════════════════════════════════════════════
    const pCount = 90;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 9;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 9;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.022, transparent: true, opacity: 0.3 })
    );
    scene.add(particles); // not in pivot — stays fixed while cube rotates

    // ═══════════════════════════════════════════════════════════════════
    // 9. GROUND GRID
    // ═══════════════════════════════════════════════════════════════════
    const grid = new THREE.GridHelper(8, 12, 0x181818, 0x111111);
    grid.position.y = -1.6;
    (grid.material as THREE.LineBasicMaterial).transparent = true;
    (grid.material as THREE.LineBasicMaterial).opacity = 0.45;
    scene.add(grid);

    // ── Lights ───────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pt = new THREE.PointLight(0xffffff, 1.2, 14);
    pt.position.set(4, 4, 4);
    scene.add(pt);

    // ── Mouse parallax ───────────────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation loop ───────────────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();

    // Store base rotation separately so inner cube can counter-rotate
    let baseRotX = 0;
    let baseRotY = 0;

    function animate() {
      frameId = requestAnimationFrame(animate);
      const dt = clock.getDelta();

      // Outer cube / pivot rotates forward
      baseRotX += dt * 0.18;
      baseRotY += dt * 0.26;

      pivot.rotation.x = baseRotX + mouse.current.y * 0.15;
      pivot.rotation.y = baseRotY + mouse.current.x * 0.15;

      // Inner cube rotates OPPOSITE direction at different speed
      // Its rotation is in local space, so subtract twice to cancel parent + add reverse
      innerWire.rotation.x = Math.PI / 4 - baseRotX * 2.1;
      innerWire.rotation.y = Math.PI / 4 - baseRotY * 1.8;

      // Breathing scale on outer geometry
      const s = 1 + Math.sin(clock.getElapsedTime() * 0.65) * 0.022;
      outerWire.scale.setScalar(s);
      glassMesh.scale.setScalar(s);
      glowWire.scale.setScalar(s * 1.06);

      // Particles drift slowly, independent of pivot
      particles.rotation.y += dt * 0.035;
      particles.rotation.x += dt * 0.015;

      renderer.render(scene, camera);
    }
    animate();

    // ── Resize ────────────────────────────────────────────────────────────
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
      [outerGeo, outerEdges, innerGeo, innerEdges, dotGeo, pGeo, midGeo].forEach(g => g.dispose());
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" aria-hidden="true" />;
}
