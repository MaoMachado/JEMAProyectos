<script>
import { onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useFadeIn } from '@/utils/useFadeIn';

import ImageCompare from '@/components/ImageCompare.vue';
import antes from '@/assets/img/imgComparacion/antes.webp';
import despues from '@/assets/img/imgComparacion/despues.webp';

export default {
  name: 'HomeView',

  components: {
    ImageCompare,
  },

  setup() {

    const imagenes = {
      antes,
      despues
    };

    const servicios = [
      {
        icon: "✏️",
        titulo: "Diseño Arquitectónico",
        descripcion: "Bocetos y esquemas para construcciones pequeñas y medianas",
        ariaLabel: "Lápiz"
      },
      {
        icon: '📐',
        titulo: 'Procesos Industriales',
        descripcion: 'Planificación de procesos industriales personalizados',
        ariaLabel: 'Escuadra'
      },
      {
        icon: '🏠',
        titulo: 'Modelos 2D',
        descripcion: 'Modelos conceptuales 2D para presentación de proyectos',
        ariaLabel: 'Casa'
      },
      {
        icon: '📊',
        titulo: 'Optimización',
        descripcion: 'Optimización de procesos para empresas pequeñas',
        ariaLabel: 'Gráfico'
      }
    ];

    const setupSEO = () => {
      document.title = 'JEMA Ingeniería Industrial | Diseño y Optimización de Proyectos'
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content',
          'JEMA Proyectos - Ingeniería industrial especializada en diseño de construcciones, planificación de procesos y optimización empresarial. Más de 10 años de experiencia.'
        )
      }
    };

    const restoreTitle = () => {
      document.title = 'JEMA - Joyas Personalizadas y Únicas | Diseño Artesanal'
    };

    onMounted(async () => {
      setupSEO()
      await nextTick()
    });

    onBeforeUnmount(() => {
      restoreTitle()
    });

    const { isVisible } = useFadeIn();

    return {
      isVisible,
      imagenes,
      servicios,
    }
  }
}
</script>

<template>
  <main class="inicio-container" role="main" aria-labelledby="inicio-title" :class="{ 'fade-in': isVisible }">
    <header class="hero-section" aria-labelledby="inicio-title">
      <div class="hero-content">
        <h1 id="inicio-title" class="hero-title">
          <span class="highlight">JEMA</span> PROYECTOS
        </h1>
        <p class="hero-subtitle">Ingeniería industrial al servicio de tus ideas</p>
        <div class="hero-badge">
          <span class="badge-text">+10 años de experiencia</span>
        </div>
      </div>
      <div class="hero-decoration"></div>
    </header>

    <section class="content-wrapper">

      <article v-scroll-fade-right class="section quien-soy-section" aria-labelledby="quien-soy-title">

        <div class="article-header">
          <h2 id="quien-soy-title" class="article-title">¿Quién Soy?</h2>
          <div class="title-underline"></div>
        </div>

        <div class="quien-soy-content">
          <div class="profile-card">
            <div class="profile-icon">👨‍💼</div>
            <div class="profile-info">
              <p class="profile-text">
                Soy <strong class="name-highlight">Jeison Machado</strong>, ingeniero industrial con más de <strong
                  class="experience-highlight">10 años de experiencia</strong> diseñando soluciones eficientes para
                proyectos residenciales e industriales. Trabajo desde mi oficina en casa, combinando precisión técnica
                con creatividad.
              </p>
              <p class="profiel-tagline">
                Trabajo desde mi oficina en casa, combinando precisión técnica con creatividad.
              </p>
            </div>
          </div>
        </div>
      </article>

      <article v-scroll-fade-right class="section servicios-section" aria-labelledby="que-hago-title">
        <div class="article-header">
          <h2 id="que-hago-title" class="article-title">¿Qué Hago?</h2>
          <div class="title-underline"></div>
        </div>

        <div class="servicios-grid">
          <div v-for="(servicio, index) in servicios" :key="index" class="servicio-card"
            :style="{ 'animation-delay': `${index * 0.1}s` }">
            <div class="card-icon">
              <span :aria-label="servicio.ariaLabel">{{ servicio.icon }}</span>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ servicio.title }}</h3>
              <p class="card-description">{{ servicio.descripcion }}</p>
            </div>
            <div class="card-hover-effect"></div>
          </div>
        </div>
      </article>

      <article v-scroll-fade-right class="section comparacion-section"
        aria-label="Comparación de diseño antes y después">
        <div class="article-header">
          <h2 class="article-title">Resultados Comprobados</h2>
          <div class="title-underline"></div>
          <p class="article-description">
            Mira la transformación que logro en cada proyecto
          </p>
        </div>

        <div class="image-compare-wrapper">
          <ImageCompare :before-image="imagenes.antes" :after-image="imagenes.despues" before-label="Diseño Inicial"
            after-label="Resultado Final" :initial-position="50" />
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.inicio-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-in-out;
}

.inicio-container.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 2rem;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
  color: white;
}

.highlight {
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  opacity: 0.9;
  margin-bottom: 1.5rem;
  font-weight: 300;
  color: white;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.badge-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  animation: float 20s ease-in-out infinite;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 2.5rem;
  padding: 3px 2px;
}

.section {
  margin-bottom: 3rem;
  /* opacity: 0; */
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.article-header {
  text-align: center;
  margin-bottom: 3rem;
}

.article-title {
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2rem;
}

.title-underline {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  border-radius: 2px;
  margin: auto;
  margin-bottom: 1.5rem;
}

.article-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.quien-soy-content {
  display: flex;
  justify-content: center;
}

.profile-card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 700px;
  border: 1px solid #e5e7eb;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.profile-icon {
  font-size: 3rem;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile-info {
  flex: 1;
}

.profile-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  text-align: justify;
}

.name-highlight {
  color: var(--primary-color);
  font-weight: 600;
}

.experience-highlight {
  color: var(--accent-color);
  font-weight: 600;
}

.profile-tagline {
  font-size: 1rem;
  color: var(--text-secondary);
  font-style: italic;
  margin: 0;
}

.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.servicio-card {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid #e5e7eb;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.servicio-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.servicio-card:hover .card-hover-effect {
  transform: translateX(0);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: var(--border-radius);
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.card-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.card-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.comparacion-section {
  background: var(--bg-card);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid #e5e7eb;
}

.image-compare-wrapper {
  max-width: 800px;
  margin: 0 auto;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

@media screen and (max-width: 768px) {
  .hero-section {
    min-height: 50vh;
    padding: var(--spacing-lg) var(--spacing-sm);
  }

  .content-wrapper {
    padding: var(--spacing-lg) var(--spacing-sm);
  }

  .profile-card {
    flex-direction: column;
    text-align: center;
    padding: var(--spacing-lg);
  }

  .profile-text {
    text-align: center;
  }

  .servicios-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .section {
    margin-bottom: var(--spacing-lg);
  }
}

@media screen and (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .servicio-card {
    padding: var(--spacing-md);
  }
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {

  .inicio-container,
  .section,
  .servicio-card,
  .profile-card {
    transition: none;
    animation: none;
  }

  .hero-decoration {
    animation: none;
  }
}

/* Modo oscuro (opcional) */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --bg-light: #111827;
    --bg-card: #1f2937;
  }
}

/* Estados de focus para accesibilidad */
.servicio-card:focus-visible,
.profile-card:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
</style>
