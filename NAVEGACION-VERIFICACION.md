# Verificación de navegación – Portátiles y PC

## Breakpoint usado

- **Tailwind `2xl`** = **1536px** (valor por defecto).
- **&lt; 1536px** (portátiles, tablets): menú **hamburguesa**.
- **≥ 1536px** (PC / monitores grandes): **barra de enlaces** completa en el header.

---

## Comportamiento esperado

### En PC (ancho ≥ 1536px)

- **Header:** Logo BRAYTON SRL a la izquierda.
- **Centro:** Enlaces en línea: Inicio, Nosotros, **Servicios** (con flecha; al pasar el ratón se abre el desplegable con “Ver todos los servicios” y cada servicio), Sectores, Proyectos, Clientes, Certificaciones, Noticias, Empleo.
- **Derecha:** Enlace “Ingresar” (login) + botón naranja “Solicitar Cotización”.
- **Dropdown Servicios:** Al hacer hover (o clic) en “Servicios” debe verse el menú con enlaces a cada servicio. Cierre al hacer clic fuera o con Escape.

### En portátil (ancho &lt; 1536px)

- **Header:** Logo a la izquierda; a la derecha icono de **usuario** (login), botón **hamburguesa** y (en algunas variantes) el CTA “Solicitar cotización” visible en la barra.
- Al **abrir el menú** (clic en hamburguesa): lista vertical con Inicio, Nosotros, Servicios (acordeón con “Ver todos” y servicios), Sectores, Proyectos, Clientes, Certificaciones, Noticias, **Empleo**, **Solicitar Cotización**, **Ingresar**. Sin duplicar “Contacto” (solo “Solicitar Cotización”).
- Cierre del menú: clic en una opción, en la X o tecla Escape.

---

## Cómo comprobar en tu entorno

1. **Arrancar el sitio:**  
   `npm run dev` o `npm run build && npm run start` y abrir `http://localhost:3000`.

2. **Vista PC:**  
   - Maximizar la ventana del navegador o redimensionar a **≥ 1536px** (por ejemplo 1920×1080).  
   - Comprobar que se ve la barra de enlaces (sin hamburguesa) y el botón “Solicitar Cotización”.  
   - Pasar el ratón sobre “Servicios” y verificar que se abre el desplegable y que todos los enlaces son clicables.

3. **Vista portátil:**  
   - Reducir el ancho por debajo de **1536px** (por ejemplo 1440 o 1366).  
   - Comprobar que aparece el icono hamburguesa y que al abrirlo se ven **Empleo**, **Solicitar Cotización** e **Ingresar** (sin “Trabaja con nosotros” ni “Contacto” duplicados en el menú).

4. **Navegar:**  
   - En ambas vistas, hacer clic en Inicio, Nosotros, Proyectos, Certificaciones, etc., y en “Solicitar Cotización” (debe ir a `/contacto`).  
   - En PC, usar el dropdown de Servicios para ir a cada servicio.  
   - En móvil/portátil, abrir el acordeón Servicios y comprobar “Ver todos” y cada servicio.

---

## Resumen de lo verificado en sesión

- **Menú móvil/portátil (hamburguesa):** Contenido correcto: Inicio, Nosotros, Servicios (submenú), Sectores, Proyectos, Clientes, Certificaciones, Noticias, **Empleo**, **Solicitar Cotización**, **Ingresar**. Sin enlaces vacíos.
- **Código del header:** Breakpoint `2xl` (1536px) aplicado de forma coherente a la barra desktop (`hidden 2xl:flex`) y al bloque hamburguesa (`flex 2xl:hidden`).
- **Desplegable Servicios:** Implementado con `servicesData`; cierre con clic fuera y Escape.

El navegador integrado en el IDE puede no respetar el redimensionado de ventana para los media queries; por eso se recomienda esta comprobación en un navegador normal a tamaño completo y reducido.
