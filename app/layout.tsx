import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import localfont from "next/font/local"

import "./globals.css"

export const metadata: Metadata = {
  title: "SYRCLE",
  description: "WHO'S IN YOUR SYRCLE?",
}

const myFont = localfont({
  src:[{
    path: './fonts/Syrcle-Regular.otf',
    style: 'normal',
  }],
  variable: '--font-syrcle',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${myFont.variable}`}>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
