// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
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

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // Activities filter functionality - Enhanced version
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activityRows = document.querySelectorAll('.activity-row');

    if (filterButtons.length > 0 && activityRows.length > 0) {
        console.log('Filter functionality initialized'); // Debug log
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Filter button clicked:', this.getAttribute('data-filter')); // Debug log
                
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter activities with animation
                activityRows.forEach(row => {
                    const category = row.getAttribute('data-category');
                    console.log('Row category:', category, 'Filter:', filter); // Debug log
                    
                    if (filter === 'all' || category === filter) {
                        row.style.display = 'grid';
                        row.style.opacity = '0';
                        setTimeout(() => {
                            row.style.opacity = '1';
                        }, 50);
                    } else {
                        row.style.opacity = '0';
                        setTimeout(() => {
                            row.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Initialize with 'all' filter active
        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allButton && !allButton.classList.contains('active')) {
            allButton.click();
        }
    }

    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(loginForm);
            const email = formData.get('email');
            const password = formData.get('password');

            if (!email || !password) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate login
            const submitButton = loginForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Signing In...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Login successful! Welcome to NextGrad.');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                // In a real application, you would redirect here
                // window.location.href = 'index.html';
            }, 2000);
        });
    }

    // Register form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(registerForm);
            const fullName = formData.get('fullName');
            const email = formData.get('email');
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            const terms = formData.get('terms');

            // Validation
            if (!fullName || !email || !password || !confirmPassword) {
                alert('Please fill in all required fields.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            if (password.length < 8) {
                alert('Password must be at least 8 characters long.');
                return;
            }

            if (!terms) {
                alert('Please agree to the Terms of Service and Privacy Policy.');
                return;
            }

            // Simulate registration
            const submitButton = registerForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Creating Account...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Account created successfully! Welcome to NextGrad.');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                // In a real application, you would redirect here
                // window.location.href = 'login.html';
            }, 2000);
        });

        // Password confirmation validation
        const passwordInput = registerForm.querySelector('#password');
        const confirmPasswordInput = registerForm.querySelector('#confirmPassword');
        
        if (passwordInput && confirmPasswordInput) {
            function validatePasswords() {
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;
                
                if (confirmPassword && password !== confirmPassword) {
                    confirmPasswordInput.setCustomValidity('Passwords do not match');
                } else {
                    confirmPasswordInput.setCustomValidity('');
                }
            }

            passwordInput.addEventListener('input', validatePasswords);
            confirmPasswordInput.addEventListener('input', validatePasswords);
        }
    }

    // Profile page tab functionality
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active menu item
            menuItems.forEach(menu => menu.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // FAQ accordion functionality
    window.toggleFAQ = function(element) {
        const faqItem = element.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    };

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.about-card, .club-card, .event-card, .blog-card, .contact-card, .faq-item, .activity-row').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Social login button handlers (placeholder functionality)
    document.querySelectorAll('.btn-social').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`${provider} authentication would be implemented here in a real application.`);
        });
    });

    // Blog card click handlers
    document.querySelectorAll('.blog-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This would navigate to the full blog post in a real application.');
        });
    });

    // Club card click handlers
    document.querySelectorAll('.club-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This would show more information about the club in a real application.');
        });
    });

    // Activity registration handlers
    document.querySelectorAll('.activity-row .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const activityName = this.closest('.activity-row').querySelector('h4').textContent;
            alert(`Registration for "${activityName}" would be handled here in a real application.`);
        });
    });

    // Settings form handler
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Settings saved successfully!');
        });
    }
});

// Additional function to ensure filter works even if called directly
function initializeActivityFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const activityRows = document.querySelectorAll('.activity-row');

    if (filterButtons.length > 0 && activityRows.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter activities
                activityRows.forEach(row => {
                    const category = row.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        row.style.display = 'grid';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Call the function when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeActivityFilters);
} else {
    initializeActivityFilters();
}