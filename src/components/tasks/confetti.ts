// Lightweight canvas confetti burst, fully self-contained — no external libraries.
export function fireConfetti(originX: number, originY: number) {
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
  if (!ctx) {
    canvas.remove();
    return;
  }

  const colors = ["#dee2b1", "#01381e", "#ffffff"];
  const particleCount = 40;

  const particles = Array.from({ length: particleCount }, () => ({
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

    if (frame < maxFrames) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(animate);
}