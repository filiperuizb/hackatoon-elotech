import type React from "react"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <title>SPA - Sistema de Prontuário Ágil</title>
        <meta name="description" content="Sistema de Prontuário Ágil para profissionais de saúde" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
