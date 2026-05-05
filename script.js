setTimeout(() => {
    document.querySelectorAll('.skill-bar').forEach(b => {
        const pct = b.dataset.w;

        const wrap = b.closest('.skill-bar-wrap');
        if (wrap && !wrap.querySelector('.skill-bar-label')) {
            const label = document.createElement('div');
            label.className = 'skill-bar-label';
            label.innerHTML = `<span>nível</span><span class="skill-bar-pct">${pct}</span>`;
            wrap.insertBefore(label, wrap.firstChild);

            const track = document.createElement('div');
            track.className = 'skill-bar-track';
            wrap.appendChild(track);
            track.appendChild(b);
        }

        b.style.width = pct;
    });
}, 400);

document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
    });
});

const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelector('.nav-links');
const allNavLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            allNavLinks.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.textContent = isOpen ? '✕' : '☰';
    });

    document.addEventListener('click', e => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.textContent = '☰';
        }
    });
}

const backToTop = document.getElementById('backToTop');
const hero = document.querySelector('.hero');

const heroObserver = new IntersectionObserver(([entry]) => {
    backToTop.classList.toggle('visible', !entry.isIntersecting);
}, { threshold: 0 });

heroObserver.observe(hero);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});