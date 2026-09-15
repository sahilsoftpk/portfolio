/**
 * SAHIL SOFT — 3D E-COMMERCE ACCELERATION ENGINE
 * Sahil Gulfam — Full-Service 3D WebGL Infrastructure
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Register GSAP ScrollTrigger
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Initialize Core Systems
  initThreeDScene();
  initHeroPortraitParallax();
  init3DCardTilt();
  initNavbarMorph();
  initSharedChrome();
  initMobileMenu();
  initHeroResponsiveComposition();
  initHeroEntrance();
  initDiagnosticShuffler();
  initTelemetryTypewriter();
  initCursorScheduler();
  initManifestoParallax();
  initFeedbackDialog();
  initInventoryTerms();
});

/* ===========================================================================
   MOBILE HERO COMPOSITION
   Keeps the portrait badges in their desktop positions, while placing the
   wide workflow card below the portrait on phone screens.
   ========================================================================== */
function initHeroResponsiveComposition() {
  const workflow = document.querySelector('.hero-ai-workflow');
  const anchor = document.getElementById('hero-workflow-anchor');
  const portraitColumn = document.querySelector('#hero .lg\\:col-span-5');
  if (!workflow || !anchor || !portraitColumn) return;

  const mobileLayout = window.matchMedia('(max-width: 767px)');
  const updateLayout = () => {
    if (mobileLayout.matches) portraitColumn.append(workflow);
    else anchor.after(workflow);
  };

  updateLayout();
  mobileLayout.addEventListener('change', updateLayout);
}

/* ==========================================================================
   1. THREE.JS 3D WEBGL HOLOGRAPHIC LOGISTICS ENGINE
   ========================================================================== */
