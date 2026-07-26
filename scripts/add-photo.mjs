#!/usr/bin/env node

import { execFile } from 'node:child_process'
import {
  access,
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, isAbsolute, join, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { parseArgs, promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const imageWidths = [640, 960, 1600]
const captureTypes = [
  'main-camera',
  'main-camera-2x',
  'ultra-wide',
  'telephoto',
  'video-frame',
]

const usage = `
Agrega una fotografía a la colección.

Uso interactivo:
  npm run photo:add -- photo-inbox/IMG_9999.heic

Opciones:
  --slug <slug>                  Identificador en inglés, en kebab-case
  --date <YYYY-MM-DD>            Fecha de captura
  --location-es <texto>          Ubicación en español
  --location-en <texto>          Ubicación en inglés
  --device <texto>               Modelo del iPhone
  --capture-type <tipo>          ${captureTypes.join(' | ')}
  --focal-length <mm>            Distancia focal; omitir si no se conservó
  --alt-es <texto>               Texto alternativo en español
  --alt-en <texto>               Texto alternativo en inglés
  --geocode                      Consultar la ubicación GPS en Nominatim
  --no-geocode                   No consultar la ubicación a partir del GPS
  --dry-run                      Validar y mostrar el YAML sin escribir archivos
  --help                         Mostrar esta ayuda
`.trim()

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    slug: { type: 'string' },
    date: { type: 'string' },
    'location-es': { type: 'string' },
    'location-en': { type: 'string' },
    device: { type: 'string' },
    'capture-type': { type: 'string' },
    'focal-length': { type: 'string' },
    'alt-es': { type: 'string' },
    'alt-en': { type: 'string' },
    geocode: { type: 'boolean', default: false },
    'no-geocode': { type: 'boolean', default: false },
    'dry-run': { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
    root: { type: 'string' },
  },
})

if (values.help) {
  console.log(usage)
  process.exit(0)
}

if (process.platform !== 'darwin') {
  throw new Error(
    'Este generador usa las herramientas de imagen incluidas en macOS.'
  )
}

const projectRoot = resolve(values.root ?? process.cwd())
const sourceArgument = positionals[0]

if (!sourceArgument) {
  throw new Error(`Falta la fotografía de origen.\n\n${usage}`)
}

const sourcePath = isAbsolute(sourceArgument)
  ? sourceArgument
  : resolve(projectRoot, sourceArgument)

await access(sourcePath)

const runSips = async (...args) => {
  const { stdout } = await execFileAsync('/usr/bin/sips', args)
  return stdout
}

const metadataNames = [
  'kMDItemAcquisitionModel',
  'kMDItemFocalLength35mm',
  'kMDItemLatitude',
  'kMDItemLongitude',
]
const { stdout: metadataOutput } = await execFileAsync('/usr/bin/mdls', [
  ...metadataNames.flatMap((name) => ['-name', name]),
  sourcePath,
])
const metadataProperty = (name) => {
  const value = metadataOutput.match(
    new RegExp(`^${name}\\s+=\\s+(.+)$`, 'm')
  )?.[1]
  if (!value || value === '(null)') return ''
  return value.replace(/^"(.*)"$/, '$1')
}

const sourceProperties = await runSips(
  '-g',
  'pixelWidth',
  '-g',
  'pixelHeight',
  '-g',
  'creation',
  '-g',
  'model',
  sourcePath
)

const property = (name) =>
  sourceProperties.match(new RegExp(`^\\s*${name}:\\s*(.+)$`, 'm'))?.[1]

const sourceWidth = Number(property('pixelWidth'))
const sourceHeight = Number(property('pixelHeight'))
const metadataDate = property('creation')?.match(/^(\d{4}):(\d{2}):(\d{2})/)
const suggestedDate = metadataDate
  ? `${metadataDate[1]}-${metadataDate[2]}-${metadataDate[3]}`
  : ''
const suggestedDevice =
  metadataProperty('kMDItemAcquisitionModel') ||
  property('model')?.replace(/^<nil>$/, '') ||
  ''
const suggestedFocalLength = metadataProperty('kMDItemFocalLength35mm')
const latitudeMetadata = metadataProperty('kMDItemLatitude')
const longitudeMetadata = metadataProperty('kMDItemLongitude')
const latitude = Number(latitudeMetadata)
const longitude = Number(longitudeMetadata)
const hasCoordinates =
  Boolean(latitudeMetadata && longitudeMetadata) &&
  Number.isFinite(latitude) &&
  Number.isFinite(longitude)
const sourceName = basename(sourcePath).replace(/\.[^.]+$/, '')
const focalLengthNumber = Number(suggestedFocalLength)
const suggestedCaptureType = sourceName.endsWith('_still')
  ? 'video-frame'
  : focalLengthNumber > 0 && focalLengthNumber <= 18
    ? 'ultra-wide'
    : focalLengthNumber >= 40 && focalLengthNumber <= 55
      ? 'main-camera-2x'
      : focalLengthNumber >= 60
        ? 'telephoto'
        : 'main-camera'

