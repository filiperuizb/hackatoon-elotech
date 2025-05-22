import type React from "react"
import Sidebar from "@/components/sidebar"

export default function PrescricoesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">{children}</div>
    </div>
  )
}
