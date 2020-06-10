import { useEffect, useRef } from 'react'

export const useDebounce = (fn: (...args: any[]) => void, ms = 0, args = []) => {
  useUpdateEffect(() => {
    const handle = setTimeout(() => fn(args), ms)

    return () => {
      clearTimeout(handle)
    }
  }, args)
}

function useUpdateEffect(effect: React.EffectCallback, deps: React.DependencyList) {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      return effect()
    }
  }, [deps, effect])
}
