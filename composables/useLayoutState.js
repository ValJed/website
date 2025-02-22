export const useLayoutState = () =>
  useState('layoutState', () => ({
    extendedMatrix: false,
    isMobile: false
  }))
