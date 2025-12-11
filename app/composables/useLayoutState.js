export const useLayoutState = () =>
  useState('layoutState', () => ({
    extendedMatrix: false,
    openedMenu: false,
    isMobile: false
  }))
