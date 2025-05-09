// services/mockUtils.ts
// Utility to simulate network delay and optional errors for mock data

/**
 * Simulate a network response with delay and optional failure.
 * @param data The mock data to return
 * @param options.delay Delay in ms (default 500)
 * @param options.shouldFail Whether to throw an error
 * @param options.errorMessage Custom error message
 */
export async function mockResponse<T>(
  data: T,
  options?: { delay?: number; shouldFail?: boolean; errorMessage?: string }
): Promise<T> {
  const { delay = 500, shouldFail = false, errorMessage = 'Mock API error' } = options || {}

  await new Promise((resolve) => setTimeout(resolve, delay))
  if (shouldFail) {
    throw new Error(errorMessage)
  }
  return data
}