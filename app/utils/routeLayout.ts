const panelRoutes = new Set(['/about', '/science', '/engineering'])

export const getRouteLayoutState = (path: string) => {
  const isIndex = path === '/'
  const hasPanel = panelRoutes.has(path)

  return {
    hasHomeContext: isIndex || hasPanel,
    hasPanel,
  }
}
