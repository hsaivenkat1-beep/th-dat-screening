/**
 * ============================================================
 *  TH-DAT: Trimester-Aware Hierarchical Domain-Attention
 *         Transformer for Antenatal Depression Screening
 * ============================================================
 *  © 2026 Saivenkat H — VIT-AP University
 *  All Rights Reserved.
 *
 *  This software is the intellectual property of Saivenkat H.
 *  Unauthorized copying, modification, distribution, or use
 *  of this code, in whole or in part, is strictly prohibited
 *  without prior written permission from the author.
 *
 *  Contact: hsaivenkat1@gmail.com
 *  License: Proprietary — Not for redistribution.
 * ============================================================
 */

// ============================================================
// PROTECTION: Anti-copy, anti-inspect, rate limiting
// ============================================================
(function() {
    'use strict';

    // --- Console Warning ---
    const warningStyle = 'color: #ff4444; font-size: 18px; font-weight: bold;';
    const infoStyle = 'color: #a78bfa; font-size: 14px;';
    console.log('%c⚠ WARNING', warningStyle);
    console.log('%cThis is a protected application by Saivenkat H.', infoStyle);
    console.log('%cUnauthorized access, copying, or reverse-engineering of this code is prohibited.', infoStyle);
    console.log('%c© 2026 Saivenkat H — VIT-AP University. All Rights Reserved.', infoStyle);

    // --- Disable Right-Click Context Menu ---
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showProtectionNotice('Right-click is disabled on this site.');
        return false;
    });

    // --- Disable Keyboard Shortcuts for DevTools / View Source ---
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
            showProtectionNotice('Developer tools access is restricted.');
            return false;
        }
        // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
            e.preventDefault();
            showProtectionNotice('Developer tools access is restricted.');
            return false;
        }
        // Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
            e.preventDefault();
            showProtectionNotice('Viewing source code is restricted.');
            return false;
        }
        // Ctrl+S (Save Page)
        if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
            e.preventDefault();
            showProtectionNotice('Saving this page is not allowed.');
            return false;
        }
        // Ctrl+A (Select All) — only on body, not form inputs
        if (e.ctrlKey && (e.key === 'A' || e.key === 'a') && document.activeElement === document.body) {
            e.preventDefault();
            return false;
        }
    });

    // --- Disable Text Selection on non-form elements ---
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    });

    // --- Disable Drag ---
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // --- Protection Notice Toast ---
    function showProtectionNotice(message) {
        let existing = document.querySelector('.protection-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'protection-toast';
        toast.innerHTML = `
            <span style="font-size:1.2rem;">🔒</span>
            <div>
                <strong style="color:#ff6b6b;">Protected Content</strong><br>
                <span style="font-size:0.82rem;">${message}</span>
            </div>
        `;
        toast.style.cssText = `
            position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(20px);
            background: linear-gradient(135deg, rgba(17,17,24,0.97), rgba(10,10,15,0.99));
            border: 1px solid rgba(255,107,107,0.3); border-radius: 14px; padding: 14px 24px;
            display: flex; align-items: center; gap: 12px; z-index: 99999;
            box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(255,107,107,0.1);
            backdrop-filter: blur(16px); color: #a0a0b8; font-family: 'Inter', sans-serif;
            animation: protToastIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
        `;
        document.body.appendChild(toast);

        // Add animation keyframes if not already present
        if (!document.getElementById('prot-toast-style')) {
            const style = document.createElement('style');
            style.id = 'prot-toast-style';
            style.textContent = `
                @keyframes protToastIn { from { opacity:0; transform: translateX(-50%) translateY(40px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
                @keyframes protToastOut { from { opacity:1; transform: translateX(-50%) translateY(0); } to { opacity:0; transform: translateX(-50%) translateY(40px); } }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            toast.style.animation = 'protToastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // --- Rate Limiter for Screening ---
    window._screeningRateLimit = {
        count: 0,
        maxPerMinute: 5,
        resetTime: null,
        check: function() {
            const now = Date.now();
            if (!this.resetTime || now - this.resetTime > 60000) {
                this.resetTime = now;
                this.count = 0;
            }
            this.count++;
            if (this.count > this.maxPerMinute) {
                showProtectionNotice('Too many screening requests. Please wait 1 minute.');
                return false;
            }
            return true;
        }
    };
})();

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // PROTECTION: Disclaimer Modal Before Screening
    // ============================================================
    let disclaimerAccepted = false;

    function showDisclaimer(callback) {
        if (disclaimerAccepted) { callback(); return; }

        const modal = document.getElementById('popup-modal');
        const content = document.getElementById('popup-content');

        content.innerHTML = `
            <div style="text-align:center; margin-bottom:16px;">
                <span style="font-size:2.5rem;">⚠️</span>
            </div>
            <h3 style="text-align:center;">Important Disclaimer</h3>
            <p style="font-size:0.9rem; line-height:1.8; margin-top:12px;">
                This screening tool is for <strong>educational and research demonstration purposes only</strong>. 
                It does <strong>NOT</strong> provide clinical diagnosis and should never replace professional medical assessment.
            </p>
            <p style="font-size:0.9rem; line-height:1.8;">
                The risk scores are generated using a <strong>simplified simulation</strong> of the TH-DAT model architecture 
                and do not reflect actual trained model predictions. 
            </p>
            <p style="font-size:0.85rem; color:#6b6b80; margin-top:8px;">
                © 2026 Saivenkat H — VIT-AP University. All rights reserved.
            </p>
            <div style="display:flex; gap:12px; margin-top:24px;">
                <button id="disclaimer-decline" style="flex:1; padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:#a0a0b8; cursor:pointer; font-size:0.9rem;">
                    Decline
                </button>
                <button id="disclaimer-accept" style="flex:1; padding:12px; border-radius:10px; border:none; background:linear-gradient(135deg,#a78bfa,#ec4899); color:white; cursor:pointer; font-weight:600; font-size:0.9rem;">
                    I Understand & Accept
                </button>
            </div>
        `;

        modal.classList.add('active');

        document.getElementById('disclaimer-accept').addEventListener('click', () => {
            disclaimerAccepted = true;
            modal.classList.remove('active');
            callback();
        });

        document.getElementById('disclaimer-decline').addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Override close button to just close
        const closeBtn = document.getElementById('popup-close');
        const oldClose = closeBtn.onclick;
        closeBtn.onclick = () => { modal.classList.remove('active'); };
    }



    // ============================================================
    // CINEMATIC: Splash Screen
    // ============================================================
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.classList.add('fade-out');
            setTimeout(() => {
                splash.style.display = 'none';
                // Show welcome toast after splash
                showToast('🎉', 'Welcome to TH-DAT', 'Antenatal Depression Screening powered by AI');
            }, 800);
        }, 2200);
    }

    // ============================================================
    // CINEMATIC: Cursor Glow Trail
    // ============================================================
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorGlow && !cursorGlow.classList.contains('visible')) {
            cursorGlow.classList.add('visible');
        }
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        if (cursorGlow) {
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
        }
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // ============================================================
    // CINEMATIC: Toast Notifications
    // ============================================================
    function showToast(icon, title, message) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <div class="toast-msg">
                <strong>${title}</strong>
                ${message}
            </div>
        `;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4200);
    }

    // ============================================================
    // CINEMATIC: 3D Tilt Effect on Cards
    // ============================================================
    function initTiltCards() {
        document.querySelectorAll('.challenge-card, .arch-card, .team-card, .tri-card, .cohort-card, .phase-card').forEach(card => {
            // Add tilt shine overlay
            if (!card.querySelector('.tilt-shine')) {
                const shine = document.createElement('div');
                shine.className = 'tilt-shine';
                card.appendChild(shine);
                card.classList.add('tilt-card');
            }

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -6;
                const rotateY = (x - centerX) / centerX * 6;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

                // Update shine position
                const shine = card.querySelector('.tilt-shine');
                if (shine) {
                    shine.style.setProperty('--shine-x', (x / rect.width * 100) + '%');
                    shine.style.setProperty('--shine-y', (y / rect.height * 100) + '%');
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // ============================================================
    // CINEMATIC: Architecture Card Popups
    // ============================================================
    const archPopupData = {
        'C1': {
            title: 'C1: Domain-Grouped Feature Tokenizer',
            desc: 'Each of the 19 scalar clinical features is individually projected into a 128-dimensional embedding space through feature-specific linear transformations. Unlike TabTransformer which shares weights across features, TH-DAT uses N separate projection layers. Dual positional information (feature identity + clinical domain) enables the transformer to distinguish features from different clinical domains.',
            stats: [
                { val: '128', label: 'Embed Dim' },
                { val: '19', label: 'Features' },
                { val: '3', label: 'Domains' },
            ]
        },
        'C2': {
            title: 'C2: Global Transformer Encoder',
            desc: 'A 6-layer, 8-head standard transformer encoder with trimester conditioning injected as a scaled additive bias (α=0.1). This enables learning both intra-domain interactions (e.g., age-education within demographics) and cross-domain interactions (e.g., gestational age × physical health across obstetric and psychosocial domains) simultaneously.',
            stats: [
                { val: '6', label: 'Layers' },
                { val: '8', label: 'Heads' },
                { val: '512', label: 'd_ff' },
            ]
        },
        'C3': {
            title: 'C3: Domain-Aware Attention Pooling',
            desc: 'Three learnable query vectors attend exclusively over the transformed tokens belonging to their respective clinical domains, producing domain summaries S ∈ ℝ³ˣ¹²⁸. This is more expressive than simple mean or max pooling — it learns which features within each domain are most informative for depression prediction.',
            stats: [
                { val: '3', label: 'Queries' },
                { val: 'MHA', label: 'Mechanism' },
                { val: 'LayerNorm', label: 'Norm' },
            ]
        },
        'C4': {
            title: 'C4: Trimester Cross-Attention',
            desc: 'The trimester embedding serves as a query attending over the three domain summaries. This mechanism allows the model to learn that psychosocial factors dominate first-trimester risk while obstetric complications become more predictive in the third trimester — capturing the evolving nature of antenatal depression risk.',
            stats: [
                { val: 'T1', label: '≤13 weeks' },
                { val: 'T2', label: '14-26 weeks' },
                { val: 'T3', label: '≥27 weeks' },
            ]
        },
        'C5': {
            title: 'C5: Gated Domain Fusion',
            desc: 'A two-layer MLP with softmax produces per-patient domain contribution weights g = [g₁, g₂, g₃] where Σgₖ = 1. Entropy regularization prevents collapse to a single domain. The gate weights provide interpretable, patient-specific domain attribution — a key advantage over opaque models.',
            stats: [
                { val: '31.6%', label: 'Demo Gate' },
                { val: '34.1%', label: 'Obst Gate' },
                { val: '34.3%', label: 'Psych Gate' },
            ]
        },
    };

    function openPopup(component) {
        const data = archPopupData[component];
        if (!data) return;

        const modal = document.getElementById('popup-modal');
        const content = document.getElementById('popup-content');

        content.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.desc}</p>
            <div class="popup-stat">
                ${data.stats.map(s => `
                    <div class="popup-stat-item">
                        <span class="pval">${s.val}</span>
                        <span class="plabel">${s.label}</span>
                    </div>
                `).join('')}
            </div>
        `;

        modal.classList.add('active');
    }

    // Bind arch card clicks
    document.querySelectorAll('.arch-card[data-component]').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            openPopup(card.dataset.component);
        });
    });

    // Close popup
    document.getElementById('popup-close')?.addEventListener('click', () => {
        document.getElementById('popup-modal').classList.remove('active');
    });

    document.getElementById('popup-modal')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('active');
        }
    });

    // ============================================================
    // CINEMATIC: Dramatic Scroll Reveal with Stagger
    // ============================================================
    function initCinematicReveals() {
        const revealTypes = ['reveal-up', 'reveal-left', 'reveal-right', 'reveal-scale', 'reveal-rotate'];

        // Section headers
        document.querySelectorAll('.section-header').forEach(el => {
            el.classList.add('reveal-up');
        });

        // Challenge cards - staggered
        document.querySelectorAll('.challenge-card').forEach((el, i) => {
            el.classList.add('reveal-up');
            el.style.transitionDelay = `${i * 0.12}s`;
        });

        // Timeline items
        document.querySelectorAll('.timeline-item').forEach((el, i) => {
            el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
            el.style.transitionDelay = `${i * 0.1}s`;
        });

        // Architecture cards
        document.querySelectorAll('.arch-card').forEach((el, i) => {
            el.classList.add('reveal-scale');
            el.style.transitionDelay = `${i * 0.1}s`;
        });

        // Team cards
        document.querySelectorAll('.team-card').forEach((el, i) => {
            el.classList.add('reveal-up');
            el.style.transitionDelay = `${i * 0.08}s`;
        });

        // Trimester cards
        document.querySelectorAll('.tri-card').forEach((el, i) => {
            el.classList.add('reveal-scale');
            el.style.transitionDelay = `${i * 0.15}s`;
        });

        // Cohort cards
        document.querySelectorAll('.cohort-card').forEach((el, i) => {
            el.classList.add('reveal-rotate');
            el.style.transitionDelay = `${i * 0.2}s`;
        });

        // Phase cards
        document.querySelectorAll('.phase-card').forEach((el, i) => {
            el.classList.add('reveal-up');
            el.style.transitionDelay = `${i * 0.2}s`;
        });

        // Loss function card
        document.querySelectorAll('.loss-function-card').forEach(el => {
            el.classList.add('reveal-scale');
        });

        // Tables
        document.querySelectorAll('.perf-table-wrapper').forEach(el => {
            el.classList.add('reveal-up');
        });

        // Gate section
        document.querySelectorAll('.gate-visual').forEach(el => {
            el.classList.add('reveal-up');
        });

        // Screening wrapper
        document.querySelectorAll('.screening-wrapper').forEach(el => {
            el.classList.add('reveal-up');
        });

        // Research challenges
        document.querySelectorAll('.research-challenges').forEach(el => {
            el.classList.add('reveal-up');
        });
    }

    const cinematicObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    // ============================================================
    // CINEMATIC: Magnetic Buttons
    // ============================================================
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.classList.add('btn-magnetic');
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ============================================================
    // CINEMATIC: Parallax Scroll on Orbs + Section Fade
    // ============================================================
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const delta = scrollY - lastScrollY;
        lastScrollY = scrollY;

        document.querySelectorAll('.orb').forEach((orb, i) => {
            const speed = 0.02 + (i * 0.01);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });

        // Parallax hero content
        const hero = document.querySelector('.hero-content');
        if (hero && scrollY < window.innerHeight) {
            hero.style.transform = `translateY(${scrollY * 0.15}px)`;
            hero.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
        }
    });

    // ============================================================
    // CINEMATIC: Section Toast Notifications
    // ============================================================
    const sectionToasts = {
        'about': { shown: false, icon: '📊', title: 'Did you know?', msg: '10-20% of pregnant women experience antenatal depression' },
        'screening': { shown: false, icon: '🩺', title: 'Start Screening', msg: 'Fill in all 3 domains for accurate risk assessment' },
        'architecture': { shown: false, icon: '🧠', title: 'Click any component!', msg: 'Tap architecture cards for detailed explanations' },
        'results': { shown: false, icon: '🏆', title: 'Top Performance', msg: 'TH-DAT achieved 94.40% AUC-ROC across 28,333 records' },
    };

    const toastObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                if (sectionToasts[id] && !sectionToasts[id].shown) {
                    sectionToasts[id].shown = true;
                    setTimeout(() => {
                        showToast(sectionToasts[id].icon, sectionToasts[id].title, sectionToasts[id].msg);
                    }, 600);
                }
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('#about, #screening, #architecture, #results').forEach(el => {
        toastObserver.observe(el);
    });

    // ============================================================
    // Initialize all cinematic effects after a short delay
    // ============================================================
    setTimeout(() => {
        initTiltCards();
        initCinematicReveals();

        // Observe all reveal elements
        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate').forEach(el => {
            cinematicObserver.observe(el);
        });

        // Add shimmer to hero title
        document.querySelectorAll('.hero-title').forEach(el => {
            el.classList.add('shimmer-text');
        });

        // Add glow-on-hover to key cards
        document.querySelectorAll('.arch-card, .creator-card').forEach(el => {
            el.classList.add('glow-on-hover');
        });
    }, 100);



    // ============================================================
    // Particle Background
    // ============================================================
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.min(80, Math.floor(window.innerWidth / 20));
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.4 + 0.1,
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            // Mouse interaction — particles gently attracted to cursor
            const dx2 = mouseX - p.x;
            const dy2 = mouseY - p.y;
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            if (dist2 < 200 && dist2 > 10) {
                p.vx += (dx2 / dist2) * 0.008;
                p.vy += (dy2 / dist2) * 0.008;
                // Dampen
                p.vx *= 0.998;
                p.vy *= 0.998;
            }

            // Glow effect near cursor
            const glowFactor = dist2 < 150 ? (1 - dist2 / 150) * 0.6 : 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r + glowFactor * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167, 139, 250, ${p.alpha + glowFactor})`;
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const dx = p.x - particles[j].x;
                const dy = p.y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(167, 139, 250, ${0.08 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        animationId = requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    createParticles();
    drawParticles();
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    // ============================================================
    // Navigation
    // ============================================================
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    window.addEventListener('scroll', () => {
        // Scrolled state
        nav.classList.toggle('scrolled', window.scrollY > 50);

        // Active link
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });

    // Mobile menu
    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            mobileMenu.classList.remove('open');
        });
    });

    // ============================================================
    // Animated Stat Counters
    // ============================================================
    function animateCounter(el, target, decimals = 0) {
        let current = 0;
        const increment = target / 80;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current.toFixed(decimals);
        }, 20);
    }

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-value[data-count]').forEach(el => {
                    const target = parseFloat(el.dataset.count);
                    const decimals = target % 1 !== 0 ? 2 : 0;
                    animateCounter(el, target, decimals);
                });
                statObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statObserver.observe(heroStats);

    // ============================================================
    // Scroll Reveal Animations
    // ============================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.challenge-card, .arch-card, .team-card, .tri-card, .cohort-card').forEach((el, i) => {
        el.dataset.delay = (i % 4) * 100;
        revealObserver.observe(el);
    });

    // ============================================================
    // Screening Form — Multi-Step Navigation
    // ============================================================
    let currentStep = 1;
    const totalSteps = 4;
    const progressFill = document.getElementById('progress-fill');
    const progressSteps = document.querySelectorAll('.progress-step');

    function goToStep(step) {
        if (step < 1 || step > totalSteps) return;

        // Validate current step before moving forward
        if (step > currentStep) {
            const currentStepEl = document.getElementById(`step-${currentStep}`);
            const inputs = currentStepEl.querySelectorAll('input[required], select[required]');
            let valid = true;
            inputs.forEach(input => {
                if (!input.value) {
                    input.style.borderColor = '#ef4444';
                    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';
                    valid = false;
                    setTimeout(() => {
                        input.style.borderColor = '';
                        input.style.boxShadow = '';
                    }, 2000);
                }
            });
            if (!valid) return;
        }

        document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
        document.getElementById(`step-${step}`).classList.add('active');

        progressSteps.forEach((ps, i) => {
            ps.classList.remove('active', 'completed');
            if (i + 1 < step) ps.classList.add('completed');
            if (i + 1 === step) ps.classList.add('active');
        });

        progressFill.style.width = `${(step / totalSteps) * 100}%`;
        currentStep = step;

        // Scroll to screening section
        document.getElementById('screening').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Next/Prev buttons
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.next)));
    });

    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.prev)));
    });

    // ============================================================
    // Gestational Age → Trimester Auto-Detection
    // ============================================================
    const gestationalAgeInput = document.getElementById('gestational_age');
    const trimesterValue = document.getElementById('trimester-value');

    if (gestationalAgeInput) {
        gestationalAgeInput.addEventListener('input', () => {
            const weeks = parseFloat(gestationalAgeInput.value);
            if (isNaN(weeks) || weeks < 1) {
                trimesterValue.textContent = 'Enter gestational age';
                trimesterValue.className = 'tri-value';
                return;
            }

            let trimester, label;
            if (weeks <= 13) {
                trimester = 'T1';
                label = 'First Trimester (≤13 weeks)';
                trimesterValue.style.color = '#a78bfa';
            } else if (weeks <= 26) {
                trimester = 'T2';
                label = 'Second Trimester (14–26 weeks)';
                trimesterValue.style.color = '#ec4899';
            } else {
                trimester = 'T3';
                label = 'Third Trimester (≥27 weeks)';
                trimesterValue.style.color = '#f97316';
            }
            trimesterValue.textContent = `${trimester} — ${label}`;
        });
    }

    // ============================================================
    // Depression Risk Calculation (TH-DAT Inspired)
    // ============================================================
    /*
     * This implements a client-side risk scoring algorithm inspired by
     * the TH-DAT model's domain-grouped, trimester-conditioned approach.
     * 
     * It uses the SHAP-derived feature importance weights from the paper
     * (Table S-14) and trimester-specific domain attention patterns.
     * 
     * IMPORTANT: This is a DEMONSTRATION tool, not a clinical diagnostic.
     */

    // Feature importance weights derived from SHAP analysis (normalized)
    const FEATURE_WEIGHTS = {
        // Demographic domain (31.6% gate weight)
        age: 0.0734,
        female_education: 0.0587,
        husband_education: 0.035,
        working_status: 0.030,
        sufficient_money: 0.0534,
        family_system: 0.0698,

        // Obstetric domain (34.1% gate weight)
        gestational_age: 0.0842,
        gravida: 0.0623,
        miscarriage: 0.0498,
        gender_preference: 0.040,
        num_children: 0.035,

        // Psychosocial domain (34.3% gate weight)
        physical_health: 0.0789,
        appearance_acceptance: 0.0651,
        mil_relationship: 0.0561,
    };

    // Domain gate weights (from the paper Fig. 3)
    const DOMAIN_GATES = {
        demographic: 0.316,
        obstetric: 0.341,
        psychosocial: 0.343,
    };

    // Trimester-specific domain attention modifiers
    // Based on the paper's trimester cross-attention mechanism
    const TRIMESTER_MODIFIERS = {
        T1: { demographic: 1.15, obstetric: 0.85, psychosocial: 1.20 },
        T2: { demographic: 1.00, obstetric: 1.05, psychosocial: 1.10 },
        T3: { demographic: 0.90, obstetric: 1.20, psychosocial: 0.95 },
    };

    function getTrimester(weeks) {
        if (weeks <= 13) return 'T1';
        if (weeks <= 26) return 'T2';
        return 'T3';
    }

    function calculateDepressionRisk(formData) {
        const weeks = parseFloat(formData.gestational_age);
        const trimester = getTrimester(weeks);
        const triMod = TRIMESTER_MODIFIERS[trimester];

        // === Demographic Domain Score ===
        let demoScore = 0;
        let demoMax = 0;

        // Age risk: extremes (very young or older) increase risk
        const age = parseInt(formData.age);
        let ageRisk;
        if (age < 20) ageRisk = 0.8;
        else if (age < 25) ageRisk = 0.4;
        else if (age < 35) ageRisk = 0.2;
        else if (age < 40) ageRisk = 0.5;
        else ageRisk = 0.7;
        demoScore += ageRisk * FEATURE_WEIGHTS.age;
        demoMax += FEATURE_WEIGHTS.age;

        // Education: lower = higher risk (inverse)
        const femEdu = parseInt(formData.female_education);
        demoScore += (1 - femEdu / 4) * FEATURE_WEIGHTS.female_education;
        demoMax += FEATURE_WEIGHTS.female_education;

        const husEdu = parseInt(formData.husband_education);
        demoScore += (1 - husEdu / 4) * FEATURE_WEIGHTS.husband_education;
        demoMax += FEATURE_WEIGHTS.husband_education;

        // Working: unemployed = higher risk
        demoScore += (1 - parseInt(formData.working_status)) * FEATURE_WEIGHTS.working_status;
        demoMax += FEATURE_WEIGHTS.working_status;

        // Money: insufficient = higher risk
        const money = parseInt(formData.sufficient_money);
        demoScore += (1 - money / 3) * FEATURE_WEIGHTS.sufficient_money;
        demoMax += FEATURE_WEIGHTS.sufficient_money;

        // Family system: joint family can be protective or stressful depending on relationships
        demoScore += (1 - parseInt(formData.family_system)) * FEATURE_WEIGHTS.family_system * 0.6;
        demoMax += FEATURE_WEIGHTS.family_system;

        const demoNorm = demoMax > 0 ? demoScore / demoMax : 0;

        // === Obstetric Domain Score ===
        let obstScore = 0;
        let obstMax = 0;

        // Gestational age contribution (varies by trimester)
        let gaRisk;
        if (weeks <= 13) gaRisk = 0.4;
        else if (weeks <= 26) gaRisk = 0.3;
        else gaRisk = 0.5;
        obstScore += gaRisk * FEATURE_WEIGHTS.gestational_age;
        obstMax += FEATURE_WEIGHTS.gestational_age;

        // Gravida: higher = potentially higher risk
        const gravida = parseInt(formData.gravida);
        let gravidaRisk = Math.min(gravida / 6, 1) * 0.6;
        obstScore += gravidaRisk * FEATURE_WEIGHTS.gravida;
        obstMax += FEATURE_WEIGHTS.gravida;

        // Miscarriage history
        obstScore += parseInt(formData.miscarriage) * FEATURE_WEIGHTS.miscarriage;
        obstMax += FEATURE_WEIGHTS.miscarriage;

        // Gender preference
        const genderPref = parseInt(formData.gender_preference);
        obstScore += (genderPref / 2) * FEATURE_WEIGHTS.gender_preference;
        obstMax += FEATURE_WEIGHTS.gender_preference;

        // Total children
        const totalChildren = parseInt(formData.num_sons) + parseInt(formData.num_daughters);
        let childRisk = Math.min(totalChildren / 5, 1) * 0.4;
        obstScore += childRisk * FEATURE_WEIGHTS.num_children;
        obstMax += FEATURE_WEIGHTS.num_children;

        const obstNorm = obstMax > 0 ? obstScore / obstMax : 0;

        // === Psychosocial Domain Score ===
        let psychScore = 0;
        let psychMax = 0;

        // Physical health (inverse: poor health = higher risk)
        const physHealth = parseInt(formData.physical_health);
        psychScore += (1 - physHealth / 4) * FEATURE_WEIGHTS.physical_health;
        psychMax += FEATURE_WEIGHTS.physical_health;

        // Appearance acceptance (inverse)
        const appearance = parseInt(formData.appearance_acceptance);
        psychScore += (1 - appearance / 4) * FEATURE_WEIGHTS.appearance_acceptance;
        psychMax += FEATURE_WEIGHTS.appearance_acceptance;

        // Mother-in-law relationship (inverse)
        const milRel = parseInt(formData.mil_relationship);
        psychScore += (1 - milRel / 4) * FEATURE_WEIGHTS.mil_relationship;
        psychMax += FEATURE_WEIGHTS.mil_relationship;

        const psychNorm = psychMax > 0 ? psychScore / psychMax : 0;

        // === Gated Domain Fusion with Trimester Modulation ===
        const weightedDemo = demoNorm * DOMAIN_GATES.demographic * triMod.demographic;
        const weightedObst = obstNorm * DOMAIN_GATES.obstetric * triMod.obstetric;
        const weightedPsych = psychNorm * DOMAIN_GATES.psychosocial * triMod.psychosocial;

        // Normalize gate weights after trimester modulation
        const totalWeight = DOMAIN_GATES.demographic * triMod.demographic +
                          DOMAIN_GATES.obstetric * triMod.obstetric +
                          DOMAIN_GATES.psychosocial * triMod.psychosocial;

        const rawRisk = (weightedDemo + weightedObst + weightedPsych) / totalWeight;

        // Apply sigmoid-like transformation for calibrated output
        const calibrated = 1 / (1 + Math.exp(-6 * (rawRisk - 0.45)));

        // Calculate individual domain percentages
        const demoContrib = (weightedDemo / (weightedDemo + weightedObst + weightedPsych)) * 100;
        const obstContrib = (weightedObst / (weightedDemo + weightedObst + weightedPsych)) * 100;
        const psychContrib = (weightedPsych / (weightedDemo + weightedObst + weightedPsych)) * 100;

        return {
            riskScore: Math.round(calibrated * 100),
            rawRisk: rawRisk,
            trimester: trimester,
            gestationalWeeks: weeks,
            domainScores: {
                demographic: Math.round(demoNorm * 100),
                obstetric: Math.round(obstNorm * 100),
                psychosocial: Math.round(psychNorm * 100),
            },
            domainContributions: {
                demographic: Math.round(demoContrib),
                obstetric: Math.round(obstContrib),
                psychosocial: Math.round(psychContrib),
            },
            gateWeights: {
                demographic: (DOMAIN_GATES.demographic * triMod.demographic / totalWeight * 100).toFixed(1),
                obstetric: (DOMAIN_GATES.obstetric * triMod.obstetric / totalWeight * 100).toFixed(1),
                psychosocial: (DOMAIN_GATES.psychosocial * triMod.psychosocial / totalWeight * 100).toFixed(1),
            },
        };
    }

    // Risk factors by trimester
    const TRIMESTER_RISK_FACTORS = {
        T1: [
            { icon: '🤢', text: 'Morning sickness and nausea can exacerbate mood disorders' },
            { icon: '💭', text: 'Adjustment difficulties and unplanned pregnancy anxiety' },
            { icon: '👥', text: 'Psychosocial factors tend to dominate first-trimester risk' },
            { icon: '📊', text: 'TH-DAT AUC: 0.9685 for T1 (N=673 test samples)' },
        ],
        T2: [
            { icon: '🩺', text: 'Increasing prenatal visit frequency and test anxiety' },
            { icon: '💪', text: 'Physical changes become more pronounced' },
            { icon: '⚖️', text: 'Balanced influence of obstetric and psychosocial factors' },
            { icon: '📊', text: 'TH-DAT AUC: 0.9743 for T2 (N=589 test samples)' },
        ],
        T3: [
            { icon: '😰', text: 'Delivery anxiety and fear of complications increase' },
            { icon: '💰', text: 'Financial preparation stress intensifies' },
            { icon: '🏥', text: 'Obstetric factors become more predictive of risk' },
            { icon: '📊', text: 'TH-DAT AUC: 0.9812 for T3 (N=840 test samples)' },
        ],
    };

    // Calculate button handler (with protection)
    document.getElementById('calculate-btn').addEventListener('click', () => {
        // Rate limit check
        if (!window._screeningRateLimit.check()) return;

        // Show disclaimer on first use
        showDisclaimer(() => {
            runScreeningCalculation();
        });
    });

    function runScreeningCalculation() {
        const form = document.getElementById('screening-form');
        const formData = {};

        // Collect all form values
        form.querySelectorAll('input, select').forEach(el => {
            if (el.name) formData[el.name] = el.value;
        });

        // Validate step 3
        const step3 = document.getElementById('step-3');
        const inputs = step3.querySelectorAll('input[required], select[required]');
        let valid = true;
        inputs.forEach(input => {
            if (!input.value) {
                input.style.borderColor = '#ef4444';
                valid = false;
                setTimeout(() => { input.style.borderColor = ''; }, 2000);
            }
        });
        if (!valid) return;

        // Calculate risk
        const result = calculateDepressionRisk(formData);

        // Determine risk level
        let riskLevel, riskClass, riskEmoji, riskAdvice;
        if (result.riskScore <= 30) {
            riskLevel = 'Low Risk';
            riskClass = 'risk-low';
            riskEmoji = '✅';
            riskAdvice = 'The screening parameters suggest a lower risk profile. Continue routine prenatal care and monitoring.';
        } else if (result.riskScore <= 60) {
            riskLevel = 'Moderate Risk';
            riskClass = 'risk-moderate';
            riskEmoji = '⚠️';
            riskAdvice = 'The screening parameters suggest moderate risk. Consider a detailed clinical assessment with a validated screening tool (EPDS/PHQ-9).';
        } else {
            riskLevel = 'High Risk';
            riskClass = 'risk-high';
            riskEmoji = '🔴';
            riskAdvice = 'The screening parameters suggest elevated risk. A comprehensive clinical evaluation and mental health referral is recommended.';
        }

        const riskColor = result.riskScore <= 30 ? '#10b981' : result.riskScore <= 60 ? '#f59e0b' : '#ef4444';
        const trimesterFactors = TRIMESTER_RISK_FACTORS[result.trimester];

        // Collect readable labels for the report
        const patientName = formData.patient_name || 'Not Provided';
        const ageVal = formData.age;
        const eduLabels = ['No formal education', 'Primary (1–5 yrs)', 'Secondary (6–10 yrs)', 'Higher secondary (11–12 yrs)', 'Graduate / Post-graduate'];
        const femEduLabel = eduLabels[parseInt(formData.female_education)] || '—';
        const husEduLabel = eduLabels[parseInt(formData.husband_education)] || '—';
        const workLabel = formData.working_status === '1' ? 'Employed' : 'Unemployed / Homemaker';
        const moneyLabels = ['Always insufficient', 'Sometimes insufficient', 'Mostly sufficient', 'Always sufficient'];
        const moneyLabel = moneyLabels[parseInt(formData.sufficient_money)] || '—';
        const familyLabel = formData.family_system === '1' ? 'Nuclear' : 'Joint / Extended';
        const trimesterLabel = result.trimester === 'T1' ? 'First (≤13 wks)' : result.trimester === 'T2' ? 'Second (14–26 wks)' : 'Third (≥27 wks)';
        const healthLabels = ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent'];
        const physLabel = healthLabels[parseInt(formData.physical_health)] || '—';
        const appearLabels = ['Very dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very satisfied'];
        const appearLabel = appearLabels[parseInt(formData.appearance_acceptance)] || '—';
        const milLabels = ['Very difficult / Hostile', 'Strained', 'Neutral', 'Good', 'Excellent / Very supportive'];
        const milLabel = milLabels[parseInt(formData.mil_relationship)] || '—';
        const miscarriageLabel = formData.miscarriage === '1' ? 'Yes' : 'No';
        const genderPrefLabels = ['No preference', 'Mild preference', 'Strong preference (boy)'];
        const genderPrefLabel = genderPrefLabels[parseInt(formData.gender_preference)] || '—';
        const reportId = 'THDAT-' + Date.now().toString(36).toUpperCase();
        const reportDate = new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' });

        // Render results
        const container = document.getElementById('results-container');
        container.innerHTML = `
            <div class="result-header">
                <div class="risk-level ${riskClass}">${riskEmoji} ${riskLevel}</div>
                <div class="risk-score-ring">
                    <canvas id="risk-ring-canvas" width="200" height="200"></canvas>
                    <div class="risk-score-center">
                        <span class="risk-score-value" style="color: ${riskColor}">${result.riskScore}</span>
                        <span class="risk-score-label">Risk Score</span>
                    </div>
                </div>
                <p style="color: var(--text-secondary); font-size: 0.95rem; max-width: 500px; margin: 0 auto;">${riskAdvice}</p>
            </div>

            <div class="report-patient-summary">
                <h4><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-violet)" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> Patient Summary</h4>
                <div class="patient-summary-grid">
                    <div class="patient-info-chip"><span class="pic-label">Name</span><span class="pic-value">${patientName}</span></div>
                    <div class="patient-info-chip"><span class="pic-label">Age</span><span class="pic-value">${ageVal} years</span></div>
                    <div class="patient-info-chip"><span class="pic-label">Trimester</span><span class="pic-value">${trimesterLabel}</span></div>
                    <div class="patient-info-chip"><span class="pic-label">Gestational Age</span><span class="pic-value">${result.gestationalWeeks} weeks</span></div>
                    <div class="patient-info-chip"><span class="pic-label">Report ID</span><span class="pic-value" style="font-family:var(--font-display);font-size:0.8rem;">${reportId}</span></div>
                    <div class="patient-info-chip"><span class="pic-label">Date</span><span class="pic-value" style="font-size:0.8rem;">${reportDate}</span></div>
                </div>
            </div>

            <div class="domain-contributions">
                <h4 style="font-family: var(--font-display); font-size: 1rem; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-violet)" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
                    Domain Contributions (Trimester ${result.trimester} Modulated)
                </h4>
                <div class="domain-contrib-item">
                    <span class="domain-contrib-label" style="color: #818cf8;">Demographic</span>
                    <div class="domain-contrib-bar-wrap">
                        <div class="domain-contrib-bar" style="width: 0%; background: linear-gradient(90deg, #818cf8, #a78bfa);" data-width="${result.domainContributions.demographic}%"></div>
                    </div>
                    <span class="domain-contrib-pct" style="color: #818cf8;">${result.domainContributions.demographic}%</span>
                </div>
                <div class="domain-contrib-item">
                    <span class="domain-contrib-label" style="color: #f97316;">Obstetric</span>
                    <div class="domain-contrib-bar-wrap">
                        <div class="domain-contrib-bar" style="width: 0%; background: linear-gradient(90deg, #f97316, #fb923c);" data-width="${result.domainContributions.obstetric}%"></div>
                    </div>
                    <span class="domain-contrib-pct" style="color: #f97316;">${result.domainContributions.obstetric}%</span>
                </div>
                <div class="domain-contrib-item">
                    <span class="domain-contrib-label" style="color: #10b981;">Psychosocial</span>
                    <div class="domain-contrib-bar-wrap">
                        <div class="domain-contrib-bar" style="width: 0%; background: linear-gradient(90deg, #10b981, #34d399);" data-width="${result.domainContributions.psychosocial}%"></div>
                    </div>
                    <span class="domain-contrib-pct" style="color: #10b981;">${result.domainContributions.psychosocial}%</span>
                </div>
            </div>

            <div class="report-gate-weights">
                <div class="gate-weight-card" style="--gw-color: #818cf8;">
                    <div class="gw-ring" style="background: conic-gradient(#818cf8 0% ${result.gateWeights.demographic}%, rgba(255,255,255,0.06) ${result.gateWeights.demographic}% 100%);"><div class="gw-ring-inner">${result.gateWeights.demographic}%</div></div>
                    <span class="gw-label">Demographic Gate</span>
                    <span class="gw-sub">Score: ${result.domainScores.demographic}/100</span>
                </div>
                <div class="gate-weight-card" style="--gw-color: #f97316;">
                    <div class="gw-ring" style="background: conic-gradient(#f97316 0% ${result.gateWeights.obstetric}%, rgba(255,255,255,0.06) ${result.gateWeights.obstetric}% 100%);"><div class="gw-ring-inner">${result.gateWeights.obstetric}%</div></div>
                    <span class="gw-label">Obstetric Gate</span>
                    <span class="gw-sub">Score: ${result.domainScores.obstetric}/100</span>
                </div>
                <div class="gate-weight-card" style="--gw-color: #10b981;">
                    <div class="gw-ring" style="background: conic-gradient(#10b981 0% ${result.gateWeights.psychosocial}%, rgba(255,255,255,0.06) ${result.gateWeights.psychosocial}% 100%);"><div class="gw-ring-inner">${result.gateWeights.psychosocial}%</div></div>
                    <span class="gw-label">Psychosocial Gate</span>
                    <span class="gw-sub">Score: ${result.domainScores.psychosocial}/100</span>
                </div>
            </div>

            <div class="trimester-risk-card">
                <h4>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-violet)" stroke-width="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    ${result.trimester === 'T1' ? 'First' : result.trimester === 'T2' ? 'Second' : 'Third'} Trimester Risk Profile (${result.gestationalWeeks} weeks)
                </h4>
                <ul class="risk-factors-list">
                    ${trimesterFactors.map(f => `
                        <li>
                            <span class="risk-factor-icon">${f.icon}</span>
                            <span>${f.text}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="result-actions">
                <button class="btn btn-ghost" id="reset-form-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
                    New Assessment
                </button>
                <button class="btn btn-primary" id="print-results-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                    Print Report
                </button>
            </div>

            <div class="disclaimer-box">
                ⚠️ <strong>Clinical Disclaimer:</strong> This tool is for demonstration and research purposes only. It does not replace clinical assessment with validated instruments (EPDS/PHQ-9). The risk score is derived from a simplified simulation inspired by TH-DAT's domain-attention mechanism, not from the actual trained model weights. Consult a healthcare professional for clinical decisions.
            </div>
        `;

        // Go to step 4
        goToStep(4);

        // Animate the risk ring
        setTimeout(() => {
            drawRiskRing(result.riskScore, riskColor);

            // Animate domain bars
            document.querySelectorAll('.domain-contrib-bar[data-width]').forEach(bar => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.width;
                }, 100);
            });
        }, 300);

        // Reset button
        document.getElementById('reset-form-btn').addEventListener('click', () => {
            document.getElementById('screening-form').reset();
            trimesterValue.textContent = 'Enter gestational age';
            goToStep(1);
        });

        // Print button — generates standalone clinical report
        document.getElementById('print-results-btn').addEventListener('click', () => {
            generatePrintReport(result, riskLevel, riskClass, riskColor, riskAdvice, formData, {
                patientName, ageVal, femEduLabel, husEduLabel, workLabel, moneyLabel, familyLabel,
                trimesterLabel, physLabel, appearLabel, milLabel, miscarriageLabel, genderPrefLabel,
                reportId, reportDate, trimesterFactors
            });
        });
    }

    function drawRiskRing(score, color) {
        const canvas = document.getElementById('risk-ring-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const cx = 100, cy = 100, r = 80;
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (2 * Math.PI * score / 100);

        // Background ring
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 10;
        ctx.stroke();

        // Animated progress ring
        let currentAngle = startAngle;
        const animStep = (endAngle - startAngle) / 60;

        function animateRing() {
            currentAngle += animStep;
            if (currentAngle > endAngle) currentAngle = endAngle;

            ctx.clearRect(0, 0, 200, 200);

            // Background
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 10;
            ctx.stroke();

            // Progress
            ctx.beginPath();
            ctx.arc(cx, cy, r, startAngle, currentAngle);
            ctx.strokeStyle = color;
            ctx.lineWidth = 10;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Glow
            ctx.beginPath();
            ctx.arc(cx, cy, r, startAngle, currentAngle);
            ctx.strokeStyle = color;
            ctx.lineWidth = 14;
            ctx.lineCap = 'round';
            ctx.globalAlpha = 0.15;
            ctx.stroke();
            ctx.globalAlpha = 1;

            if (currentAngle < endAngle) {
                requestAnimationFrame(animateRing);
            }
        }

        animateRing();
    }

    // ============================================================
    // Performance Tabs
    // ============================================================
    const perfTabs = document.querySelectorAll('.perf-tab');
    const perfPanels = document.querySelectorAll('.perf-panel');

    perfTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            perfTabs.forEach(t => t.classList.remove('active'));
            perfPanels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');

            // Initialize charts when tab becomes visible
            if (tab.dataset.tab === 'comparison') initComparisonChart();
            if (tab.dataset.tab === 'ablation') initAblationChart();
        });
    });

    // ============================================================
    // Chart.js — Model Comparison
    // ============================================================
    let comparisonChartInstance = null;
    let ablationChartInstance = null;

    function initComparisonChart() {
        if (comparisonChartInstance) return;
        const canvas = document.getElementById('model-comparison-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        comparisonChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['TH-DAT', 'RF', 'TabTF', 'XGBoost', 'SAINT', 'FT-TF', 'ANN', 'AutoEnc', 'GPT-2', 'BERT', 'RoBERTa', 'T5'],
                datasets: [
                    {
                        label: 'AUC-ROC',
                        data: [0.9440, 0.9369, 0.8971, 0.8529, 0.7880, 0.7797, 0.7786, 0.7761, 0.6797, 0.6760, 0.6469, 0.5631],
                        backgroundColor: [
                            'rgba(167, 139, 250, 0.8)',
                            'rgba(129, 140, 248, 0.5)',
                            'rgba(129, 140, 248, 0.4)',
                            'rgba(129, 140, 248, 0.35)',
                            'rgba(129, 140, 248, 0.3)',
                            'rgba(129, 140, 248, 0.25)',
                            'rgba(129, 140, 248, 0.2)',
                            'rgba(129, 140, 248, 0.18)',
                            'rgba(239, 68, 68, 0.3)',
                            'rgba(239, 68, 68, 0.25)',
                            'rgba(239, 68, 68, 0.2)',
                            'rgba(239, 68, 68, 0.15)',
                        ],
                        borderColor: [
                            'rgba(167, 139, 250, 1)',
                            'rgba(129, 140, 248, 0.7)',
                            'rgba(129, 140, 248, 0.6)',
                            'rgba(129, 140, 248, 0.5)',
                            'rgba(129, 140, 248, 0.4)',
                            'rgba(129, 140, 248, 0.35)',
                            'rgba(129, 140, 248, 0.3)',
                            'rgba(129, 140, 248, 0.25)',
                            'rgba(239, 68, 68, 0.4)',
                            'rgba(239, 68, 68, 0.35)',
                            'rgba(239, 68, 68, 0.3)',
                            'rgba(239, 68, 68, 0.2)',
                        ],
                        borderWidth: 2,
                        borderRadius: 6,
                    },
                    {
                        label: 'F1-Score',
                        data: [0.9248, 0.8992, 0.8846, 0.8343, 0.7907, 0.7637, 0.7532, 0.7549, 0.6940, 0.6031, 0.6311, 0.6226],
                        backgroundColor: 'rgba(236, 72, 153, 0.3)',
                        borderColor: 'rgba(236, 72, 153, 0.7)',
                        borderWidth: 2,
                        borderRadius: 6,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#a0a0b8', font: { family: 'Inter', size: 12 } }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 17, 24, 0.95)',
                        titleColor: '#f0f0f5',
                        bodyColor: '#a0a0b8',
                        borderColor: 'rgba(167, 139, 250, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        padding: 12,
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#6b6b80', font: { family: 'Inter', size: 11 } },
                        grid: { color: 'rgba(255,255,255,0.03)' },
                    },
                    y: {
                        min: 0.4,
                        max: 1.0,
                        ticks: { color: '#6b6b80', font: { family: 'Inter', size: 11 } },
                        grid: { color: 'rgba(255,255,255,0.04)' },
                    }
                }
            }
        });
    }

    function initAblationChart() {
        if (ablationChartInstance) return;
        const canvas = document.getElementById('ablation-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ablationChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Full TH-DAT', 'w/o Skip\nConnection', 'w/o Trimester\nAttention', 'w/o Pretraining', 'w/o Gated\nFusion', 'w/o Domain\nGrouping'],
                datasets: [{
                    label: 'AUC-ROC',
                    data: [0.9440, 0.9244, 0.9293, 0.9294, 0.9380, 0.9401],
                    backgroundColor: [
                        'rgba(236, 72, 153, 0.7)',
                        'rgba(107, 107, 128, 0.4)',
                        'rgba(107, 107, 128, 0.4)',
                        'rgba(107, 107, 128, 0.4)',
                        'rgba(107, 107, 128, 0.4)',
                        'rgba(107, 107, 128, 0.4)',
                    ],
                    borderColor: [
                        'rgba(236, 72, 153, 1)',
                        'rgba(107, 107, 128, 0.6)',
                        'rgba(107, 107, 128, 0.6)',
                        'rgba(107, 107, 128, 0.6)',
                        'rgba(107, 107, 128, 0.6)',
                        'rgba(107, 107, 128, 0.6)',
                    ],
                    borderWidth: 2,
                    borderRadius: 6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(17, 17, 24, 0.95)',
                        titleColor: '#f0f0f5',
                        bodyColor: '#a0a0b8',
                        borderColor: 'rgba(167, 139, 250, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        padding: 12,
                        callbacks: {
                            label: (ctx) => {
                                const delta = ctx.raw - 0.9440;
                                return `AUC: ${ctx.raw.toFixed(4)} (${delta === 0 ? 'Full' : delta.toFixed(4)})`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        min: 0.90,
                        max: 0.95,
                        ticks: { color: '#6b6b80', font: { family: 'Inter', size: 11 } },
                        grid: { color: 'rgba(255,255,255,0.04)' },
                    },
                    y: {
                        ticks: { color: '#a0a0b8', font: { family: 'Inter', size: 12 } },
                        grid: { display: false },
                    }
                }
            }
        });
    }

    // Initialize comparison chart on load (it's the default active tab)
    setTimeout(initComparisonChart, 500);

    // ============================================================
    // Gate Weight Donut Chart
    // ============================================================
    function drawGateChart() {
        const canvas = document.getElementById('gate-chart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const cx = 140, cy = 140, outerR = 120, innerR = 75;

        const segments = [
            { value: 31.6, color: '#818cf8', label: 'Demo' },
            { value: 34.1, color: '#f97316', label: 'Obst' },
            { value: 34.3, color: '#10b981', label: 'Psych' },
        ];

        const total = segments.reduce((s, seg) => s + seg.value, 0);
        let startAngle = -Math.PI / 2;

        segments.forEach(seg => {
            const sliceAngle = (seg.value / total) * 2 * Math.PI;
            const endAngle = startAngle + sliceAngle;

            ctx.beginPath();
            ctx.arc(cx, cy, outerR, startAngle, endAngle);
            ctx.arc(cx, cy, innerR, endAngle, startAngle, true);
            ctx.closePath();
            ctx.fillStyle = seg.color;
            ctx.globalAlpha = 0.7;
            ctx.fill();
            ctx.globalAlpha = 1;

            // Label
            const midAngle = startAngle + sliceAngle / 2;
            const labelR = (outerR + innerR) / 2;
            const lx = cx + Math.cos(midAngle) * labelR;
            const ly = cy + Math.sin(midAngle) * labelR;

            ctx.fillStyle = '#fff';
            ctx.font = '600 12px "Space Grotesk", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${seg.value}%`, lx, ly);

            startAngle = endAngle;
        });

        // Center text
        ctx.fillStyle = '#f0f0f5';
        ctx.font = '700 16px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Gate', cx, cy - 8);
        ctx.fillStyle = '#6b6b80';
        ctx.font = '400 12px "Inter", sans-serif';
        ctx.fillText('Weights', cx, cy + 12);
    }

    const gateObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            drawGateChart();
            gateObserver.disconnect();
        }
    }, { threshold: 0.3 });

    const gateSection = document.querySelector('.gate-weights-section');
    if (gateSection) gateObserver.observe(gateSection);

    // ============================================================
    // Print Report Generator — Premium Clinical Document
    // ============================================================
    function generatePrintReport(result, riskLevel, riskClass, riskColor, riskAdvice, formData, labels) {
        const scoreArc = (result.riskScore / 100) * 283; // SVG circle circumference ≈ 2πr where r=45
        const riskBg = result.riskScore <= 30 ? '#e6f9f1' : result.riskScore <= 60 ? '#fef9e7' : '#fdeaea';
        const riskBorder = result.riskScore <= 30 ? '#10b981' : result.riskScore <= 60 ? '#f59e0b' : '#ef4444';

        const printDoc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>TH-DAT Screening Report — ${labels.patientName}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Inter',sans-serif;color:#1a1a2e;line-height:1.6;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.report{max-width:800px;margin:0 auto;padding:40px 48px;}

/* === HEADER === */
.report-header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:20px;border-bottom:3px solid #a78bfa;margin-bottom:28px;}
.header-left{display:flex;align-items:center;gap:14px;}
.header-logo{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#ec4899);display:flex;align-items:center;justify-content:center;}
.header-logo svg{width:28px;height:28px;}
.header-title{font-family:'Space Grotesk',sans-serif;font-size:1.6rem;font-weight:700;color:#1a1a2e;line-height:1.2;}
.header-subtitle{font-size:0.75rem;color:#6b6b80;letter-spacing:0.05em;text-transform:uppercase;margin-top:2px;}
.header-right{text-align:right;font-size:0.78rem;color:#6b6b80;line-height:1.9;}
.header-right strong{color:#1a1a2e;font-weight:600;}

/* === SECTION TITLES === */
.section-title{font-family:'Space Grotesk',sans-serif;font-size:1.05rem;font-weight:700;color:#1a1a2e;padding:8px 0 6px;border-bottom:2px solid #e5e7eb;margin:24px 0 14px;display:flex;align-items:center;gap:8px;}
.section-title .st-icon{width:22px;height:22px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;}

/* === RISK ASSESSMENT === */
.risk-banner{display:flex;align-items:center;gap:28px;padding:22px 28px;border-radius:14px;background:${riskBg};border:2px solid ${riskBorder};margin-bottom:20px;}
.risk-score-visual{position:relative;width:110px;height:110px;flex-shrink:0;}
.risk-score-visual svg{width:110px;height:110px;transform:rotate(-90deg);}
.risk-score-visual .bg-ring{fill:none;stroke:#e5e7eb;stroke-width:7;}
.risk-score-visual .fg-ring{fill:none;stroke:${riskColor};stroke-width:7;stroke-linecap:round;stroke-dasharray:283;stroke-dashoffset:${283 - scoreArc};transition:stroke-dashoffset 1s;}
.score-num{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;}
.score-num .big{font-family:'Space Grotesk',sans-serif;font-size:2rem;font-weight:800;color:${riskColor};line-height:1;}
.score-num .small{font-size:0.6rem;color:#6b6b80;text-transform:uppercase;letter-spacing:0.08em;}
.risk-info h3{font-family:'Space Grotesk',sans-serif;font-size:1.2rem;font-weight:700;color:${riskColor};margin-bottom:4px;}
.risk-info p{font-size:0.85rem;color:#4a4a5a;line-height:1.6;}

/* === PATIENT TABLE === */
.info-table{width:100%;border-collapse:collapse;margin-bottom:4px;}
.info-table td{padding:7px 12px;font-size:0.82rem;border:1px solid #e5e7eb;}
.info-table td:first-child{background:#f8f8fc;font-weight:600;color:#4a4a5a;width:38%;white-space:nowrap;}
.info-table td:nth-child(2){color:#1a1a2e;}

/* === DOMAIN BARS === */
.domain-row{display:flex;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid #f0f0f5;}
.domain-row:last-child{border-bottom:none;}
.domain-label{width:120px;font-weight:600;font-size:0.82rem;}
.domain-bar-track{flex:1;height:14px;background:#f0f0f5;border-radius:8px;overflow:hidden;position:relative;}
.domain-bar-fill{height:100%;border-radius:8px;}
.domain-pct{width:48px;text-align:right;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.88rem;}

/* === GATE WEIGHTS === */
.gate-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:10px;}
.gate-card{text-align:center;padding:16px 10px;border-radius:12px;border:1px solid #e5e7eb;background:#fafafe;}
.gate-card .gc-val{font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:800;line-height:1;}
.gate-card .gc-label{display:block;font-size:0.72rem;color:#6b6b80;margin-top:4px;text-transform:uppercase;letter-spacing:0.04em;}
.gate-card .gc-score{display:block;font-size:0.75rem;color:#9b9bb0;margin-top:2px;}

/* === TRIMESTER FACTORS === */
.factor-list{list-style:none;margin:0;padding:0;}
.factor-list li{padding:7px 0;font-size:0.82rem;color:#4a4a5a;display:flex;align-items:flex-start;gap:8px;border-bottom:1px solid #f0f0f5;}
.factor-list li:last-child{border-bottom:none;}
.factor-icon{font-size:0.85rem;line-height:1.4;}

/* === RECOMMENDATIONS === */
.rec-box{padding:14px 18px;border-radius:10px;background:#f0eeff;border-left:4px solid #a78bfa;margin-top:10px;}
.rec-box p{font-size:0.82rem;color:#3a3a5a;line-height:1.7;}
.rec-box ul{margin:8px 0 0 18px;font-size:0.82rem;color:#3a3a5a;line-height:1.9;}

/* === FOOTER === */
.report-footer{margin-top:32px;padding-top:16px;border-top:2px solid #e5e7eb;}
.disclaimer-print{padding:12px 16px;border-radius:8px;background:#fffbeb;border:1px solid #fcd34d;font-size:0.72rem;color:#92400e;line-height:1.7;margin-bottom:12px;}
.footer-row{display:flex;justify-content:space-between;align-items:center;font-size:0.68rem;color:#9b9bb0;padding-top:8px;}
.footer-row .copyright{font-weight:500;}

/* === PRINT TWEAKS === */
@media print{
    body{background:#fff !important;}
    .report{padding:20px 24px;}
    .risk-banner{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    .domain-bar-fill{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    .gate-card{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    @page{size:A4;margin:12mm 10mm;}
}
</style>
</head>
<body>
<div class="report">

    <!-- HEADER -->
    <div class="report-header">
        <div class="header-left">
            <div class="header-logo">
                <svg viewBox="0 0 32 32" fill="none"><path d="M10 16 C10 12, 16 8, 16 16 C16 8, 22 12, 22 16 C22 22, 16 26, 16 26 C16 26, 10 22, 10 16Z" fill="white" opacity="0.95"/></svg>
            </div>
            <div>
                <div class="header-title">TH-DAT Screening Report</div>
                <div class="header-subtitle">Trimester-Aware Antenatal Depression Assessment</div>
            </div>
        </div>
        <div class="header-right">
            <strong>Report ID:</strong> ${labels.reportId}<br>
            <strong>Generated:</strong> ${labels.reportDate}<br>
            <strong>Institution:</strong> VIT-AP University
        </div>
    </div>

    <!-- RISK ASSESSMENT -->
    <div class="section-title"><span class="st-icon">🎯</span> Risk Assessment</div>
    <div class="risk-banner">
        <div class="risk-score-visual">
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" class="bg-ring"/>
                <circle cx="50" cy="50" r="45" class="fg-ring"/>
            </svg>
            <div class="score-num">
                <div class="big">${result.riskScore}</div>
                <div class="small">Risk Score</div>
            </div>
        </div>
        <div class="risk-info">
            <h3>${riskLevel}</h3>
            <p>${riskAdvice}</p>
        </div>
    </div>

    <!-- PATIENT INFO -->
    <div class="section-title"><span class="st-icon">👤</span> Patient Information</div>
    <table class="info-table">
        <tr><td>Patient Name</td><td>${labels.patientName}</td></tr>
        <tr><td>Age</td><td>${labels.ageVal} years</td></tr>
        <tr><td>Gestational Age</td><td>${result.gestationalWeeks} weeks (${labels.trimesterLabel})</td></tr>
        <tr><td>Education (Patient)</td><td>${labels.femEduLabel}</td></tr>
        <tr><td>Education (Spouse)</td><td>${labels.husEduLabel}</td></tr>
        <tr><td>Employment</td><td>${labels.workLabel}</td></tr>
        <tr><td>Financial Status</td><td>${labels.moneyLabel}</td></tr>
        <tr><td>Family Type</td><td>${labels.familyLabel}</td></tr>
        <tr><td>Gravida</td><td>${formData.gravida} (Sons: ${formData.num_sons}, Daughters: ${formData.num_daughters})</td></tr>
        <tr><td>Miscarriage History</td><td>${labels.miscarriageLabel}</td></tr>
        <tr><td>Gender Preference</td><td>${labels.genderPrefLabel}</td></tr>
        <tr><td>Physical Health</td><td>${labels.physLabel}</td></tr>
        <tr><td>Appearance Acceptance</td><td>${labels.appearLabel}</td></tr>
        <tr><td>Mother-in-Law Relationship</td><td>${labels.milLabel}</td></tr>
    </table>

    <!-- DOMAIN ANALYSIS -->
    <div class="section-title"><span class="st-icon">📊</span> Domain Contribution Analysis</div>
    <div class="domain-row">
        <span class="domain-label" style="color:#6366f1;">Demographic</span>
        <div class="domain-bar-track"><div class="domain-bar-fill" style="width:${result.domainContributions.demographic}%;background:linear-gradient(90deg,#818cf8,#a78bfa);"></div></div>
        <span class="domain-pct" style="color:#6366f1;">${result.domainContributions.demographic}%</span>
    </div>
    <div class="domain-row">
        <span class="domain-label" style="color:#ea580c;">Obstetric</span>
        <div class="domain-bar-track"><div class="domain-bar-fill" style="width:${result.domainContributions.obstetric}%;background:linear-gradient(90deg,#f97316,#fb923c);"></div></div>
        <span class="domain-pct" style="color:#ea580c;">${result.domainContributions.obstetric}%</span>
    </div>
    <div class="domain-row">
        <span class="domain-label" style="color:#059669;">Psychosocial</span>
        <div class="domain-bar-track"><div class="domain-bar-fill" style="width:${result.domainContributions.psychosocial}%;background:linear-gradient(90deg,#10b981,#34d399);"></div></div>
        <span class="domain-pct" style="color:#059669;">${result.domainContributions.psychosocial}%</span>
    </div>

    <!-- GATE WEIGHTS -->
    <div class="section-title"><span class="st-icon">⚙️</span> Domain Gate Weights (${result.trimester} Modulated)</div>
    <div class="gate-grid">
        <div class="gate-card">
            <div class="gc-val" style="color:#6366f1;">${result.gateWeights.demographic}%</div>
            <span class="gc-label">Demographic</span>
            <span class="gc-score">Domain Score: ${result.domainScores.demographic}/100</span>
        </div>
        <div class="gate-card">
            <div class="gc-val" style="color:#ea580c;">${result.gateWeights.obstetric}%</div>
            <span class="gc-label">Obstetric</span>
            <span class="gc-score">Domain Score: ${result.domainScores.obstetric}/100</span>
        </div>
        <div class="gate-card">
            <div class="gc-val" style="color:#059669;">${result.gateWeights.psychosocial}%</div>
            <span class="gc-label">Psychosocial</span>
            <span class="gc-score">Domain Score: ${result.domainScores.psychosocial}/100</span>
        </div>
    </div>

    <!-- TRIMESTER FACTORS -->
    <div class="section-title"><span class="st-icon">🗓️</span> ${result.trimester === 'T1' ? 'First' : result.trimester === 'T2' ? 'Second' : 'Third'} Trimester Risk Factors</div>
    <ul class="factor-list">
        ${labels.trimesterFactors.map(f => `<li><span class="factor-icon">${f.icon}</span><span>${f.text}</span></li>`).join('')}
    </ul>

    <!-- RECOMMENDATIONS -->
    <div class="section-title"><span class="st-icon">💡</span> Clinical Recommendations</div>
    <div class="rec-box">
        ${result.riskScore <= 30 ? `
        <p><strong>Low Risk — Routine Monitoring:</strong></p>
        <ul>
            <li>Continue standard antenatal care schedule</li>
            <li>Encourage open communication about emotional wellbeing</li>
            <li>Re-screen at each trimester transition</li>
            <li>Provide psychoeducation on antenatal mood changes</li>
        </ul>
        ` : result.riskScore <= 60 ? `
        <p><strong>Moderate Risk — Enhanced Monitoring:</strong></p>
        <ul>
            <li>Administer validated screening instrument (EPDS or PHQ-9) for clinical confirmation</li>
            <li>Schedule follow-up assessment within 2–4 weeks</li>
            <li>Assess social support system and strengthen where possible</li>
            <li>Consider referral to psychosocial counseling services</li>
            <li>Monitor for symptom progression at each visit</li>
        </ul>
        ` : `
        <p><strong>High Risk — Urgent Referral Recommended:</strong></p>
        <ul>
            <li>Immediate clinical assessment with validated instrument (EPDS/PHQ-9)</li>
            <li>Priority referral to mental health specialist or perinatal psychiatrist</li>
            <li>Assess for suicidal ideation and safety planning</li>
            <li>Consider integrated care approach (obstetric + psychiatric)</li>
            <li>Increase prenatal visit frequency for close monitoring</li>
            <li>Involve support network (family, community health workers)</li>
        </ul>
        `}
    </div>

    <!-- FOOTER -->
    <div class="report-footer">
        <div class="disclaimer-print">
            ⚠️ <strong>Important Disclaimer:</strong> This screening report is generated by TH-DAT (Trimester-Aware Hierarchical Domain-Attention Transformer), a demonstration tool for research purposes only. It does NOT constitute a clinical diagnosis and should NEVER replace professional medical assessment with validated instruments (EPDS/PHQ-9). The risk scores use a simplified simulation of the TH-DAT architecture, not actual trained model weights. All clinical decisions must be made by qualified healthcare professionals.
        </div>
        <div class="footer-row">
            <span class="copyright">© ${new Date().getFullYear()} Saivenkat H — VIT-AP University. All Rights Reserved.</span>
            <span>Report ID: ${labels.reportId} | Generated: ${labels.reportDate}</span>
        </div>
    </div>

</div>
</body>
</html>`;

        const printWin = window.open('', '_blank', 'width=900,height=1100');
        printWin.document.write(printDoc);
        printWin.document.close();
        setTimeout(() => {
            printWin.focus();
            printWin.print();
        }, 600);
    }

    // ============================================================
    // Smooth scroll for all anchor links
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
