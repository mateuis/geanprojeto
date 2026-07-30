AOS.init({duration:800, once:true, easing:'ease-out-cubic'});

/* Custom cursor */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;
window.addEventListener('mousemove', e=>{
  mx=e.clientX; my=e.clientY;
  dot.style.left=mx+'px'; dot.style.top=my+'px';
});
function loop(){
  rx += (mx-rx)*0.16; ry += (my-ry)*0.16;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(loop);
}
loop();
document.querySelectorAll('a,button,input,textarea,.faq-q').forEach(el=>{
  el.addEventListener('mouseenter', ()=>ring.classList.add('active'));
  el.addEventListener('mouseleave', ()=>ring.classList.remove('active'));
});

/* Progress bar */
const progressBar = document.querySelector('.progress-bar');
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const scrolled = (h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  progressBar.style.width = scrolled+'%';
});

/* Smart navbar */
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', ()=>{
  const cur = window.scrollY;
  navbar.classList.toggle('scrolled', cur>60);
  if(cur>lastScroll && cur>200){ navbar.classList.add('hide'); }
  else { navbar.classList.remove('hide'); }
  lastScroll = cur;
});

/* Mobile nav toggle */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', ()=>{
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navLinks.classList.remove('open')));

/* Back to top */
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', ()=>{
  toTop.classList.toggle('show', window.scrollY>500);
});
toTop.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));

/* FAQ accordion */
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  if(item.classList.contains('open')){ a.style.maxHeight = a.scrollHeight+'px'; }
  q.addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>{
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight+'px';
    }
  });
});

/* Animated counters */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = Math.max(target/60,1);
      const tick = ()=>{
        cur += step;
        if(cur>=target){ el.textContent = target+suffix; }
        else { el.textContent = Math.floor(cur)+suffix; requestAnimationFrame(tick); }
      };
      tick();
      counterObserver.unobserve(el);
    }
  });
},{threshold:0.5});
counters.forEach(c=>counterObserver.observe(c));

/* Contact form (front-end demo — connect to backend/CRM as needed) */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value;

    const texto = `
📋 *Novo Pedido de Orçamento*

👤 Nome: ${nome}
📞 Telefone: ${telefone}
📧 E-mail: ${email}
🛠 Serviço: ${servico}

📝 Mensagem:
${mensagem}
`;

    const numero = "119463336771"; // Seu número
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");

    this.reset();
});