const formatLocation = ({ address = {} }) =>
  [
    address.amenity ??
      address.tourism ??
      address.leisure ??
      address.historic ??
      address.natural,
    address.neighbourhood,
    address.suburb,
    address.city_district,
    address.city ?? address.town ?? address.village ?? address.municipality,
    address.county,
    address.state,
    address.country,
  ]
    .filter(Boolean)
    .join(', ')

const interactive = process.stdin.isTTY && process.stdout.isTTY
const prompt = interactive
  ? createInterface({ input: process.stdin, output: process.stdout })
  : null
let shouldGeocode = values.geocode

if (
  hasCoordinates &&
  !values.geocode &&
  !values['no-geocode'] &&
  !values['location-es'] &&
  !values['location-en'] &&
  prompt
) {
  const answer = await prompt.question(
    `GPS detectado (${latitude}, ${longitude}). ¿Consultar Nominatim? [s/N]: `
  )
  shouldGeocode = /^s(?:í|i)?$/i.test(answer.trim())
}

let suggestedLocation = ''
if (
  hasCoordinates &&
  shouldGeocode &&
  !values['no-geocode'] &&
  (!values['location-es'] || !values['location-en'])
) {
  try {
    const endpoint = new URL('https://nominatim.openstreetmap.org/reverse')
    endpoint.search = new URLSearchParams({
      format: 'jsonv2',
      lat: String(latitude),
      lon: String(longitude),
      zoom: '18',
      addressdetails: '1',
      'accept-language': 'es',
    })
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
        'User-Agent':
          'rodamaj.github.io-photo-generator/1.0 (https://rodamaj.github.io)',
      },
    })
    if (response.ok) suggestedLocation = formatLocation(await response.json())
  } catch {
    console.warn('No fue posible obtener una ubicación a partir del GPS.')
  }
}

if (!sourceWidth || !sourceHeight) {
  throw new Error('No fue posible leer las dimensiones de la fotografía.')
}

const aspectRatio = sourceWidth / sourceHeight
if (Math.abs(aspectRatio - 3 / 4) > 0.01) {
  throw new Error(
    `La fotografía debe estar recortada a 3:4. Sus dimensiones actuales son ${sourceWidth} × ${sourceHeight}.`
  )
}

if (sourceWidth < imageWidths.at(-1)) {
  throw new Error(
    `La fotografía debe tener al menos ${imageWidths.at(-1)} px de ancho.`
  )
}

const ask = async (label, currentValue = '', fallback = '') => {
  if (currentValue) return currentValue.trim()
  if (!prompt) return fallback.trim()

  const suffix = fallback ? ` [${fallback}]` : ''
  const answer = await prompt.question(`${label}${suffix}: `)
  return (answer.trim() || fallback).trim()
}

const askCaptureType = async () => {
  if (values['capture-type']) return values['capture-type'].trim()
  if (!prompt) return suggestedCaptureType

  console.log('\nTipo de captura:')
  console.log('  1. Cámara principal')
  console.log('  2. Cámara principal, 2×')
  console.log('  3. Ultra gran angular')
  console.log('  4. Teleobjetivo')
  console.log('  5. Frame de video')
  const suggestedOption = captureTypes.indexOf(suggestedCaptureType) + 1
  const answer = (
    await prompt.question(`Selecciona una opción [${suggestedOption}]: `)
  ).trim()

  if (!answer) return suggestedCaptureType
  return captureTypes[Number(answer) - 1] ?? answer
}

const data = {
  slug: await ask('Identificador en inglés (kebab-case)', values.slug),
  date: await ask('Fecha (YYYY-MM-DD)', values.date, suggestedDate),
  locationEs: await ask(
    'Ubicación en español',
    values['location-es'],
    suggestedLocation
  ),
  locationEn: await ask(
    'Ubicación en inglés',
    values['location-en'],
    suggestedLocation
  ),
  device: await ask('Dispositivo', values.device, suggestedDevice),
  captureType: await askCaptureType(),
  focalLength: await ask(
    'Distancia focal en mm (Enter si no se conservó)',
    values['focal-length'],
    suggestedFocalLength
  ),
  altEs: await ask('Texto alternativo en español', values['alt-es']),
  altEn: await ask('Texto alternativo en inglés', values['alt-en']),
}

prompt?.close()

const requiredFields = [
  ['slug', 'identificador'],
  ['date', 'fecha'],
  ['locationEs', 'ubicación en español'],
  ['locationEn', 'ubicación en inglés'],
  ['device', 'dispositivo'],
  ['captureType', 'tipo de captura'],
  ['altEs', 'texto alternativo en español'],
  ['altEn', 'texto alternativo en inglés'],
]

for (const [field, label] of requiredFields) {
  if (!data[field]) throw new Error(`Falta ${label}.`)
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
  throw new Error(
    'El identificador debe usar únicamente minúsculas, números y guiones.'
  )
}

