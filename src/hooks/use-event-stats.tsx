"use client"

import { useState, useEffect } from "react"
import Cookie from "js-cookie"

interface EventStats {
  totalUsers: number
  totalFeedbacks: number
  averageEventRating: number
  averageWorkshopRating: number
}

export function useEventStats() {
  const [stats, setStats] = useState<EventStats>({
    totalUsers: 0,
    totalFeedbacks: 0,
    averageEventRating: 0,
    averageWorkshopRating: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = Cookie.get("admin_token")

    if (!token) {
      setIsLoading(false)
      return
    }

    fetch("/api/admin/list-feedback", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.feedbacks) {
          const feedbacks = data.feedbacks

          const totalUsers = new Set(feedbacks.map((f: any) => f.ra)).size
          const totalFeedbacks = feedbacks.length

          const eventRatings = feedbacks
            .filter((f: any) => f.avaliacaoevento)
            .map((f: any) => Number.parseInt(f.avaliacaoevento))
          const workshopRatings = feedbacks
            .filter((f: any) => f.avaliacaooficina)
            .map((f: any) => Number.parseInt(f.avaliacaooficina))

          const avgEventRating =
            eventRatings.length > 0 ? eventRatings.reduce((a: number, b: number) => a + b, 0) / eventRatings.length : 0

          const avgWorkshopRating =
            workshopRatings.length > 0
              ? workshopRatings.reduce((a: number, b: number) => a + b, 0) / workshopRatings.length
              : 0

          setStats({
            totalUsers,
            totalFeedbacks,
            averageEventRating: Number.parseFloat(avgEventRating.toFixed(1)),
            averageWorkshopRating: Number.parseFloat(avgWorkshopRating.toFixed(1)),
          })
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Erro ao carregar dados:", error)
        setIsLoading(false)
      })
  }, [])

  return { stats, isLoading }
}
