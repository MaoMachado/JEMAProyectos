<script>
import { ref, onMounted, watch } from 'vue';

export default {
  name: "FooterContainer",

  setup() {
    const currentYear = ref(new Date().getFullYear())
    const isVisible = ref(false)

    const companyInfo = {
      name: "JemaProyectos",
      slogan: "Construyendo Futuro Con Excelencia",
      description: "Ingeniería civil de vanguardia para proyectos que transforman espacios y mejorar vidas",
      phone: "+57 316 927 4523",
      email: "jdmachadoa@gmail.com",
      address: "Medellin, Colombia"
    }

    const navLinks = [
      { text: 'Inicio', route: '/' },
      { text: 'Proyectos', route: '/proyectos' },
      { text: 'Contacto', route: '/contacto' },
    ]

    const services = [
      'Diseño Estructural',
      'Supervisión de Obra',
      'Consultoria Tecnica',
      'Gestion De Proyectos',
      'Estudio De Suelos'
    ]

    const socialLinks = [
      {
        name: 'WhatsApp',
        url: 'https://wa.me/573169274523',
        icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/profile.php?id=61554872667407&rdid=QOlhmLX6wjcJ65CM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15ysM2BARH%2F',
        icon: ''
      }
    ]

    onMounted(() => {
      setTimeout(() => {
        isVisible.value = true
      }, 100)
    })

    return {
      currentYear,
      companyInfo,
      navLinks,
      services,
      socialLinks,
      isVisible
    }
  }
}
</script>

<template>
  <footer class="footer" :class="{ visible: isVisible }" role="contentinfo" aria-labelledby="header-title">
    <!-- Linea decorativa superior -->
    <div class="footer-accent-line"></div>

    <div class="footer-container">
      <section class="footer-section footer-main">
        <div class="company-brand">
          <h2 class="company-name">{{ companyInfo.name }}</h2>
          <p class="company-slogan">{{ companyInfo.slogan }}</p>
        </div>
        <p class="company-description">{{ companyInfo.description }}</p>

        <!-- Certificaciones/Badges -->
        <div class="certifications">
          <span class="badge">ISO 9001</span>
          <span class="badge">10+ Años</span>
          <span class="badge">100+ Proyectos</span>
        </div>
      </section>

      <!-- Navegación Rápida -->
      <section class="footer-section">
        <h3 class="section-title">
          <span class="title-text">Enlaces Rápidos</span>
          <span class="title-decoration"></span>
        </h3>
        <nav class="footer-nav" aria-label="Enlaces del footer">
          <router-link v-for="link in navLinks" :key="link.route" :to="link.route" class="nav-link">
            <span class="link-arrow">-></span>
            {{ link.text }}
          </router-link>
        </nav>
      </section>

      <!-- Servicios -->
      <section class="footer-section">
        <h3 class="section-title">
          <span class="title-text">Servicios</span>
          <span class="title-decoration"></span>
        </h3>

        <ul class="services-list">
          <li class="service-item" v-for="servicie in services" :key="servicie">
            <svg class="service-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            {{ servicie }}
          </li>
        </ul>
      </section>

      <!-- Contacto -->
      <section class="footer-section">
        <h3 class="section-title">
          <span class="title-text">Contacto</span>
          <span class="title-decoration"></span>
        </h3>

        <div class="contact-info">
          <a href="tel:+573169274523" class="contact-item">
            <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{{ companyInfo.phone }}</span>
          </a>

          <a :href="`mailto:$companyInfo.email`" class="contact-item">
            <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>{{ companyInfo.email }}</span>
          </a>

          <div class="contact-item">
            <svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{{ companyInfo.address }}</span>
          </div>
        </div>
      </section>

      <!-- Redes Sociales -->
      <section class="social-section">
        <p class="social-title">Síguenos</p>
        <div class="social-links">
          <a class="social-link" v-for="social in socialLinks" :key="social.name" :href="social.url"
            :aria-label="`Visitar ${social.name}`" target="_blank" rel="noreferrer noopener">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path :d="social.icon" />
            </svg>
          </a>
        </div>
      </section>
    </div>

    <!-- Barra inferior con derechos -->
    <section class="footer-bottom">
      <div class="footer-bottom-container">
        <p class="copyright">
          © {{ currentYear }} <strong>{{ companyInfo.name }}</strong>. Todos los derechos reservados.
        </p>

        <div class="footer-bottom-links">
          <router-link to="/privacidad" class="bottom-link">Políticas de Privacidad</router-link>
          <span class="separator">•</span>
          <router-link to="/terminos" class="bottom-link">Términos y Condiciones</router-link>
        </div>

        <p class="developer">
          Diseñado con
          <svg class="heart-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          por <strong>MaoMachado</strong>
        </p>
      </div>
    </section>
  </footer>
</template>

<style scoped>
.footer {
  --footer-bg: linear-gradient(135deg, #0f1419 0%, #1a2332 100%);
  --footer-text: rgba(255, 255, 255, 0.9);
  --footer-text-dim: rgba(255, 255, 255, 0.6);
  --footer-border: rgba(255, 255, 255, 0.1);
  --footer-hover: var(--naranja);

  position: relative;
  background: var(--footer-bg);
  color: var(--footer-text);
  margin-top: auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.footer.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Linea decorativa superior */
.footer-accent-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
      var(--azul-principal) 0%,
      var(--naranja) 25%,
      var(--verde) 50%,
      var(--azul-claro) 75%,
      var(--azul-principal) 100%);
  background-size: 200% 100%;
  animation: gradientMove 10s linear infinite
}