const parsedDate = new Date(`${data.date}T00:00:00Z`)
if (
  !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
  Number.isNaN(parsedDate.valueOf()) ||
  parsedDate.toISOString().slice(0, 10) !== data.date
) {
  throw new Error('La fecha debe ser una fecha real con formato YYYY-MM-DD.')
}

if (!captureTypes.includes(data.captureType)) {
  throw new Error(`Tipo de captura inválido: ${data.captureType}.`)
}

const focalLength = data.focalLength ? Number(data.focalLength) : undefined
if (
  focalLength !== undefined &&
  (!Number.isFinite(focalLength) || focalLength <= 0)
) {
  throw new Error('La distancia focal debe ser un número positivo.')
}

const contentDirectory = join(projectRoot, 'content', 'photography')
const imageDirectory = join(
  projectRoot,
  'public',
  'images',
  'photography',
  data.slug
)
const yamlPath = join(contentDirectory, `${data.slug}.yml`)

const existingContent = await readdir(contentDirectory)
const existingOrders = await Promise.all(
  existingContent
    .filter((file) => file.endsWith('.yml'))
    .map(async (file) => {
      const contents = await readFile(join(contentDirectory, file), 'utf8')
      return Number(contents.match(/^order:\s*(\d+)$/m)?.[1] ?? 0)
    })
)
const order = Math.max(0, ...existingOrders) + 1
const quote = (value) => JSON.stringify(value)
const publicBase = `/images/photography/${data.slug}`
const targetHeight = (width) => Math.round((width * sourceHeight) / sourceWidth)

const yaml = [
  `slug: ${data.slug}`,
  `order: ${order}`,
  `date: ${quote(data.date)}`,
  'location:',
  `  es: ${quote(data.locationEs)}`,
  `  en: ${quote(data.locationEn)}`,
  `device: ${quote(data.device)}`,
  `captureType: ${data.captureType}`,
  ...(focalLength === undefined ? [] : [`focalLengthMm: ${focalLength}`]),
  'image:',
  `  src: ${publicBase}/1600.jpg`,
  '  width: 1600',
  `  height: ${targetHeight(1600)}`,
  '  alt:',
  `    es: ${quote(data.altEs)}`,
  `    en: ${quote(data.altEn)}`,
  '  sources:',
  ...imageWidths.flatMap((width) => [
    `    - src: ${publicBase}/${width}.jpg`,
    `      width: ${width}`,
  ]),
  '',
].join('\n')

console.log(`\nOrigen: ${sourceName} (${sourceWidth} × ${sourceHeight})`)
console.log(`Entrada: ${yamlPath}`)
console.log(`Imágenes: ${imageDirectory}/{640,960,1600}.jpg`)

if (values['dry-run']) {
  console.log(`\n${yaml}`)
  process.exit(0)
}

try {
  await access(yamlPath)
  throw new Error(`Ya existe ${yamlPath}.`)
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}

try {
  await access(imageDirectory)
  throw new Error(`Ya existe ${imageDirectory}.`)
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}

const temporaryDirectory = await mkdtemp(join(tmpdir(), 'photo-add-'))

try {
  const previewDirectory = join(temporaryDirectory, 'preview')
  await mkdir(previewDirectory)
  await execFileAsync('/usr/bin/qlmanage', [
    '-t',
    '-s',
    String(Math.max(sourceWidth, sourceHeight)),
    '-o',
    previewDirectory,
    sourcePath,
  ])

  const previewFiles = await readdir(previewDirectory)
  if (previewFiles.length !== 1) {
    throw new Error('No fue posible decodificar la fotografía de origen.')
  }
  const intermediateImage = join(previewDirectory, previewFiles[0])

  for (const width of imageWidths) {
    const outputPath = join(temporaryDirectory, `${width}.jpg`)
    await runSips(
      '--resampleWidth',
      String(width),
      '-s',
      'format',
      'jpeg',
      '-s',
      'formatOptions',
      '82',
      intermediateImage,
      '--out',
      outputPath
    )
    const outputProperties = await runSips(
      '-g',
      'pixelWidth',
      '-g',
      'pixelHeight',
      outputPath
    )
    const outputWidth = Number(
      outputProperties.match(/^\s*pixelWidth:\s*(\d+)$/m)?.[1]
    )
    const outputHeight = Number(
      outputProperties.match(/^\s*pixelHeight:\s*(\d+)$/m)?.[1]
    )

    if (outputWidth !== width || outputHeight !== targetHeight(width)) {
      throw new Error(`La versión de ${width} px no se generó correctamente.`)
    }
  }

  await mkdir(imageDirectory, { recursive: false })
  for (const width of imageWidths) {
    await copyFile(
      join(temporaryDirectory, `${width}.jpg`),
      join(imageDirectory, `${width}.jpg`)
    )
  }
  await writeFile(yamlPath, yaml, { encoding: 'utf8', flag: 'wx' })
} catch (error) {
  await rm(imageDirectory, { recursive: true, force: true })
  throw error
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true })
}

console.log('\nFotografía agregada correctamente.')
