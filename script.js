const stanzas = document.querySelectorAll(".stanza");
const pulseField = document.querySelector(".pulse-field");
let vibrationStarted = false;
const particleField = document.querySelector(".particles");
const codeFragments = document.querySelector(".code-fragments");

let particlesCreated = false;

function createParticles() {
  if (particlesCreated) {
    return;
  }

  particlesCreated = true;

  for (let i = 0; i < 140; i++) {
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

    particle.style.animationDelay = `${Math.random() * 6}s`;

    particle.style.animationDuration = `${6 + Math.random() * 5}s`;

    particleField.appendChild(particle);
  }

  particleField.classList.add("active");
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if ([...stanzas].indexOf(entry.target) >= 3) {
          pulseField.classList.add("active");
        }

        if ([...stanzas].indexOf(entry.target) === 5 && !vibrationStarted) {
          vibrationStarted = true;

          const vibrate = () => {
            document.body.classList.remove("vibrating");

            void document.body.offsetWidth;

            document.body.classList.add("vibrating");
          };

          vibrate();
          setInterval(vibrate, 2000);
        }

        if ([...stanzas].indexOf(entry.target) === 9) {
          createParticles();
        }

        if ([...stanzas].indexOf(entry.target) === 11) {
          particleField.classList.add("unified");
        }

        if ([...stanzas].indexOf(entry.target) === 12) {
          particleField.classList.remove("unified");
          particleField.classList.add("colliding");
        }

        if ([...stanzas].indexOf(entry.target) === 13) {
         setTimeout(() => {
          particleField.classList.remove("colliding");
          particleField.classList.add("community");
          }, 2500);
        }

        if ([...stanzas].indexOf(entry.target) === 14) {
           particleField.classList.add("responsive");
           codeFragments.classList.add("active");
        }

        if ([...stanzas].indexOf(entry.target) === 16) {
          particleField.classList.remove("community");
          particleField.classList.add("releasing");
          pulseField.classList.add("quiet");
        }

        if ([...stanzas].indexOf(entry.target) === 19) {
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
