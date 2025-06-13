// --- TYPING ANIMATION ---
const typingTexts = ["Frontend Developer", "Web Designer", "UI/UX Enthusiast"];
let typingIndex = 0;
let charIndex = 0;
const typingSpan = document.querySelector('.multiple-text');

function type() {
    if (charIndex < typingTexts[typingIndex].length) {
        typingSpan.textContent += typingTexts[typingIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 1200);
    }
}

function erase() {
    if (charIndex > 0) {
        typingSpan.textContent = typingTexts[typingIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 60);
    } else {
        typingIndex = (typingIndex + 1) % typingTexts.length;
        setTimeout(type, 400);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (typingTexts.length && typingSpan) setTimeout(type, 800);
});

// --- NAVBAR ACTIVE LINK ON SCROLL ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 80;
    sections.forEach(section => {
        if (
            fromTop >= section.offsetTop &&
            fromTop < section.offsetTop + section.offsetHeight
        ) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === section.getAttribute('id')) {
                    link.classList.add('active');
                }
            });
        }
    });
    // Sticky header
    const header = document.querySelector('.header');
    if (window.scrollY > 100) header.classList.add('sticky');
    else header.classList.remove('sticky');

    // Show/hide back-to-top
    document.querySelector('.footer-iconTop').style.opacity = window.scrollY > 200 ? '1' : '0';
    document.querySelector('.footer-iconTop').style.pointerEvents = window.scrollY > 200 ? 'auto' : 'none';
});
// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.hash && document.querySelector(this.hash)) {
            e.preventDefault();
            document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// --- SCROLL REVEAL ANIMATIONS ---
function revealOnScroll(cls, direction = 'up') {
    const elements = document.querySelectorAll(cls);
    const isInViewport = el => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight - 100;
    };
    const show = el => {
        el.classList.add('reveal');
        el.setAttribute('data-visible', 'true');
    };
    function reveal() {
        elements.forEach(el => {
            if (!el.classList.contains('reveal') && isInViewport(el)) {
                show(el);
            }
        });
    }
    window.addEventListener('scroll', reveal);
    reveal();
}

document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll('.services-box');
    revealOnScroll('.about-content');
    revealOnScroll('.portfolio-box');
});

// --- DARK MODE TOGGLE ---
const toggleBtn = document.createElement('button');
toggleBtn.innerHTML = '<i class="fa fa-moon"></i>';
toggleBtn.style.position = 'fixed';
toggleBtn.style.bottom = '2rem';
toggleBtn.style.left = '2rem';
toggleBtn.style.background = '#222';
toggleBtn.style.color = '#fff';
toggleBtn.style.border = 'none';
toggleBtn.style.padding = '1rem 1.2rem';
toggleBtn.style.borderRadius = '50%';
toggleBtn.style.cursor = 'pointer';
toggleBtn.style.zIndex = '999';
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fa fa-sun"></i>' : '<i class="fa fa-moon"></i>';
});

// --- DARK MODE CSS ---
const darkModeCSS = `body.dark-mode {
  --bg-color: #181818;
  --snd-bg-color: #252525;
  --text-color: #f5f5f5;
  --main-color: #31c6e9;
  transition: background 0.6s, color 0.6s;
}`;
const styleTag = document.createElement('style');
styleTag.innerText = darkModeCSS;
document.head.appendChild(styleTag);

// --- PARALLAX HERO BG (subtle) ---
const homeSection = document.querySelector('.home');
if (homeSection) {
    homeSection.addEventListener('mousemove', function(e) {
        const x = (e.clientX - window.innerWidth / 2) * 0.02;
        const y = (e.clientY - window.innerHeight / 2) * 0.03;
        this.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    });
    homeSection.style.background = 'radial-gradient(ellipse at 60% 60%, rgba(49,198,233,0.08), transparent 70%)';
}

// --- ANIMATED PROJECT CARD HOVER ---
document.querySelectorAll('.portfolio-box').forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transition = 'transform 0.5s cubic-bezier(0.56,2,0.8,1), box-shadow 0.4s';
        box.style.transform = 'translateY(-10px) scale(1.04)';
        box.style.boxShadow = '0 8px 24px rgba(49,198,233,0.4)';
    });
    box.addEventListener('mouseleave', () => {
        box.style.transform = '';
        box.style.boxShadow = '';
    });
});

