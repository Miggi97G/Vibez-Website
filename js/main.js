document.addEventListener('DOMContentLoaded', () => {
    console.log('Vibez Playful Edition Loaded');

    // --- Leaf Background Animation ---
    const leafContainer = document.getElementById('leaf-container');
    const leafCount = 15;

    function createLeaf() {
        if (!leafContainer) return;
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        
        // Randomize position and animation
        const startX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 10 + Math.random() * 10;
        const size = 20 + Math.random() * 30;

        leaf.style.left = `${startX}vw`;
        leaf.style.animationDelay = `${delay}s`;
        leaf.style.animationDuration = `${duration}s`;
        leaf.style.width = `${size}px`;
        leaf.style.height = `${size}px`;

        leafContainer.appendChild(leaf);
    }

    for (let i = 0; i < leafCount; i++) {
        createLeaf();
    }

    // --- Smoke Rings Animation ---
    const smokeContainer = document.getElementById('smoke-rings');
    
    function createSmokeRing() {
        if (!smokeContainer) return;
        const ring = document.createElement('div');
        ring.className = 'smoke-ring';
        
        const size = 40 + Math.random() * 60;
        const left = Math.random() * 100;

        ring.style.width = `${size}px`;
        ring.style.height = `${size / 2}px`; // Oval shape
        ring.style.left = `${left}%`;

        smokeContainer.appendChild(ring);

        // Remove after animation finishes
        setTimeout(() => {
            ring.remove();
        }, 4000);
    }

    setInterval(createSmokeRing, 2000);



    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Reveal Animation on Scroll ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.filter = 'blur(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.playful-card, .hero-text, .hero-image-container, .hours-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.filter = 'blur(10px)';
        el.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });

    // --- Modal Logic Helper ---
    function setupModal(triggerId, modalId) {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);
        if (!trigger || !modal) return;

        const closeBtn = modal.querySelector('.close-modal');

        trigger.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeFunc = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeFunc);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeFunc();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeFunc();
        });
    }

    setupModal('cbd-card', 'cbd-modal');
    setupModal('drinks-card', 'drinks-modal');
});
