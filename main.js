// Main JavaScript file for Elie Levy Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer, then initialize other functionality
    Promise.all([loadHeader(), loadFooter()]).then(() => {
        initTypewriter();
        initScrollReveal();
        initMobileMenu();
        initSmoothScrolling();
        initFormValidation();
        initProjectFiltering();
        initAnimations();
    });
});

// Load header from external file
async function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        try {
            const response = await fetch('header.html');
            const headerHTML = await response.text();
            headerPlaceholder.innerHTML = headerHTML;
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }
}

// Load footer from external file
async function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        try {
            const response = await fetch('footer.html');
            const footerHTML = await response.text();
            footerPlaceholder.innerHTML = footerHTML;
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
}

// Typewriter effect for hero section
function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const typed = new Typed('#typed-text', {
            strings: [
                'Elie Levy',
                'Product Manager',
                'Strategic Thinker',
                'Innovation Leader'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Scroll reveal animations
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

async function handleFormSubmission(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate all fields
    let isValid = true;
    const requiredFields = ['name', 'email', 'subject', 'message'];

    requiredFields.forEach(field => {
        if (!validateFieldValue(data[field])) {
            showFieldError(field, `${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            isValid = false;
        }
    });

    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    if (isValid) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const submitText = submitBtn.querySelector('.submit-text');
        const loadingText = submitBtn.querySelector('.loading-text');

        submitBtn.disabled = true;
        submitText.classList.add('hidden');
        loadingText.classList.remove('hidden');

        try {
            // Send to Web3Forms
            const formAction = form.getAttribute('action');
            const response = await fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();

            if (result.success) {
                showFormSuccess();
                form.reset();
            } else {
                showFormError(result.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            showFormError('Network error. Please check your connection and try again.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            loadingText.classList.add('hidden');
        }
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError.call(field);
    
    if (!value) {
        showFieldError(field.name, `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`);
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
        showFieldError(field.name, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function clearFieldError() {
    const field = this;
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.add('hidden');
    }
    field.classList.remove('border-red-500');
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field) {
        field.classList.add('border-red-500');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

function validateFieldValue(value) {
    return value && value.trim().length > 0;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormSuccess() {
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');

    // Hide error if showing
    if (errorMessage) {
        errorMessage.classList.add('hidden');
    }

    if (successMessage) {
        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }
}

function showFormError(message) {
    const errorMessage = document.getElementById('form-error');
    const successMessage = document.getElementById('form-success');

    // Hide success if showing
    if (successMessage) {
        successMessage.classList.add('hidden');
    }

    if (errorMessage) {
        errorMessage.querySelector('.error-text').textContent = message;
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 5000);
    }
}

// Project filtering functionality
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-item');
    const searchInput = document.getElementById('project-search');
    
    // Filter by category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(filter, getSearchQuery());
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            filterProjects(activeFilter, searchTerm);
        });
    }
}

function filterProjects(category, searchTerm) {
    const projectCards = document.querySelectorAll('.project-item');
    
    projectCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        const cardDescription = card.querySelector('p').textContent.toLowerCase();
        
        const matchesCategory = category === 'all' || cardCategory === category;
        const matchesSearch = !searchTerm || 
            cardTitle.includes(searchTerm) || 
            cardDescription.includes(searchTerm);
        
        if (matchesCategory && matchesSearch) {
            card.style.display = 'block';
            anime({
                targets: card,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });
        } else {
            card.style.display = 'none';
        }
    });
}

function getSearchQuery() {
    const searchInput = document.getElementById('project-search');
    return searchInput ? searchInput.value.toLowerCase() : '';
}

// Animation effects
function initAnimations() {
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.02,
                rotateX: 5,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                rotateX: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Navigation link hover effects
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                color: '#805ad5',
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            anime({
                targets: link,
                color: '#ffffff',
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                translateY: -2,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                translateY: 0,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Utility functions
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

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-purple-500 z-50 transition-all duration-100';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 100));
}

// Initialize scroll progress
initScrollProgress();

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    });
    
    // Monitor scroll performance
    let scrollCount = 0;
    window.addEventListener('scroll', throttle(() => {
        scrollCount++;
    }, 100));
    
    // Log scroll events (for debugging)
    setInterval(() => {
        if (scrollCount > 0) {
            console.log(`Scroll events in last second: ${scrollCount}`);
            scrollCount = 0;
        }
    }, 1000);
}

// Initialize performance monitoring
initPerformanceMonitoring();