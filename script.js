// ============================
// SMOOTH SCROLLING & DOM READY
// ============================
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeIntersectionObserver();
    initializeScrollEffects();
});

// ============================
// EVENT LISTENERS
// ============================
function initializeEventListeners() {
    // Main CTA Button
    const mainCTA = document.getElementById('mainCTA');
    if (mainCTA) {
        mainCTA.addEventListener('click', handleCTAClick);
        mainCTA.addEventListener('mouseenter', handleButtonHover);
        mainCTA.addEventListener('mouseleave', handleButtonLeave);
    }

    // Duplicate CTA Button
    const duplicateCTA = document.getElementById('duplicateCTA');
    if (duplicateCTA) {
        duplicateCTA.addEventListener('click', handleDuplicateCTAClick);
        duplicateCTA.addEventListener('mouseenter', handleButtonHover);
        duplicateCTA.addEventListener('mouseleave', handleButtonLeave);
    }

    // Final CTA Button
    const finalCTA = document.getElementById('finalCTA');
    if (finalCTA) {
        finalCTA.addEventListener('click', handleCTAClick);
        finalCTA.addEventListener('mouseenter', handleButtonHover);
        finalCTA.addEventListener('mouseleave', handleButtonLeave);
    }

    // Explore All Options Button
    const exploreBtn = document.querySelector('.cta-button-secondary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('#categories');
        });
    }

    // Learn More Button
    const learnMoreBtn = document.querySelector('.btn-outline-primary');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('#benefits');
        });
    }

    // Smooth scroll for navbar links
    const navLinks = document.querySelectorAll('.navbar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = this.getAttribute('href');
                scrollToSection(target);
                // Close mobile menu
                const navbar = document.querySelector('.navbar-collapse');
                if (navbar && navbar.classList.contains('show')) {
                    navbar.classList.remove('show');
                }
            }
        });
    });
}

// ============================
// CTA BUTTON CLICK HANDLER
// ============================
function handleCTAClick(e) {
    e.preventDefault();
    
    // Add click animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 100);

    // Redirect to external link
    redirectToApplication();
    
    // Track click (for analytics)
    trackCTAClick(this.id || 'CTA Button');
}

// ============================
// DUPLICATE CTA BUTTON CLICK HANDLER
// ============================
function handleDuplicateCTAClick(e) {
    e.preventDefault();
    
    // Add click animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 100);

    // Redirect to external link
    redirectToDuplicateApplication();
    
    // Track click (for analytics)
    trackCTAClick(this.id || 'Duplicate CTA Button');
}

// ============================
// BUTTON HOVER EFFECTS
// ============================
function handleButtonHover(e) {
    e.target.style.transform = 'translateY(-3px)';
}

function handleButtonLeave(e) {
    e.target.style.transform = '';
}

// ============================
// REDIRECT TO APPLICATION
// ============================
function redirectToApplication() {
    // Change this URL to your desired website
    const applicationURL = 'https://www.mobtrk.link/view.php?id=5542680&pub=3318487';
    
    console.log('Redirecting to:', applicationURL);
    
    // Redirect after a brief delay for visual feedback
    setTimeout(() => {
        window.location.href = applicationURL;
    }, 300);
}

// ============================
// REDIRECT TO DUPLICATE APPLICATION
// ============================
function redirectToDuplicateApplication() {
    // Duplicate CTA URL
    const applicationURL = 'https://www.directcpi.com/view.php?id=5542794&pub=3318487';
    
    console.log('Redirecting to:', applicationURL);
    
    // Redirect after a brief delay for visual feedback
    setTimeout(() => {
        window.location.href = applicationURL;
    }, 300);
}

// ============================
// SCROLL TO SECTION
// ============================
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================
// INTERSECTION OBSERVER - FADE IN ON SCROLL
// ============================
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe benefit cards, loan cards, and process steps
    const elementsToObserve = document.querySelectorAll(
        '.benefit-card, .loan-card, .process-step, .accordion-item'
    );
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================
// SCROLL EFFECTS
// ============================
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        if (scrollTop > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }

        lastScrollTop = scrollTop;
    });
}

// ============================
// PARALLAX EFFECT (Optional Enhancement)
// ============================
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero-section');
        const scrollPosition = window.pageYOffset;
        
        if (hero) {
            hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        }
    });
}

// ============================
// ANALYTICS TRACKING
// ============================
function trackCTAClick(buttonId) {
    // This is where you would send data to your analytics service
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            'button_id': buttonId,
            'timestamp': new Date().toISOString()
        });
    }
    
    console.log('CTA Clicked:', buttonId, new Date().toISOString());
}

// ============================
// FORM VALIDATION (Future Enhancement)
// ============================
function validateApplicationForm(formData) {
    const errors = [];

    if (!formData.fullName || formData.fullName.trim().length < 2) {
        errors.push('Full name is required');
    }

    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Valid email is required');
    }

    if (!formData.loanAmount || formData.loanAmount < 100) {
        errors.push('Loan amount must be at least $100');
    }

    return errors;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================
// COUNTER ANIMATION
// ============================
function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// ============================
// DARK MODE TOGGLE (Optional)
// ============================
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// ============================
// FEEDBACK FORM SUBMISSION
// ============================
function submitFeedback(formData) {
    // Example: Send feedback to your backend
    console.log('Feedback submitted:', formData);
    
    return fetch('/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).catch(error => {
        console.error('Error submitting feedback:', error);
    });
}

// ============================
// MOBILE MENU CLOSE ON LINK CLICK
// ============================
document.addEventListener('DOMContentLoaded', function() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            if (navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });
});

// ============================
// PAGE LOAD ANIMATION
// ============================
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    console.log('Page fully loaded and interactive');
});

// Initialize dark mode on load
initializeDarkMode();


