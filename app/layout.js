import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './navBar'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Strandby ved farsø',
  description: 'Her kan du finde alt om Strandby ved farsø',
}

const pages = [
  { name: 'Hjem', link: '/', targetSegment: null },
  { name: 'Kalender', link: '/kalender', targetSegment: 'kalender' },
  { name: 'Butikker/firmaer', link: '/firmaer', targetSegment: 'firmaer' },
  { name: 'Overnatning', link: '/overnatning', targetSegment: 'overnatning' },
  ///{ name: 'Billeder', link: '/billeder', targetSegment: 'billeder' },
  { name: 'Info', link: '/info', targetSegment: 'info' },
  { name: 'Bestyrelsen', link: '/bestyrelsen', targetSegment: 'bestyrelsen' },
  { name: 'Shelter', link: '/shelter', targetSegment: 'shelter' }
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NavBar pages={pages} />

      <body className={inter.className}>{children}</body>
    </html>
  )
}
