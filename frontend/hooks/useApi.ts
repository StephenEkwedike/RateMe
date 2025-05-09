// hooks/useApi.ts
// Generic hook for calling async services with loading/error handling
import { useCallback, useState, useEffect } from "react"

export function useApi<T, P extends any[] = []>(
  fn: (...args: P) => Promise<T>,
  options?: {
    autoLoad?: boolean
    defaultArgs?: P
    onSuccess?: (data: T) => void
    onError?: (error: any) => void
  }
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const execute = useCallback(
    async (...args: P) => {
      setLoading(true)
      setError(null)
      try {
        const res = await fn(...args)
        setData(res)
        options?.onSuccess?.(res)
        return res
      } catch (err) {
        setError(err)
        options?.onError?.(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [fn, options]
  )

  useEffect(() => {
    if (options?.autoLoad) {
      execute(...(options.defaultArgs || ([] as unknown as P)))
    }
  }, [execute, options?.autoLoad, options?.defaultArgs])

  return { data, loading, error, execute, refetch: execute }
}