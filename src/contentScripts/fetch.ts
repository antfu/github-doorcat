import { userid } from './env'

export interface Activity {
  repo: {
    name: string
  }
}

export async function fetchRecentActivity(pages = 100): Promise<Activity[]> {
  return await fetch(`https://api.github.com/users/${userid}/events?per_page=${pages}`)
    .then(r => r.json())
}

export async function fetchRecentRepos() {
  const activity = await fetchRecentActivity(100)

  const repos = new Set<string>()
  activity.forEach(i => repos.add(i.repo.name))

  return Array.from(repos)
}
