export interface RevenueData {
  month: string
  total: number
  fetchedAt: string
}

export async function fetchRevenue(): Promise<RevenueData> {
  console.log('[API] fetchRevenue')
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return {
    month: 'Tháng 7/2026',
    total: Math.floor(500_000_000 + Math.random() * 100_000_000),
    fetchedAt: new Date().toLocaleTimeString(),
  }
}
