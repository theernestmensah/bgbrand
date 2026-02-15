/**
 * BG Brand - Advanced 3D Effects
 * Mouse-based parallax and interactive 3D transformations
 */

document.addEventListener('DOMContentLoaded', function () {

    // 3D Parallax on Category Cards
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-20px) 
            scale(1.02)
         `;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // 3D Parallax on Product Cards
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;

            card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-15px)
         `;

            const image = card.querySelector('.product-image');
            if (image) {
                image.style.transform = `scale(1.08) translateZ(20px)`;
            }
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            const image = card.querySelector('.product-image');
            if (image) {
                image.style.transform = 'scale(1) translateZ(0)';
            }
        });
    });

    // Hero Section Depth Parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        document.addEventListener('mousemove', function (e) {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            const heroContainer = hero.querySelector('.container');
            if (heroContainer) {
                heroContainer.style.transform = `
               perspective(1000px)
               translateX(${mouseX * 30}px)
               translateY(${mouseY * 30}px)
               rotateY(${mouseX * 5}deg)
               rotateX(${-mouseY * 5}deg)
            `;
            }
        });
    }

    // 3D Tilt on Editorial Image
    const editorialImage = document.querySelector('.bg-gradient-primary-to-pastel img');
    if (editorialImage) {
        editorialImage.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            this.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(40px) 
            scale(1.05)
         `;
        });

        editorialImage.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        });
    }

    // Add floating animation to navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.style.transform = 'translateZ(50px)';
                navbar.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.transform = 'translateZ(0)';
                navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            }
        });
    }

    // Initialize smooth perspective on page sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.transformStyle = 'preserve-3d';
    });

    console.log('✨ 3D Effects Initialized');
});
