// ============================================
// INFERNO FORGE - INTERACTIVE FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // ANIMATED COUNTER
  // ============================================
  
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
  
  // Animate hero stats on load
  const statValues = document.querySelectorAll('.stat-value[data-target]');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  
  statValues.forEach(stat => statsObserver.observe(stat));
  
  
  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  
  // ============================================
  // ALTERNATIVES SLIDER CONTROLS
  // ============================================
  
  const sliderTrack = document.querySelector('.slider-track');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  
  if (sliderTrack && prevBtn && nextBtn) {
    const cardWidth = 350 + 40; // card width + gap
    
    prevBtn.addEventListener('click', () => {
      sliderTrack.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    });
    
    nextBtn.addEventListener('click', () => {
      sliderTrack.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    });
    
    // Update button states based on scroll position
    function updateButtonStates() {
      const scrollLeft = sliderTrack.scrollLeft;
      const maxScroll = sliderTrack.scrollWidth - sliderTrack.clientWidth;
      
      prevBtn.style.opacity = scrollLeft <= 0 ? '0.5' : '1';
      prevBtn.style.cursor = scrollLeft <= 0 ? 'not-allowed' : 'pointer';
      
      nextBtn.style.opacity = scrollLeft >= maxScroll - 1 ? '0.5' : '1';
      nextBtn.style.cursor = scrollLeft >= maxScroll - 1 ? 'not-allowed' : 'pointer';
    }
    
    sliderTrack.addEventListener('scroll', updateButtonStates);
    updateButtonStates(); // Initial state
  }
  
  
  // ============================================
  // EMBER PARTICLES ANIMATION
  // ============================================
  
  function createEmberParticles() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    // Create floating ember particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-ember';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: radial-gradient(circle, #FFB84A, #FF7A18);
        border-radius: 50%;
        opacity: 0;
        animation: float-up ${Math.random() * 10 + 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
        left: ${Math.random() * 100}%;
        bottom: 0;
        filter: blur(1px);
        box-shadow: 0 0 10px #FF7A18;
      `;
      heroBackground.appendChild(particle);
    }
  }
  
  // Add CSS animation for floating embers
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-up {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 0.8;
      }
      90% {
        opacity: 0.3;
      }
      100% {
        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  createEmberParticles();
  
  
  // ============================================
  // CARD HOVER GLOW EFFECT
  // ============================================
  
  const cards = document.querySelectorAll('.feature-card, .step-card, .limit-card, .help-card, .alternative-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
  
  // Add dynamic glow CSS
  const glowStyle = document.createElement('style');
  glowStyle.textContent = `
    .feature-card::after,
    .step-card::after,
    .limit-card::after,
    .help-card::after,
    .alternative-card::after {
      content: '';
      position: absolute;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(255, 122, 24, 0.3), transparent 70%);
      left: var(--mouse-x, 50%);
      top: var(--mouse-y, 50%);
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 0;
    }
    
    .feature-card:hover::after,
    .step-card:hover::after,
    .limit-card:hover::after,
    .help-card:hover::after,
    .alternative-card:hover::after {
      opacity: 1;
    }
    
    .feature-card > *,
    .step-card > *,
    .limit-card > *,
    .help-card > *,
    .alternative-card > * {
      position: relative;
      z-index: 1;
    }
  `;
  document.head.appendChild(glowStyle);
  
  
  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  
  const revealElements = document.querySelectorAll('.section-header, .feature-card, .step-card, .intro-content, .limit-card, .pros-card, .cons-card, .help-card');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
  });
  
  
  // ============================================
  // PROGRESS INDICATOR
  // ============================================
  
  function createProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #FF3B1A, #FF7A18, #FFB84A);
      z-index: 9999;
      transition: width 0.1s ease;
      box-shadow: 0 0 10px #FF7A18;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
  
  createProgressIndicator();
  
  
  // ============================================
  // COMPARISON TABLE TOUCH SWIPE (Mobile)
  // ============================================
  
  const comparisonSlider = document.querySelector('.comparison-slider');
  
  if (comparisonSlider && 'ontouchstart' in window) {
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;
    
    comparisonSlider.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - comparisonSlider.offsetLeft;
      scrollLeft = comparisonSlider.scrollLeft;
    });
    
    comparisonSlider.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - comparisonSlider.offsetLeft;
      const walk = (x - startX) * 2;
      comparisonSlider.scrollLeft = scrollLeft - walk;
    });
    
    comparisonSlider.addEventListener('touchend', () => {
      isDown = false;
    });
  }
  
  
  // ============================================
  // HEAT WAVE EFFECT ON CTA BUTTONS
  // ============================================
  
  const ctaButtons = document.querySelectorAll('.btn-primary');
  
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.animation = 'heat-wave 0.6s ease';
    });
    
    button.addEventListener('animationend', function() {
      this.style.animation = '';
    });
  });
  
  const heatWaveStyle = document.createElement('style');
  heatWaveStyle.textContent = `
    @keyframes heat-wave {
      0%, 100% { filter: hue-rotate(0deg) brightness(1); }
      25% { filter: hue-rotate(10deg) brightness(1.2); }
      50% { filter: hue-rotate(-10deg) brightness(1.1); }
      75% { filter: hue-rotate(10deg) brightness(1.15); }
    }
  `;
  document.head.appendChild(heatWaveStyle);
  
  
  // ============================================
  // LAZY LOAD IMAGES
  // ============================================
  
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  
  // ============================================
  // CONSOLE EASTER EGG
  // ============================================
  
  console.log('%c🔥 INFERNO FORGE 🔥', 'font-size: 24px; font-weight: bold; background: linear-gradient(90deg, #FF3B1A, #FF7A18, #FFB84A); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
  console.log('%cWelcome to Klarna Casino - Where luck gets forged!', 'font-size: 14px; color: #FFB84A;');
  console.log('%cDesigned with 🎲 and ⚡', 'font-size: 12px; color: #FFF3D1;');

  
  // ============================================
  // HEADER FUNCTIONALITY
  // ============================================
  
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.header-nav');
  
  // Scroll effect
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Mobile menu toggle
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
    
    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }

  // ============================================
  // FLAME EFFECT FOR TABLE WRAPPER
  // ============================================
  
  class FlameEffect {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.animationId = null;
      this.isVisible = false;
      this.time = 0;
      
      // Параметры пламени
      this.maxHeight = 40;
      this.flameCount = 0;
      this.flames = [];
      this.waveOffset = 0;
      
      // Цвета пламени (от горячего к холодному)
      this.colors = {
        hot: { r: 255, g: 59, b: 26 },      // #FF3B1A - яркий красный
        warm: { r: 255, g: 122, b: 24 },    // #FF7A18 - оранжевый
        medium: { r: 255, g: 184, b: 74 }, // #FFB84A - золотой
        cool: { r: 255, g: 211, b: 106 }   // #FFD36A - желтый
      };
      
      this.init();
    }
    
    init() {
      this.resize();
      this.createFlames();
      
      // Intersection Observer для оптимизации
      // Наблюдаем за самим canvas, так как он находится выше wrapper
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const wasVisible = this.isVisible;
          this.isVisible = entry.isIntersecting;
          
          if (this.isVisible && !wasVisible) {
            // Элемент стал видимым - запускаем анимацию
            this.start();
          } else if (!this.isVisible && wasVisible) {
            // Элемент стал невидимым - останавливаем анимацию (но не очищаем canvas)
            this.stop();
          }
        });
      }, {
        threshold: 0.01, // Более низкий порог для более раннего обнаружения
        rootMargin: '150px 0px' // Увеличенный margin для учета того, что canvas выше wrapper
      });
      
      // Наблюдаем за самим canvas
      observer.observe(this.canvas);
      
      // Проверяем видимость при инициализации
      const rect = this.canvas.getBoundingClientRect();
      const isInitiallyVisible = (
        rect.top < window.innerHeight + 150 &&
        rect.bottom > -150
      );
      
      if (isInitiallyVisible) {
        this.isVisible = true;
        this.start();
      }
      
      // Обработка изменения размера окна
      window.addEventListener('resize', debounce(() => {
        this.resize();
        this.createFlames();
      }, 250));
    }
    
    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = this.maxHeight;
      // Больше языков для более плавного эффекта
      this.flameCount = Math.max(20, Math.floor(rect.width / 8));
    }
    
    createFlames() {
      this.flames = [];
      const width = this.canvas.width;
      const spacing = width / this.flameCount;
      
      for (let i = 0; i < this.flameCount; i++) {
        const baseX = i * spacing + spacing * (0.2 + Math.random() * 0.6); // Еще более рассеянное расположение
        this.flames.push({
          baseX: baseX,
          phase: Math.random() * Math.PI * 2, // Случайная фаза для вариации
          phase2: Math.random() * Math.PI * 2, // Вторая фаза для более сложного движения
          amplitude: 2.5 + Math.random() * 5, // Больше амплитуда для рассеянности
          frequency: 0.012 + Math.random() * 0.028, // Частота волны
          frequency2: 0.008 + Math.random() * 0.015, // Вторая частота
          speed: 0.7 + Math.random() * 0.5, // Скорость движения
          height: 18 + Math.random() * 22, // Высота языка пламени (больше вариаций)
          width: 1.5 + Math.random() * 3.5, // Ширина у основания (больше вариаций)
          turbulence: 0.4 + Math.random() * 0.8, // Больше турбулентности
          opacity: 0.5 + Math.random() * 0.5, // Вариация прозрачности
          offset: (Math.random() - 0.5) * 3, // Случайное смещение по X
          flickerSpeed: 0.5 + Math.random() * 0.5, // Скорость мерцания
          baseHeight: 18 + Math.random() * 22 // Базовая высота для вариации
        });
      }
    }
    
    // Улучшенная функция шума для более естественного движения
    noise(x, y, time) {
      const n1 = Math.sin(x * 0.08 + time * 0.04) * Math.cos(y * 0.12 + time * 0.025);
      const n2 = Math.sin(x * 0.15 + time * 0.06) * Math.cos(y * 0.2 + time * 0.04);
      return (n1 * 0.6 + n2 * 0.4) * 0.7;
    }
    
    // Функция для плавного мерцания высоты пламени
    flicker(time, speed, phase) {
      return Math.sin(time * speed + phase) * 0.3 + Math.sin(time * speed * 2.3 + phase * 1.7) * 0.15;
    }
    
    // Получить цвет пламени на определенной высоте
    getFlameColor(height, maxHeight) {
      const ratio = height / maxHeight;
      
      if (ratio < 0.2) {
        // Горячая зона - красный
        return this.colors.hot;
      } else if (ratio < 0.5) {
        // Теплая зона - оранжевый
        const t = (ratio - 0.2) / 0.3;
        return {
          r: Math.floor(this.colors.hot.r + (this.colors.warm.r - this.colors.hot.r) * t),
          g: Math.floor(this.colors.hot.g + (this.colors.warm.g - this.colors.hot.g) * t),
          b: Math.floor(this.colors.hot.b + (this.colors.warm.b - this.colors.hot.b) * t)
        };
      } else if (ratio < 0.8) {
        // Средняя зона - золотой
        const t = (ratio - 0.5) / 0.3;
        return {
          r: Math.floor(this.colors.warm.r + (this.colors.medium.r - this.colors.warm.r) * t),
          g: Math.floor(this.colors.warm.g + (this.colors.medium.g - this.colors.warm.g) * t),
          b: Math.floor(this.colors.warm.b + (this.colors.medium.b - this.colors.warm.b) * t)
        };
      } else {
        // Холодная зона - желтый
        const t = (ratio - 0.8) / 0.2;
        return {
          r: Math.floor(this.colors.medium.r + (this.colors.cool.r - this.colors.medium.r) * t),
          g: Math.floor(this.colors.medium.g + (this.colors.cool.g - this.colors.medium.g) * t),
          b: Math.floor(this.colors.medium.b + (this.colors.cool.b - this.colors.medium.b) * t)
        };
      }
    }
    
    drawFlame() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      const width = this.canvas.width;
      const time = this.time * 0.008; // Немного медленнее для более плавного движения
      const baseY = this.maxHeight; // Пламя растет от нижней границы вверх
      
      // Включаем сглаживание для более мягких краев
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.imageSmoothingQuality = 'high';
      
      // Рисуем каждый язык пламени
      for (const flame of this.flames) {
        const baseX = flame.baseX + flame.offset;
        const points = [];
        const segments = 30; // Еще больше сегментов для максимальной плавности
        
        // Динамическая высота с мерцанием
        const currentHeight = flame.baseHeight * (1 + this.flicker(time, flame.flickerSpeed, flame.phase));
        
        // Генерируем точки для языка пламени (от низа вверх)
        for (let i = 0; i <= segments; i++) {
          const y = baseY - (i / segments) * currentHeight; // От maxHeight вверх
          const progress = i / segments;
          const heightProgress = y / this.maxHeight;
          
          // Многослойное волновое движение для органичности
          const wave1 = Math.sin(time * 1.8 + flame.phase + y * flame.frequency) * flame.amplitude;
          const wave2 = Math.sin(time * 1.3 + flame.phase2 + y * flame.frequency2) * flame.amplitude * 0.6;
          const wave3 = Math.sin(time * 2.5 + flame.phase * 0.7 + y * flame.frequency * 2.1) * flame.amplitude * 0.3;
          
          // Улучшенный шум с несколькими слоями
          const noise1 = this.noise(baseX, y, time) * flame.turbulence * 15;
          const noise2 = this.noise(baseX * 1.3, y * 1.2, time * 1.1) * flame.turbulence * 8;
          
          // Комбинируем все движения
          const x = baseX + wave1 + wave2 + wave3 + noise1 + noise2;
          
          // Ширина языка с более сложной вариацией
          const widthVariation = 1 + Math.sin(time * 2.5 + flame.phase) * 0.25 + Math.cos(time * 3.7 + flame.phase2) * 0.15;
          // Более плавное сужение к верху с дополнительной вариацией
          const widthCurve = Math.pow(1 - progress, 0.7); // Более плавная кривая
          const w = flame.width * widthCurve * widthVariation;
          
          points.push({ x, y, width: w, progress, heightProgress });
        }
        
        // Рисуем язык пламени как залитый путь с очень плавными кривыми
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x - points[0].width, points[0].y);
        
        // Левая сторона языка с более плавными кривыми Безье
        for (let i = 1; i < points.length; i++) {
          const p = points[i];
          const prevP = points[i - 1];
          const nextP = i < points.length - 1 ? points[i + 1] : p;
          
          // Используем контрольные точки для более плавных кривых
          const cpX1 = prevP.x - prevP.width;
          const cpY1 = prevP.y;
          const cpX2 = (p.x + nextP.x) / 2 - p.width;
          const cpY2 = (p.y + nextP.y) / 2;
          
          this.ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, p.x - p.width, p.y);
        }
        
        // Верхняя точка (кончик языка) - заостренный
        const topPoint = points[points.length - 1];
        this.ctx.lineTo(topPoint.x, topPoint.y);
        
        // Правая сторона языка (в обратном порядке)
        for (let i = points.length - 2; i >= 0; i--) {
          const p = points[i];
          const prevP = i > 0 ? points[i - 1] : p;
          const nextP = points[i + 1];
          
          const cpX1 = nextP.x + nextP.width;
          const cpY1 = nextP.y;
          const cpX2 = (p.x + prevP.x) / 2 + p.width;
          const cpY2 = (p.y + prevP.y) / 2;
          
          this.ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, p.x + p.width, p.y);
        }
        
        this.ctx.closePath();
        
        // Создаем более сложный градиент для языка пламени (от низа к верху)
        const gradient = this.ctx.createLinearGradient(
          baseX, baseY,
          baseX, baseY - currentHeight
        );
        
        // Градиент от горячего (внизу) к холодному (вверху) с более плавными переходами
        const hotColor = this.colors.hot;
        const warmColor = this.colors.warm;
        const mediumColor = this.colors.medium;
        const coolColor = this.colors.cool;
        
        const opacity = flame.opacity * (0.85 + Math.sin(time * 1.5 + flame.phase) * 0.15); // Мерцание прозрачности
        
        gradient.addColorStop(0, `rgba(${hotColor.r}, ${hotColor.g}, ${hotColor.b}, ${opacity * 0.95})`);
        gradient.addColorStop(0.15, `rgba(${hotColor.r}, ${hotColor.g}, ${hotColor.b}, ${opacity * 0.9})`);
        gradient.addColorStop(0.35, `rgba(${warmColor.r}, ${warmColor.g}, ${warmColor.b}, ${opacity * 0.85})`);
        gradient.addColorStop(0.6, `rgba(${mediumColor.r}, ${mediumColor.g}, ${mediumColor.b}, ${opacity * 0.65})`);
        gradient.addColorStop(0.85, `rgba(${coolColor.r}, ${coolColor.g}, ${coolColor.b}, ${opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${coolColor.r}, ${coolColor.g}, ${coolColor.b}, 0)`);
        
        this.ctx.fillStyle = gradient;
        
        // Добавляем мягкое свечение вокруг языка с вариацией
        const shadowIntensity = opacity * (0.4 + Math.sin(time * 2 + flame.phase) * 0.2);
        this.ctx.shadowBlur = 10 + Math.sin(time * 1.8 + flame.phase) * 3;
        this.ctx.shadowColor = `rgba(255, 122, 24, ${shadowIntensity})`;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      }
      
      // Добавляем тонкое свечение снизу для плавного перехода к рамке
      // Градиент должен быть низким и не перекрывать языки пламени
      const gradientHeight = 8; // Уменьшена высота, чтобы не перекрывать языки
      const centerX = width / 2;
      const radius = width * 0.8; // Радиус для эффекта обтекания
      
      // Создаем радиальный градиент только для самой нижней части
      const radialGradient = this.ctx.createRadialGradient(
        centerX, baseY, 0,
        centerX, baseY, radius
      );
      
      // Более мягкий градиент с быстрым затуханием
      radialGradient.addColorStop(0, 'rgba(255, 59, 26, 0.6)');
      radialGradient.addColorStop(0.2, 'rgba(255, 122, 24, 0.5)');
      radialGradient.addColorStop(0.5, 'rgba(255, 184, 74, 0.3)');
      radialGradient.addColorStop(0.8, 'rgba(255, 211, 106, 0.15)');
      radialGradient.addColorStop(1, 'rgba(255, 122, 24, 0)');
      
      // Рисуем градиент только в нижней части с плавными скругленными краями
      const cornerRadius = 6; // Радиус скругления для эффекта обтекания
      this.ctx.beginPath();
      
      // Начинаем от нижней границы
      this.ctx.moveTo(cornerRadius, baseY);
      this.ctx.quadraticCurveTo(0, baseY, 0, baseY - cornerRadius);
      
      // Левая сторона
      this.ctx.lineTo(0, baseY - gradientHeight);
      
      // Верхняя часть с плавным затуханием
      this.ctx.lineTo(width, baseY - gradientHeight);
      
      // Правая сторона
      this.ctx.lineTo(width, baseY - cornerRadius);
      this.ctx.quadraticCurveTo(width, baseY, width - cornerRadius, baseY);
      
      this.ctx.closePath();
      this.ctx.fillStyle = radialGradient;
      
      // Применяем размытие для более мягкого эффекта
      this.ctx.filter = 'blur(3px)';
      this.ctx.fill();
      this.ctx.filter = 'none';
      
      // Добавляем очень тонкий дополнительный слой для плавного перехода
      const softGradient = this.ctx.createLinearGradient(0, baseY, 0, baseY - gradientHeight);
      softGradient.addColorStop(0, 'rgba(255, 122, 24, 0.3)');
      softGradient.addColorStop(0.5, 'rgba(255, 184, 74, 0.15)');
      softGradient.addColorStop(1, 'rgba(255, 122, 24, 0)');
      
      this.ctx.fillStyle = softGradient;
      this.ctx.fill();
      
      // Добавляем больше случайных искр для рассеянности
      for (let i = 0; i < 3; i++) {
        if (Math.random() > 0.75) {
          const sparkX = Math.random() * width;
          const sparkY = baseY - 2 - Math.random() * 10;
          const sparkSize = 1.5 + Math.random() * 2.5;
          const sparkOpacity = 0.7 + Math.random() * 0.3;
          const sparkGradient = this.ctx.createRadialGradient(sparkX, sparkY, 0, sparkX, sparkY, sparkSize);
          sparkGradient.addColorStop(0, `rgba(255, 211, 106, ${sparkOpacity})`);
          sparkGradient.addColorStop(0.4, `rgba(255, 184, 74, ${sparkOpacity * 0.6})`);
          sparkGradient.addColorStop(1, 'rgba(255, 211, 106, 0)');
          this.ctx.fillStyle = sparkGradient;
          this.ctx.beginPath();
          this.ctx.arc(sparkX, sparkY, sparkSize, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
    
    animate() {
      if (!this.isVisible) {
        this.animationId = null;
        return;
      }
      
      this.time++;
      this.drawFlame();
      
      this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
      // Всегда перезапускаем анимацию если элемент виден
      if (this.isVisible && !this.animationId) {
        this.animate();
      }
    }
    
    stop() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
        // Не очищаем canvas, чтобы пламя оставалось видимым при быстром скролле
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
  
  // Инициализация эффекта пламени для всех canvas элементов
  const flameCanvases = document.querySelectorAll('.flame-canvas');
  flameCanvases.forEach(canvas => {
    new FlameEffect(canvas);
  });

});


// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get scroll percentage
function getScrollPercentage() {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return (window.pageYOffset / windowHeight) * 100;
}
