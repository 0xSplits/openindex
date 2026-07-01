import type { ReactNode } from 'react'

// Global <head> content. React 19 hoists <link> and <script> elements
// rendered here into the document <head>. This replaces the old vocs
// `head()` config option, which no longer exists in Vocs 2.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
      />
      <script
        src="https://cdn.usefathom.com/script.js"
        data-site="ZMZAZRME"
        async
      />
      {children}
      <div className="footer">
        <a
          className="oi-built"
          href="https://splits.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by
          <img
            className="oi-splits-logo"
            src="/splits-light.png"
            alt="Splits"
          />
          <img
            className="oi-splits-logo oi-splits-logo--dark"
            src="/splits-dark.png"
            alt="Splits"
          />
        </a>
      </div>
    </>
  )
}
