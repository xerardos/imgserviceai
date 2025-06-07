# Documento de Requisitos del Producto (PRD) - Landing Page

## 1. Visión General y Objetivos

El objetivo de este proyecto es desarrollar una landing page moderna, rápida y optimizada para SEO. La página servirá como punto central de nuestra presencia online, diseñada para captar la atención del usuario, comunicar nuestra propuesta de valor de forma clara y convertir visitantes en clientes potenciales.

## 2. Requisitos Funcionales

-   **FR-01: Navegación Principal:** El sitio debe tener una barra de navegación clara con enlaces a las secciones principales (Inicio, Características, Contacto).
-   **FR-02: Sección de Héroe:** La página principal debe mostrar una sección de "héroe" con un titular impactante, un subtítulo descriptivo y una llamada a la acción (CTA) principal.
-   **FR-03: Formulario de Contacto:** Debe existir un formulario de contacto funcional que permita a los usuarios enviar sus datos (nombre, email, mensaje). El formulario debe ser procesado de forma segura y proporcionar feedback al usuario tras el envío.

## 3. Requisitos No Funcionales

-   **NFR-01: Rendimiento:** La página debe tener una puntuación de Performance en Google Lighthouse superior a 95. Los tiempos de carga deben ser mínimos (First Contentful Paint < 1.8s).
-   **NFR-02: SEO:** El sitio debe estar optimizado para motores de búsqueda, con metadatos adecuados, sitemaps generados automáticamente y una estructura semántica de HTML.
-   **NFR-03: Accesibilidad:** El sitio debe cumplir con las directrices de WCAG 2.1 nivel AA.

## 4. Pila Tecnológica (Tech Stack)

Las siguientes tecnologías han sido seleccionadas para cumplir con los requisitos del proyecto:

-   **Framework Principal:** **Astro.js**. Elegido por su arquitectura de "cero JavaScript por defecto", que garantiza un rendimiento excepcional y un SEO óptimo. Su modelo de componentes facilita un desarrollo modular y mantenible.
-   **Interactividad del Cliente:** **Surreal.js**. Se utilizará para la manipulación del DOM y la interactividad del lado del cliente. Esta elección se basa en su naturaleza ligera (JavaScript vainilla), su rendimiento y su filosofía de "Localidad de Comportamiento", que se alinea perfectamente con la arquitectura de componentes de Astro y el objetivo de minimizar la huella de JavaScript en el cliente.
-   **Despliegue:** Se utilizará una plataforma de despliegue continuo (ej. Vercel, Netlify) para automatizar la publicación de cambios desde el repositorio de Git.
