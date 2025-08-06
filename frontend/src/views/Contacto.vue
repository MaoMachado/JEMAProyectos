<script>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue';
import { useFadeIn } from '@/utils/useFadeIn';

import JIcon from '@/assets/img/J.png';
import EnvioCorreoIcon from '@/assets/img/enviar_correo.png';
import facebookIcon from '@/assets/img/facebook_icon.png';
import instagramIcon from '@/assets/img/instagram_icon.png';
import whatsappIcon from '@/assets/img/whatsapp_icon.png';

export default {
  name: 'ContactoView',

  setup() {
    const enviado = ref(false);
    const enviando = ref(false);
    const nombre = ref('');
    const email = ref('');
    const mensaje = ref('');
    const error = ref({});

    const contactData = {
      whatsappNumber: '573169274523',
      whatsappMessage: 'Hola, me gustaria tener mas info',
      urlFacebook: "https://www.facebook.com/profile.php?id=61554872667407&rdid=QOlhmLX6wjcJ65CM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15ysM2BARH%2F",
    };

    const setupSEO = () => {
      document.title = 'JEMA - Contacto | Joyas Únicas y Exclusivas'
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content',
          'Contacta con JEMA para joyas únicas y exclusivas. Formulario de contacto directo y redes sociales.'
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

    const validarFormulario = () => {
      error.value = {};

      if (!nombre.value.trim()) {
        error.value.nombre = 'El nombre es obligatorio';
      } else if (nombre.value.trim().length < 3) {
        error.value.nombre = 'El nombre debe tener mínimo 3 caracteres';
      } else if (nombre.value.trim().length > 50) {
        error.value.nombre = 'El nombre no puede exceder 50 caracteres';
      }

      if (!email.value.trim()) {
        error.value.email = 'El email es obligatorio';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          error.value.email = 'El email no es válido';
        }
      }

      if (!mensaje.value.trim()) {
        error.value.mensaje = 'El mensaje es obligatorio';
      } else if (mensaje.value.trim().length < 10) {
        error.value.mensaje = 'El mensaje debe tener mínimo 10 caracteres';
      } else if (mensaje.value.trim().length > 500) {
        error.value.mensaje = 'El mensaje no puede exceder 500 caracteres';
      }

      return Object.keys(error.value).length === 0;
    };

    const validarNombre = () => {
      if (nombre.value.trim().length > 0 && nombre.value.trim().length < 3) {
        error.value.nombre = 'El nombre debe tener mínimo 3 caracteres';
      } else {
        delete error.value.nombre;
      }
    };

    const validarEmail = () => {
      if (email.value.trim().length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          error.value.email = 'El email no es válido';
        } else {
          delete error.value.email;
        }
      }
    };

    const validarMensaje = () => {
      if (mensaje.value.trim().length > 0 && mensaje.value.trim().length < 10) {
        error.value.mensaje = 'El mensaje debe tener mínimo 10 caracteres';
      } else {
        delete error.value.mensaje;
      }
    };

    const onSubmit = async (e) => {
      if (!validarFormulario()) {
        e.preventDefault();
        return;
      }

      enviando.value = true;

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        enviado.value = true;
        enviando.value = false;

        // Limpiar formulario
        nombre.value = '';
        email.value = '';
        mensaje.value = '';
        error.value = {};
      } catch (err) {
        console.error('Error al enviar:', err);
        enviando.value = false;
      }
    };

    const cerrarDialogo = () => {
      enviado.value = false;
    };

    const { isVisible } = useFadeIn();

    return {
      isVisible,
      enviado,
      enviando,
      nombre,
      email,
      mensaje,
      error,
      contactData,
      validarNombre,
      validarEmail,
      validarMensaje,
      onSubmit,
      cerrarDialogo,
      JIcon,
      EnvioCorreoIcon,
      facebookIcon,
      instagramIcon,
      whatsappIcon,
    }
  }
}
</script>

