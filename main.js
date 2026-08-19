/**
 * Portfolio — Gustavo Parpinelli
 * main.js
 *
 * Organizado em pequenos módulos independentes, cada um responsável por
 * um único efeito. Todos respeitam prefers-reduced-motion.
 */

(function () {
  'use strict';

  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IS_TOUCH = window.matchMedia('(pointer: coarse)').matches;

  /* ------------------------------------------------------------------
   * ScrollReveal — anima elementos .reveal quando entram na viewport
   * ---------------------------------------------------------------- */
  const ScrollReveal = {
    init() {
      const items = document.querySelectorAll('.reveal');

      if (REDUCED_MOTION || !('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('in-view'));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      items.forEach((el) => observer.observe(el));
    },
  };

  /* ------------------------------------------------------------------
   * HeroIntro — revela o título do hero (efeito cortina) ao carregar
   * ---------------------------------------------------------------- */
  const HeroIntro = {
    init() {
      const title = document.getElementById('heroTitle');
      if (!title) return;

      if (REDUCED_MOTION) {
        title.classList.add('in-view');
        return;
      }

      requestAnimationFrame(() => {
        setTimeout(() => title.classList.add('in-view'), 80);
      });
    },
  };

  /* ------------------------------------------------------------------
   * Typewriter — efeito de digitação em loop na linha de terminal
   * ---------------------------------------------------------------- */
  const Typewriter = {
    lines: [
      'engenheiro de software',
      'java · node.js · react',
      'aberto a novas oportunidades',
    ],

    init() {
      const el = document.getElementById('typewriter');
      if (!el) return;

      if (REDUCED_MOTION) {
        el.textContent = this.lines[0];
        return;
      }

      let lineIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const current = this.lines[lineIndex];

        if (!deleting) {
          charIndex++;
          el.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            setTimeout(tick, 1600);
            return;
          }
          setTimeout(tick, 45);
        } else {
          charIndex--;
          el.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            lineIndex = (lineIndex + 1) % this.lines.length;
            setTimeout(tick, 300);
            return;
          }
          setTimeout(tick, 25);
        }
      };

      setTimeout(tick, 900);
    },
  };

  /* ------------------------------------------------------------------
   * MagneticButtons — botões que se deslocam levemente em direção ao cursor
   * ---------------------------------------------------------------- */
  const MagneticButtons = {
    init() {
      if (REDUCED_MOTION || IS_TOUCH) return;

      document.querySelectorAll('.magnetic').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate(0,0)';
        });
      });
    },
  };

  /* ------------------------------------------------------------------
   * CustomCursor — cursor customizado com anel que segue com atraso (lerp)
   * ---------------------------------------------------------------- */
  const CustomCursor = {
    init() {
      if (REDUCED_MOTION || IS_TOUCH) return;

      this.dot = document.querySelector('.cursor-dot');
      this.ring = document.querySelector('.cursor-ring');
      if (!this.dot || !this.ring) return;

      this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      this.ringPos = { ...this.mouse };

      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.dot.style.left = e.clientX + 'px';
        this.dot.style.top = e.clientY + 'px';
      });

      document
        .querySelectorAll('a, button, .skill-card, .project-feature-card')
        .forEach((el) => {
          el.addEventListener('mouseenter', () => this.ring.classList.add('hovering'));
          el.addEventListener('mouseleave', () => this.ring.classList.remove('hovering'));
        });

      const loop = () => {
        this.ringPos.x += (this.mouse.x - this.ringPos.x) * 0.18;
        this.ringPos.y += (this.mouse.y - this.ringPos.y) * 0.18;
        this.ring.style.left = this.ringPos.x + 'px';
        this.ring.style.top = this.ringPos.y + 'px';
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    },
  };

  /* ------------------------------------------------------------------
   * HeroGrid — fundo de pontos animado no hero, reage à posição do mouse
   * ---------------------------------------------------------------- */
  const HeroGrid = {
    init() {
      const canvas = document.getElementById('heroCanvas');
      const hero = document.querySelector('.hero');
      if (!canvas || !hero) return;

      const ctx = canvas.getContext('2d');
      let width, height, dots;
      let mouse = { x: -9999, y: -9999 };

      const SPACING = 34;
      const RADIUS = 1.4;
      const REACT_RADIUS = 130;

      const resize = () => {
        width = canvas.width = hero.offsetWidth;
        height = canvas.height = hero.offsetHeight;
        dots = [];
        for (let x = SPACING / 2; x < width; x += SPACING) {
          for (let y = SPACING / 2; y < height; y += SPACING) {
            dots.push({ x, y });
          }
        }
      };

      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        for (const d of dots) {
          const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
          const proximity = Math.max(0, 1 - dist / REACT_RADIUS);
          const r = RADIUS + proximity * 2.2;
          ctx.beginPath();
          ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
          ctx.fillStyle = proximity > 0
            ? `rgba(47, 174, 102, ${0.15 + proximity * 0.55})`
            : 'rgba(11, 11, 11, 0.10)';
          ctx.fill();
        }
      };

      if (REDUCED_MOTION) {
        resize();
        draw();
        window.addEventListener('resize', () => { resize(); draw(); });
        return;
      }

      resize();
      const loop = () => { draw(); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);

      window.addEventListener('resize', resize);
      hero.addEventListener('mousemove', (e) => {
        const r = hero.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      });
      hero.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
      });
    },
  };

  /* ------------------------------------------------------------------
   * ScrollProgress — barra fina no topo indicando o progresso de leitura
   * ---------------------------------------------------------------- */
  const ScrollProgress = {
    init() {
      const bar = document.querySelector('.progress-bar');
      if (!bar) return;

      const update = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
      };

      update();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
    },
  };

  /* ------------------------------------------------------------------
   * ActiveNav — destaca no menu o link da seção visível no momento
   * ---------------------------------------------------------------- */
  const ActiveNav = {
    init() {
      const sections = document.querySelectorAll('section[id]');
      const links = document.querySelectorAll('.nav-links a');
      if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

      const linkFor = (id) =>
        document.querySelector(`.nav-links a[href="#${id}"]`);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const link = linkFor(entry.target.id);
            if (!link) return;
            if (entry.isIntersecting) {
              links.forEach((l) => l.classList.remove('active'));
              link.classList.add('active');
            }
          });
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );

      sections.forEach((s) => observer.observe(s));
    },
  };

  /* ------------------------------------------------------------------
   * CopyEmail — copia o e-mail para a área de transferência ao clicar
   * ---------------------------------------------------------------- */
  const CopyEmail = {
    init() {
      const link = document.querySelector('[data-copy-email]');
      if (!link) return;

      link.addEventListener('click', (e) => {
        const email = link.dataset.copyEmail;
        if (!email || !navigator.clipboard) return;

        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
          const original = link.querySelector('.label-text').textContent;
          link.querySelector('.label-text').textContent = 'e-mail copiado!';
          link.classList.add('copied');
          setTimeout(() => {
            link.querySelector('.label-text').textContent = original;
            link.classList.remove('copied');
          }, 1800);
        });
      });
    },
  };

  /* ------------------------------------------------------------------
   * Init
   * ---------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    ScrollReveal.init();
    HeroIntro.init();
    Typewriter.init();
    MagneticButtons.init();
    CustomCursor.init();
    HeroGrid.init();
    ScrollProgress.init();
    ActiveNav.init();
    CopyEmail.init();
  });
})();