import type React from "react"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout min-h-screen flex flex-col">
      <Sidebar />
      <div className="dashboard-content flex-1 flex flex-col">
        {children}
        <Footer />
      </div>
    </div>
  )
}
