// Smooth scroll for navigation
document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});

// Contact form mock submission
const form = document.getElementById('contactForm');
const messageBox = document.getElementById('formMessage');

form.addEventListener('submit', e => {
  e.preventDefault();
  messageBox.textContent = "Thank you for reaching out! I’ll get back to you soon.";
  messageBox.style.color = "#28a745";
  form.reset();
});
