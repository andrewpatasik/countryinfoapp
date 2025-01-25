import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile(targetWidth?: number | undefined) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${(!targetWidth ? MOBILE_BREAKPOINT : targetWidth) - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < (!targetWidth ? MOBILE_BREAKPOINT : targetWidth))
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < (!targetWidth ? MOBILE_BREAKPOINT : targetWidth))
    return () => mql.removeEventListener("change", onChange)
  }, [targetWidth])

  return !!isMobile
}
