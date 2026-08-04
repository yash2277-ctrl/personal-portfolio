/* ========================================
   KARTIK SAHU — PORTFOLIO v6
   Script: Loader, GSAP Animations,
   Three.js Wormhole, Scroll Effects
   ======================================== */

(() => {
    'use strict';

    function bootstrapWithoutGsap() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'none';
        }

        const nav = document.getElementById('mainNav');
        if (nav) {
            nav.classList.add('visible');
        }

        document.querySelectorAll('.hero-tag, .hero-name-line, .hero-sub, .hero-cta, .hero-scroll-hint').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });

        document.querySelectorAll('.timeline-item').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });

        document.querySelectorAll('.nav-links a, .hero-cta').forEach((link) => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (!href || !href.startsWith('#')) return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    // ======== MOBILE NAV (hamburger drawer) ========
    function initMobileNav() {
        const toggle = document.getElementById('navToggle');
        const drawer = document.getElementById('navLinks');
        const backdrop = document.getElementById('navBackdrop');
        if (!toggle || !drawer) return;

        const close = () => {
            document.body.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open menu');
        };
        const open = () => {
            document.body.classList.add('nav-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Close menu');
        };

        toggle.addEventListener('click', () => {
            document.body.classList.contains('nav-open') ? close() : open();
        });
        if (backdrop) backdrop.addEventListener('click', close);
        drawer.querySelectorAll('a, button').forEach(el => el.addEventListener('click', close));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
        window.addEventListener('resize', () => { if (window.innerWidth > 768) close(); });
    }
    initMobileNav();

    // ======== RESUME MODAL ========
    function initResumeModal() {
        const modal = document.getElementById('resumeModal');
        if (!modal) return;
        const openBtns = document.querySelectorAll('.open-resume-btn');
        const closeBtn = modal.querySelector('.resume-modal-close');
        const overlay = modal.querySelector('.resume-modal-overlay');
        const printBtn = modal.querySelector('.resume-print-btn');
        let lastFocus = null;

        const open = () => {
            lastFocus = document.activeElement;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (closeBtn) closeBtn.focus();
        };
        const close = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (lastFocus && lastFocus.focus) lastFocus.focus();
        };

        openBtns.forEach(b => b.addEventListener('click', open));
        if (closeBtn) closeBtn.addEventListener('click', close);
        if (overlay) overlay.addEventListener('click', close);
        if (printBtn) printBtn.addEventListener('click', () => window.print());
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal.classList.contains('active')) close();
        });
    }
    initResumeModal();

    // ======== GSAP SETUP ========
    const hasGsap = typeof window.gsap !== 'undefined';
    const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
    const hasScrollToPlugin = typeof window.ScrollToPlugin !== 'undefined';

    if (!hasGsap || !hasScrollTrigger) {
        console.warn('GSAP or ScrollTrigger failed to load. Running fallback mode.');
        bootstrapWithoutGsap();
        return;
    }

    gsap.registerPlugin(ScrollTrigger);
    if (hasScrollToPlugin) {
        gsap.registerPlugin(ScrollToPlugin);
    }

    // ======== LOADER ========
    const loader = document.getElementById('loader');
    const loaderLines = document.querySelectorAll('.loader-line');
    const loaderBarFill = document.querySelector('.loader-bar-fill');
    const loaderPercent = document.querySelector('.loader-percent');

    const loaderTL = gsap.timeline();
    loaderTL
        .to(loaderLines[0], { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3)
        .to(loaderLines[1], { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6)
        .to(loaderBarFill, {
            width: '100%', duration: 2.5, ease: 'power2.inOut',
            onUpdate: function() {
                const p = Math.round(this.progress() * 100);
                loaderPercent.textContent = p + '%';
            }
        }, 0.8)
        .to(loader, { opacity: 0, duration: 0.6, ease: 'power2.in', delay: 0.3 })
        .set(loader, { display: 'none' })
        .call(heroEntrance);

    // ======== HERO ENTRANCE ========
    function heroEntrance() {
        const tl = gsap.timeline();
        tl
            .to('.hero-tag', { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0)
            .to('.hero-name-line', {
                opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.15
            }, 0.2)
            .to('.hero-sub', { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.8)
            .to('.hero-cta', { opacity: 1, duration: 0.8, ease: 'power2.out' }, 1.0)
            .to('.hero-scroll-hint', { opacity: 0.6, duration: 0.8, ease: 'power2.out' }, 1.2);
    }

    // ======== NAV SHOW/HIDE ========
    const nav = document.getElementById('mainNav');
    ScrollTrigger.create({
        trigger: '#hero',
        start: 'bottom top',
        onEnter: () => nav.classList.add('visible'),
        onLeaveBack: () => nav.classList.remove('visible'),
    });

    // ======== SCROLL PROGRESS (rAF-throttled, transform-only) ========
    const progressBar = document.querySelector('.scroll-progress-bar');
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const total = document.documentElement.scrollHeight - window.innerHeight;
                const ratio = total > 0 ? scrolled / total : 0;
                progressBar.style.transform = 'scaleX(' + ratio + ')';
                scrollTicking = false;
            });
        }
    }, { passive: true });

    // ======== SMOOTH NAV LINKS ========
    document.querySelectorAll('.nav-links a, .hero-cta').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                if (hasScrollToPlugin) {
                    gsap.to(window, { scrollTo: { y: href, offsetY: 80 }, duration: 1, ease: 'power3.inOut' });
                } else {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        });
    });

    // ======== LAZY VIDEO PLAY/PAUSE (huge GPU savings) ========
    const lazyVideos = document.querySelectorAll('video[data-lazy-video]');
    if (lazyVideos.length) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { rootMargin: '200px 0px' });
        lazyVideos.forEach(v => videoObserver.observe(v));
    }

    // ======== STATEMENT WORD-BY-WORD REVEAL ========
    const statementEl = document.querySelector('.statement-text');
    if (statementEl) {
        function wrapWordsInNode(node, isStrong) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent || '';
                const frag = document.createDocumentFragment();
                const parts = text.split(/(\s+)/);

                parts.forEach((part) => {
                    if (!part) return;
                    if (/^\s+$/.test(part)) {
                        frag.appendChild(document.createTextNode(part));
                    } else {
                        const span = document.createElement('span');
                        span.className = isStrong ? 'word strong-word' : 'word';
                        span.textContent = part;
                        frag.appendChild(span);
                    }
                });

                return frag;
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node;
                const nextIsStrong = isStrong || el.tagName === 'STRONG';
                const clone = el.cloneNode(false);
                Array.from(el.childNodes).forEach((child) => {
                    clone.appendChild(wrapWordsInNode(child, nextIsStrong));
                });
                return clone;
            }

            return document.createTextNode('');
        }

        const rebuilt = document.createDocumentFragment();
        Array.from(statementEl.childNodes).forEach((child) => {
            rebuilt.appendChild(wrapWordsInNode(child, false));
        });
        statementEl.innerHTML = '';
        statementEl.appendChild(rebuilt);

        // Use ScrollTrigger.batch instead of one trigger per word
        const words = statementEl.querySelectorAll('.word');
        ScrollTrigger.batch(words, {
            start: 'top 80%',
            onEnter: batch => {
                gsap.to(batch, {
                    color: (i, el) => el.classList.contains('strong-word') ? '#ffffff' : '#a0b4d0',
                    duration: 0.3,
                    stagger: 0.03,
                    ease: 'power2.out',
                    overwrite: true
                });
            }
        });
    }

    // ======== HORIZONTAL SCROLL PROJECTS & 3D TILT ========
    const projectsWrapper = document.querySelector('.projects-grid');
    if (projectsWrapper) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => {
            const getScrollAmount = () => projectsWrapper.scrollWidth - window.innerWidth + 120;
            if (getScrollAmount() <= 0) return;   // few cards: nothing to pin

            const tween = gsap.to(projectsWrapper, { x: () => -getScrollAmount(), ease: 'none' });
            ScrollTrigger.create({
                trigger: '#projects',
                start: 'top top',
                end: () => `+=${getScrollAmount()}`,
                pin: true,
                animation: tween,
                scrub: 1,
                invalidateOnRefresh: true
            });
        });

        // 3D tilt (pointer devices only)
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
                    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
                    card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`;
                    card.style.zIndex = 10;
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
                    card.style.zIndex = 1;
                });
            });
        }
    }

    // ======== PROJECT CARD REVEALS (mobile / tablet) ========
    gsap.matchMedia().add('(max-width: 1023px)', () => {
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 90%' },
                opacity: 0, y: 30, duration: 0.7, delay: i * 0.08, ease: 'power3.out'
            });
        });
    });

    // ======== SECTION HEADERS REVEAL ========
    gsap.utils.toArray('.section-header, .section-tag, .section-title').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 85%' },
            opacity: 0, y: 30, duration: 0.8, ease: 'power3.out'
        });
    });

    // ======== VIDEO DIVIDER TEXT ENTRANCE (parallax removed for 120fps) ========
    gsap.utils.toArray('.video-divider, .video-cta').forEach(section => {
        const text = section.querySelector('.video-divider-text, .video-cta-content');
        if (text) {
            gsap.from(text, {
                scrollTrigger: { trigger: section, start: 'top 60%' },
                opacity: 0, y: 40, duration: 1, ease: 'power3.out'
            });
        }
    });

    // ======== TIMELINE REVEALS ========
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: { trigger: item, start: 'top 80%' },
            opacity: 1, x: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out'
        });
    });

    // ======== STAT COUNTERS ========
    gsap.utils.toArray('.stat-number').forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        ScrollTrigger.create({
            trigger: num,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(num, {
                    innerText: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerText: 1 },
                    onUpdate: function() {
                        num.textContent = Math.round(gsap.getProperty(num, 'innerText'));
                    }
                });
            }
        });
    });

    // ======== SKILL ITEMS ========
    gsap.utils.toArray('.skill-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: 'top 90%' },
            opacity: 0, y: 20, scale: 0.95, duration: 0.5, delay: i * 0.05, ease: 'power3.out'
        });
    });

    // ======== ABOUT SECTION ========
    gsap.from('.about-left', {
        scrollTrigger: { trigger: '#about', start: 'top 70%' },
        opacity: 0, x: -40, duration: 1, ease: 'power3.out'
    });
    gsap.from('.about-right', {
        scrollTrigger: { trigger: '#about', start: 'top 70%' },
        opacity: 0, x: 40, duration: 1, ease: 'power3.out'
    });

    // ======== CONTACT FORM ========
    const form = document.getElementById('contactForm');
    if (form) {
        gsap.from('.contact-form', {
            scrollTrigger: { trigger: '#contact', start: 'top 70%' },
            opacity: 0, y: 30, duration: 0.8, ease: 'power3.out'
        });
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            btn.textContent = 'Transmission Sent ✓';
            btn.style.background = '#00ff88';
            setTimeout(() => {
                btn.innerHTML = 'Send Transmission <span>→</span>';
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

    // ======== =============================== ========
    // ======== THREE.JS - CINEMATIC LIQUID NEBULA ========
const canvas = document.getElementById('threejs-canvas');
if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x010103);
    scene.fog = new THREE.FogExp2(0x010103, 0.002);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 30, 200);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // High-end fluid particle network (60,000 particles)
    const PARTICLE_COUNT = 60000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);

    const color1 = new THREE.Color(0x00d2ff); // Bright Cyan
    const color2 = new THREE.Color(0x3a7bd5); // Deep Blue
    const color3 = new THREE.Color(0xff4b2b); // Subtle Warm Highlight

    for(let i = 0; i < PARTICLE_COUNT; i++) {
        // Organic dense disc distribution
        const radius = 5 + Math.random() * 280;
        const angle = Math.random() * Math.PI * 2;
        const heightDev = (Math.random() - 0.5) * 15 * (Math.max(1, radius/50));

        positions[i*3] = Math.cos(angle) * radius;
        positions[i*3+1] = heightDev;
        positions[i*3+2] = Math.sin(angle) * radius;

        scales[i] = Math.random();

        // Elegant gradient spread
        let c = new THREE.Color();
        let mixRatio = Math.random();
        if (radius < 60) {
            c.lerpColors(color3, color1, mixRatio);
        } else {
            c.lerpColors(color1, color2, mixRatio);
        }
        
        // Add random intensity variation
        c.lerp(new THREE.Color(0xffffff), Math.random() * 0.2);

        colors[i*3] = c.r;
        colors[i*3+1] = c.g;
        colors[i*3+2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            pixelRatio: { value: renderer.getPixelRatio() },
            mouse3D: { value: new THREE.Vector3(0,0,0) }
        },
        vertexShader: `
            uniform float time;
            uniform float pixelRatio;
            uniform vec3 mouse3D;
            attribute float aScale;
            varying vec3 vColor;

            // Simplex 3D Noise directly in GLSL
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

            float snoise(vec3 v) {
                const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

                vec3 i  = floor(v + dot(v, C.yyy) );
                vec3 x0 = v - i + dot(i, C.xxx) ;

                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min( g.xyz, l.zxy );
                vec3 i2 = max( g.xyz, l.zxy );

                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;

                i = mod289(i);
                vec4 p = permute( permute( permute(
                             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

                float n_ = 0.142857142857; // 1.0/7.0
                vec3  ns = n_ * D.wyz - D.xzx;

                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_ );

                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);

                vec4 b0 = vec4( x.xy, y.xy );
                vec4 b1 = vec4( x.zw, y.zw );

                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));

                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

                vec3 p0 = vec3(a0.xy,h.x);
                vec3 p1 = vec3(a0.zw,h.y);
                vec3 p2 = vec3(a1.xy,h.z);
                vec3 p3 = vec3(a1.zw,h.w);

                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;

                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
            }

            void main() {
                vColor = color;
                vec3 pos = position;

                // Flowing Nebula Simplex Noise Deformation
                float noiseScale = 0.018;
                float timeScale = time * 0.15;
                
                float n1 = snoise(vec3(pos.x * noiseScale, pos.y * noiseScale + timeScale, pos.z * noiseScale));
                float n2 = snoise(vec3(pos.x * noiseScale + 100.0, pos.y * noiseScale, pos.z * noiseScale + timeScale));
                
                pos.y += n1 * 18.0;
                pos.x += n2 * 18.0;
                pos.z += (n1 * n2) * 15.0;

                // Mouse Shockwave Force
                float distToMouse = distance(pos, mouse3D);
                if (distToMouse < 60.0) {
                    vec3 dir = normalize(pos - mouse3D);
                    float force = pow((60.0 - distToMouse) / 60.0, 2.0); // Smooth falloff
                    pos += dir * force * 15.0; // Pushes particles smoothly
                }

                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

                // High-fidelity sizing
                gl_PointSize = (aScale * 3.5 + 1.0) * pixelRatio * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;
                // Soft elegant blur for realistic light
                float alpha = pow(1.0 - (dist * 2.0), 1.5);
                gl_FragColor = vec4(vColor, alpha * 0.7);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true
    });

    const particleMesh = new THREE.Points(geometry, material);
    particleMesh.rotation.x = 0.4;
    scene.add(particleMesh);

    // Deep background glow to anchor the nebula
    const glowGeo = new THREE.SphereGeometry(40, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        transparent: true,
        opacity: 0.04,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // Subtle Interaction
    let targetHoverX = 0;
    let targetHoverY = 0;
    const currentMouse = new THREE.Vector3(0,0,0);

    document.addEventListener('mousemove', (e) => {
        targetHoverX = (e.clientX / window.innerWidth) * 2 - 1;
        targetHoverY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    let threeVisible = true;
    const ob = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(e => {
        threeVisible = e[0].isIntersecting;
    }) : null;
    const section = document.getElementById('threejs-section') || canvas;
    if (ob && section) ob.observe(section);

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        if (!threeVisible) return;

        const t = clock.getElapsedTime();
        material.uniforms.time.value = t;

        // Very slow, majestic rotation
        particleMesh.rotation.y = t * 0.04;

        // Cinematic Parallax tracking
        camera.position.x += (targetHoverX * 70 - camera.position.x) * 0.03;
        camera.position.y += (targetHoverY * 40 + 30 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        // Project mouse to 3D space for the shader repulsion
        currentMouse.x += (targetHoverX * 120 - currentMouse.x) * 0.1;
        currentMouse.z += (-targetHoverY * 80 - currentMouse.z) * 0.1;
        currentMouse.y = Math.sin(t)*10;
        material.uniforms.mouse3D.value.copy(currentMouse);

        glow.scale.setScalar(1.0 + Math.sin(t * 1.5) * 0.1);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (material.uniforms.pixelRatio) {
            material.uniforms.pixelRatio.value = renderer.getPixelRatio();
        }
    });
}
})();