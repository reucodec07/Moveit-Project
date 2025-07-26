// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeLoading();
    initializeNavigation();
    initializeScrollAnimations();
    initializeCounters();
    initializeTestimonials(); // Updated function name
    initializeFormInteractions();
    initializeButtonEffects();
    initializeSmoothScrolling();
    initializeIntersectionObserver();
    initializeParallaxEffect();
    initializeRippleEffect();
    initializeNavbarEnhancements(); // New function
});

// Loading Animation
function initializeLoading() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }
        }, 1000);
    });
}

// Navigation Functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileServicesBtn = document.getElementById('mobileServicesBtn');
    const mobileServicesContent = document.querySelector('.mobile-services-content');

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');

            // Toggle icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            }
        });
    }

    // Mobile services accordion
    if (mobileServicesBtn && mobileServicesContent) {
        mobileServicesBtn.addEventListener('click', function() {
            mobileServicesContent.classList.toggle('hidden');

            // Rotate arrow
            const arrow = mobileServicesBtn.querySelector('svg:last-child');
            if (mobileServicesContent.classList.contains('hidden')) {
                arrow.style.transform = 'rotate(0deg)';
            } else {
                arrow.style.transform = 'rotate(180deg)';
            }
        });
    }

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && !link.contains(mobileServicesBtn)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('svg');
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        });
    });

    // Enhanced navbar background on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', throttle(function() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (navbar) {
            if (scrollTop > 20) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 40px rgba(0, 0, 0, 0.12)';
                navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 1px 30px rgba(0, 0, 0, 0.08)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
            }
        }

        lastScrollTop = scrollTop;
    }, 16));

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            if (!dropdown.parentElement.contains(event.target)) {
                dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
                dropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
            }
        });
    });
}
mobileMenu.classList.add('hidden');
const icon = mobileMenuBtn.querySelector('svg');
icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';

// Enhanced navbar background on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', throttle(function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (navbar) {
        if (scrollTop > 20) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 40px rgba(0, 0, 0, 0.12)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 30px rgba(0, 0, 0, 0.08)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        }
    }

    lastScrollTop = scrollTop;
}, 16));

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
        if (!dropdown.parentElement.contains(event.target)) {
            dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
            dropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
        }
    });
});

// Active navigation highlighting
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-new, .mobile-nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(current)) {
            link.classList.add('active');
            if (link.querySelector('.nav-indicator')) {
                link.querySelector('.nav-indicator').style.width = '100%';
            }
        } else {
            link.classList.remove('active');
            if (link.querySelector('.nav-indicator')) {
                link.querySelector('.nav-indicator').style.width = '0';
            }
        }
    });
}

window.addEventListener('scroll', throttle(updateActiveNavigation, 100));

// Scroll Animations
function initializeScrollAnimations() {
    function animateOnScroll() {
        const elements = document.querySelectorAll('.scroll-animate');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', throttle(animateOnScroll, 16));

    // Initial check for elements already in view
    animateOnScroll();
}

// Counter Animation
function initializeCounters() {
    let counterAnimated = false;

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current);
                }
            }, 20);
        });
    }

    // Trigger counter animation when stats section is visible
    window.addEventListener('scroll', throttle(function() {
        const statsSection = document.querySelector('.bg-gray-900');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0 && !counterAnimated) {
                animateCounters();
                counterAnimated = true;
            }
        }
    }, 16));
}

// Testimonial functionality (Updated to remove carousel since we're using grid now)
function initializeTestimonials() {
    // Simple scroll animation trigger for testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card-new');

    function animateTestimonials() {
        testimonialCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    // Set initial state
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', throttle(animateTestimonials, 100));
    animateTestimonials(); // Check on load
}

// Form Interactions
function initializeFormInteractions() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        // Focus effects
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.parentElement.classList.remove('focused');
        });

        // Input validation
        input.addEventListener('input', function() {
            if (this.type === 'search' && this.placeholder.includes('ZIP')) {
                // ZIP code validation
                const value = this.value.replace(/\D/g, '');
                if (value.length <= 5) {
                    this.value = value;
                    this.classList.remove('invalid');
                } else {
                    this.classList.add('invalid');
                }
            }

            // Add filled class for styling
            if (this.value.length > 0) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });

        // Enter key handling
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const button = this.parentElement.querySelector('button');
                if (button) {
                    button.click();
                }
            }
        });
    });
}

