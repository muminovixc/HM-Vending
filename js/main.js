// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Calculate the offset to account for fixed header
            const headerOffset = 85; // Height of the header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.submit-button');
        const originalButtonText = submitButton.textContent;
        
        try {
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Slanje...';
            
            // Get form data
            const formData = new FormData(this);
            
            // Send form data
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                alert('Hvala na poruci! Kontaktiraćemo vas uskoro.');
                this.reset();
            } else {
                throw new Error('Greška pri slanju poruke');
            }
        } catch (error) {
            // Show error message
            alert('Došlo je do greške pri slanju poruke. Molimo pokušajte ponovo.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Scroll to Top Button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

// Add styles for scroll button
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 20px;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    .scroll-top:hover {
        background: var(--secondary-color);
        transform: translateY(-3px);
    }
    .scroll-top.visible {
        display: block;
    }
`;
document.head.appendChild(style);

// Show/hide scroll button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .product-card, .feature');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Add initial styles for animation
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .service-card, .product-card, .feature {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(animationStyle);

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Initial check for elements in view
window.addEventListener('load', animateOnScroll); 