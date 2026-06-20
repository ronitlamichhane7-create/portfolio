document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");
  const tiltCards = document.querySelectorAll(".tilt");
  const messageButton = document.querySelector("button[data-js-action='change-message']");
  const themeButton = document.querySelector("button[data-js-action='change-theme']");

  function revealOnScroll() {
    revealItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < window.innerHeight - 90) {
        item.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
  revealOnScroll();

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  if (messageButton) {
    messageButton.addEventListener("click", changeMessage);
  }

  if (themeButton) {
    themeButton.addEventListener("click", changeTheme);
  }
});

function changeMessage() {
  const message = document.getElementById("jsMessage");
  const ball = document.querySelector(".js-ball");

  message.textContent =
    "JavaScript has updated this content instantly. The page did not reload, which shows how JavaScript can respond to a user action and change the DOM dynamically.";

  if (ball) {
    ball.style.animationDuration = "0.8s";
    ball.style.filter = "hue-rotate(120deg)";
  }
}

function changeTheme() {
  document.body.classList.toggle("theme-flash");
  const root = document.documentElement;

  if (document.body.classList.contains("theme-flash")) {
    root.style.setProperty("--blue", "#4dffb5");
    root.style.setProperty("--pink", "#ffb86b");
  } else {
    root.style.setProperty("--blue", "#00d4ff");
    root.style.setProperty("--pink", "#ff4ecd");
  }
}