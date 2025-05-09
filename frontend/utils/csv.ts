// utils/csv.ts
// Simple CSV serialization helper

/**
 * Convert an array of records into a CSV string.
 * @param rows Array of objects with consistent keys
 */
import Papa from 'papaparse'

/**
 * Convert an array of records into a CSV string using PapaParse
 */
export function toCSV(rows: Record<string, any>[]): string {
  if (!rows.length) return ''
  return Papa.unparse(rows, {
    header: true,
    quotes: true,
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ',',
  })
}