<template>
  <main class="contacto-container" role="main" aria-labelledby="contacto-header-title"
    :class="{ 'fade-in': isVisible }">

    <header class="hero-contacto" aria-labelledby="contacto-header-title">
      <div class="hero-background"></div>
      <div class="hero-content">
        <h1 class="hero-title" id="contacto-header-title">
          <span class="title-text">CONTACTAME</span>
          <div class="j-icon-wrapper">
            <img :src="JIcon" alt="Icono Jema" loading="lazy" class="j-icon" />
            <div class="j-glow"></div>
          </div>
          <span class="subtitle-text">EMA</span>
        </h1>
      </div>

      <div class="hero-description">
        <p class="description-primary">
          ¿Quieres saber más sobre nuestros servicios o tienes una idea que quieres hacer realidad?
        </p>
        <p class="description-secondary">
          Escríbeme y con gusto te responderé personalmente.
        </p>
      </div>
    </header>

    <section v-scroll-fade-right class="formulario-section" aria-labelledby="formulario-title">
      <div class="section-header">
        <h2 class="section-title" id="formulario-title">
          Envianos un mensaje
        </h2>
        <div class="title-underline"></div>
        <p class="section-description">
          Completa el formulario y nos pondremos en contacto contigo
        </p>
      </div>

      <form @submit="onSubmit" action="https://formsubmit.co/jdmachadoa@gmail.com" method="post" class="contact-form"
        role="form" aria-labelledby="form-legend">
        <div class="form-grid">

          <div class="input-group">
            <input type="text" name="nombre" id="nombre" v-model="nombre" @blur="validarNombre" aria-required="true"
              aria-describedby="nombre-error" placeholder=" "
              :class="{ 'error-input': error.nombre, 'valid-input': nombre && !error.nombre }" />
            <label for="nombre">Nombre Y Apellido</label>
            <div v-if="error.nombre" class="error-message">
              <span>{{ error.nombre }}</span>
            </div>
          </div>

          <div class="input-group">
            <input type="email" name="email" id="email" v-model="email" @blur="validarEmail" aria-required="true"
              placeholder=" " aria-describedby="email-error"
              :class="{ 'error-input': error.email, 'valid-input': email && !error.email }" />
            <label for="email">Correo Electronico</label>
            <div v-if="error.email" class="error-message">
              <span>{{ error.email }}</span>
            </div>
          </div>

          <div class="input-group full-width">
            <textarea name="mensaje" id="mensaje" rows="5" v-model="mensaje" @blur="validarMensaje" placeholder=" "
              aria-required="true" aria-describedby="mensaje-error"
              :class="{ 'error-input': error.mensaje, 'valid-input': mensaje && !error.mensaje }"></textarea>
            <label for="mensaje">Tu Mensaje</label>
            <div v-if="error.mensaje" class="error-message">
              <span>{{ error.mensaje }}</span>
            </div>
          </div>
        </div>

        <button :disabled="enviado || enviando" type="submit" class="submit-btn" :class="{ 'loading': enviando }">
          <span v-if="!enviando">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8">
              </path>
            </svg>
            Enviar Mensaje
          </span>
          <span v-else>
            <svg class="btn-icon spinning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
              </path>
            </svg>
            Enviando...
          </span>
        </button>

      </form>
    </section>

    <section v-scroll-fade-right class="redes-section" aria-labelledby="redes-title">

      <div class="section-header">
        <h2 class="section-title" id="redes-title">
          Siguenos En Redes
        </h2>
        <div class="title-underline"></div>
        <p class="section-description">
          También puedes encontrarnos en las redes sociales
        </p>
      </div>

      <div class="redes-grid">

        <a :href="`https://wa.me/${contactData.whatsappNumber}?text=${encodeURIComponent(contactData.whatsappMessage)}`"
          class="red-social whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Contactar por whatsapp">
          <div class="social-icon">
            <img :src="whatsappIcon" alt="Whatsapp" loading="lazy">
          </div>
          <div class="social-content">
            <h3>Whatsapp</h3>
            <p>Chatea Con Nosotros</p>
          </div>
        </a>

        <a :href="contactData.urlFacebook" class="red-social facebook" target="_blank" rel="noopener noreferrer"
          aria-label="Visitar Facebook">
          <div class="social-icon">
            <img :src="facebookIcon" alt="Facebook" loading="lazy">
          </div>
          <div class="social-content">
            <h3>Facebook</h3>
            <p>Siguenos Aqui</p>
          </div>
        </a>

        <a href="#" class="red-social instagram" target="_blank" rel="noopener noreferrer"
          aria-label="Visitar Facebook">
          <div class="social-icon">
            <img :src="instagramIcon" alt="Instagram" loading="lazy">
          </div>
          <div class="social-content">
            <h3>Instagram</h3>
            <p>Mira nuestros diseños</p>
          </div>
        </a>

      </div>
    </section>

    <div v-scroll-fade-right class="modal-overlay" v-if="enviado" @clik.self="cerrarDialogo">
      <section class="modal-exito">
        <div class="check-container">
          <svg class="check-icon" viewBox="0 0 52 52">
            <circle class="check-circle" cx="26" cy="26" r="25" fill="none" />
            <path class="check-path" fill="none" d="M14 27l7 7 16-16" />
          </svg>
        </div>

        <h2>¡Mensaje Enviado!</h2>
        <p>Gracias por contactarme, te respondere pronto.</p>
        <button class="btn-cerrar" @click="cerrarDialogo">Cerrar</button>
      </section>
    </div>

    <!-- Decoración de fondo -->
    <div class="background-decoration">
      <div class="decoration-shape shape-1"></div>
      <div class="decoration-shape shape-2"></div>
      <div class="decoration-shape shape-3"></div>
    </div>
  </main>
