// Basic UI interactions: mobile menu, nav close on link click, footer year, sponsor touch handling.
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = navLinks.querySelectorAll('a');
  const yearEl = document.getElementById('year');

  function toggleMenu(){
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close mobile menu when clicking a link
  navAnchors.forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navLinks.classList.contains('show')) {
        toggleMenu();
      }
    });
  });

  // Footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sponsor cards: add 'touched' class on touchstart for better mobile feedback
  const sponsors = document.querySelectorAll('.sponsor.interactive');
  sponsors.forEach(card => {
    // on touch devices give a persistent class that triggers the larger transform
    card.addEventListener('touchstart', (e) => {
      // mark this card as touched; remove from others
      sponsors.forEach(c => c.classList.remove('touched'));
      card.classList.add('touched');
    }, {passive:true});

    // remove 'touched' state when touch ends or user taps elsewhere
    card.addEventListener('touchend', () => {
      setTimeout(() => card.classList.remove('touched'), 350);
    });

    // keyboard accessibility: toggle when focused then blurred
    card.addEventListener('focus', () => card.classList.add('touched'));
    card.addEventListener('blur', () => card.classList.remove('touched'));
  });

  // Close any open sponsor touched state if user taps outside
  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.sponsor')) {
      sponsors.forEach(c => c.classList.remove('touched'));
    }
  }, {passive:true});
});
