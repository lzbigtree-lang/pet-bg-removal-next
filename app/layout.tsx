import './globals.css'

export const metadata = {
  title: 'Pet Background Removal',
  description: 'Remove pet photo backgrounds instantly',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
