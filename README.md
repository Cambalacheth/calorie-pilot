
# CaloriePilot - Tu asistente nutricional impulsado por IA

CaloriePilot es una aplicación web para registrar y analizar tu ingesta diaria de alimentos, monitorear macronutrientes, y recibir recomendaciones personalizadas para mejorar tus hábitos alimenticios.

## Características actuales

### Diario de alimentos
- **Panel principal**: Visualización de calorías restantes en un círculo central con detalles de macronutrientes
- **Registro por comidas**: Registro de alimentos en categorías (Desayuno, Almuerzo, Cena, Snacks)
- **Calendario expandible**: Selección rápida de fechas para ver y agregar registros en días específicos
- **Visualización simplificada**: Resumen claro de calorías y macronutrientes por cada alimento
- **Navegación intuitiva**: Interfaz limpia con acceso rápido a todas las funciones principales

### Registro de alimentos
- **Formulario detallado**: Ingreso de nombre, imagen, calorías y macronutrientes
- **Categorización por comidas**: Asignación de alimentos a momentos específicos del día
- **Persistencia de datos**: Almacenamiento seguro de todos los registros

### Progreso y análisis
- **Visualización de tendencias**: Gráficos de consumo de calorías y macronutrientes a lo largo del tiempo
- **Análisis nutricional**: Evaluación básica de la calidad de la dieta según los alimentos registrados
- **Seguimiento de objetivos**: Comparación del consumo real contra objetivos personalizados

### Recetas
- **Biblioteca de recetas**: Colección de recetas organizadas por categorías
- **Información nutricional**: Detalles de calorías y macronutrientes por receta
- **Filtrado por tipo**: Opciones para filtrar recetas por categorías (saludables, tradicionales, etc.)

### Configuración personalizada
- **Metas nutricionales**: Configuración de objetivos diarios de calorías y macronutrientes
- **Perfil de usuario**: Gestión de información personal y preferencias

## Arquitectura técnica

El proyecto está construido con tecnologías modernas:

- **Frontend**: React + TypeScript + Vite
- **Estilos**: Tailwind CSS + shadcn/ui (componentes accesibles)
- **Estado**: React Context + TanStack Query
- **Enrutamiento**: React Router
- **Almacenamiento**: Supabase (base de datos y autenticación)
- **Animaciones**: Transition animations para una experiencia fluida

## Roadmap: Funcionalidades futuras

### Corto plazo (1-2 meses)
- **Reconocimiento de alimentos con IA**: Identificación automática de alimentos mediante fotos
- **Planificador de comidas semanal**: Herramienta para organizar y planificar todas las comidas de la semana
- **Recordatorios personalizados**: Alertas configurables para registrar comidas o seguir hábitos
- **Mejoras en visualización de progreso**: Gráficos avanzados y estadísticas detalladas

### Mediano plazo (3-6 meses)
- **Integración con dispositivos wearables**: Sincronización con relojes inteligentes y otros dispositivos
- **Función de escáner de códigos de barras**: Registro rápido de alimentos comerciales
- **Función social y comunidad**: Compartir logros, recetas y motivación con otros usuarios
- **Generación de recetas personalizadas**: Recomendaciones basadas en preferencias y objetivos
- **Funcionalidad offline**: Uso completo de la aplicación sin conexión a internet

### Largo plazo (6+ meses)
- **Integración con servicios de delivery**: Pedidos de ingredientes o comidas preparadas
- **Coach nutricional con IA**: Recomendaciones avanzadas personalizadas
- **Plan de ejercicios complementario**: Rutinas de ejercicio que se adaptan a los objetivos nutricionales
- **Versiones móviles nativas**: Aplicaciones específicas para iOS y Android
- **Integración con profesionales**: Conexión con nutricionistas y entrenadores reales

## Convenciones de desarrollo

Para contribuir al proyecto, sigue estas convenciones:

- **Componentes**: Crear componentes pequeños y reutilizables
- **Estado**: Usar React Context para estado global, y hooks para lógica reutilizable
- **Estilos**: Utilizar clases de Tailwind y componentes de shadcn/ui
- **Código limpio**: Mantener archivos enfocados y evitar componentes muy grandes
- **Pruebas**: Añadir pruebas para nuevas funcionalidades (pendiente de implementar)

## Cómo contribuir

1. Clona el repositorio
2. Instala las dependencias con `npm install`
3. Inicia el servidor de desarrollo con `npm run dev`
4. Realiza tus cambios siguiendo las convenciones
5. Abre un Pull Request describiendo los cambios realizados

---

© 2023 CaloriePilot. Todos los derechos reservados.
