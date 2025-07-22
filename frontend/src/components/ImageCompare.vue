<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Props para hacer el componente más reutilizable
const props = defineProps({
  beforeImage: {
    type: String,
    required: true
  },
  afterImage: {
    type: String,
    required: true
  },
  beforeLabel: {
    type: String,
    default: 'Antes'
  },
  afterLabel: {
    type: String,
    default: 'Después'
  },
  initialPosition: {
    type: Number,
    default: 50,
    validator: (value) => value >= 0 && value <= 100
  },
  autoPlay: {
    type: Boolean,
    default: false
  },
  autoPlaySpeed: {
    type: Number,
    default: 3000
  }
})

// Estados reactivos
const porcentaje = ref(props.initialPosition)
const isDragging = ref(false)
const containerRef = ref(null)
const isLoading = ref(true)
const imagesLoaded = ref(0)
const autoPlayInterval = ref(null)
const isHovered = ref(false)

// Estados para soporte táctil (móviles)
const isTouching = ref(false)

// Computed para animación suave
const sliderStyle = computed(() => ({
  left: porcentaje.value + '%',
  transition: isDragging.value || isTouching.value ? 'none' : 'left 0.1s ease'
}))

// Función mejorada para manejar el inicio del drag (mouse y touch)
const handleStart = (e) => {
  e.preventDefault()

  if (e.type === 'mousedown') {
    isDragging.value = true
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleEnd)
  } else if (e.type === 'touchstart') {
    isTouching.value = true
    document.addEventListener('touchmove', handleMove, { passive: false })
    document.addEventListener('touchend', handleEnd)
  }

  // Pausar autoplay durante interacción
  pauseAutoPlay()
}

// Función mejorada para manejar el movimiento
const handleMove = (e) => {
  if (!isDragging.value && !isTouching.value) return
  if (!containerRef.value) return

  e.preventDefault()

  const rect = containerRef.value.getBoundingClientRect()
  let clientX

  // Detectar si es evento de mouse o touch
  if (e.type === 'mousemove') {
    clientX = e.clientX
  } else if (e.type === 'touchmove') {
    clientX = e.touches[0].clientX
  }

  const x = clientX - rect.left
  const percentage = (x / rect.width) * 100

  // Usar Math.max y Math.min para limitar entre 0 y 100
  porcentaje.value = Math.max(0, Math.min(100, percentage))
}

// Función para finalizar la interacción
const handleEnd = () => {
  if (isDragging.value) {
    isDragging.value = false
    document.removeEventListener('mousemove', handleMove)
    document.removeEventListener('mouseup', handleEnd)
  }

  if (isTouching.value) {
    isTouching.value = false
    document.removeEventListener('touchmove', handleMove)
    document.removeEventListener('touchend', handleEnd)
  }

  // Reanudar autoplay si estaba activo
  if (props.autoPlay && isHovered.value) {
    startAutoPlay()
  }
}

// Función mejorada para el slider de rango
const handleSliderChange = (e) => {
  const newValue = parseInt(e.target.value)
  porcentaje.value = newValue
  pauseAutoPlay()
}

// Función de reset con animación suave
const resetSlider = () => {
  pauseAutoPlay()
  // Temporary disable transition for smooth reset
  isDragging.value = true
  setTimeout(() => {
    porcentaje.value = props.initialPosition
    isDragging.value = false
  }, 10)
}

// Función para controlar la carga de imágenes
const handleImageLoad = () => {
  imagesLoaded.value++
  if (imagesLoaded.value === 2) {
    isLoading.value = false
    if (props.autoPlay) {
      startAutoPlay()
    }
  }
}

// Función para manejar errores de carga de imagen
const handleImageError = (imageType) => {
  console.error(`Error al cargar la imagen ${imageType}`)
  isLoading.value = false
}

// Funciones para autoplay
const startAutoPlay = () => {
  if (!props.autoPlay) return

  autoPlayInterval.value = setInterval(() => {
    // Oscila entre 20% y 80% para mejor efecto visual
    const time = Date.now() / props.autoPlaySpeed
    porcentaje.value = 50 + Math.sin(time) * 30
  }, 50)
}

const pauseAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

// Funciones para hover (pausar/reanudar autoplay)
const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
  if (props.autoPlay) {
    startAutoPlay()
  }
}

// Función para navegación con teclado (accesibilidad)
const handleKeyDown = (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault()
      porcentaje.value = Math.max(0, porcentaje.value - 5)
      pauseAutoPlay()
      break
    case 'ArrowRight':
      e.preventDefault()
      porcentaje.value = Math.min(100, porcentaje.value + 5)
      pauseAutoPlay()
      break
    case 'Home':
      e.preventDefault()
      porcentaje.value = 0
      pauseAutoPlay()
      break
    case 'End':
      e.preventDefault()
      porcentaje.value = 100
      pauseAutoPlay()
      break
    case ' ':
    case 'Enter':
      e.preventDefault()
      resetSlider()
      break
  }
}

// Lifecycle hooks
onMounted(() => {
  // Agregar event listeners para teclado
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  // Limpiar event listeners y intervals al destruir el componente
  document.removeEventListener('keydown', handleKeyDown)
  pauseAutoPlay()

  // Limpiar cualquier event listener que pueda quedar
  document.removeEventListener('mousemove', handleMove)
  document.removeEventListener('mouseup', handleEnd)
  document.removeEventListener('touchmove', handleMove)
  document.removeEventListener('touchend', handleEnd)
})
</script>

<template>
  <div class="image-compare-container">
    <!-- <h3 class="compare-title">Mira la comparación de un proyecto</h3> -->

    <!-- Indicador de carga -->
    <div v-if="isLoading" class="loading-indicator">
      <div class="spinner"></div>
      <p>Cargando imágenes...</p>
    </div>

    <div v-show="!isLoading" ref="containerRef" class="image-compare" :class="{ 'dragging': isDragging || isTouching }"
      @mousedown="handleStart" @touchstart="handleStart" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
      tabindex="0" role="slider" :aria-valuenow="Math.round(porcentaje)" aria-valuemin="0" aria-valuemax="100"
      aria-label="Comparador de imágenes">
      <!-- Imagen base (antes) -->
      <div class="image-base">
        <img :src="props.beforeImage" :alt="`Imagen ${props.beforeLabel.toLowerCase()}`" @load="handleImageLoad"
          @error="() => handleImageError('antes')" />
        <div class="image-label before-label">{{ props.beforeLabel }}</div>
      </div>

      <!-- Imagen overlay (después) -->
      <div class="image-overlay"
        :style="{ clipPath: `polygon(${porcentaje}% 0, 100% 0, 100% 100%, ${porcentaje}% 100%)` }">
        <img :src="props.afterImage" :alt="`Imagen ${props.afterLabel.toLowerCase()}`" @load="handleImageLoad"
          @error="() => handleImageError('después')" />
      </div>

      <!-- Etiqueta "Después" -->
      <div class="image-label after-label" :style="{
        left: `${porcentaje}%`,
        opacity: porcentaje > 15 ? 1 : 0
      }">
        {{ props.afterLabel }}
      </div>

      <!-- Slider handle mejorado -->
      <div class="slider-handle" :style="sliderStyle">
        <div class="handle-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <!-- Línea divisoria -->
      <div class="divider-line" :style="sliderStyle"></div>
    </div>

    <!-- Controles mejorados -->
    <div v-show="!isLoading" class="controls">
      <div class="control-group">
        <label for="slider-range" class="visually-hidden">Posición del comparador</label>
        <input id="slider-range" type="range" min="0" max="100" :value="porcentaje" @input="handleSliderChange"
          class="range-slider" />
        <span class="percentage-display">{{ Math.round(porcentaje) }}%</span>
      </div>

      <div class="button-group">
        <button @click="resetSlider" class="control-btn reset-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 3v5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Resetear
        </button>

        <button v-if="props.autoPlay" @click="autoPlayInterval ? pauseAutoPlay() : startAutoPlay()"
          class="control-btn autoplay-btn" :class="{ active: autoPlayInterval }">
          <svg v-if="!autoPlayInterval" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polygon points="5,3 19,12 5,21" fill="currentColor" />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
            <rect x="14" y="4" width="4" height="16" fill="currentColor" />
          </svg>
          {{ autoPlayInterval ? 'Pausar' : 'Auto' }}
        </button>
      </div>
    </div>

    <p class="compare-description">
      Desliza para ver la diferencia entre el diseño conceptual y el resultado final
      <br>
      <small>Usa las flechas del teclado o arrastra con el mouse/dedo</small>
    </p>
  </div>
