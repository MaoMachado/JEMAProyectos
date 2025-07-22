<script>
import { onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useFadeIn } from '@/utils/useFadeIn';

import Joya from '@/assets/img/joya.png'
import CardProducto from '@/components/CardProducto.vue';

//Imagenes
import img1 from '@/assets/img/fotosFloresta/img_1.jpg';
import img2 from '@/assets/img/fotosFloresta/img_2.jpg';
import img3 from '@/assets/img/fotosFloresta/img_3.jpg';
import img4 from '@/assets/img/fotosFloresta/img_4.jpg';
import img5 from '@/assets/img/fotosFloresta/img_5.jpg';

export default {
  name: 'JoyasJemaView',

  setup() {

    const pageData = {
      titulo: 'NUESTRAS JOYAS',
      joyaIcon: Joya,
      imagenPrincipal: img1,
      galeria: [img1, img2, img3, img4, img5],
      numCell: "3169274523"
    };

    const caracteristicas = [
      {
        icon: '💎',
        title: 'Calidad Premium',
        description: 'Materiales de la más alta calidad seleccionados cuidadosamente',
        color: 'from-purple-500 to-pink-500'
      },
      {
        icon: '✨',
        title: 'Diseño Único',
        description: 'Cada pieza es especial y refleja tu personalidad',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: '🎨',
        title: 'Estilo Personal',
        description: 'Joyas que se adaptan perfectamente a tu estilo',
        color: 'from-green-500 to-emerald-500'
      },
      {
        icon: '🏆',
        title: 'Exclusividad',
        description: 'Piezas limitadas que te harán destacar',
        color: 'from-orange-500 to-red-500'
      }
    ];

    const estadisticas = [
      { numero: '500+', texto: 'Clientes Satisfechos', icon: '😊' },
      { numero: '1000+', texto: 'Joyas Vendidas', icon: '💍' },
      { numero: '5★', texto: 'Calificación Promedio', icon: '⭐' },
      { numero: '3+', texto: 'Años de Experiencia', icon: '📅' }
    ]

    const setupSEO = () => {
      document.title = 'JEMA - Joyas Únicas y Exclusivas | Venta de Joyas'
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content',
          'JEMA - Joyas únicas y exclusivas. Descubre nuestra colección de joyas especiales. Venta de joyas únicas.'
        )
      }
    };

    const restoreTitle = () => {
      document.title = 'JEMA - Joyas Personalizadas y Únicas | Diseño Artesanal'
    };

    const scrollToProductos = () => {
      const seccion = document.getElementById("productos");
      if (seccion) {
        seccion.scrollIntoView({ behavior: "smooth" });
      }
    }

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
      pageData,
      caracteristicas,
      estadisticas,
      scrollToProductos
    }

  },

  components: {
    CardProducto
  }
}
</script>

