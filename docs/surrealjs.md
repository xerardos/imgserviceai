# Surreal.js Cheatsheet

## Selección de Elementos

### `me(selector, startNode, required)`

Selecciona el primer elemento que coincide con el `selector`.

- **`selector`**: Un string de selector CSS. También puede ser:
    - `'-'`, `'prev'`, `'previous'`: para el hermano anterior.
    - `'+'`, `'next'`: para el siguiente hermano.
- **`startNode`** (opcional): El nodo desde el que empezar la búsqueda (por defecto `document`).
- **`required`** (opcional, booleano): Si es `false`, no se lanzará un error si no se encuentra el elemento.

**Seleccionar un elemento por ID y añadir una clase (si existe):**
```javascript
me("#i_dont_exist")?.classAdd('active');
```

**Seleccionar un elemento relativo a otro:**
```html
<form>
  <input type="text" n1 />
  <script>me('[n1]', me()).value = "hello"</script>
</form>
```

**Seleccionar el hermano anterior:**
```html
<input type="text" />
<script>me('-').value = "hello"</script>
```

### `any(selector)`

Selecciona todos los elementos que coinciden con el `selector` y devuelve una colección similar a un array.

**Usar métodos de array en la colección:**
```javascript
any('button')?.forEach(btn => console.log(btn));
any('button')?.map(btn => btn.textContent);
```

## Eventos

### `on(eventType, handler)`

Añade un `event listener` a los elementos seleccionados.

**Manejar un evento de clic:**
```javascript
me().on('click', ev => {
  me(ev).styles('background', 'red');
});
```

### `off(eventType, handler)`

Elimina un `event listener` específico.

```javascript
me().off('click', miFuncionHandler);
```

### `offAll()`

Elimina todos los `event listeners` añadidos con Surreal.

```javascript
me().offAll();
```

### `send(eventName, detail)`

Despacha un evento en los elementos seleccionados.

**Enviar un evento `change`:**
```javascript
me().send('change');
```

**Enviar un evento con datos:**
```javascript
me().send('change', { 'data': 'thing' });
```

### `halt(event)`

Detiene la propagación del evento y previene la acción por defecto.

```javascript
me().on("dragover", ev => {
  halt(ev);
  // ...
});
```

### `disable()` / `enable()`

Deshabilita o habilita los eventos de interacción (`click`, `key`, `submit`).

```javascript
me().disable(); // Deshabilita
me().enable();  // Habilita
```

## Manipulación del DOM

### `classAdd(className)` / `classRemove(className)` / `classToggle(className)`

Añade, elimina o alterna una clase CSS.

```javascript
me().classAdd('active');
me().classRemove('active');
me().classToggle('active');
```

### `styles(cssText | cssObject)`

Establece estilos CSS en línea. Para eliminar un estilo, establece su valor en `null`.

```javascript
// Como string
me().styles('color: red');

// Como objeto
me().styles({ 'color': 'red', 'background': 'blue' });

// Eliminar un estilo
me().styles({ 'background': null });
```

### `attribute(name | attrObject, value)`

Obtiene, establece o elimina atributos. Para eliminar, establece el valor en `null`.

```javascript
// Obtener valor
let dataX = me().attribute('data-x');

// Establecer valor
me().attribute('data-x', true);

// Establecer múltiples atributos
me().attribute({ 'data-x': 'yes', 'data-y': 'no' });

// Eliminar un atributo
me().attribute('data-x', null);
```

### `textContent` / `innerHTML` / `innerText`

Establece el contenido de texto o HTML de un elemento.

```javascript
me().textContent = "hello world"; // Seguro contra XSS
me().innerHTML = "<p>hello world</p>"; // Inseguro
me().innerText = "hello world";
```

### `children`

Accede a la colección de hijos de un elemento.

```javascript
let hijos = me().children;
me().children.hidden = true;
```

### `createElement(tagName)`

Crea un nuevo elemento del DOM.

```javascript
let nuevoDiv = createElement("div");
me().prepend(nuevoDiv);
```

### `prepend()` / `appendChild()` / `insertBefore()` / `insertAdjacentHTML()`

Añade nuevos elementos al DOM.

```javascript
me().prepend(new_element);
me().appendChild(new_element);
me().insertBefore(element, other_element.firstChild);
me().insertAdjacentHTML("beforebegin", new_element);
```

### `run(callback)`

Ejecuta una función para cada elemento en la selección.

```javascript
any('button').run(e => {
  console.log(e.textContent);
});
```

## Asincronía y Animaciones

### `onloadAdd(callback)`

Ejecuta una función cuando el DOM está completamente cargado.

```javascript
onloadAdd(_ => {
  alert("¡Página cargada!");
});
```

### `sleep(duration, callback)`

Pausa la ejecución durante un tiempo determinado.

```javascript
await sleep(1000); // Espera 1 segundo
console.log("Ha pasado un segundo.");
```

### `tick()`

Espera al siguiente frame de pintado del navegador (`requestAnimationFrame`).

```javascript
me(el).styles({ "opacity": "0" });
await tick(); // Espera a que el estilo se aplique
me(el).styles({ "transition": "opacity 1s", "opacity": "1" });
```

### `rAF(callback)` / `rIC(callback)`

Alias para `requestAnimationFrame` y `requestIdleCallback`.

```javascript
rAF(timestamp => {
  console.log('Ejecutado en el siguiente frame');
});

rIC(deadline => {
  console.log('Ejecutado cuando el navegador está inactivo');
});
```

### `fadeIn(callback, duration)` / `fadeOut(callback, duration)`

Anima la opacidad de los elementos para mostrarlos u ocultarlos.