</template>

<style scoped>
.image-compare-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 1rem;
  user-select: none;
}

.compare-title {
  font-family: var(--fuente-titulo, Arial, sans-serif);
  color: var(--azul-principal, #2563eb);
  font-size: clamp(1.5em, 6vw, 2.2em);
  font-weight: 700;
  margin: 0;
  text-align: center;
}

/* Indicador de carga */
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: var(--gris-medio, #6b7280);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--gris-claro, #f3f4f6);
  border-left: 4px solid var(--azul-principal, #2563eb);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.image-compare {
  position: relative;
  width: 100%;
  height: 450px;
  border-radius: 0.8rem;
  overflow: hidden;
  cursor: ew-resize;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  background: var(--gris-claro, #f3f4f6);
  outline: none;
  transition: box-shadow 0.2s ease;
}

.image-compare:focus {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 3px rgba(37, 99, 235, 0.3);
}

.image-compare.dragging {
  cursor: grabbing;
}

.image-base,
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image-base img,
.image-overlay img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-overlay {
  overflow: hidden;
  z-index: 2;
}

.image-label {
  position: absolute;
  top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-family: var(--fuente-texto, Arial, sans-serif);
  font-weight: 600;
  font-size: 0.9em;
  color: var(--blanco, #fff);
  backdrop-filter: blur(10px);
  z-index: 15;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: opacity 0.2s ease;
}

.before-label {
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
}

.after-label {
  background: rgba(16, 100, 60, 0.9);
  transform: translateX(-50%);
}

.slider-handle {
  position: absolute;
  top: 0;
  width: 4px;
  height: 100%;
  background: var(--azul-principal, #2563eb);
  cursor: ew-resize;
  z-index: 10;
  transform: translateX(-50%);
}

.handle-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  background: var(--azul-principal, #2563eb);
  border: 4px solid var(--blanco, #fff);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--blanco, #fff);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  z-index: 20;
}

.handle-circle:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.divider-line {
  position: absolute;
  top: 0;
  width: 2px;
  height: 100%;
  background: var(--azul-principal, #2563eb);
  z-index: 8;
  transform: translateX(-50%);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.range-slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: var(--azul-suave, #dbeafe);
  outline: none;
  cursor: pointer;
  appearance: none;
}

.range-slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--azul-principal, #2563eb);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.range-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--azul-principal, #2563eb);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.percentage-display {
  min-width: 45px;
  text-align: center;
  font-family: var(--fuente-texto, Arial, sans-serif);
  font-weight: 600;
  color: var(--azul-principal, #2563eb);
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--azul-principal, #2563eb);
  color: var(--blanco, #fff);
  border: none;
  border-radius: 0.5rem;
  font-family: var(--fuente-texto, Arial, sans-serif);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: var(--azul-claro, #3b82f6);
  transform: translateY(-1px);
}

.autoplay-btn.active {
  background: var(--verde-principal, #059669);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.compare-description {
  font-family: var(--fuente-texto, Arial, sans-serif);
  color: var(--gris-medio, #6b7280);
  font-size: 0.95em;
  text-align: center;
  margin: 0;
  opacity: 0.8;
  max-width: 500px;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
  .image-compare-container {
    padding: 1rem;
    gap: 1rem;
  }

  .image-compare {
    height: 250px;
  }

  .control-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  .handle-circle {
    width: 40px;
    height: 40px;
  }

  .button-group {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .image-compare {
    height: 200px;
  }

  .image-label {
    font-size: 0.8em;
    padding: 0.3rem 0.8rem;
  }

  .control-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9em;
  }
}
</style>
