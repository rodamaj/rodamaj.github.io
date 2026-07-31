import { expect, test, type Page } from '@playwright/test'

const mainRoutes = [
  '/',
  '/about',
  '/engineering',
  '/science',
  '/thoughts',
  '/music',
  '/photography',
]

const waitForHydration = (page: Page) =>
  page.locator('.app[data-hydrated="true"]').waitFor()

test.describe('critical site flows', () => {
  test('renders every main route without client errors', async ({ page }) => {
    const clientErrors: Error[] = []
    page.on('pageerror', (error) => clientErrors.push(error))

    for (const route of mainRoutes) {
      const response = await page.goto(route)

      expect(
        response?.ok(),
        `${route} should return a successful response`
      ).toBe(true)
      await expect(
        page.locator('.site-container:visible').first()
      ).toBeVisible()
    }

    expect(clientErrors).toEqual([])
  })

  test('loads and renders Nuxt Content collections', async ({ page }) => {
    await page.goto('/engineering')
    await expect(
      page.locator('.side-panel, main').getByRole('heading', {
        name: 'Sitio personal',
      })
    ).toBeVisible()

    await page.goto('/science')
    await expect(
      page.locator('.side-panel, main').getByRole('heading', {
        name: 'Métodos de Newton para optimización',
      })
    ).toBeVisible()

    await page.goto('/about')
    await expect(
      page.locator('.side-panel, main').getByRole('heading', {
        name: 'Formación',
      })
    ).toBeVisible()
    await expect(
      page.locator('.side-panel, main').getByRole('link', {
        name: 'GitHub',
      })
    ).toBeVisible()
  })

  test('renders the photography collection with responsive images and metadata', async ({
    page,
  }) => {
    await page.goto('/photography')
    await waitForHydration(page)

    const photographs = page.locator('.photograph-entry')
    const firstImage = photographs.first().getByRole('img')

    await expect(photographs).toHaveCount(8)
    await expect(firstImage).toHaveAttribute('loading', 'eager')
    await expect(firstImage).toHaveAttribute('srcset', /640\.jpg 640w/)
    await expect(photographs.nth(1).getByRole('img')).toHaveAttribute(
      'loading',
      'lazy'
    )
    await expect(photographs.first().locator('.photograph-details')).toHaveText(
      'iPhone 17 · Cámara principal · 26 mm'
    )
    await expect(
      page.locator('#vive-claro-stage-fire .photograph-details')
    ).toHaveText('iPhone 17 Pro · Frame de video · Focal no conservada')

    const locationText = await photographs
      .first()
      .locator('.photograph-context p')
      .textContent()
    expect(locationText).toContain('Ciudad de la Investigación')
    expect(locationText).toContain('San Pedro, Montes de Oca')

    await expect(photographs.nth(1)).toHaveAttribute(
      'id',
      'vive-claro-stage-fire'
    )
    await expect(photographs.nth(2)).toHaveAttribute(
      'id',
      'crystal-clear-neon-selfie'
    )
  })

  test('opens and closes a panel through navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await waitForHydration(page)

    await page.getByRole('link', { name: 'Ingeniería' }).click()

    await expect(page).toHaveURL(/\/engineering$/)
    await expect(page.locator('.context-view')).toHaveClass(/has-panel/)
    await expect(page.locator('.home-container')).toBeVisible()
    await expect(page.locator('.side-panel')).toBeVisible()
    await expect(
      page.locator('.home-container [aria-current="page"]')
    ).toHaveText('Ingeniería')
    await expect(
      page.locator('.home-container').getByRole('link', {
        name: 'Ingeniería',
      })
    ).toHaveCount(0)

    await page.getByRole('link', { name: 'Cerrar panel' }).click()

    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('.context-view')).not.toHaveClass(/has-panel/)
  })

  test('changes language and persists the selected theme', async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)

    await page.getByRole('button', { name: 'Inglés' }).click()

    await expect(page.getByRole('link', { name: 'Engineering' })).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US')
    await expect(page.getByRole('button', { name: 'English' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )

    await page.getByRole('button', { name: 'Dark theme' }).click()

    await expect(page.locator('html')).toHaveClass(/dark-mode/)
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('nuxt-color-mode')))
      .toBe('dark')

    await page.reload()

    await expect(page.locator('html')).toHaveClass(/dark-mode/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US')
    await expect(page.getByRole('button', { name: 'English' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    await expect(page.getByRole('button', { name: 'Spanish' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })
})

test.describe('first-visit language detection', () => {
  test.use({ locale: 'en-US' })

  test('keeps the language switcher synchronized after hydration', async ({
    page,
  }) => {
    await page.goto('/')
    await waitForHydration(page)

    await expect(page.getByRole('link', { name: 'Engineering' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'English' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    await expect(page.getByRole('button', { name: 'Spanish' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )

    await page.getByRole('button', { name: 'Spanish' }).click()

    await expect(page.getByRole('link', { name: 'Ingeniería' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Español' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
  })
})

test.describe('responsive columns', () => {
  test('uses one full-width panel below the desktop breakpoint', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1360, height: 900 })
    await page.goto('/engineering')

    await expect(page.locator('.home-container')).toBeHidden()
    await expect(page.locator('.side-panel')).toBeVisible()

    const panel = await page.locator('.side-panel').boundingBox()

    expect(panel).not.toBeNull()
    expect(panel?.x).toBeCloseTo(0, 0)
    expect(panel?.width).toBeCloseTo(1360, 0)
  })

  test('keeps equal space around both desktop columns', async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 })
    await page.goto('/engineering')

    const home = page.locator('.home-container')
    const homeContent = home.locator('.home-content')
    const panel = page.locator('.side-panel')
    const panelContent = panel.locator('.site-content')

    await expect(home).toBeVisible()
    await expect(panel).toBeVisible()
    await expect
      .poll(async () => {
        const homeBox = await home.boundingBox()
        const homeContentBox = await homeContent.boundingBox()
        const panelBox = await panel.boundingBox()
        const panelContentBox = await panelContent.boundingBox()

        if (!homeBox || !homeContentBox || !panelBox || !panelContentBox) {
          return false
        }

        const homeSpace = (homeBox.width - homeContentBox.width) / 2
        const panelSpace = (panelBox.width - panelContentBox.width) / 2

        return (
          Math.abs(panelBox.x - (homeBox.x + homeBox.width)) < 2 &&
          Math.abs(homeContentBox.width - 600) < 2 &&
          Math.abs(panelContentBox.width - 720) < 2 &&
          Math.abs(homeSpace - panelSpace) < 2
        )
      })
      .toBe(true)
  })

  test('preserves the side panel width when desktop space gets tight', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/engineering')

    const home = await page.locator('.home-container').boundingBox()
    const panel = await page.locator('.side-panel').boundingBox()

    expect(home?.width).toBeCloseTo(608, 0)
    expect(panel?.width).toBeCloseTo(832, 0)
  })

  test('opens photography in the desktop side panel', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/photography')

    const home = page.locator('.home-container')
    const panel = page.locator('.side-panel')

    await expect(home).toBeVisible()
    await expect(panel).toBeVisible()
    await expect(page.locator('.context-view')).toHaveClass(/has-panel/)
    await expect(page.locator('.photograph-entry')).toHaveCount(8)
  })

  test('opens music in the desktop side panel', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/music')

    const home = page.locator('.home-container')
    const panel = page.locator('.side-panel')

    await expect(home).toBeVisible()
    await expect(panel).toBeVisible()
    await expect(page.locator('.context-view')).toHaveClass(/has-panel/)
    await expect(page.locator('.record-list li')).toHaveCount(8)
  })

  test('keeps two columns when science loads with a trailing slash', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/science/')

    await expect(page.locator('.context-view')).toHaveClass(/has-panel/)
    const home = page.locator('.home-container')
    const panel = page.locator('.side-panel')

    await expect(home).toBeVisible()
    await expect(panel).toBeVisible()
    await expect
      .poll(async () => {
        const homeBox = await home.boundingBox()
        const panelBox = await panel.boundingBox()

        if (!homeBox || !panelBox) {
          return false
        }

        return (
          Math.abs(panelBox.x - (homeBox.x + homeBox.width)) < 2 &&
          panelBox.width > homeBox.width
        )
      })
      .toBe(true)
  })

  test('stacks editorial metadata and content on a narrow screen', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/engineering')

    const entry = page.locator('.editorial-entry').first()
    const date = await entry.locator('.entry-date').boundingBox()
    const body = await entry.locator('.entry-body').boundingBox()

    expect(date).not.toBeNull()
    expect(body).not.toBeNull()
    expect(body?.x).toBeCloseTo(date?.x ?? 0, 0)
    expect(body?.y).toBeGreaterThan((date?.y ?? 0) + (date?.height ?? 0))
  })

  test('places editorial metadata and content in two columns above 700px', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 900, height: 900 })
    await page.goto('/engineering')

    const entry = page.locator('.editorial-entry').first()
    const date = await entry.locator('.entry-date').boundingBox()
    const body = await entry.locator('.entry-body').boundingBox()

    expect(date).not.toBeNull()
    expect(body).not.toBeNull()
    expect(body?.x).toBeGreaterThan((date?.x ?? 0) + (date?.width ?? 0))
    expect(body?.y).toBeCloseTo(date?.y ?? 0, 0)
  })
})
