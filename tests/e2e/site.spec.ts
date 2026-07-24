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
      await expect(page.locator('.site-container').first()).toBeVisible()
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

  test('opens and closes a panel through navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')
    await waitForHydration(page)

    await page.getByRole('link', { name: 'Ingeniería' }).click()

    await expect(page).toHaveURL(/\/engineering$/)
    await expect(page.locator('.context-view')).toHaveClass(/has-panel/)
    await expect(page.locator('.home-container')).toBeVisible()
    await expect(page.locator('.side-panel')).toBeVisible()

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

test.describe('responsive columns', () => {
  test('uses one full-width panel below the desktop breakpoint', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 900, height: 900 })
    await page.goto('/engineering')

    await expect(page.locator('.home-container')).toBeHidden()
    await expect(page.locator('.side-panel')).toBeVisible()

    const panel = await page.locator('.side-panel').boundingBox()

    expect(panel).not.toBeNull()
    expect(panel?.x).toBeCloseTo(0, 0)
    expect(panel?.width).toBeCloseTo(900, 0)
  })

  test('uses two equal app columns at the desktop breakpoint', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/engineering')

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
          Math.abs(homeBox.width - panelBox.width) < 2 &&
          Math.abs(panelBox.x - (homeBox.x + homeBox.width)) < 2 &&
          homeBox.width > 600
        )
      })
      .toBe(true)
  })

  test('keeps two columns when science loads with a trailing slash', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
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
          Math.abs(homeBox.width - panelBox.width) < 2 &&
          Math.abs(panelBox.x - (homeBox.x + homeBox.width)) < 2
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