<template>
  <main class="joyas-container" role="main" aria-labelledby="titulo-header-title" :class="{ 'fade-in': isVisible }">

    <header class="hero-joyas" aria-labelledby="joyas-header-title">
      <div class="hero-background"></div>
      <div class="hero-content">
        <h1 class="hero-title" id="joyas-header-title">
          <span class="title-text">{{ pageData.titulo }}</span>
          <div class="joya-icon-wrapper">
            <img :src="pageData.joyaIcon" alt="Joyas únicas JEMA" loading="lazy" class="joya-icon" />
            <div class="joya-glow"></div>
          </div>
        </h1>

        <div class="hero-description">
          <p class="description-primary">
            Descubre joyas únicas y exclusivas que se adaptan a tu estilo personal.
            Cada pieza es cuidadosamente seleccionada para ofrecerte la mejor calidad y diseño.
          </p>
          <p class="description-secondary">
            Nuestras joyas te están esperando. Encuentra piezas que reflejen tu personalidad y elegancia.
          </p>
        </div>

        <div class="cta-buttons">
          <button class="btn-primary" @click="scrollToProductos">
            <span>Ver Colección</span>
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </button>
          <!-- <button class="btn-secondary">
            <span>Contactar</span>
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
              </path>
            </svg>
          </button> -->
        </div>
      </div>
    </header>

    <section class="caracteristicas-section" aria-labelledby="caracteristicas-title">

      <article class="section-header">
        <h2 id="caracteristicas-title" class="section-title">
          ¿Porqué Eleguir JEMA?
        </h2>
        <div class="title-underline"></div>
        <p class="section-description">
          Cada joya cuenta con una historia unica, diseñada especial mente para tí
        </p>
      </article>

      <article class="caracteristicas-grid">
        <div class="caracteristica-card" v-for="(caracteristica, i) in caracteristicas" :key="i">
          <div class="card-icon-wrapper">
            <div :class="`card-icon bg-gradient-to-r ${caracteristica.color}`">
              <span class="icon-emoji">{{ caracteristica.icon }}</span>
            </div>
          </div>

          <div class="card-content">
            <h3 class="card-title">{{ caracteristica.title }}</h3>
            <p class="card-description">{{ caracteristica.description }}</p>
          </div>
          <div class="card-shimmer"></div>
        </div>
      </article>
    </section>

    <section class="estadisticas-section">
      <div class="estadisticas-wrapper">
        <div class="stat-card" v-for="(stat, i) in estadisticas" :key="i">
          <div class="stat-icon">{{ stat.icon }}</div>
          <div class="stat-number">{{ stat.numero }}</div>
          <div class="stat-text">{{ stat.texto }}</div>
        </div>
      </div>
    </section>

    <section id="productos" class="productos-section" aria-labelledby="productos-title">
      <div class="section-header">
        <h2 class="section-title" id="productos-title">
          Nuestra Colección
        </h2>
        <div class="title-underline"></div>
        <p class="section-description">
          Explora nuestras joyas mas exclusivas
        </p>
      </div>

      <div class="producto-showcase">
        <CardProducto titulo="Floresta" descripcion="Casa ubicada en el barrio La Floresta - Venta de joyas únicas"
          :imagen="pageData.imagenPrincipal" :galeria="pageData.galeria" :numeroContacto="pageData.numCell" />
      </div>
    </section>

    <div class="background-decoration">
      <div class="decoration-shape shape-1"></div>
      <div class="decoration-shape shape-2"></div>
      <div class="decoration-shape shape-3"></div>
    </div>
  </main>
</template>

<style scoped>
.joyas-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%);
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.joyas-container.fade-in {
  opacity: 1;
  transform: translateY(0); 
}

/* Sección Hero */
.hero-joyas {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  background: linear-gradient(135deg, var(--jewelry-primary) 0%, var(--jewelry-secondary) 100%);
  color: white;
  overflow: hidden;
  margin-bottom: var(--spacing-xl);
}

.hero-background {
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm10 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  background-attachment: scroll;
  animation: float 15s ease-in-out infinite;
}

.hero-content {
  text-align: center;
  z-index: 2;
  max-width: 900px;
  padding: var(--spacing-xl);
}

.hero-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.title-text {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 800;
  background: linear-gradient(45deg, #ffffff, var(--jewelry-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-sm);
}

.joya-icon-wrapper {
  position: relative;
  display: inline-block;
}

.joya-icon {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--shadow-jewelry);
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;
}

.joya-icon:hover {
  transform: scale(1.1) rotate(5deg);
}

.joya-glow {
  position: absolute;
  inset: -10px;
  background: linear-gradient(45deg, var(--jewelry-gold), var(--jewelry-rose-gold), var(--jewelry-primary));
  border-radius: 50%;
  opacity: 0.6;
  filter: blur(20px);
  animation: pulse 2s ease-in-out infinite;
}

.hero-description {
  margin-bottom: var(--spacing-xl);
}

.description-primary {
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  line-height: 1.7;
  margin-bottom: var(--spacing-md);
  font-weight: 300;
  color: white;
}

