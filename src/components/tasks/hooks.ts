"use client";

import { useState, useEffect } from "react";
import { stopPersisting } from "mobx-persist-store";
import { TaskStore } from "./store";

// --- Confetti ---
function fireConfetti(originX: number, originY: number) {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) { canvas.remove(); return; }

  const colors = ["#e2ee59", "#e73509", "#0e4af0"];
  const particles = Array.from({ length: 40 }, () => ({
    x: originX,
    y: originY,
    vx: (Math.random() - 0.5) * 8,
    vy: Math.random() * -8 - 4,
    size: Math.random() * 6 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    gravity: 0.25,
    opacity: 1,
  }));

  let frame = 0;
  const maxFrames = 60;

  function animate() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    frame++;
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity = Math.max(0, 1 - frame / maxFrames);
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate((p.rotation * Math.PI) / 180);
      ctx!.globalAlpha = p.opacity;
      ctx!.fillStyle = p.color;
      ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx!.restore();
    });
    if (frame < maxFrames) { requestAnimationFrame(animate); }
    else { canvas.remove(); }
  }

  requestAnimationFrame(animate);
}

// --- Hook ---
export const useTaskLogic = () => {
  const [taskStore] = useState(() => new TaskStore());

  useEffect(() => {
    return () => {
      stopPersisting(taskStore);
    };
  }, [taskStore]);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
    const isChecked = e.target.checked;
    taskStore.toggleComplete(taskId);

    if (isChecked) {
      const rect = e.target.getBoundingClientRect();
      fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  return { taskStore, handleToggle };
};