// CONFIGURA AQUÍ TU WHATSAPP
const WA_PHONE = '529981815541'; // Ejemplo: 52 + número a 10 dígitos
const DEFAULT_GREETING = 'Hola, estoy interesado(a) en sus productos de ferretería.';

// Helpers
function waLink(message) {
  const base = 'https://api.whatsapp.com/send';
  const text = encodeURIComponent(message);
  return `${base}?phone=${WA_PHONE}&text=${text}`;
}
function openWA(message) {
  window.open(waLink(message), '_blank', 'noopener');
}

// Anclar CTAs principales
const ctaHero = document.getElementById('ctaHero');
const ctaHeader = document.getElementById('ctaHeader');
const ctaContacto = document.getElementById('ctaContacto');
const waFloat = document.getElementById('waFloat');

[ctaHero, ctaHeader, ctaContacto, waFloat].forEach(el => {
  if (!el) return;
  el.href = waLink(DEFAULT_GREETING);
  el.addEventListener('click', (e) => {
    // permitir abrir en pestaña nueva sin bloquear
  });
});

// Botones de cards por categoría
document.querySelectorAll('.card-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const cat = e.currentTarget.dataset.category || 'Ferretería';
    openWA(`Hola, estoy interesado en la categoría: ${cat}. ¿Me apoyas con información?`);
  });
});

// Botones de productos destacados
document.querySelectorAll('.quote-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const prod = e.currentTarget.dataset.product || 'Producto';
    openWA(`Hola, quiero cotizar: ${prod}. ¿Disponibilidad y tiempo de entrega?`);
  });
});

// Formulario que arma el mensaje para WhatsApp
const form = document.getElementById('waForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const nombre = fd.get('nombre')?.trim() || 'Cliente';
    const categoria = fd.get('categoria') || 'Ferretería';
    const asunto = fd.get('asunto')?.trim() || '';
    const mensaje = fd.get('mensaje')?.trim() || '';

    const composed = [
      `Hola, soy ${nombre}.`,
      `Me interesa la categoría: ${categoria}.`,
      asunto ? `Asunto: ${asunto}.` : '',
      mensaje ? `Mensaje: ${mensaje}` : ''
    ].filter(Boolean).join(' ');

    openWA(composed || DEFAULT_GREETING);
  });
}

// Año en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú móvil
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
}