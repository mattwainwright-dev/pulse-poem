const stanzas = document.querySelectorAll(".stanza");
const pulseField = document.querySelector(".pulse-field");
const particleField = document.querySelector(".particles");
const codeFragments = document.querySelector(".code-fragments");
const poemAudio = document.getElementById("poem-audio");
const enterPulse = document.getElementById("enter-pulse");

let vibrationStarted = false;
let particlesCreated = false;
let networkCreated = false;

enterPulse.addEventListener("click", async () => {
  poemAudio.volume = 1;
  poemAudio.currentTime = 0;

  try {
    await poemAudio.play();
    enterPulse.classList.add("hidden");
  } catch (error) {
    console.error("Audio failed:", error);
  }
});

function createParticles() {
  if (particlesCreated) {
    return;
  }

  particlesCreated = true;

  for (let i = 0; i < 360; i++) {
    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    particle.style.setProperty("--drift-x", `${Math.random() * 100 - 50}px`);

    particle.style.setProperty("--drift-y", `${Math.random() * 120 - 60}px`);

    particle.style.setProperty(
      "--collision-x",
      `${Math.random() * 320 - 160}px`,
    );

    particle.style.setProperty(
      "--collision-y",
      `${Math.random() * 240 - 120}px`,
    );

    particle.style.animationDelay = `-${Math.random() * 6}s`;
    particle.style.animationDuration = `${6 + Math.random() * 5}s`;

    particleField.appendChild(particle);
  }

  particleField.classList.add("active");
}

function createNetwork() {
  if (networkCreated) {
    return;
  }

  networkCreated = true;

  const network = document.createElement("div");
  network.classList.add("pulse-network");

  const nodes = [
    { x: 14, y: 31 },
    { x: 25, y: 20 },
    { x: 37, y: 34 },
    { x: 50, y: 22 },
    { x: 63, y: 35 },
    { x: 76, y: 19 },
    { x: 87, y: 32 },

    { x: 19, y: 52 },
    { x: 33, y: 57 },
    { x: 49, y: 48 },
    { x: 66, y: 56 },
    { x: 82, y: 51 },

    { x: 13, y: 72 },
    { x: 27, y: 80 },
    { x: 42, y: 69 },
    { x: 57, y: 79 },
    { x: 72, y: 70 },
    { x: 88, y: 77 },
  ];

  const connections = [
    [0, 1],
    [0, 7],
    [1, 2],
    [1, 3],
    [2, 3],
    [2, 8],
    [2, 9],
    [3, 4],
    [3, 9],
    [4, 5],
    [4, 9],
    [4, 10],
    [5, 6],
    [5, 10],
    [6, 11],
    [7, 8],
    [7, 12],
    [8, 9],
    [8, 13],
    [8, 14],
    [9, 10],
    [9, 14],
    [9, 15],
    [10, 11],
    [10, 15],
    [10, 16],
    [11, 17],
    [12, 13],
    [13, 14],
    [14, 15],
    [15, 16],
    [16, 17],
  ];

  const svgNamespace = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNamespace, "svg");
  svg.classList.add("network-lines");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");

  connections.forEach(([startIndex, endIndex], index) => {
    const start = nodes[startIndex];
    const end = nodes[endIndex];

    const line = document.createElementNS(svgNamespace, "line");

    line.setAttribute("x1", start.x);
    line.setAttribute("y1", start.y);
    line.setAttribute("x2", end.x);
    line.setAttribute("y2", end.y);

    line.style.animationDelay = `${index * 0.055}s`;

    svg.appendChild(line);
  });

  network.appendChild(svg);

  nodes.forEach((node, index) => {
    const dot = document.createElement("span");

    dot.classList.add("network-node");
    dot.style.left = `${node.x}%`;
    dot.style.top = `${node.y}%`;
    dot.style.animationDelay = `${index * 0.08}s`;

    network.appendChild(dot);
  });

  particleField.appendChild(network);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        const stanzaIndex = [...stanzas].indexOf(entry.target);

        if (stanzaIndex >= 3) {
          pulseField.classList.add("active");
        }

        if (stanzaIndex === 5 && !vibrationStarted) {
          vibrationStarted = true;

          const vibrate = () => {
            document.body.classList.remove("vibrating");

            void document.body.offsetWidth;

            document.body.classList.add("vibrating");
          };

          vibrate();
          setInterval(vibrate, 2000);
        }

        if (stanzaIndex === 9) {
          createParticles();
        }

        if (stanzaIndex === 11) {
          particleField.classList.add("unified");
        }

        if (stanzaIndex === 12) {
          particleField.classList.remove("unified");
          particleField.classList.add("colliding");
        }

        if (stanzaIndex === 13) {
          setTimeout(() => {
           particleField.classList.remove("colliding");
           particleField.classList.add("community");
         }, 2500);
        }

        if (stanzaIndex === 14) {
          particleField.classList.add("responsive");
          codeFragments.classList.add("active");
        }

        if (stanzaIndex === 16) {
          particleField.classList.remove("community");
          particleField.classList.add("releasing");
          pulseField.classList.add("quiet");
        }

        if (stanzaIndex === 19) {
          entry.target.classList.add("final");
        }
      }
    });
  },
  {
    threshold: 0.45,
  },
);

stanzas.forEach((stanza) => {
  observer.observe(stanza);
});

document.addEventListener("mousemove", (event) => {
  if (
    !particleField.classList.contains("community") &&
    !particleField.classList.contains("responsive")
  ) {
    return;
  }

  const x = (event.clientX / window.innerWidth - 0.5) * 32;
  const y = (event.clientY / window.innerHeight - 0.5) * 32;

  particleField.style.setProperty("--mouse-x", x);
  particleField.style.setProperty("--mouse-y", y);
});