function initThreeDScene() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;
  const isMobileViewport = () => window.matchMedia('(max-width: 767px)').matches;
  const getPixelRatio = () => Math.min(window.devicePixelRatio, isMobileViewport() ? 1.25 : 2);

  // Scene setup with atmospheric depth
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0D0D12, 0.022);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 32);

  // Renderer setup with high DPI and alpha transparency
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(getPixelRatio());
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambientLight);

  // Golden Champagne Point Light (Orbiting)
  const goldLight = new THREE.PointLight(0xC9A84C, 2.8, 80);
  goldLight.position.set(16, 14, 12);
  scene.add(goldLight);

  // Emerald Hub Beacon Light
  const emeraldLight = new THREE.PointLight(0x10B981, 2.0, 60);
  emeraldLight.position.set(-16, -10, 10);
  scene.add(emeraldLight);

  // ------------------------------------------------------------------------
  // A. 3D Holographic Logistics Globe Group
  // ------------------------------------------------------------------------
  const globeGroup = new THREE.Group();
  globeGroup.position.set(11, 1.5, -4);
  scene.add(globeGroup);

  function updateGlobePosition() {
    if (window.innerWidth < 1024) {
      globeGroup.position.set(0, 2, -10);
      globeGroup.scale.set(0.7, 0.7, 0.7);
    } else {
      globeGroup.position.set(11, 1.5, -4);
      globeGroup.scale.set(1, 1, 1);
    }
  }
  updateGlobePosition();

  // Outer Geodesic Wireframe Sphere
  const outerSphereGeo = new THREE.IcosahedronGeometry(7.5, 2);
  const outerSphereMat = new THREE.MeshStandardMaterial({
    color: 0xC9A84C,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    roughness: 0.2,
    metalness: 0.85
  });
  const outerSphere = new THREE.Mesh(outerSphereGeo, outerSphereMat);
  globeGroup.add(outerSphere);

  // Inner Translucent Core
  const innerSphereGeo = new THREE.IcosahedronGeometry(5.0, 1);
  const innerSphereMat = new THREE.MeshStandardMaterial({
    color: 0xE8CE84,
    transparent: true,
    opacity: 0.16,
    roughness: 0.1,
    metalness: 0.9
  });
  const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
  globeGroup.add(innerSphere);

  // Central Glowing Energy Seed
  const coreGeo = new THREE.SphereGeometry(1.8, 16, 16);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xC9A84C,
    wireframe: true,
    transparent: true,
    opacity: 0.55
  });
  const coreSeed = new THREE.Mesh(coreGeo, coreMat);
  globeGroup.add(coreSeed);

  // Glowing Hub Nodes on Globe (USA Node and UK Node)
  const hubMatUSA = new THREE.MeshBasicMaterial({ color: 0x10B981 });
  const hubMatUK = new THREE.MeshBasicMaterial({ color: 0x60A5FA });

  const usaBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 12), hubMatUSA);
  usaBeacon.position.set(4.8, 3.4, 4.0);
  globeGroup.add(usaBeacon);

  const ukBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 12), hubMatUK);
  ukBeacon.position.set(2.4, 5.8, 4.2);
  globeGroup.add(ukBeacon);

  // Connecting 3D Flight / Shipping Curve
  const curvePoints = [
    usaBeacon.position.clone(),
    new THREE.Vector3(4.2, 6.2, 5.6),
    ukBeacon.position.clone()
  ];
  const shippingCurve = new THREE.CatmullRomCurve3(curvePoints);
  const curveGeo = new THREE.BufferGeometry().setFromPoints(shippingCurve.getPoints(50));
  const curveMat = new THREE.LineBasicMaterial({
    color: 0xC9A84C,
    transparent: true,
    opacity: 0.85,
    linewidth: 2
  });
  const shippingLine = new THREE.Line(curveGeo, curveMat);
  globeGroup.add(shippingLine);

  // Photon packet traveling along shipping arc
  const photonGeo = new THREE.SphereGeometry(0.22, 8, 8);
  const photonMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const shippingPhoton = new THREE.Mesh(photonGeo, photonMat);
  globeGroup.add(shippingPhoton);

  // ------------------------------------------------------------------------
  // B. Floating 3D Golden Logistics Crates
  // ------------------------------------------------------------------------
  const crates = [];
  const crateConfigs = [
    { size: 1.4, x: -14, y: 8, z: -5, vx: 0.008, vy: 0.012, amp: 0.8, freq: 1.2 },
    { size: 1.8, x: -16, y: -7, z: -3, vx: -0.01, vy: 0.007, amp: 1.1, freq: 0.9 },
    { size: 1.2, x: 16, y: 12, z: -7, vx: 0.012, vy: -0.009, amp: 0.7, freq: 1.4 },
    { size: 1.5, x: 18, y: -8, z: -4, vx: -0.007, vy: 0.011, amp: 0.9, freq: 1.1 },
    { size: 1.1, x: -2, y: -14, z: 1, vx: 0.009, vy: 0.008, amp: 0.6, freq: 1.5 }
  ];

  crateConfigs.forEach((cfg, idx) => {
    const boxGroup = new THREE.Group();
    boxGroup.position.set(cfg.x, cfg.y, cfg.z);

    const boxGeo = new THREE.BoxGeometry(cfg.size, cfg.size, cfg.size);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x14141E,
      roughness: 0.25,
      metalness: 0.92,
      transparent: true,
      opacity: 0.88
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    boxGroup.add(boxMesh);

    const edgesGeo = new THREE.EdgesGeometry(boxGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: idx % 2 === 0 ? 0xC9A84C : 0xE8CE84,
      transparent: true,
      opacity: 0.85
    });
    const edgeLines = new THREE.LineSegments(edgesGeo, edgesMat);
    boxGroup.add(edgeLines);

    scene.add(boxGroup);

    crates.push({
      group: boxGroup,
      baseY: cfg.y,
      vx: cfg.vx,
      vy: cfg.vy,
      amp: cfg.amp,
      freq: cfg.freq,
      phase: idx * 1.5
    });
  });

  // ------------------------------------------------------------------------
  // C. 3D Stardust & Logistics Particles
  // ------------------------------------------------------------------------
  const particleCount = isMobileViewport() ? 240 : 550;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  const colorGold = new THREE.Color(0xC9A84C);
  const colorIvory = new THREE.Color(0xFAF8F5);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const radius = 12 + Math.random() * 34;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i3 + 2] = radius * Math.cos(phi);

    const mixColor = Math.random() > 0.4 ? colorGold : colorIvory;
    particleColors[i3] = mixColor.r;
    particleColors[i3 + 1] = mixColor.g;
    particleColors[i3 + 2] = mixColor.b;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });

  const particleCloud = new THREE.Points(particleGeo, particleMat);
  scene.add(particleCloud);

  // ------------------------------------------------------------------------
  // D. Mouse & Scroll Interaction Physics
  // ------------------------------------------------------------------------
  let mouseX = 0;
  let mouseY = 0;
  let targetCamX = 0;
  let targetCamY = 0;
  let scrollProgress = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    targetCamX = mouseX * 4.2;
    targetCamY = mouseY * 2.8;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(getPixelRatio());
    updateGlobePosition();
  });

  // ------------------------------------------------------------------------
  // E. Main Animation Loop
  // ------------------------------------------------------------------------
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth Camera Parallax following mouse
    camera.position.x += (targetCamX - camera.position.x) * 0.04;
    camera.position.y += (targetCamY - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    // Rotate Holographic Logistics Globe
    outerSphere.rotation.y = elapsedTime * 0.18 + scrollProgress * Math.PI * 2;
    outerSphere.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2;
    innerSphere.rotation.y = -elapsedTime * 0.25;
    coreSeed.rotation.z = elapsedTime * 0.4;

    // Photon shipment packet traveling across arc
    const photonT = (elapsedTime * 0.45) % 1;
    const photonPos = shippingCurve.getPoint(photonT);
    shippingPhoton.position.copy(photonPos);

    // Orbit point lights for dynamic specular highlights
    goldLight.position.x = Math.sin(elapsedTime * 0.5) * 20;
    goldLight.position.z = Math.cos(elapsedTime * 0.5) * 20;

    // Animate Floating 3D Inventory Crates
    crates.forEach(c => {
      c.group.rotation.x += c.vx;
      c.group.rotation.y += c.vy;
      c.group.position.y = c.baseY + Math.sin(elapsedTime * c.freq + c.phase) * c.amp;
    });

    // Rotate Stardust particle cloud
    particleCloud.rotation.y = elapsedTime * 0.03;
    particleCloud.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

    // Scroll-driven camera depth adjustment
    camera.position.z = 32 - scrollProgress * 8;

    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   2. HERO 3D PORTRAIT PARALLAX (Sahil Gulfam)
   ========================================================================== */
function initHeroPortraitParallax() {
  const stage = document.getElementById('hero-portrait-stage');
  const img = document.getElementById('hero-sahil-img');
  const hero = document.getElementById('hero');
  if (!stage || !hero) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
  });

  function updatePortrait() {
    // Smooth damped lerp for physical weight
    currentTiltX += (mouseY * -14 - currentTiltX) * 0.08;
    currentTiltY += (mouseX * 16 - currentTiltY) * 0.08;

    stage.style.transform = `perspective(1200px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;

    if (img) {
      // Counter-parallax on image to give stereoscopic 3D pop
      const imgX = mouseX * -10;
      const imgY = mouseY * -6;
      img.style.transform = `translate(${imgX.toFixed(1)}px, ${imgY.toFixed(1)}px) scale(1.03)`;
    }

    requestAnimationFrame(updatePortrait);
  }

  updatePortrait();
}

/* ==========================================================================
   3. VANILLA 3D CARD TILT & HOLOGRAPHIC GLARE ENGINE
   ========================================================================== */
function init3DCardTilt() {
  const cards = document.querySelectorAll('[data-3d-card]');
  if (!cards.length) return;

  cards.forEach(card => {
    let bounds;

    const onMouseEnter = () => {
      bounds = card.getBoundingClientRect();
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const normX = (mouseX / bounds.width - 0.5) * 2;
      const normY = (mouseY / bounds.height - 0.5) * 2;

      const tiltX = -normY * 13;
      const tiltY = normX * 13;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;

      card.style.setProperty('--mouse-x', `${(mouseX / bounds.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(mouseY / bounds.height) * 100}%`);
    };

    const onMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      bounds = null;
    };

    card.addEventListener('mouseenter', onMouseEnter, { passive: true });
    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave, { passive: true });
  });
}

/* ==========================================================================
   4. NAVBAR: Morphing Logic
   ========================================================================== */
function initNavbarMorph() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 90) {
      navbar.classList.remove('bg-obsidian/40', 'border-white/10');
      navbar.classList.add('bg-[#0D0D12]/90', 'border-champagne/40', 'shadow-[0_15px_35px_rgba(0,0,0,0.85)]', 'py-2.5');
    } else {
      navbar.classList.add('bg-obsidian/40', 'border-white/10');
      navbar.classList.remove('bg-[#0D0D12]/90', 'border-champagne/40', 'shadow-[0_15px_35px_rgba(0,0,0,0.85)]', 'py-2.5');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   5. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-mobile-menu');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !menu) return;

  const open = () => {
    menu.classList.remove('opacity-0', 'pointer-events-none');
    menu.classList.add('opacity-100', 'pointer-events-auto');
    menu.classList.add('mobile-menu-open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    menu.classList.add('opacity-0', 'pointer-events-none');
    menu.classList.remove('opacity-100', 'pointer-events-auto');
    menu.classList.remove('mobile-menu-open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', () => {
    if (menu.classList.contains('mobile-menu-open')) close();
    else open();
  });
  if (closeBtn) closeBtn.addEventListener('click', close);
  links.forEach(l => l.addEventListener('click', close));

  // Reset the drawer when a mobile browser restores this page from cache.
  window.addEventListener('pageshow', close);
  close();

  window.closeMobileMenu = close;
}

/* ==========================================================================
   6. HERO ENTRANCE CHOREOGRAPHY (GSAP)
   ========================================================================== */
function initHeroEntrance() {
  if (!window.gsap) return;

  const heroItems = document.querySelectorAll('.hero-item');
  gsap.fromTo(
    heroItems,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.2
    }
  );
}

/* ==========================================================================
   7. FEATURE CARD 1: READY INVENTORY SHUFFLER
   ========================================================================== */
function initDiagnosticShuffler() {
  const stage = document.getElementById('shuffler-stage');
  const nextBtn = document.getElementById('manual-shuffle-btn');
  if (!stage) return;

  const cardData = [
    {
      id: 1,
      tag: 'USA WAREHOUSE // 01',
      title: 'USA Ready-to-Ship Inventory',
      metric: 'Fast 2-Day Delivery',
      sub: 'Physical stock stored in US 3PL warehouses. Pre-labeled with USPS Priority barcodes ready for immediate marketplace dispatch.',
      color: 'border-champagne/40 bg-gradient-to-br from-obsidian-surface to-card-bg'
    },
    {
      id: 2,
      tag: 'LEGAL INFRASTRUCTURE // 02',
      title: 'USA LLC & UK Ltd Formation',
      metric: '100% Tax Compliant',
      sub: 'Articles of Organization, Federal EIN, Registered Agent, and verified Wise / Payoneer business banking rails.',
      color: 'border-white/20 bg-gradient-to-br from-[#181824] to-[#111118]'
    },
    {
      id: 3,
      tag: 'ACCOUNT PROTECTION // 03',
      title: 'Brand Ungating & Valid Invoices',
      metric: 'Audit Verified',
      sub: 'Legitimate distributor invoices for TikTok Shop, eBay, and Walmart. 100% brand approval rate with zero account link risks.',
      color: 'border-champagne/30 bg-gradient-to-br from-[#1a1720] to-[#121017]'
    }
  ];

  stage.innerHTML = cardData.map((c, i) => `
    <div class="shuffler-card ${c.color} border" data-slot="${i}" id="shuffler-card-${c.id}">
      <div class="flex items-center justify-between">
        <span class="text-[9px] font-mono tracking-widest text-champagne uppercase font-bold">${c.tag}</span>
        <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">${c.metric}</span>
      </div>
      <div>
        <h4 class="text-base font-sans font-bold text-ivory mb-1">${c.title}</h4>
        <p class="text-[11px] font-mono text-ivory-muted leading-relaxed">${c.sub}</p>
      </div>
      <div class="flex items-center justify-between text-[9px] font-mono text-ivory-muted/70 pt-2 border-t border-white/5">
        <span>SAHIL SOFT VERIFIED</span>
        <span class="text-champagne font-bold">READY TO DEPLOY</span>
      </div>
    </div>
  `).join('');

  let slots = [0, 1, 2];

  const cycleCards = () => {
    slots.unshift(slots.pop());
    cardData.forEach((c, idx) => {
      const el = document.getElementById(`shuffler-card-${c.id}`);
      if (el) {
        el.setAttribute('data-slot', slots[idx]);
      }
    });
  };

  let cycleTimer = setInterval(cycleCards, 3400);

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      clearInterval(cycleTimer);
      cycleCards();
      cycleTimer = setInterval(cycleCards, 3400);
    });
  }

  stage.addEventListener('mouseenter', () => clearInterval(cycleTimer));
  stage.addEventListener('mouseleave', () => {
    clearInterval(cycleTimer);
    cycleTimer = setInterval(cycleCards, 3400);
  });
}

/* ==========================================================================
   8. FEATURE CARD 2: TELEMETRY TYPEWRITER
   ========================================================================== */
function initTelemetryTypewriter() {
  const textEl = document.getElementById('typewriter-text');
  const clockEl = document.getElementById('telemetry-timestamp');
  if (!textEl) return;

  setInterval(() => {
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toTimeString().split(' ')[0] + ' UTC';
    }
  }, 1000);

  const streams = [
    '> [USA-3PL] 480 UNITS DISPATCHED // USPS TRACKING LABELS GENERATED',
    '> [TIKTOK-SHOP] 1,500 SKUs SYNCED WITH DOMESTIC WAREHOUSE CATALOG',
    '> [LLC-FILING] DELAWARE LLC APPROVED // EIN ISSUED // WISE CONNECTED',
    '> [UK-LOGISTICS] LONDON 3PL INVENTORY BATCH COMMITTED TO DISPATCH',
    '> [BRAND-APPROVAL] TOP TIER BEAUTY & ELECTRONICS UNGATED // 100% PASS',
    '> [REFUNDS-OPS] WALMART & AMAZON REIMBURSEMENTS: $3,920 RECOVERED',
    '> [DEDICATED-VPS] RESIDENTIAL US IP CONNECTED // ZERO LINKED ACCOUNTS'
  ];

  let streamIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let currentString = streams[0];

  function typeStep() {
    currentString = streams[streamIdx];

    if (!isDeleting) {
      charIdx++;
      textEl.textContent = currentString.slice(0, charIdx);

      if (charIdx >= currentString.length) {
        setTimeout(() => {
          isDeleting = true;
          typeStep();
        }, 2200);
        return;
      }
      setTimeout(typeStep, 35);
    } else {
      charIdx--;
      textEl.textContent = currentString.slice(0, charIdx);

      if (charIdx <= 0) {
        isDeleting = false;
        streamIdx = (streamIdx + 1) % streams.length;
        setTimeout(typeStep, 400);
        return;
      }
      setTimeout(typeStep, 15);
    }
  }

  typeStep();
}

/* ==========================================================================
   9. FEATURE CARD 3: CURSOR PROTOCOL SCHEDULER
   ========================================================================== */
function initCursorScheduler() {
  const cursor = document.getElementById('simulated-cursor');
  const wedCell = document.getElementById('target-day-wed');
  const saveBtn = document.getElementById('target-save-btn');
  const stage = document.getElementById('scheduler-stage');
  const statusText = document.getElementById('scheduler-status-text');
  const activeDayLabel = document.getElementById('scheduler-active-day');

  if (!cursor || !wedCell || !saveBtn || !stage) return;

  function runSchedulerCycle() {
    const stageRect = stage.getBoundingClientRect();
    const wedRect = wedCell.getBoundingClientRect();
    const saveRect = saveBtn.getBoundingClientRect();

    const wedX = wedRect.left - stageRect.left + wedRect.width / 2 - 8;
    const wedY = wedRect.top - stageRect.top + wedRect.height / 2 - 8;

    const saveX = saveRect.left - stageRect.left + saveRect.width / 2 - 8;
    const saveY = saveRect.top - stageRect.top + saveRect.height / 2 - 8;

    cursor.style.transition = 'none';
    cursor.style.opacity = '0';
    cursor.style.transform = 'translate(20px, 30px)';
    wedCell.classList.remove('active-day');
    saveBtn.classList.remove('bg-champagne', 'text-obsidian');
    if (statusText) statusText.textContent = 'Awaiting warehouse queue...';
    if (activeDayLabel) activeDayLabel.textContent = 'PENDING';

    setTimeout(() => {
      cursor.style.transition = 'opacity 0.4s ease, transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      cursor.style.opacity = '1';
      cursor.style.transform = `translate(${wedX}px, ${wedY}px)`;
    }, 400);

    setTimeout(() => {
      cursor.style.transform = `translate(${wedX}px, ${wedY}px) scale(0.9)`;
      wedCell.classList.add('active-day');
      if (statusText) statusText.textContent = 'Locking dispatch: WED 09';
      if (activeDayLabel) activeDayLabel.textContent = 'WED 09';
    }, 1750);

    setTimeout(() => {
      cursor.style.transform = `translate(${wedX}px, ${wedY}px) scale(1)`;
    }, 2050);

    setTimeout(() => {
      cursor.style.transform = `translate(${saveX}px, ${saveY}px)`;
      if (statusText) statusText.textContent = 'Committing batch order manifest...';
    }, 2400);

    setTimeout(() => {
      cursor.style.transform = `translate(${saveX}px, ${saveY}px) scale(0.9)`;
      saveBtn.classList.add('bg-champagne', 'text-obsidian');
      if (statusText) statusText.textContent = 'Batch slot confirmed with warehouse!';
    }, 3650);

    setTimeout(() => {
      cursor.style.transform = `translate(${saveX}px, ${saveY}px) scale(1)`;
      cursor.style.opacity = '0';
    }, 3950);

    setTimeout(runSchedulerCycle, 5200);
  }

  setTimeout(runSchedulerCycle, 1000);
}

/* ==========================================================================
   10. MANIFESTO PARALLAX & TEXT REVEAL
   ========================================================================== */
function initManifestoParallax() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const blocks = document.querySelectorAll('.manifesto-block');
  blocks.forEach(block => {
    gsap.fromTo(
      block,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

/* ==========================================================================
   11. FEEDBACK / FUTURE CHATBOT CONTAINER
   ========================================================================== */
function initFeedbackDialog() {
  const dialog = document.getElementById('feedback-dialog');
  const openButton = document.querySelector('[data-feedback-open]');
  const closeButton = document.querySelector('[data-feedback-close]');
  if (!dialog || !openButton) return;
  openButton.addEventListener('click', () => dialog.showModal());
  if (closeButton) closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function initSharedChrome() {
  const navbar = document.getElementById('navbar');
  const navAction = document.querySelector('#navbar > a:last-child');
  if (navAction) {
    navAction.remove();
    const navSpacer = document.createElement('div');
    navSpacer.className = 'navbar-spacer hidden md:block';
    navSpacer.setAttribute('aria-hidden', 'true');
    navbar?.append(navSpacer);
  }
  document.querySelectorAll('#navbar a[href*="wa.me"]').forEach((link) => link.remove());
  const mobileNavAction = document.querySelector('#mobile-menu a[href*="wa.me"]');
  if (mobileNavAction) mobileNavAction.remove();
  if (document.body.classList.contains('home-page')) return;
  navbar?.classList.remove('bg-obsidian/70');
  navbar?.classList.add('bg-obsidian/40', 'shadow-2xl');
  if (navbar && !document.getElementById('mobile-menu-btn')) {
    const mobileButton = document.createElement('button');
    mobileButton.id = 'mobile-menu-btn';
    mobileButton.className = 'md:hidden p-2 rounded-full border border-white/10 text-ivory hover:text-champagne hover:border-champagne/40 transition-colors';
    mobileButton.type = 'button';
    mobileButton.setAttribute('aria-label', 'Toggle Navigation');
    mobileButton.innerHTML = '<i data-lucide="menu" class="w-5 h-5"></i>';
    navbar.append(mobileButton);

    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-2xl flex flex-col justify-center items-center gap-6 px-8 transition-all duration-500 opacity-0 pointer-events-none';
    mobileMenu.innerHTML = '<button id="close-mobile-menu" type="button" class="absolute top-8 right-6 p-3 rounded-full border border-white/10 text-ivory" aria-label="Close menu"><i data-lucide="x" class="w-6 h-6"></i></button><span class="text-xs font-mono tracking-widest text-champagne uppercase">// Navigation Directory</span><a href="index.html" class="mobile-nav-link text-2xl font-serif italic text-ivory hover:text-champagne transition-colors">Home</a><a href="about.html" class="mobile-nav-link text-2xl font-serif italic text-ivory hover:text-champagne transition-colors">About Us</a><a href="ecommerce-services.html" class="mobile-nav-link text-2xl font-serif italic text-ivory hover:text-champagne transition-colors">E-commerce Services</a><a href="it-services.html" class="mobile-nav-link text-2xl font-serif italic text-ivory hover:text-champagne transition-colors">IT Services</a><a href="contact.html" class="mobile-nav-link text-2xl font-serif italic text-ivory hover:text-champagne transition-colors">Contact Us</a>';
    document.querySelector('header')?.after(mobileMenu);
    if (window.lucide) window.lucide.createIcons();
  }
  navbar?.querySelector('a[href="index.html"]')?.setAttribute('aria-label', 'Return to Sahil Soft home page');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navbar .nav-link, #mobile-menu .mobile-nav-link').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const destination = href.split('/').pop();
    const isHomeAnchor = currentPage === 'index.html' && href.startsWith('#');
    link.classList.toggle('active-page', destination === currentPage || isHomeAnchor);
  });
  const main = document.querySelector('main');
  if (main && !document.querySelector('.shared-footer')) {
    const footer = document.createElement('footer');
    footer.className = 'shared-footer';
    footer.innerHTML = '<img src="sahil-gulfam.png" alt="Sahil Gulfam"><div><strong>SAHIL SOFT</strong><span>E-COMMERCE &amp; IT SERVICES</span><p>Built for marketplace growth, ready-to-ship inventory and practical digital solutions.</p></div><a href="https://wa.me/923704443223" target="_blank" rel="noopener noreferrer">WHATSAPP ACTIVE</a>';
    main.after(footer);
  }
  if (window.location.pathname.endsWith('ecommerce-services.html') && !document.querySelector('.terms-callout')) {
    const prose = document.querySelector('.prose');
    if (prose) {
      const termsCallout = document.createElement('section');
      termsCallout.className = 'terms-callout';
      termsCallout.innerHTML = '<div><div class="page-kicker">// Before You Order</div><h2>USA Inventory Terms &amp; Conditions</h2><p>Please read the complete inventory, payment, label, dispatch and claims policy before placing an order.</p></div><a href="usa-inventory-terms.html">Read Terms &amp; Conditions <i data-lucide="arrow-up-right"></i></a>';
      prose.after(termsCallout);
      if (window.lucide) window.lucide.createIcons();
    }
  }
  if (window.location.pathname.endsWith('it-services.html') && !document.querySelector('.technical-skills')) {
    const prose = document.querySelector('.prose');
    if (prose) {
      const technicalSkills = document.createElement('section');
      technicalSkills.className = 'technical-skills';
      technicalSkills.innerHTML = `
        <div class="page-kicker">// IT Skills</div>
        <h2>Technical <em>Skills</em></h2>
        <p class="technical-skills-lead">The full stack behind the work — engineering languages, data tooling, automation platforms, AI models and agent frameworks used to ship practical digital products.</p>
        <div class="technical-skills-grid">
          <article class="technical-skill-card"><div class="technical-skill-icon"><i data-lucide="code-2"></i></div><h3>Languages</h3><p>Core languages used for websites, automation, data workflows and product development.</p><div class="skill-tags"><span>Python</span><span>Unreal Python</span><span>SQL</span><span>HTML / CSS</span><span>JavaScript</span></div></article>
          <article class="technical-skill-card"><div class="technical-skill-icon"><i data-lucide="database-zap"></i></div><h3>Tools &amp; Data</h3><p>Reliable tools for version control, deployments, notebooks, analysis and workflow automation.</p><div class="skill-tags"><span>Git</span><span>Docker</span><span>Jupyter</span><span>Pandas</span><span>NumPy</span><span>Matplotlib</span><span>Streamlit</span><span>n8n</span></div></article>
          <article class="technical-skill-card"><div class="technical-skill-icon"><i data-lucide="bot"></i></div><h3>NLP &amp; Agents</h3><p>AI capabilities for language workflows, knowledge retrieval, assistants, voice and multi-agent systems.</p><div class="skill-tags"><span>NLP</span><span>Transformers</span><span>LLMs</span><span>RAG</span><span>LangChain</span><span>LangGraph</span><span>CrewAI</span><span>Hugging Face</span><span>Whisper</span><span>Gemini</span></div></article>
        </div>`;
      prose.before(technicalSkills);
      if (window.lucide) window.lucide.createIcons();
    }
  }
  const groupCards = document.querySelectorAll('.contact-groups .about-action');
  groupCards.forEach((card, index) => {
    const icon = card.querySelector('.about-action-main > svg');
    if (icon && index < 2) icon.outerHTML = '<i data-lucide="message-circle"></i>';
  });
  if (groupCards.length && window.lucide) window.lucide.createIcons();

  const topInventoryCard = document.querySelector('.page-wrap > .about-action-grid > .about-sheet');
  if (topInventoryCard) topInventoryCard.remove();
  const contactIdentity = document.querySelector('.contact-identity');
  if (contactIdentity) contactIdentity.remove();

  const contactGroups = document.querySelector('.contact-groups');
  if (contactGroups && !document.querySelector('.payment-details')) {
    const paymentDetails = document.createElement('section');
    paymentDetails.className = 'payment-details';
    paymentDetails.innerHTML = `
      <div class="page-kicker">// Payment Details</div>
      <h2>Bank &amp; Wallet <em>Details</em></h2>
      <p>Please verify the account name and details before making a payment. Send your payment confirmation with your order.</p>
      <div class="payment-grid">
        <article class="payment-card"><i data-lucide="landmark"></i><div><b>UBL Bank</b><small>Account Title: Sahil Gulfam</small><span class="payment-line">Account No. 0325313985999 <button type="button" class="payment-copy" data-copy-value="0325313985999" aria-label="Copy UBL account number"><i data-lucide="copy"></i> Copy</button></span><span class="payment-line">IBAN: PK92UNIL0109000313985999 <button type="button" class="payment-copy" data-copy-value="PK92UNIL0109000313985999" aria-label="Copy UBL IBAN"><i data-lucide="copy"></i> Copy</button></span></div></article>
        <article class="payment-card"><i data-lucide="building-2"></i><div><b>Meezan Bank</b><small>Account Title: Sahil Gulfam</small><span class="payment-line">Account No. 0030 0113773798 <button type="button" class="payment-copy" data-copy-value="00300113773798" aria-label="Copy Meezan account number"><i data-lucide="copy"></i> Copy</button></span><span class="payment-line">IBAN: PK02MEZN0000300113773798 <button type="button" class="payment-copy" data-copy-value="PK02MEZN0000300113773798" aria-label="Copy Meezan IBAN"><i data-lucide="copy"></i> Copy</button></span></div></article>
        <article class="payment-card payment-wallet"><i data-lucide="wallet"></i><div><b>Easypaisa</b><small>Account Title: Sahil Gulfam</small><span class="payment-line">Account No. 03154638884 <button type="button" class="payment-copy" data-copy-value="03154638884" aria-label="Copy Easypaisa account number"><i data-lucide="copy"></i> Copy</button></span></div></article>
        <article class="payment-card payment-wallet"><i data-lucide="smartphone"></i><div><b>JazzCash</b><small>Account Title: Sahil Gulfam</small><span class="payment-line">Account No. 03154638884 <button type="button" class="payment-copy" data-copy-value="03154638884" aria-label="Copy JazzCash account number"><i data-lucide="copy"></i> Copy</button></span></div></article>
      </div>`;
    contactGroups.before(paymentDetails);
    if (window.lucide) window.lucide.createIcons();
    paymentDetails.querySelectorAll('.payment-copy').forEach((button) => {
      button.addEventListener('click', async () => {
        const value = button.dataset.copyValue;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(value);
          } else {
            const input = document.createElement('textarea');
            input.value = value;
            input.style.position = 'fixed';
            input.style.opacity = '0';
            document.body.append(input);
            input.select();
            document.execCommand('copy');
            input.remove();
          }
          showToast('Copied to clipboard');
        } catch {
          showToast('Copy failed — please select the value manually');
        }
      });
    });
  }
}

function initInventoryTerms() {
  if (!window.location.pathname.endsWith('usa-inventory-terms.html')) return;

  const termsGrid = document.querySelector('.terms-grid');
  if (!termsGrid || document.querySelector('.terms-prose')) return;

  const terms = [
    ['1. Original Label Acceptance', 'Our fulfilment role is limited to preparing the parcel, applying a valid original label and completing the agreed handover process. Once the carrier accepts a valid label, future carrier events remain subject to that carrier’s system and policies.'],
    ['2. Label Submission Cut-off', 'For products available in our warehouse, labels received by 10:00 PM Pakistan time are normally handled in the same-day dispatch schedule. Labels received after 10:00 PM move to the next working dispatch cycle.'],
    ['3. Label Types, Weight & Dimensions', 'Clients must provide genuine, valid, unused labels with accurate weight and dimensions. A label with incorrect measurements can affect carrier movement after acceptance; the client remains responsible for information entered on the label. Invalid, altered or non-compliant labels are not accepted.'],
    ['4. Damaged Parcels', 'Damage during transit is a matter between the seller and the relevant carrier. Where carrier insurance or a claims process is available, the seller may submit a claim directly under the carrier’s requirements.'],
    ['5. Wrong Item Sent', 'For a verified wrong item, the client must supply clear video evidence, customer communication and full order details. Any replacement or refund review requires the item to be returned unused, unopened and in the same condition for warehouse inspection.'],
    ['6. FBM Prices', 'Listed FBM pricing covers the product together with pick, pack and drop service. Shipping labels are supplied by the client unless agreed otherwise. Prices may change according to market conditions and the displayed price applies to the date shown.'],
    ['7. Label System Status', 'We may provide proof of a parcel prepared with a valid label when appropriate. Carrier scan results, system acceptance and subsequent tracking updates are controlled by the carrier. For label-status concerns, clients should contact the relevant carrier after the stated review period.'],
    ['8. Direct Party-B Relationship', 'Sahil Soft works directly with the ordering client only. If the client sells to another party, our responsibility remains limited to the direct client and does not extend to later buyers, sellers, agents or other third parties.'],
    ['9. Third-Party Conduct', 'Any dispute, fraud allegation or commercial conflict between third parties is their own matter. Sahil Soft is not responsible for conduct or agreements outside the direct order placed with us.'],
    ['10. Client Shipping Address', 'Clients must provide their own complete, accurate and lawful shipping and return addresses. We do not process labels that use false, misleading or non-compliant address information.'],
    ['11. Return Management & Evidence', 'Return-management services are not included unless expressly agreed in writing. For a verified wrong item or missing quantity, complete evidence and video proof are required before a review can begin. The normal review window is 48–72 hours after all evidence is received.'],
    ['12. Label Service Policy', 'Where a label-related service is separately agreed, the seller remains responsible for accurate address details and lawful use. Carrier delivery, transit status, damage and carrier system events are subject to the carrier’s rules after handover.'],
    ['13. Documentation & Product Compliance', 'Invoices, receipts and product documents are provided only where expressly agreed. Clients must represent products accurately and comply with marketplace, customs, consumer-protection and intellectual-property requirements. We do not support prohibited, counterfeit or misleading products.'],
    ['14. Acceptance of Operational Limits', 'By ordering, the client accepts that service is delivered according to these written terms. We do not offer general return-management or exchange services outside the verified-issue review process described here.'],
    ['15. Invalid, Repeated or Expired Labels', 'Labels already in transit, delivered, duplicated, expired, previously used or improperly formatted cannot be processed. Clients must verify every label before submission; responsibility for a pre-existing label issue remains with the sender.'],
    ['16. Warehouse Address Use', 'Warehouse address details must be used only where authorised and legally appropriate. We will not process labels containing false sender, recipient or warehouse-address information.'],
    ['17. Return / Exchange Review', 'No return or exchange is accepted without clear proof for a verified wrong item or missing quantity. Any approved review is based on the evidence received and normally completes within 48–72 hours.'],
    ['18. Available Products Only', 'We dispatch only products currently listed in the live inventory sheet. Before ordering, clients must verify the exact name, ML/OZ, weight, size, capsule or tablet count, and all other product details against that sheet.'],
    ['19. Bulk / FBA Quantity', 'For bulk or FBA orders, pricing may be reviewed according to quantity. The normal minimum order quantity for bulk consideration is 12 pieces.'],
    ['20. Advance Payment', 'Every order requires advance payment. Please submit the payment confirmation together with the order or label. Orders without confirmed payment are not scheduled for dispatch.'],
    ['21. Price Negotiation', 'For orders below 10 units, the current listed price is fixed. Pricing for quantities greater than 10 units may be discussed separately before an order is confirmed.'],
    ['22. No General Return Service', 'Sahil Soft does not provide ongoing return-management services. Clients should arrange return handling independently unless a separate written service agreement exists.'],
    ['23. Missing or Wrong Quantity', 'For a verified warehouse quantity error, the available remedy is limited to the confirmed missing quantity: a refund for that quantity or reshipment with a new client-supplied label.'],
    ['24. Client Acknowledgement', 'Submit an order only after reading all terms, policies and rules on this page. Submission of an order, label or payment confirms that the client has acknowledged and accepted these terms.'],
    ['25. 72-Hour Review Window', 'Clients must inspect labels, order details and relevant updates within 72 hours of submission or handover. Reports made after this period may not be eligible for operational review.'],
    ['26. Different Parties Clash Policy', 'Where goods move from the direct client to later buyers or parties, any dispute between those parties remains their own matter. Sahil Soft is answerable only to the direct ordering client.']
  ];

  const prose = document.createElement('div');
  prose.className = 'terms-prose';
  prose.innerHTML = terms.map(([heading, copy]) => `<section><h2>${heading}</h2><p>${copy}</p></section>`).join('');
  termsGrid.replaceWith(prose);
}

/* ==========================================================================
   11. TACTILE TOAST SYSTEM
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-champagne animate-ping"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast-show');
  });

  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

window.showToast = showToast;