// Button Effects
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-primary-large, .btn-outline-large, .btn-light-large, .btn-outline-light-large');

    buttons.forEach(button => {
        // Hover effects
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('testimonial-nav')) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('testimonial-nav')) {
                this.style.transform = 'translateY(0)';
            }
        });

        // Click effects
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });

        button.addEventListener('mouseup', function() {
            if (!this.classList.contains('testimonial-nav')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
    });
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Advanced Animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Add staggered animation for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToObserve = document.querySelectorAll('.scroll-animate, .feature-card');
    elementsToObserve.forEach(el => observer.observe(el));
}

// Parallax Effect for Hero Section
function initializeParallaxEffect() {
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');

        if (heroImage) {
            const rate = scrolled * -0.2;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }, 16));
}

// Ripple Effect for Buttons
function initializeRippleEffect() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            // Add ripple animation CSS if not already added
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Performance Optimization: Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Resize Handler
window.addEventListener('resize', debounce(function() {
    // Handle mobile menu on resize
    const mobileMenu = document.getElementById('mobileMenu');
    if (window.innerWidth >= 768 && mobileMenu) {
        mobileMenu.classList.add('hidden');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars text-xl';
        }
    }

    // Recalculate testimonial positions
    const track = document.getElementById('testimonialTrack');
    if (track) {
        const slides = track.querySelectorAll('.testimonial-slide');
        const currentSlide = Math.floor(-parseInt(track.style.transform.replace(/[^\d-]/g, '')) / 100) || 0;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}, 250));

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            }
        }
    }

    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('testimonialPrev');
        if (prevBtn && document.activeElement.closest('.testimonial-carousel')) {
            prevBtn.click();
        }
    }

    if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById('testimonialNext');
        if (nextBtn && document.activeElement.closest('.testimonial-carousel')) {
            nextBtn.click();
        }
    }
});

// Form Submission Handlers
function initializeFormSubmissions() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            const inputs = this.querySelectorAll('input[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('invalid');
                    isValid = false;
                } else {
                    input.classList.remove('invalid');
                }
            });

            if (isValid) {
                // Show success message (you can customize this)
                showNotification('Form submitted successfully!', 'success');
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} fixed top-4 right-4 bg-white border-l-4 p-4 rounded shadow-lg z-50 transform translate-x-full transition-transform duration-300`;

    if (type === 'success') {
        notification.classList.add('border-green-500', 'text-green-700');
    } else if (type === 'error') {
        notification.classList.add('border-red-500', 'text-red-700');
    } else {
        notification.classList.add('border-blue-500', 'text-blue-700');
    }

    notification.innerHTML = `
        <div class="flex items-center">
            <span>${message}</span>
            <button class="ml-4 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Initialize form submissions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeFormSubmissions();
});

// Page Visibility API for pausing animations when tab is not active
document.addEventListener('visibilitychange', function() {
    const track = document.getElementById('testimonialTrack');
    if (document.hidden) {
        // Pause animations when tab is not visible
        track?.style.setProperty('animation-play-state', 'paused');
    } else {
        // Resume animations when tab becomes visible
        track?.style.setProperty('animation-play-state', 'running');
    }
});