</template>

<style scoped>
.contacto-container {
  inline-size: 1100px;
  min-height: 100vh;
  margin-inline: auto;
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%);
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.contacto-container.fade-in {
  opacity: 1;
  transform: translateY(0);
}

/* Sección Hero */
.hero-contacto {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
  overflow: hidden;
  margin-bottom: var(--spacing-xl);
  border-radius: 0 0 1rem 1rem;
}

.hero-background {
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm10 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  animation: float 15s ease-in-out infinite;
}

.hero-content {
  text-align: center;
  z-index: 2;
  padding: var(--spacing-xl);
}

.hero-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.title-text {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 800;
  background: linear-gradient(45deg, #ffffff, var(--jewelry-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  width: 100%;
}

.subtitle-text {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 800;
  background: linear-gradient(45deg, #ffffff, var(--jewelry-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.j-icon-wrapper {
  position: relative;
  display: inline-block;
}

.j-icon {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--shadow-jewelry);
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;
}

.j-icon:hover {
  transform: scale(1.1) rotate(5deg);
}

.j-glow {
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

/* Sección Formulario */
.formulario-section,
.redes-section {
  max-width: 1000px;
  margin: 0 auto var(--spacing-xl);
  padding: 0 var(--spacing-lg);
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

.contact-form {
  background: var(--bg-card);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(139, 92, 246, 0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.input-group {
  position: relative;
}

.input-group.full-width {
  grid-column: 1 / -1;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 1.2rem 1rem 0.8rem;
  border: 2px solid #e5e7eb;
  border-radius: var(--border-radius);
  font-size: 1rem;
  background: #fafafa;
  transition: all 0.3s ease;
  resize: vertical;
}

.input-group input:focus,
.input-group textarea:focus {
  outline: none;
  border-color: var(--jewelry-primary);
  background: white;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.input-group input:not(:placeholder-shown),
.input-group textarea:not(:placeholder-shown) {
  background: white;
}

.input-group label {
  position: absolute;
  left: 1rem;
  top: 1rem;
  font-size: 1rem;
  color: #6b7280;
  pointer-events: none;
  transition: all 0.3s ease;
  background: transparent;
}

.input-group input:focus+label,
.input-group textarea:focus+label,
.input-group input:not(:placeholder-shown)+label,
.input-group textarea:not(:placeholder-shown)+label {
  top: 0.3rem;
  font-size: 0.8rem;
  color: var(--jewelry-primary);
  font-weight: 600;
}

.input-group .error-input {
  border-color: #ef4444;
  background: #fef2f2;
}

.input-group .valid-input {
  border-color: #10b981;
  background: #f0fdf4;
}

.error-message {
  margin-top: var(--spacing-xs);
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 500;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 1rem var(--spacing-lg);
  background: linear-gradient(45deg, var(--jewelry-primary), #8b5cf6);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
}

.submit-btn span {
  display: flex;
  align-items: center;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(139, 92, 246, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-icon {
  width: 25px;
  height: 25px;
}

.spinning {
  animation: spin 1s linear infinite;
}

/* Redes Sociales */
.redes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.red-social {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--bg-card);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(139, 92, 246, 0.1);
  position: relative;
  overflow: hidden;
}

.red-social::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.red-social:hover::before {
  left: 100%;
}

.red-social:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.red-social.whatsapp:hover {
  border-color: #25d366;
}

.red-social.facebook:hover {
  border-color: #1877f2;
}

.red-social.instagram:hover {
  border-color: #e4405f;
}

.social-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f3e8ff, #ede9fe);
  box-shadow: var(--shadow-sm);
}

.social-icon img {
  width: 35px;
  height: 35px;
  object-fit: contain;
}

.social-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.social-content p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-exito {
  background: var(--bg-card);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  text-align: center;
  max-width: 400px;
  margin: var(--spacing-lg);
  box-shadow: var(--shadow-xl);
  animation: modalAppear 0.3s ease-out;
}

.check-container {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
}

.check-icon {
  width: 72px;
  height: 72px;
  stroke: #10b981;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.check-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: dash 0.6s ease-in-out forwards;
}

.check-path {
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: dash-check 0.4s 0.6s ease-in-out forwards;
}

.modal-exito h2 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.modal-exito p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

.btn-cerrar {
  background: var(--jewelry-primary);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cerrar:hover {
  background: #7c3aed;
  transform: translateY(-1px);
}

/* Decoración de fondo */
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes dash-check {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes modalAppear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
