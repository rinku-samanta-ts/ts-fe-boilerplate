import { GenericResponse } from './generic'

type AnalyticsCardData = {
  value: string
  percentageChange: string
}

type AnalyticsData = {
  totalRevenue: AnalyticsCardData
  subscriptions: AnalyticsCardData
  sales: AnalyticsCardData
  activeNow: AnalyticsCardData
}

export type AnalyticDataResponse = GenericResponse<AnalyticsData>
