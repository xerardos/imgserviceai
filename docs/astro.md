# Guía Esencial de Astro para Landing Pages

Esta guía es un resumen práctico y actualizado de Astro.js, enfocado en lo que necesitas para construir landing pages rápidas y eficientes utilizando componentes nativos de Astro y Markdown, sin frameworks de UI externos.

## ¿Por qué Astro para Landing Pages?

Astro está diseñado para la velocidad. Envía cero JavaScript al navegador por defecto, lo que resulta en tiempos de carga casi instantáneos y un excelente posicionamiento en buscadores (SEO). Su arquitectura de "islas" te permite añadir interactividad solo donde es estrictamente necesario, manteniendo la ligereza del sitio.

---

## Novedades Clave (Post-v4) para tu Landing

Incluso para una landing page sencilla, las últimas versiones de Astro traen herramientas muy potentes.

### 1. View Transitions

Añade transiciones suaves y animaciones entre páginas con una sola línea de código. Esto hace que la navegación (ej. de la Home a la página de Contacto) se sienta como una aplicación de una sola página (SPA), mejorando enormemente la experiencia de usuario.

**Habilitación en un layout:**
```astro
---
// src/layouts/Layout.astro
import { ClientRouter } from 'astro:transitions';
---
<html lang="es">
  <head>
    <title>Mi Landing Page</title>
    <ClientRouter />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### 2. Astro Actions

Es la forma moderna y segura de manejar envíos de formularios sin tener que crear una API completa. Ideal para un formulario de contacto o de suscripción. Astro se encarga de la comunicación entre el cliente y el servidor de forma segura.

**Ejemplo de un formulario de contacto:**
```astro
---
// src/pages/contacto.astro
import { actions } from 'astro:actions';

// Obtiene el resultado después de que el formulario se envía
const result = Astro.getActionResult(actions.submitContactForm);
---
<form method="POST" action={actions.submitContactForm}>
  <label>Email: <input type="email" name="email" /></label>
  <button>Enviar</button>
</form>

{result?.data && <p>¡Gracias por tu mensaje!</p>}
{result?.error && <p>Error: {result.error.message}</p>}
```

**Definición de la acción:**
```typescript
// src/actions/index.ts
import { defineAction, z } from 'astro:actions';

export const server = {
  submitContactForm: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email(),
    }),
    handler: async ({ email }) => {
      // Aquí iría la lógica para enviar el email o guardar en una base de datos
      console.log('Email recibido:', email);
      return { success: true };
    }
  })
}
```

---

## Fundamentos para Construir tu Landing Page

### 1. Estructura del Proyecto

Al iniciar con `npm create astro@latest`, Astro te sugiere una estructura de carpetas clara:

-   `src/pages/`: Cada archivo `.astro` o `.md` aquí se convierte en una página de tu sitio. (Ej: `src/pages/about.astro` -> `tu-sitio.com/about`).
-   `src/layouts/`: Contiene las plantillas o estructuras base de tus páginas (ej. `Layout.astro` con la cabecera y el pie de página).
-   `src/components/`: Para guardar componentes reutilizables (ej. `Boton.astro`, `Tarjeta.astro`).

### 2. El Componente Astro (`.astro`)

Es la base de todo. Se divide en dos partes:

-   **Frontmatter (Script):** El código JavaScript/TypeScript entre las vallas `---`. Se ejecuta en el servidor y nunca llega al navegador. Aquí defines variables, importas otros componentes o haces fetch de datos.
-   **Plantilla (Template):** El resto del archivo. Es principalmente HTML, pero puedes inyectar variables y usar lógica simple con una sintaxis similar a JSX.

```astro
---
// src/components/Saludo.astro
// 1. Frontmatter: Lógica del servidor
const { nombre } = Astro.props;
---
<!-- 2. Plantilla: HTML + expresiones JS -->
<h1>Hola, {nombre}!</h1>
```

#### Props: Componentes Reutilizables

Puedes pasar datos a tus componentes a través de `props`, como si fueran atributos HTML.

```astro
---
// Uso en una página
import Saludo from '../components/Saludo.astro';
---
<Saludo nombre="Mundo" />
<Saludo nombre="Astro" />
```

#### Slots: Inyectar Contenido

El `<slot />` es un marcador de posición dentro de un componente (especialmente en layouts) donde se inyectará el contenido hijo.

**Layout Básico:**
```astro
---
// src/layouts/Layout.astro
const { title } = Astro.props;
---
<html lang="es">
<head>
  <title>{title}</title>
</head>
<body>
  <header>Mi Landing</header>
  <main>
    <slot /> <!-- El contenido de la página va aquí -->
  </main>
  <footer>&copy; 2024</footer>