// --- SAMPLE SKILL PROGRESS BARS ---
if (!document.querySelector('.skills')) {
    const about = document.getElementById('about');
    const skillsSection = document.createElement('section');
    skillsSection.className = 'skills';
    skillsSection.innerHTML = `
        <h2 class="heading">My <span>Skills</span></h2>
        <div class="skills-bars">
            <div class="skill"><span>HTML</span> <div class="bar"><div class="fill" style="width:0"></div></div></div>
            <div class="skill"><span>CSS</span> <div class="bar"><div class="fill" style="width:0"></div></div></div>
            <div class="skill"><span>JavaScript</span> <div class="bar"><div class="fill" style="width:0"></div></div></div>
            <div class="skill"><span>React</span> <div class="bar"><div class="fill" style="width:0"></div></div></div>
        </div>
    `;
    about.parentNode.insertBefore(skillsSection, about.nextSibling);
    // Add CSS
    const barCSS = `.skills-bars{max-width:500px;margin:3rem auto}.skill{margin:2rem 0;font-size:2rem}.bar{background:#333;height:22px;border-radius:14px;overflow:hidden;width:70%;display:inline-block;margin-left:1.5rem;vertical-align:middle}.fill{display:inline-block;height:100%;border-radius:12px;background:var(--main-color);width:0;transition:width 1.8s cubic-bezier(.32,2,.55,.27)}`;
    const barTag = document.createElement('style');
    barTag.innerText = barCSS;
    document.head.appendChild(barTag);
    // Animate bars on scroll
    window.addEventListener('scroll', animateBars);
    function animateBars() {
        if (skillsSection.getBoundingClientRect().top < window.innerHeight - 80) {
            const widths = ["95%","90%","88%","75%"];
            document.querySelectorAll('.skills .fill').forEach((fill, i) => {
                fill.style.width = widths[i];
            });
            window.removeEventListener('scroll', animateBars);
        }
    }
    animateBars();
}

// --- CONTACT FORM VALIDATION ---
const form = document.forms['submit-to-google-sheet'];
if (form) {
    form.addEventListener('submit', function (e) {
        let valid = true;
        form.querySelectorAll('input[required], textarea[required]').forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.border = '2px solid #e74c3c';
                input.classList.add('shake');
                setTimeout(()=>{
                 input.classList.remove('shake');
                 input.style.border = '';
                },600);
            }
        });
        if (!valid) {
            e.preventDefault();
            document.getElementById('msg').textContent = 'Please fill all required fields!';
            setTimeout(()=> document.getElementById('msg').textContent = '', 2500);
        }
    });
}

// --- BACK TO TOP ANIMATION ---
const topBtn = document.querySelector('.footer-iconTop');
if(topBtn) {
    topBtn.style.opacity='0';
    topBtn.style.transition='opacity 0.5s';
}

// === FUTURISTIC BACKGROUND MOTION: PARTICLE CANVAS ===
(function futuristicBackground() {
    // Create canvas if not present
    let canvas = document.getElementById('futuristic-bg-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'futuristic-bg-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.zIndex = '0';
        canvas.style.pointerEvents = 'auto';
        canvas.style.display = 'block';
        canvas.style.background = 'transparent';
        document.body.insertBefore(canvas, document.body.firstChild);
        // Make sure body has no margin/padding for full viewport
        document.body.style.margin = '0';
        document.body.style.padding = '0';
    }
    // Make sure all content is above the canvas
    document.body.childNodes.forEach(node => {
        if (node.nodeType === 1 && node !== canvas) {
            node.style && (node.style.position = node.style.position || 'relative');
            node.style && (node.style.zIndex = node.style.zIndex || '1');
        }
    });

    const ctx = canvas.getContext('2d');
    let particles = [], mouse = {x:null,y:null};
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#00fff7','#00c6ff','#27e1fa','#0fffc2','#0af','rgba(0,255,255,0.7)'];
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2.5 + 0.6;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = 0.4 + Math.random() * 0.9;
        this.angle = Math.random() * Math.PI * 2;
        this.alpha = 0.56 + Math.random() * 0.35;
    }
    Particle.prototype.draw = function() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    };
    Particle.prototype.update = function() {
        this.angle += (Math.random()-0.5)*0.04;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if(this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
    };
    function createParticles() {
        particles = [];
        let density = Math.floor((canvas.width*canvas.height)/4000);
        for (let i=0; i<density; i++) particles.push(new Particle());
    }
    createParticles();
    window.addEventListener('resize', createParticles);

    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    canvas.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });

    function drawLines() {
        for (let i=0; i<particles.length; i++) {
            for (let j=i+1; j<particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx+dy*dy);
                if (dist<80) {
                    ctx.save();
                    ctx.globalAlpha = 0.06 + (80-dist)/180;
                    ctx.strokeStyle = '#00fff7';
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }
    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (let p of particles) {
            p.update();
            p.draw();
            // Draw a highlight when mouse is near
            if(mouse.x && mouse.y) {
              let d = Math.hypot(mouse.x-p.x, mouse.y-p.y);
              if(d<80) {
                ctx.save();
                ctx.globalAlpha = 0.09 + (80-d)/100;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius+4, 0, Math.PI*2);
                ctx.strokeStyle = '#00fff7';
                ctx.shadowColor = '#00fff7';
                ctx.shadowBlur = 18;
                ctx.stroke();
                ctx.restore();
              }
            }
        }
        drawLines();
        requestAnimationFrame(animate);
    }
    animate();
})();
