/* ============================================================
   TH-DAT Screening Website — Application Logic + Cinematic FX
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

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
    // CINEMATIC: Parallax Scroll on Orbs
    // ============================================================
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelectorAll('.orb').forEach((orb, i) => {
            const speed = 0.02 + (i * 0.01);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
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

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167, 139, 250, ${p.alpha})`;
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
                    ctx.strokeStyle = `rgba(167, 139, 250, ${0.06 * (1 - dist / 150)})`;
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

    // Calculate button handler
    document.getElementById('calculate-btn').addEventListener('click', () => {
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

            <div class="domain-contributions">
                <h4 style="font-family: var(--font-display); font-size: 1rem; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-violet)" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
                    Domain Contributions (Trimester ${result.trimester} Modulated)
                </h4>
                <div class="domain-contrib-item">
                    <span class="domain-contrib-label" style="color: #818cf8;">Demographic</span>
                    <div class="domain-contrib-bar-wrap">
                        <div class="domain-contrib-bar" style="width: 0%; background: #818cf8;" data-width="${result.domainContributions.demographic}%"></div>
                    </div>
                    <span class="domain-contrib-pct" style="color: #818cf8;">${result.domainContributions.demographic}%</span>
                </div>
                <div class="domain-contrib-item">
                    <span class="domain-contrib-label" style="color: #f97316;">Obstetric</span>
                    <div class="domain-contrib-bar-wrap">
                        <div class="domain-contrib-bar" style="width: 0%; background: #f97316;" data-width="${result.domainContributions.obstetric}%"></div>
                    </div>
                    <span class="domain-contrib-pct" style="color: #f97316;">${result.domainContributions.obstetric}%</span>
                </div>
                <div class="domain-contrib-item">
                    <span class="domain-contrib-label" style="color: #10b981;">Psychosocial</span>
                    <div class="domain-contrib-bar-wrap">
                        <div class="domain-contrib-bar" style="width: 0%; background: #10b981;" data-width="${result.domainContributions.psychosocial}%"></div>
                    </div>
                    <span class="domain-contrib-pct" style="color: #10b981;">${result.domainContributions.psychosocial}%</span>
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

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 24px;">
                <div style="text-align: center; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px;">
                    <span style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: #818cf8; display: block;">${result.gateWeights.demographic}%</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">Demo Gate</span>
                </div>
                <div style="text-align: center; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px;">
                    <span style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: #f97316; display: block;">${result.gateWeights.obstetric}%</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">Obst Gate</span>
                </div>
                <div style="text-align: center; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px;">
                    <span style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: #10b981; display: block;">${result.gateWeights.psychosocial}%</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">Psych Gate</span>
                </div>
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

        // Print button
        document.getElementById('print-results-btn').addEventListener('click', () => {
            window.print();
        });
    });

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