.description-secondary {
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  opacity: 0.9;
  font-style: italic;
  margin: 0;
  color: white;
}

/* Botones CTA */
.cta-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(45deg, var(--jewelry-gold), #f59e0b);
  color: white;
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(251, 191, 36, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.caracteristicas-section,
.productos-section {
  max-width: 1200px;
  margin: 0 auto var(--spacing-xl);
  padding: 0 var(--spacing-lg);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--jewelry-primary), var(--jewelry-gold));
  border-radius: 2px;
  margin: 0 auto var(--spacing-md);
}

.section-description {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.producto-showcase {
  position: relative;
}

/* Grid de caracteristicas */
.caracteristicas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.caracteristica-card {
  background: var(--bg-card);
  border-radius: var(--border-radius);
  padding: var(--spacing-xl);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(139, 92, 246, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.caracteristica-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-jewelry);
}

.caracteristica-card:hover .card-shimmer {
  transform: translateX(100%);
}

.card-icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

.card-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
}

.icon-emoji {
  font-size: 2rem;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  text-align: center;
}

.card-description {
  color: var(--text-secondary);
  line-height: 1.6;
  text-align: center;
  margin: 0;
}

.card-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: transform 0.6s ease;
}

/* Seccion de estadisticas */
.estadisticas-section {
  background: var(--bg-card);
  margin: var(--spacing-xl) auto;
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  max-width: 1000px;
  transform: scale(0.95);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.estadisticas-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.stat-card {
  text-align: center;
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  background: linear-gradient(135deg, #faf5ff, #f3e8ff);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-xs);
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--jewelry-primary);
  margin-bottom: var(--spacing-xs);
}

.stat-text {
  color: var(--text-secondary);
  font-weight: 500;
}

/* Sección Productos */
.background-decoration {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.decoration-shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1));
  animation: floatShape 20s ease-in-out infinite;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  right: 100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  left: -50px;
  animation-delay: -5s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation-delay: -10s;
}

/* Animaciones */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.6;
  }

  50% {
    opacity: 1;
  }
}

@keyframes floatShape {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  33% {
    transform: translateY(-20px) rotate(120deg);
  }

  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

/* Gradientes utilitarios */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-purple-500 {
  --tw-gradient-from: #8b5cf6;
  --tw-gradient-to: rgb(139 92 246 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-pink-500 {
  --tw-gradient-to: #ec4899;
}

.from-blue-500 {
  --tw-gradient-from: #3b82f6;
  --tw-gradient-to: rgb(59 130 246 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-cyan-500 {
  --tw-gradient-to: #06b6d4;
}

.from-green-500 {
  --tw-gradient-from: #10b981;
  --tw-gradient-to: rgb(16 185 129 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-emerald-500 {
  --tw-gradient-to: #10b981;
}

.from-orange-500 {
  --tw-gradient-from: #f97316;
  --tw-gradient-to: rgb(249 115 22 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-red-500 {
  --tw-gradient-to: #ef4444;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .hero-joyas {
    min-height: 60vh;
    padding: var(--spacing-lg) var(--spacing-sm);
  }

  .hero-title {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .title-text {
    font-size: 2.5rem;
  }

  .joya-icon {
    width: 80px;
    height: 80px;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .caracteristicas-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .estadisticas-wrapper {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }

  .caracteristicas-section,
  .productos-section {
    padding: 0 var(--spacing-sm);
  }
}

@media screen and (max-width: 480px) {
  .title-text {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .estadisticas-wrapper {
    grid-template-columns: 1fr;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
    max-width: 280px;
  }
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {

  .joyas-container,
  .caracteristica-card,
  .stat-card,
  .joya-icon,
  .hero-background,
  .decoration-shape {
    animation: none;
    transition: none;
  }
}

/* Focus states */
.caracteristica-card:focus-visible,
.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 2px solid var(--jewelry-primary);
  outline-offset: 2px;
}
</style>
