import { mockAnalyticsResponse } from '@/data/mock-response'
import { apiService } from './api.service'
import { AnalyticDataResponse } from '@/models/dashboard.model'

class DashboardService {
  private api: typeof apiService
  controller: string = 'dashboard'

  constructor() {
    this.api = apiService
  }

  async getAnalyticsData() {
    return new Promise<AnalyticDataResponse>((resolve) => {
      setTimeout(() => {
        resolve(mockAnalyticsResponse as AnalyticDataResponse)
      }, 3000)
    })
    return this.api.get<AnalyticDataResponse>(
      `${this.controller}/dashboard/analytics`
    )
  }
}

export const dashboardService = new DashboardService()
