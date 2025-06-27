# JEMA - Plataforma de Gestión

Una aplicación web moderna construida con Vue.js 3 para la gestión y administración empresarial.

## 🚀 Características

- **Vue.js 3** con Composition API
- **Vite** como bundler y dev server
- **Pinia** para gestión de estado
- **Vue Router** para navegación
- **ESLint + Prettier** para calidad de código
- **Vitest** para testing unitario
- **Playwright** para testing e2e
- **Diseño responsive** con CSS moderno
- **Sistema de temas** con variables CSS

## 📁 Estructura del Proyecto

```
src/
├── assets/          # Recursos estáticos (CSS, imágenes, fuentes)
├── components/      # Componentes reutilizables
├── composables/     # Composables de Vue 3
├── config/          # Configuración de la aplicación
├── router/          # Configuración de rutas
├── stores/          # Stores de Pinia
├── utils/           # Funciones utilitarias
├── views/           # Vistas/páginas de la aplicación
├── App.vue          # Componente raíz
└── main.js          # Punto de entrada
```

## 🛠️ Tecnologías

- **Frontend**: Vue.js 3, Vite
- **Estado**: Pinia
- **Routing**: Vue Router 4
- **Testing**: Vitest, Playwright
- **Linting**: ESLint, Prettier
- **CSS**: Variables CSS, Flexbox, Grid

## 🚀 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd JEMAProyecto
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**

   ```bash
   npm run dev
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de producción
- `npm run test:unit` - Ejecutar tests unitarios
- `npm run test:e2e` - Ejecutar tests e2e
- `npm run lint` - Linting y corrección automática
- `npm run format` - Formateo de código

## 🎨 Sistema de Diseño

### Colores

- **Azul Principal**: `hsl(209, 58%, 28%)`
- **Azul Claro**: `hsl(209, 48%, 35%)`
- **Azul Oscuro**: `hsl(209, 75%, 22%)`
- **Azul Suave**: `hsl(206, 53%, 94%)`
- **Naranja**: `hsl(16, 100%, 60%)` (CTA)
- **Verde**: `hsl(134, 61%, 41%)` (Éxito)
- **Amarillo**: `hsl(45, 100%, 51%)` (Advertencia)

### Tipografía

- **Títulos**: Roboto
- **Texto**: Source Sans

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=JEMA
```

## 📊 Estado de la Aplicación

El proyecto utiliza Pinia para la gestión de estado con los siguientes stores:

- **app**: Estado global de la aplicación
- **user**: Estado del usuario y autenticación

## 🧪 Testing

### Tests Unitarios

```bash
npm run test:unit
```

### Tests E2E

```bash
npm run test:e2e
```

## 📦 Despliegue

### Build de Producción

```bash
npm run build
```

Los archivos generados estarán en la carpeta `dist/`.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.
