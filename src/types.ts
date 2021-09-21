export interface Options {
  showAvatar: boolean
  showOwnerName: boolean
  githubDev: boolean
  excludeClosed: boolean
  unpinClosed: boolean
  accessToken?: string
  pinnedIssueCount: boolean

  // TODO:
  recentLimit?: number
}

export interface Issue {
  id: string
  state: 'open' | 'closed' | 'merged' | 'unknown'
  number: number
  title: string
  repo: string
  type: 'issues' | 'pull'
  lastUpdated: number
}

export interface RepoDetail {
  alias?: string
}
