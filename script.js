const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
    
    const header = document.getElementById('header');
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
            });
            
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    skillsObserver.observe(category);
});

const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            projectsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    projectsObserver.observe(card);
});

const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            footerObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const footer = document.getElementById('footer');
footerObserver.observe(footer);

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.textContent = '';
    });
    
    let isValid = true;
    
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        document.getElementById('nameError').textContent = 'Veuillez entrer votre nom';
        isValid = false;
    } else if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Le nom doit contenir au moins 2 caractères';
        isValid = false;
    }
 
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'Veuillez entrer votre email';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Veuillez entrer un email valide';
        isValid = false;
    }
    
    const message = document.getElementById('message').value.trim();
    if (message === '') {
        document.getElementById('messageError').textContent = 'Veuillez entrer votre message';
        isValid = false;
    } else if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Le message doit contenir au moins 10 caractères';
        isValid = false;
    }
    
    if (isValid) {
        successMessage.classList.add('show');
        contactForm.reset();
        
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        console.log('Formulaire soumis avec succès !');
        console.log('Nom:', name);
        console.log('Email:', email);
        console.log('Message:', message);
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('%c👋 Bonjour ! ', 'font-size: 20px; font-weight: bold; color: #4a90e2;');
console.log('%cMerci de visiter mon portfolio !', 'font-size: 14px; color: #b0b8c9;');
console.log('%cSi vous avez des questions, n\'hésitez pas à me contacter 😊', 'font-size: 12px; color: #5b9fd8;');