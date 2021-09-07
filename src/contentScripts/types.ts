export interface Issue {
  state: 'open' | 'closed' | 'merged' | 'unknown'
  number: number
  title: string
  repo: string
  type: 'issues' | 'pull'
  lastUpdated: number
}
