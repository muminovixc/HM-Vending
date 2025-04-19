// Router Configuration
const routes = {
    '/': {
        template: 'home',
        title: 'HM Vending | Aparati za Napitke i Vodu | Sarajevo, BiH',
        description: 'HM Vending - Vodeći distributer vending aparata u Bosni i Hercegovini'
    },
    '/usluge': {
        template: 'services',
        title: 'Usluge | HM Vending',
        description: 'Naše usluge - Aparati za kafu, vodu i servis'
    },
    '/proizvodi': {
        template: 'products',
        title: 'Proizvodi | HM Vending',
        description: 'Naši proizvodi - Premium vending aparati'
    },
    '/o-nama': {
        template: 'about',
        title: 'O Nama | HM Vending',
        description: 'O nama - Vodeća kompanija u području vending usluga'
    },
    '/kontakt': {
        template: 'contact',
        title: 'Kontakt | HM Vending',
        description: 'Kontaktirajte nas - Profesionalna podrška'
    }
};

// Router Class
class Router {
    constructor() {
        this.routes = routes;
        this.currentPath = window.location.pathname;
        this.init();
    }

    init() {
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });

        // Handle link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-route]')) {
                e.preventDefault();
                const path = e.target.getAttribute('href');
                this.navigate(path);
            }
        });

        // Handle initial page load
        window.addEventListener('load', () => {
            this.handleRoute();
        });

        // Initial route handling
        this.handleRoute();
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes['/'];
        
        // Update page title and meta description
        document.title = route.title;
        document.querySelector('meta[name="description"]').setAttribute('content', route.description);

        // Scroll to the corresponding section
        let sectionId;
        if (path === '/') {
            sectionId = 'pocetna';
        } else if (path === '/o-nama') {
            sectionId = 'onama';
        } else {
            sectionId = path.substring(1);
        }
        
        const section = document.getElementById(sectionId);
        if (section) {
            // Wait for the page to be fully loaded before scrolling
            setTimeout(() => {
                const headerOffset = 85;
                const elementPosition = section.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }

        // Update active navigation
        this.updateActiveNav(path);
    }

    updateActiveNav(path) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-links a, .footer-links a').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current path
        const currentPath = path === '/' ? '/' : path;
        document.querySelectorAll(`a[href="${currentPath}"]`).forEach(link => {
            link.classList.add('active');
        });
    }
}

// Initialize router
const router = new Router(); 