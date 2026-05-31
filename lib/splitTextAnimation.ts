import { gsap } from "@/lib/animations";

function groupSpansByLine(spans: HTMLSpanElement[]): HTMLSpanElement[][] {
  const lines: HTMLSpanElement[][] = [];
  let currentTop = -1;
  let currentLine: HTMLSpanElement[] = [];

  spans.forEach((span) => {
    const top = span.offsetTop;
    if (currentTop === -1 || top !== currentTop) {
      if (currentLine.length) lines.push(currentLine);
      currentLine = [span];
      currentTop = top;
    } else {
      currentLine.push(span);
    }
  });

  if (currentLine.length) lines.push(currentLine);
  return lines;
}

/**
 * Reveals text in reading order with per-line grouping so each line
 * appears top-to-bottom, words stagger left-to-right within a line.
 */
export function animateWordsReveal(
  container: HTMLElement,
  text: string
): () => void {
  container.replaceChildren();
  container.style.opacity = "1";

  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return () => container.replaceChildren();

  const spans: HTMLSpanElement[] = words.map((word, index) => {
    const span = document.createElement("span");
    span.className = "inline-block";
    span.textContent = word;
    container.append(span);
    if (index < words.length - 1) {
      container.append(document.createTextNode(" "));
    }
    return span;
  });

  gsap.set(spans, { opacity: 0, y: -10 });

  const lines = groupSpansByLine(spans);
  const tweens: gsap.core.Tween[] = [];
  let lineDelay = 0;

  lines.forEach((line) => {
    line.forEach((span, wordIndex) => {
      tweens.push(
        gsap.to(span, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power3.out",
          delay: lineDelay + wordIndex * 0.03,
        })
      );
    });
    lineDelay += 0.06 + line.length * 0.03;
  });

  return () => {
    tweens.forEach((tween) => tween.kill());
    container.replaceChildren();
  };
}

export function fadeInText(container: HTMLElement, text: string): gsap.core.Tween {
  container.textContent = text;
  return gsap.fromTo(
    container,
    { opacity: 0 },
    { opacity: 1, duration: 1.5, ease: "expo.out", delay: 0.5 }
  );
}

export function fadeOutText(
  container: HTMLElement,
  onComplete: () => void
): gsap.core.Tween {
  return gsap.to(container, {
    opacity: 0,
    duration: 0.2,
    ease: "expo.out",
    onComplete,
  });
}
