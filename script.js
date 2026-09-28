document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // GA4 key events: phone taps, booking link clicks, private event enquiries
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link || typeof gtag !== 'function') return;
        const href = link.getAttribute('href') || '';

        if (href.startsWith('tel:')) {
            gtag('event', 'phone_call_click', { link_text: link.textContent.trim() });
        } else if (/reservations\.html/.test(href)) {
            gtag('event', 'book_table_click', { link_text: link.textContent.trim() });
        }
    });

    const eventForm = document.querySelector('.custom-form');
    if (eventForm) {
        eventForm.addEventListener('submit', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'generate_lead', { form_name: 'private_events' });
            }
        });
    }
});
