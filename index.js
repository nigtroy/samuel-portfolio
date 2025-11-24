// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const drawer = document.querySelector('.drawer');
const overlay = document.querySelector('.drawer-overlay');
const drawerLinks = document.querySelectorAll('.drawer-nav a');

function openDrawer() {
    console.log('Opening drawer'); // Debug log
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    console.log('Closing drawer'); // Debug log
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Add event listeners
if (menuBtn) {
    menuBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openDrawer();
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeDrawer();
    });
}

if (overlay) {
    overlay.addEventListener('click', closeDrawer);
}

// Close drawer when clicking nav links
drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';

    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
    }, 1000);
});

// Scroll to top functionality
document.querySelector('.footer-title').parentElement.style.cursor = 'pointer';
document.querySelector('.footer-title').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