// Preload images for better performance
function preloadImages() {
    const images = [
        'moving-van.jpg',
        'couple.jpg',
        'dog.jpg',
        'family.jpg',
        'briefcase.svg',
        'bus-front.svg',
        'chat-square-heart.svg',
        'box-seam.svg'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Cookie consent functionality
function initializeCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (!cookieConsent) {
        showCookieConsent();
    }
}

function showCookieConsent() {
    const consentBanner = document.createElement('div');
    consentBanner.className = 'fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 transform translate-y-full transition-transform duration-300';
    consentBanner.innerHTML = `
        <div class="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between">
            <p class="text-sm mb-4 sm:mb-0">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </p>
            <div class="flex space-x-4">
                <button id="acceptCookies" class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm font-medium transition-colors duration-300">
                    Accept
                </button>
                <button id="declineCookies" class="border border-gray-400 hover:border-white px-4 py-2 rounded text-sm font-medium transition-colors duration-300">
                    Decline
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(consentBanner);

    // Animate in
    setTimeout(() => {
        consentBanner.classList.remove('translate-y-full');
    }, 100);

    // Event listeners
    document.getElementById('acceptCookies').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        hideCookieConsent(consentBanner);
    });

    document.getElementById('declineCookies').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        hideCookieConsent(consentBanner);
    });
}

function hideCookieConsent(banner) {
    banner.classList.add('translate-y-full');
    setTimeout(() => {
        banner.remove();
    }, 300);
}

// Search functionality for ZIP code checker
function initializeZipCodeChecker() {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    const checkButtons = document.querySelectorAll('button');

    searchInputs.forEach(input => {
        if (input.placeholder.includes('ZIP')) {
            const checkButton = input.parentElement.querySelector('button');

            if (checkButton) {
                checkButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    checkZipCode(input.value);
                });
            }
        }
    });
}

function checkZipCode(zipCode) {
    // Simple ZIP code validation
    const zipRegex = /^\d{5}$/;

    if (!zipRegex.test(zipCode)) {
        showNotification('Please enter a valid 5-digit ZIP code.', 'error');
        return;
    }

    // Simulate API call
    showNotification('Checking service availability...', 'info');

    setTimeout(() => {
        // Simulate random service availability
        const isServiceAvailable = Math.random() > 0.2; // 80% chance of availability

        if (isServiceAvailable) {
            showNotification(`Great! We provide service in ${zipCode}. Get your free quote now!`, 'success');
        } else {
            showNotification(`Sorry, we don't currently service ${zipCode}. We're expanding soon!`, 'error');
        }
    }, 1500);
}

// Back to top button
function initializeBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform translate-y-16 opacity-0 z-40';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.setAttribute('aria-label', 'Back to top');

    document.body.appendChild(backToTopButton);

    // Show/hide based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('translate-y-16', 'opacity-0');
        } else {
            backToTopButton.classList.add('translate-y-16', 'opacity-0');
        }
    }, 100));

    // Click handler
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Quote form functionality
function initializeQuoteForm() {
    const quoteButtons = document.querySelectorAll('button');

    quoteButtons.forEach(button => {
        if (button.textContent.includes('Quote') || button.textContent.includes('quote')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                showQuoteModal();
            });
        }
    });
}

function showQuoteModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full p-6 transform scale-95 transition-transform duration-300">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-2xl font-bold text-gray-900">Get Your Free Quote</h3>
                <button class="text-gray-400 hover:text-gray-600" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <form id="quoteForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input type="tel" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Moving From (ZIP) *</label>
                    <input type="text" required pattern="\\d{5}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Moving To (ZIP) *</label>
                    <input type="text" required pattern="\\d{5}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Move Date</label>
                    <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Home Size</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select home size</option>
                        <option value="studio">Studio</option>
                        <option value="1br">1 Bedroom</option>
                        <option value="2br">2 Bedroom</option>
                        <option value="3br">3 Bedroom</option>
                        <option value="4br">4+ Bedroom</option>
                        <option value="office">Office</option>
                    </select>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium">
                    Get My Free Quote
                </button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        modal.querySelector('.bg-white').classList.remove('scale-95');
        modal.querySelector('.bg-white').classList.add('scale-100');
    }, 50);

    // Form submission
    document.getElementById('quoteForm').addEventListener('submit', (e) => {
        e.preventDefault();
        modal.remove();
        showNotification('Thank you! We\'ll contact you within 24 hours with your personalized quote.', 'success');
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactButtons = document.querySelectorAll('button');

    contactButtons.forEach(button => {
        if (button.textContent.includes('Contact') || button.textContent.includes('Call')) {
            button.addEventListener('click', (e) => {
                if (button.textContent.includes('Call')) {
                    // For call buttons, just show the phone number
                    showNotification('Call us at (555) 123-4567', 'info');
                } else {
                    e.preventDefault();
                    showContactModal();
                }
            });
        }
    });
}

function showContactModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full p-6 transform scale-95 transition-transform duration-300">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-2xl font-bold text-gray-900">Contact Us</h3>
                <button class="text-gray-400 hover:text-gray-600" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="space-y-4">
                <div class="text-center">
                    <p class="text-gray-600 mb-4">Get in touch with our moving experts</p>
                </div>
                <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <i class="fas fa-phone text-blue-600"></i>
                    <div>
                        <p class="font-medium">Phone</p>
                        <p class="text-gray-600">(555) 123-4567</p>
                    </div>
                </div>
                <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <i class="fas fa-envelope text-blue-600"></i>
                    <div>
                        <p class="font-medium">Email</p>
                        <p class="text-gray-600">info@moveit.com</p>
                    </div>
                </div>
                <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <i class="fas fa-clock text-blue-600"></i>
                    <div>
                        <p class="font-medium">Hours</p>
                        <p class="text-gray-600">Mon-Sun: 7AM - 9PM</p>
                    </div>
                </div>
                <div class="flex space-x-3 pt-4">
                    <button onclick="window.open('tel:+15551234567')" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                        Call Now
                    </button>
                    <button onclick="showQuoteModal(); this.closest('.fixed').remove()" class="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
                        Get Quote
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        modal.querySelector('.bg-white').classList.remove('scale-95');
        modal.querySelector('.bg-white').classList.add('scale-100');
    }, 50);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Initialize all additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    initializeCookieConsent();
    initializeZipCodeChecker();
    initializeBackToTop();
    initializeQuoteForm();
    initializeContactForm();
});

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }
    });
}

// Initialize performance monitoring
initializePerformanceMonitoring();

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced Mobile Menu Functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileServicesBtn = document.getElementById('mobileServicesBtn');
    const mobileServicesContent = document.querySelector('.mobile-services-content');

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');

            // Toggle hamburger icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl text-gray-700';
            } else {
                icon.className = 'fas fa-times text-xl text-gray-700';
            }
        });
    }

    // Mobile services accordion - FIXED VERSION
    if (mobileServicesBtn && mobileServicesContent) {
        mobileServicesBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Toggle the content visibility
            mobileServicesContent.classList.toggle('show');

            // Toggle the button active state
            mobileServicesBtn.classList.toggle('active');

            // Rotate arrow icon
            const arrow = mobileServicesBtn.querySelector('svg, i');
            if (mobileServicesContent.classList.contains('show')) {
                if (arrow.tagName === 'svg') {
                    arrow.style.transform = 'rotate(180deg)';
                } else {
                    arrow.style.transform = 'rotate(180deg)';
                }
            } else {
                if (arrow.tagName === 'svg') {
                    arrow.style.transform = 'rotate(0deg)';
                } else {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
        });
    }

    // Close mobile menu when clicking on regular nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link:not(#mobileServicesBtn)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl text-gray-700';
            }
        });
    });

    // Close mobile menu when clicking on service links
    const serviceLinks = document.querySelectorAll('.mobile-services-content a');
    serviceLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl text-gray-700';
            }
        });
    });

    // Enhanced navbar scroll behavior
    let lastScrollTop = 0;
    window.addEventListener('scroll', throttle(function() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        lastScrollTop = scrollTop;
    }, 16));
}

// Make sure to call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    // ... your other initialization functions
});