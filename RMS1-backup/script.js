/*=========================================
RMS Segurança Eletrônica
script.js
==========================================*/

// ===== Loader =====

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
// Garante que o loader fique visível por pelo menos 3 segundos
        setTimeout(() => {
            loader.classList.add("hidden");
            setTimeout(() => {
                if (loader.parentNode) loader.parentNode.removeChild(loader);
            }, 600);
        }, 3000);
    }
});


// Header Scroll

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.style.background = "rgba(5,12,24,.95)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    }else{

        header.style.background = "rgba(5,12,24,.55)";
        header.style.boxShadow = "none";

    }

});


// Scroll Reveal

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:.15});

document.querySelectorAll(".service-box, .number, .advantage-card, .about-image, .about-text, .testimonial-card, .budget-form").forEach(el=>{

  el.classList.add("hidden");

  observer.observe(el);

});


// Contadores

const counters = document.querySelectorAll(".number h2");

const numericCounters = Array.from(counters).filter(counter => /\d/.test(counter.innerText));

let started = false;

function startCounter(){

if(started) return;

started=true;

numericCounters.forEach(counter=>{

const shouldKeepPlus = counter.innerText.includes("+");
let target = parseInt(counter.innerText.replace(/\D/g,''));

let count = 0;

let speed = target/100;

counter.innerText = shouldKeepPlus ? "0+" : "0";

let timer = setInterval(()=>{

count += speed;

if(count >= target){

counter.innerText = shouldKeepPlus ? target+"+" : target;

clearInterval(timer);

}else{

counter.innerText = shouldKeepPlus ? `${Math.floor(count)}+` : Math.floor(count);

}

},20);

});

}

window.addEventListener("scroll",()=>{

const section=document.querySelector(".numbers");

if(!section) return;

const pos=section.offsetTop-500;

if(window.scrollY>pos){

startCounter();

}

});


// Formulário de orçamento

const budgetForm = document.getElementById("budget-form");

if (budgetForm) {

    const serviceOptions = document.querySelectorAll(".service-option");

    serviceOptions.forEach(option => {

        option.addEventListener("click", () => {

            serviceOptions.forEach(item => item.classList.remove("active"));

            option.classList.add("active");

            const radio = option.querySelector("input[type='radio']");

            if (radio) radio.checked = true;

        });

    });

    budgetForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const formData = new FormData(budgetForm);

        const nome = formData.get("nome")?.toString().trim() || "Cliente";

        const telefone = formData.get("telefone")?.toString().trim() || "";

        const servico = formData.get("servico")?.toString().trim() || "";

        const mensagem = formData.get("mensagem")?.toString().trim() || "";

        const text = `Olá! Meu nome é ${nome} e estou entrando em contato para solicitar um orçamento referente a ${servico}.\n\nTelefone para retorno: ${telefone}.\n\nMensagem: ${mensagem}\n\nAgradeço desde já pela atenção.`;

        const whatsappUrl = `https://wa.me/5531992575817?text=${encodeURIComponent(text)}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    });

}

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('active');
        });
    });

window.addEventListener('resize', () => {
        if (window.innerWidth > 820) {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('active');
        }
    });
}


// ===== Fundo animado de partículas =====

(function () {
    const canvas = document.getElementById("particles-bg");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Cores do tema RMS (mantidas as mesmas)
    const COLORS = ["#2FB9FF", "#156BFF", "#7fd1ff"];

    let particles = [];
    let w, h;
    let raf;

function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = document.documentElement.scrollHeight || window.innerHeight;
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createParticle() {
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: random(-0.4, 0.4),
            vy: random(-0.4, 0.4),
            radius: random(1, 2.6),
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: random(0.4, 1)
        };
    }

    function init() {
        resize();
        const base = Math.floor((w * h) / 16000);
        const count = Math.min(Math.max(base, 40), 130);
        particles = Array.from({ length: count }, createParticle);
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        // Linhas de conexão entre partículas próximas
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i];
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);
                const maxDist = 130;
                if (dist < maxDist) {
                    const opacity = (1 - dist / maxDist) * 0.35;
                    ctx.strokeStyle = `rgba(47, 185, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        // Desenha as partículas
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Rebote nas bordas
            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;
            if (p.y < -10) p.y = h + 10;
            if (p.y > h + 10) p.y = -10;

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalAlpha = 1;

        raf = requestAnimationFrame(draw);
    }

window.addEventListener("resize", () => {
        resize();
    });

    window.addEventListener("scroll", () => {
        resize();
    });

    init();
    draw();

// Pausa a animação quando a aba não está visível
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(raf);
        } else {
            raf = requestAnimationFrame(draw);
        }
    });
})();


// ===== Cursor animado =====

(function () {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";
    });

    // O anel segue o mouse com suavidade (lerp)
    function animate() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";
        requestAnimationFrame(animate);
    }
    animate();

    // Efeito hover em elementos interativos
    const interactive = "a, button, input, textarea, select, label, .service-option, .footer i, .whatsapp";
    document.querySelectorAll(interactive).forEach(el => {
        el.addEventListener("mouseenter", () => ring.classList.add("hover"));
        el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
})();


