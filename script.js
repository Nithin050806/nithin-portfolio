/* =====================
   NITHIN A – JS
   ===================== */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinksContainer.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on nav link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ---- Hero role typing animation ----
const roles = [
  'Electronics & Communication Engineer',
  'AI / Machine Learning Enthusiast',
  'Data Science Explorer',
  'Embedded Systems Developer',
  'IoT Innovator',
  'Published IEEE Researcher'
];

const roleEl = document.getElementById('role-text');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    roleEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    roleEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 2000; // pause before delete
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 300;
  }

  setTimeout(typeRole, typingSpeed);
}

setTimeout(typeRole, 1000);

// ---- Intersection Observer for animations ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));

// Observe sections for animate-on-scroll
document.querySelectorAll('.section-header, .about-text, .skills-panel, .certs-grid, .achievements-grid, .contact-grid, .pub-card').forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// Project cards stagger animation
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
  projectObserver.observe(card);
});

// Cert cards stagger
const certObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.cert-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
  certObserver.observe(card);
});

// ---- Project filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = '';
        // Re-animate
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ---- Contact form ----
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('contact-submit');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email-input').value;
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value;

  // Build mailto link
  const mailtoLink = `mailto:nithin200706@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Hi Nithin,\n\nMy name is ${name}.\n\n${message}\n\nBest regards,\n${name}\n${email}`)}`;

  // Show success feedback
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
    Opening Email Client...
  `;
  submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

  setTimeout(() => {
    window.location.href = mailtoLink;
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      contactForm.reset();
    }, 2000);
  }, 800);
});

// ---- Counter animation for stats ----
function animateCounter(el, target, duration = 1500, decimals = 0) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;

    el.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = decimals > 0 ? target.toFixed(decimals) : target;
    }
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statEls = entry.target.querySelectorAll('.stat-number');
      const targets = [10, 1, 3, 8.70];
      const decimals = [0, 0, 0, 2];

      statEls.forEach((el, i) => {
        animateCounter(el, targets[i], 1200, decimals[i]);
      });

      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ---- Smooth scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---- Parallax orbs in hero ----
window.addEventListener('mousemove', (e) => {
  const { innerWidth, innerHeight } = window;
  const x = (e.clientX / innerWidth - 0.5) * 30;
  const y = (e.clientY / innerHeight - 0.5) * 30;

  document.querySelector('.orb-1').style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
  document.querySelector('.orb-2').style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
  document.querySelector('.orb-3').style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});