```javascript
// Fade in simple
me().fadeIn();

// Fade out con callback y duración
me().fadeOut(() => {
  alert("¡Desvanecido!");
}, 2000); // 2 segundos
```

**Ejemplo de animación compleja:**
```html
<div>Cambio de color cada segundo.
  <script>
    me().on("click", async ev => {
      let el = me(ev);
      me(el).styles({ "transition": "background 1s" });
      await sleep(1000);
      me(el).styles({ "background": "red" });
      await sleep(1000);
      me(el).styles({ "background": "green" });
      await sleep(1000);
      me(el).remove();
    });
  </script>
</div>
```

## AJAX

### `fetch` (API moderna)

Realiza peticiones HTTP asíncronas.

```javascript
me().on("click", async event => {
  let e = me(event);
  // Ejemplo 1: Llamar a un endpoint
  if ((await fetch("/webhook")).ok) {
    console.log("¡Hecho!");
  }

  // Ejemplo 2: Obtener contenido y reemplazar
  try {
    let response = await fetch('/endpoint');
    if (response.ok) {
      e.innerHTML = await response.text();
    } else {
      console.warn('fetch(): Respuesta no válida');
    }
  } catch (error) {
    console.warn(`fetch(): ${error}`);
  }
});
```

### `XMLHttpRequest` (API antigua)

```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", "/endpoint");
xhr.onreadystatechange = () => {
  if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
    me().innerHTML = xhr.responseText;
  }
};
xhr.send();
```

## Scoping y Plugins

### Scoping con bloques

Usa `{}` para crear un ámbito local para variables y funciones.

```javascript
{
  let nota = "hola";
  function saludar(texto) { alert(texto); }
  me().on('click', ev => { saludar(nota); });
}
```

### Scoping en `me()`

Añade funciones directamente al objeto `me()`.

```javascript
me().saludar = (texto) => { alert(texto); };
me().on('click', (ev) => { me(ev).saludar("hola"); });
```

### Creación de Plugins

Extiende la funcionalidad de Surreal.

```javascript
function pluginHola(e) {
  function hola(e, nombre = "Mundo") {
    console.log(`Hola ${nombre} desde ${e}`);
    return e; // Para encadenar métodos
  }
  e.hola = (nombre) => { return hola(e, nombre); };
}

surreal.plugins.push(pluginHola);

// Uso:
me().hola("Cline");
```

## Debugging

### `console.log()` / `warn()` / `error()`

Métodos estándar de la consola.

### `console.time(label)` / `console.timeEnd(label)`

Mide el tiempo de ejecución de un bloque de código.

```javascript
console.time('miProceso');
// ... código a medir ...
console.timeEnd('miProceso');
```

### `monitorEvents(element)`

Registra en la consola todos los eventos que ocurren en un elemento.

```javascript
monitorEvents(me());
```

## Integración con Astro

### Compatibilidad y Filosofía

`surreal.js` es totalmente compatible con Astro. La filosofía de "Localidad de Comportamiento" de Surreal.js, donde el script vive junto al HTML que controla, encaja perfectamente con la arquitectura de componentes de Astro y su enfoque en enviar cero JavaScript al cliente por defecto.

Esto te permite crear "islas de interactividad" de forma precisa y eficiente.

### Paso 1: Carga del Script en Astro

Para que `surreal.js` esté disponible en tus páginas, debes añadirlo a tu layout principal.

1.  Coloca el archivo `surreal.js` en el directorio `public/` de tu proyecto (ej. `public/js/surreal.js`).
2.  En tu layout (ej. `src/layouts/Layout.astro`), añade la etiqueta `<script>` en el `<head>`.

```html
<!-- src/layouts/Layout.astro -->
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>{Astro.props.title}</title>
    <!-- Incluimos Surreal.js aquí -->
    <script is:inline src="/js/surreal.js"></script>
  </head>
  <body>
    <slot />
  </body>
</html>
```
La directiva `is:inline` es crucial para que Astro inserte el script directamente en el HTML.

### Paso 2: Uso Controlado en Componentes de Astro

El poder de esta integración reside en usar `me()` dentro de tus componentes `.astro` para limitar el alcance del script a ese componente específico.

**Ejemplo: Un componente de botón interactivo**

```html
---
// src/components/BotonInteractivo.astro
---
<div class="contenedor-boton">
  <p>Haz clic en el botón para que desaparezca.</p>
  <button>¡Haz clic!</button>

  <!--
    Este script SÓLO se aplica al <div> padre con la clase "contenedor-boton".
    No afectará a ningún otro elemento de la página.
  -->
  <script>
    // me() selecciona el div.contenedor-boton
    // .querySelector() busca el botón DENTRO de ese div.
    const boton = me().querySelector('button');

    // Creamos un manejador de eventos para el botón
    me(boton).on('click', (ev) => {
      // me(ev) se refiere al elemento que disparó el evento (el botón)
      // Lo hacemos desaparecer con un fadeOut.
      me(ev).fadeOut();
      console.log('Botón ocultado por Surreal.js');
    });
  </script>
</div>

<style>
  .contenedor-boton {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem;
  }
</style>
```

### Buenas Prácticas

1.  **Carga Global, Uso Local**: Carga `surreal.js` una vez en tu layout. Usa `me()` dentro de los componentes para un control local y preciso.
2.  **Selectores Específicos para `any()`**: Si usas `any()`, asegúrate de que tus selectores CSS sean específicos para evitar afectar a otros componentes.
3.  **Aprovecha Astro**: Recuerda que tú tienes el control. Solo los componentes a los que añadas un bloque `<script>` tendrán interactividad del lado del cliente.