</body>
</html>
```

**Uso del Layout:**
```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
---
<Layout title="Página de Inicio">
  <h1>Bienvenido a mi landing page</h1>
  <p>Este contenido se inyecta en el slot.</p>
</Layout>
```

### 3. Contenido con Markdown

Astro tiene un soporte excelente para Markdown. Puedes crear páginas enteras escribiendo solo `.md`.

-   Crea un archivo como `src/pages/blog/mi-post.md`.
-   Usa el frontmatter de YAML para definir metadatos y, lo más importante, el `layout` que quieres usar.

```markdown
---
# src/pages/blog/mi-post.md
layout: ../../layouts/Layout.astro
title: 'Mi Primer Post'
author: 'Yo Mismo'
---

# Este es el título de mi post

Aquí va el contenido escrito en **Markdown**. Es muy fácil y rápido.

-   Puedo tener listas.
-   Y mucho más.

Este contenido se renderizará dentro del `<slot />` del `Layout.astro`.
```

### 4. Estilos y Imágenes

#### Estilos Locales (Scoped)

Por defecto, la etiqueta `<style>` dentro de un componente `.astro` solo aplica sus estilos a ese componente. Esto evita conflictos de CSS entre diferentes partes de tu sitio.

```astro
---
// src/components/Tarjeta.astro
---
<div class="card">
  <p>Soy una tarjeta</p>
</div>

<style>
  /* Este estilo solo se aplica a la clase .card de este archivo */
  .card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
</style>
```

#### Optimización de Imágenes

Usa el componente `<Image />` de `astro:assets` para que Astro optimice tus imágenes automáticamente (comprima, redimensione y sirva formatos modernos como WebP).

```astro
---
import { Image } from 'astro:assets';
import miImagenHero from '../assets/hero.png';
---
<h2>Nuestra Imagen de Héroe</h2>
<Image src={miImagenHero} alt="Descripción de la imagen para accesibilidad" />
```

---

## Estrategias para JavaScript del Lado del Cliente

Astro brilla por su capacidad de enviar cero JavaScript por defecto. Sin embargo, cuando necesitas interactividad, tienes un control total. La forma más sencilla y alineada con la filosofía de Astro es usar etiquetas `<script>` estándar en tus componentes.

### Caso de Estudio: Integrando una Librería Ligera (Surreal.js)

Surreal.js es un ejemplo perfecto de cómo añadir interactividad de forma quirúrgica. Su concepto de "Localidad de Comportamiento" (el script está junto al HTML que controla) complementa la arquitectura de "islas" de Astro.

**El Proceso:**

1.  **Carga Global:** Incluyes la librería una sola vez en tu layout principal (`src/layouts/Layout.astro`) usando la directiva `is:inline`. Esto la hace disponible en todas las páginas sin una petición de red adicional.

    ```html
    <head>
      <script is:inline src="/js/surreal.js"></script>
    </head>
    ```

2.  **Uso Local en Componentes:** Dentro de cualquier componente Astro, puedes añadir un bloque `<script>` para crear una "isla de interactividad". El código dentro de este script solo se ejecutará en el contexto de ese componente.

**Ejemplo Práctico (`BotonInteractivo.astro`):**

```astro
---
// src/components/BotonInteractivo.astro
---
<div class="contenedor-boton">
  <button>Haz clic para que desaparezca</button>

  <!-- Este script crea una "isla de interactividad" -->
  <script>
    // me() selecciona el <div> padre.
    const boton = me().querySelector('button');
    me(boton).on('click', (ev) => {
      me(ev).fadeOut(); // Usa una función de Surreal.js
    });
  </script>
</div>
```

Este enfoque es extremadamente potente porque el JavaScript solo se asocia con el componente `BotonInteractivo`. Si no usas este componente en una página, su JavaScript no se carga. Si lo usas diez veces, el código se reutiliza eficientemente. Esto mantiene tus páginas ligeras y rápidas, añadiendo interactividad solo donde es necesaria.

---

## Ejemplo Práctico: Estructura de una Landing

Una estructura de archivos típica para una landing page podría ser:

```
/
├── public/
│   └── js/
│       └── surreal.js
├── src/
│   ├── assets/
│   │   └── hero-image.jpg
│   ├── components/
│   │   ├── Header.astro
│   │   ├── FeatureCard.astro
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── blog/
│   │       └── mi-primer-post.md
│   └── actions/
│       └── index.ts
└── astro.config.mjs
```

Con estos conceptos, tienes todo lo necesario para empezar a construir landing pages increíblemente rápidas y mantenibles con Astro.

Para más información, consulta la [documentación oficial de Astro](https://docs.astro.build/).
