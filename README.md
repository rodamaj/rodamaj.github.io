# rodamaj.github.io

Sitio personal de [Josué Amador-Rojas](https://rodamaj.com), ingeniero de software y estudiante de ciencias de la computación.

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

La cámara (`captureType`) y el aumento (`zoom`) se guardan por separado.
Indica el aumento utilizado, por ejemplo `--capture-type telephoto --zoom 8`.
Si no lo conoces, omítelo: no se deduce automáticamente de la cámara ni de los
milímetros. Los frames de video también pueden quedar sin aumento conocido.

Las ubicaciones conservan cada nivel por separado en `location` (`level` y
`name` traducible). En Costa Rica se requieren distrito, cantón, provincia y
país, incluso si sus nombres coinciden. El pie de foto elimina únicamente
repeticiones consecutivas; los datos originales se conservan completos.
Para otros países, indica sus niveles con `--location-levels` (por ejemplo,
`place,neighbourhood,locality,capital-district,country` para la foto de Bogotá).
Las listas `--location-es` y `--location-en` deben incluir el mismo número de
partes, separadas por comas. Para el mar, el espacio u otra ubicación sin
divisiones aplicables, usa `--location-special` y una descripción real del lugar.
