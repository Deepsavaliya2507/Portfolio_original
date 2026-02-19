document.addEventListener('DOMContentLoaded', () => {
    
    /* -------------------------------------------------------------------------- */
    /*                               Navbar Scroll Effect                         */
    /* -------------------------------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-lg');
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)'; // dark-bg with higher opacity
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.85)'; // initial state
            navbar.style.padding = '1rem 0';
        }
    }

    window.addEventListener('scroll', updateNavbar);
    // Initial check in case of refresh
    updateNavbar();


    /* -------------------------------------------------------------------------- */
    /*                         Active Link Highlighting                           */
    /* -------------------------------------------------------------------------- */
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    // Helper to normalize path comparisons
    const normalizePath = (path) => {
        return path.split('/').pop() || 'index.html';
    };

    const currentPage = normalizePath(currentPath);

    navLinks.forEach(link => {
        const linkPath = normalizePath(link.getAttribute('href'));
        
        // Remove 'active' from all first
        link.classList.remove('active');

        // Add 'active' if paths match
        if (linkPath === currentPage) {
            link.classList.add('active');
        }
    });


    /* -------------------------------------------------------------------------- */
    /*                              Smooth Scrolling                              */
    /* -------------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }

                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    /* -------------------------------------------------------------------------- */
    /*                         Scroll Animations (Fade In)                        */
    /* -------------------------------------------------------------------------- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0'; // Ensure hidden initially
        observer.observe(el);
    });

});
