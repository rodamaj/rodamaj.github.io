import { describe, expect, it } from 'vitest'
import { getRouteLayoutState } from '~/utils/routeLayout'

describe('getRouteLayoutState', () => {
  it('keeps the home view without a panel on the index route', () => {
    expect(getRouteLayoutState('/')).toEqual({
      hasHomeContext: true,
      hasPanel: false,
    })
  })

  it.each(['/about', '/science', '/engineering'])(
    'opens %s as a side panel over the home view',
    (path) => {
      expect(getRouteLayoutState(path)).toEqual({
        hasHomeContext: true,
        hasPanel: true,
      })
    }
  )

  it.each(['/about/', '/science/', '/engineering/'])(
    'opens %s as a side panel after a static-host redirect',
    (path) => {
      expect(getRouteLayoutState(path)).toEqual({
        hasHomeContext: true,
        hasPanel: true,
      })
    }
  )

  it.each(['/music', '/photography', '/thoughts'])(
    'renders %s as a standalone page',
    (path) => {
      expect(getRouteLayoutState(path)).toEqual({
        hasHomeContext: false,
        hasPanel: false,
      })
    }
  )
})
