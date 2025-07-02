<script setup>
import { ref } from 'vue'

// Importar imágenes correctamente para Vite
import beforeImage from '@/assets/img/J.png'
import afterImage from '@/assets/img/joya.png'

const porcentaje = ref(50)
const isDragging = ref(false)
const containerRef = ref(null)

// Función para manejar el drag del slider
const handleMouseDown = () => {
  isDragging.value = true
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e) => {
  if (!isDragging.value || !containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const percentage = (x / rect.width) * 100

  porcentaje.value = Math.max(0, Math.min(100, percentage))
}

const handleMouseUp = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

// Función para manejar el input range
const handleSliderChange = (e) => {
  porcentaje.value = parseInt(e.target.value)
}

// Función para resetear a 50%
const resetSlider = () => {
  porcentaje.value = 50
}
</script>

<template>
  <div class="image-compare-container">
    <h3 class="compare-title">Comparación de Proyectos</h3>

    <div ref="containerRef" class="image-compare" @mousedown="handleMouseDown">
      <!-- Imagen base (antes) -->
      <div class="image-base">
        <img :src="beforeImage" alt="Diseño conceptual" />
        <div class="image-label before-label">Antes</div>
      </div>

      <!-- Imagen overlay (después) -->
      <div class="image-overlay"
        :style="{ clipPath: `polygon(${porcentaje}% 0, 100% 0, 100% 100%, ${porcentaje}% 100%)` }">
        <img :src="afterImage" alt="Resultado final" />
      </div>

      <!-- Etiqueta "Después" fuera del overlay para que no se recorte -->
      <div class="image-label after-label" :style="{ left: `${porcentaje}%` }">Después</div>

      <!-- Slider handle -->
      <div class="slider-handle" :style="{ left: porcentaje + '%' }">
        <div class="handle-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 5L16 12L8 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M16 5L24 12L16 19" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <!-- Línea divisoria -->
      <div class="divider-line" :style="{ left: porcentaje + '%' }"></div>
    </div>

    <!-- Controles -->
    <div class="controls">
      <input type="range" min="0" max="100" :value="porcentaje" @input="handleSliderChange" class="range-slider" />
      <button @click="resetSlider" class="reset-btn">
        Resetear
      </button>
    </div>

    <p class="compare-description">
      Desliza para ver la diferencia entre el diseño conceptual y el resultado final
    </p>
  </div>
</template>

<style scoped>
.image-compare-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background: var(--blanco);
  border-radius: 0.5rem;
  user-select: none;
}

.compare-title {
  font-family: var(--fuente-titulo);
  color: var(--azul-principal);
  font-size: clamp(1.5em, 6vw, 2.2em);
  font-weight: 700;
  margin: 0;
  text-align: center;
}

.image-compare {
  position: relative;
  width: 100%;
  height: 450px;
  border-radius: 0.8rem;
  overflow: hidden;
  cursor: ew-resize;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  background: var(--gris-claro);
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
  width: 100%;
  height: 100%;
}

.image-label {
  position: absolute;
  top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-family: var(--fuente-texto);
  font-weight: 600;
  font-size: 0.9em;
  color: var(--blanco);
  backdrop-filter: blur(10px);
  z-index: 15;
  transform: translateX(-50%);
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.before-label {
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  transform: none;
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
  background: var(--azul-principal);
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
  background: var(--azul-principal);
  border: 4px solid var(--blanco);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--blanco);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  z-index: 20;
}

.handle-circle svg {
  width: 24px;
  height: 24px;
  color: white;
  fill: none;
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
  background: var(--azul-principal);
  z-index: 8;
  transform: translateX(-50%);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

.range-slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: var(--azul-suave);
  outline: none;
  cursor: pointer;
  appearance: none;
}

.range-slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--azul-principal);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.range-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--azul-principal);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.reset-btn {
  padding: 0.5rem 1rem;
  background: var(--azul-principal);
  color: var(--blanco);
  border: none;
  border-radius: 0.5rem;
  font-family: var(--fuente-texto);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: var(--azul-claro);
  transform: translateY(-1px);
}

.compare-description {
  font-family: var(--fuente-texto);
  color: var(--gris-medio);
  font-size: 0.95em;
  text-align: center;
  margin: 0;
  opacity: 0.8;
  max-width: 500px;
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

  .controls {
    flex-direction: column;
    gap: 0.5rem;
  }

  .handle-circle {
    width: 40px;
    height: 40px;
  }

  .handle-circle svg {
    width: 20px;
    height: 20px;
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
}
</style>