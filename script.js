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
    // GA4 key event tracking
document.addEventListener('click', function (e) {
  var a = e.target.closest('a');
  if (!a || typeof gtag !== 'function') return;
  var href = a.getAttribute('href') || '';

  if (href.indexOf('tel:') === 0) {
    gtag('event', 'phone_call_click', {
      link_text: a.textContent.trim(),
      value: 40, currency: 'AUD'          // estimated worth, see step 4
    });
  } else if (/reservations\.html/.test(href)) {
    gtag('event', 'book_table_click', {
      link_text: a.textContent.trim(),
      value: 30, currency: 'AUD'
    });
  }
});

var eventForm = document.querySelector('.custom-form');
if (eventForm) {
  eventForm.addEventListener('submit', function () {
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', {
        form_name: 'private_events',
        value: 500, currency: 'AUD'
      });
    }
  });
}
});
