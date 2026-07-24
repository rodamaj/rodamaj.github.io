const panelRoutes = new Set(['/about', '/science', '/engineering'])

export const getRouteLayoutState = (path: string) => {
  const normalizedPath = path.length > 1 ? path.replace(/\/+$/, '') : path
  const isIndex = normalizedPath === '/'
  const hasPanel = panelRoutes.has(normalizedPath)

  return {
    hasHomeContext: isIndex || hasPanel,
    hasPanel,
  }
}
