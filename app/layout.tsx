import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anish | Software Engineer',
  description: 'Explore the portfolio of Anish, a final-year Computer Science student at IIIT-Delhi. Showcasing full-stack projects using the MERN stack, AI/ML models for deception detection, and systems-level programming.',
  
  authors: [{ name: 'Anish', url: 'https://devan1shx.github.io/' }],

  openGraph: {
    type: 'website',
    url: 'https://devan1shx.github.io/',
    title: 'Anish | Software Engineer',
    description: 'Explore the portfolio of Anish, a final-year Computer Science student at IIIT-Delhi. Showcasing full-stack projects using the MERN stack, AI/ML models for deception detection, and systems-level programming.',
    images: [
      {
        url: 'https://devan1shx.github.io/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Anish - Software Engineer Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anish | Software Engineer',
    description: 'Explore the portfolio of Anish, a final-year Computer Science student at IIIT-Delhi. Showcasing full-stack projects using the MERN stack, AI/ML models for deception detection, and systems-level programming.',
    images: ['https://devan1shx.github.io/social-preview.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}

