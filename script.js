document.addEventListener("DOMContentLoaded", () => {
  const tracks = document.querySelectorAll(".marquee-track");
  tracks.forEach((track) => {
    const html = track.innerHTML;
    const originalCount = track.children.length;
    const target = Math.max(window.innerWidth, window.screen.width) * 2;

    let sets = 1;
    let guard = 0;
    while ((track.scrollWidth < target || sets % 2 !== 0) && guard++ < 20) {
      track.insertAdjacentHTML("beforeend", html);
      sets++;
    }

    Array.from(track.children)
      .slice(originalCount)
      .forEach((clone) => clone.setAttribute("aria-hidden", "true"));
  });

  const cards = document.querySelectorAll(".partner-card");

  function highlightCenterCards() {
    const screenCenter = window.innerWidth / 2;
    const activeZoneRadius = 500;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distanceFromCenter = Math.abs(screenCenter - cardCenter);

      if (distanceFromCenter < activeZoneRadius) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });

    requestAnimationFrame(highlightCenterCards);
  }

  requestAnimationFrame(highlightCenterCards);
});