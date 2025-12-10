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

// Auto-slideshow on hover for project cards
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const slider = card.querySelector('.project-image-slider');
    if (!slider) return;
    
    const images = slider.querySelectorAll('.slider-image');
    const dots = slider.querySelectorAll('.dot');
    let currentIndex = 0;
    let intervalId = null;
    
    // Function to show specific slide
    function showSlide(index) {
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      images[index].classList.add('active');
      dots[index].classList.add('active');
    }
    
    // Function to go to next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      showSlide(currentIndex);
    }
    
    // Start slideshow on hover
    card.addEventListener('mouseenter', function() {
      intervalId = setInterval(nextSlide, 1500); // Change image every 1.5 seconds
    });
    
    // Stop slideshow when mouse leaves
    card.addEventListener('mouseleave', function() {
      clearInterval(intervalId);
      currentIndex = 0;
      showSlide(0); // Reset to first image
    });
    
    // Click on dots to navigate
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click
        currentIndex = index;
        showSlide(currentIndex);
      });
    });
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


// ... existing code ...

// --- IMPROVED THEME TOGGLE FUNCTIONALITY (Desktop & Mobile) ---
document.addEventListener('DOMContentLoaded', () => {
    // Select ALL theme buttons (desktop + mobile)
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn, #theme-toggle');
    
    // 1. Check LocalStorage. If nothing, default to 'blue'
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        updateAllIcons('light');
    } else {
        updateAllIcons('blue'); // Default
    }

    // 2. Attach Click Handlers to ALL buttons
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            
            if (currentTheme === 'light') {
                // Switch to Blue
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'blue');
                updateAllIcons('blue');
            } else {
                // Switch to Light
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateAllIcons('light');
            }
        });
    });

    // Helper to update icons in ALL buttons at once
    function updateAllIcons(theme) {
        toggleBtns.forEach(btn => {
            const sunIcon = btn.querySelector('.sun-icon');
            const moonIcon = btn.querySelector('.moon-icon');
            
            if (theme === 'light') {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
                // Force moon color for visibility on light paper
                moonIcon.style.stroke = '#111'; 
            } else {
                sunIcon.style.display = 'block';
                // Force sun color for visibility on dark paper
                sunIcon.style.stroke = '#fff'; 
                moonIcon.style.display = 'none';
            }
        });
    }
});