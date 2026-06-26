document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const navLinks = document.querySelectorAll('.mobile-nav-links a');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Change icon
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Active Link on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Scroll Effect on Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.style.top = '10px';
            header.style.background = 'rgba(26, 42, 108, 0.9)';
        } else {
            header.style.top = '20px';
            header.style.background = 'rgba(255, 255, 255, 0.15)';
        }
    });
});
// Counter Animation for About Section
const counters = document.querySelectorAll('.number');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// تشغيل العداد عند الوصول للسكشن
const aboutSection = document.querySelector('.about-section');
let observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        startCounters();
        observer.unobserve(aboutSection);
    }
}, { threshold: 0.5 });

observer.observe(aboutSection);
// إضافة تأخير عشوائي لكل عنصر عشان "يطفو" بشكل مختلف عن اللي جنبه
document.querySelectorAll('.n-item').forEach(item => {
    item.style.animationDelay = Math.random() * 2 + 's';
    
    // حركة تتبع الماوس داخل العنصر
    item.addEventListener('mousemove', (e) => {
        let x = e.pageX - item.offsetLeft;
        let y = e.pageY - item.offsetTop;
        item.style.setProperty('--x', x + 'px');
        item.style.setProperty('--y', y + 'px');
    });
});
// تأثير الضوء المتحرك مع الماوس في سكشن لماذا نحن
document.querySelectorAll('.power-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});