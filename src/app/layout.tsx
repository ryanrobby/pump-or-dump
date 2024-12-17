"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import { useState } from 'react'
import BottomNavigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeTab, setActiveTab] = useState('discover')

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="pb-16">
          {children}
        </main>
        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </body>
    </html>
  )
}