@keyframes gradientMove {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 200% 0%;
  }
}

/* Contenido Principal */
.footer-container {
  width: 80%;
  margin: 0 auto;
  padding: 4px 2px 3px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
}

/* Sección Footer */
.footer-section {
  padding-top: 0.5rem;
  animation: fadeInUp 0.6s ease-in;
  animation-fill-mode: both;
}

.footer-section:nth-child(1) {
  animation-delay: 0.1s;
}

.footer-section:nth-child(2) {
  animation-delay: 0.2s;
}

.footer-section:nth-child(3) {
  animation-delay: 0.3s;
}

.footer-section:nth-child(4) {
  animation-delay: 0.4s;
}

.footer-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.company-brand {
  margin-bottom: 0.5rem;
}

.company-name {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, var(--blanco) 0%, var(--azul-claro) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.company-slogan {
  font-size: 1.1rem;
  color: var(--footer-hover);
  margin: 0;
  font-weight: 500;
}

.company-description {
  color: var(--footer-text-dim);
  line-height: 1.8;
  margin: 0;
}

/* Certificaciones */
.certifications {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.badge {
  padding: 0.4rem 0.8rem;
  background: rgba(255, 133, 51, 0.1);
  border: 1px solid var(--naranja-50);
  border-radius: 0.85rem;
  color: var(--naranja);
  font-weight: 500;
  transition: all 0.3s ease;
}

.badge:hover {
  background: var(--naranja);
  color: var(--blanco);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--naranja-50);
}

/* Titulo de sección */
.section-title {
  position: relative;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: var(--footer-text);
}

.title-text {
  position: relative;
  z-index: 1;
}

.title-decoration {
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 3px;
  background: var(--footer-hover);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.footer-section:hover .title-decoration {
  width: 60px;
}

/* Navegación */
.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nav-link {
  color: var(--footer-text-dim);
  text-decoration: none;
  padding: 0.25rem 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.link-arrow {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  color: var(--footer-hover);
}

.nav-link:hover {
  color: var(--footer-hover);
  transform: translateX(5px);
}

.nav-link:hover .link-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Lista de servicios */
.services-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.service-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--footer-text-dim);
  transition: all 0.3s ease;
}

.service-icon {
  color: var(--verde);
  flex-shrink: 0;
}

.service-item:hover {
  color: var(--footer-text);
  transform: translateX(5px);
}

/* Información de contacto */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--footer-text-dim);
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-icon {
  flex-shrink: 0;
  color: var(--azul-claro);
}

.contact-item:hover {
  color: var(--footer-hover);
  transform: translateX(5px);
}

/* Redes sociales */
.social-section {
  padding-block: 1rem;
  border-top: 1px solid var(--footer-border);
}

.social-title {
  font-size: 0.9rem;
  color: var(--footer-text-dim);
  margin: 0 0 1rem 0;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--footer-border);
  border-radius: 50%;
  color: var(--footer-text-dim);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--footer-hover);
  border-color: var(--footer-hover);
  color: var(--blanco);
  transform: translateY(-4px) rotate(5deg);
  box-shadow: 0 8px 20px var(--naranja-50);
}

/* Barra inferior */
.footer-bottom {
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid var(--footer-border);
  padding: 1.5rem 0;
}

.footer-bottom-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  margin: 0;
  color: var(--footer-text-dim);
  font-size: 0.9rem;
}

.copyright strong {
  color: var(--footer-text);
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bottom-link {
  color: var(--footer-text-dim);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.bottom-link:hover {
  color: var(--footer-hover);
}

.separator {
  color: var(--footer-text-dim);
  font-size: 0.8rem;
}

.developer {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  color: var(--footer-text-dim);
  font-size: 0.85rem;
}

.heart-icon {
  color: #e74c3c;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }
}

.developer strong {
  color: var(--footer-hover);
  font-weight: 600;
}

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media screen and (max-width: 1024px) {
  .footer-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  .footer-main {
    grid-column: span 2;
  }
}

@media screen and (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    padding: 3rem 1.5rem 2rem;
    gap: 2.5rem;
    text-align: center;
  }

  .footer-main {
    grid-column: span 1;
  }

  .company-name {
    font-size: 1.75rem;
  }

  .certifications {
    justify-content: center;
  }

  .section-title {
    text-align: center;
  }

  .title-decoration {
    left: 50%;
    transform: translateX(-50%);
  }

  .footer-nav,
  .services-list,
  .contact-info {
    align-items: center;
  }

  .nav-link,
  .service-item,
  .contact-item {
    justify-content: center;
  }

  .nav-link:hover,
  .service-item:hover,
  .contact-item:hover {
    transform: translateX(0) scale(1.05);
  }

  .social-links {
    justify-content: center;
  }

  .footer-bottom-container {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}

/* Reducción de movimiento */
@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>