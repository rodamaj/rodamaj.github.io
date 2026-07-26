# rodamaj.github.io

Sitio personal de [Josué Amador-Rojas](https://rodamaj.github.io), ingeniero de software y estudiante de ciencias de la computación.

Reúne proyectos de ingeniería de software, investigaciones y exploraciones en ciencias de la computación, una selección de fotografía personal e información sobre formación e intereses. Está disponible en español e inglés y cuenta con temas claro y oscuro.

Construido con Nuxt, Vue, TypeScript. Publicado en GitHub Pages.

## Agregar una fotografía

1. Copia la fotografía original, ya recortada a **3:4**, dentro de
   `photo-inbox/`.
2. Ejecuta:

   ```bash
   npm run photo:add -- photo-inbox/IMG_9999.heic
   ```

3. Confirma las sugerencias y completa únicamente lo que falte. El generador
   lee fecha, iPhone, distancia focal, cámara y GPS cuando están disponibles.
   Si hay GPS, puedes autorizar una consulta en Nominatim para proponer una
   ubicación editable.
4. Revisa el YAML y las tres versiones generadas antes de hacer commit.

La consulta externa nunca ocurre sin confirmación. En automatizaciones puedes
usar `--geocode` o impedirla expresamente con `--no-geocode`.
