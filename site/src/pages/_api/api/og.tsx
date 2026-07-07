import { ImageResponse } from '@takumi-rs/image-response/wasm'
import wasmUrl from '@takumi-rs/wasm/takumi_wasm_bg.wasm?url'

const assets = new Map<string, Promise<ArrayBuffer>>()

// The wasm is a Vite-emitted asset and the fonts live in `public/`; fetch
// them from our own origin at request time (the pattern vocs' built-in
// `Handler.og` uses for its wasm).
function loadAsset(path: string, origin: string) {
  let asset = assets.get(path)
  if (!asset) {
    asset = fetch(new URL(path, origin)).then((response) => {
      if (!response.ok) throw new Error(`Failed to load asset: ${path}`)
      return response.arrayBuffer()
    })
    assets.set(path, asset)
  }
  return asset
}

export default async function handler(request: Request) {
  const url = new URL(request.url)
  const title = url.searchParams.get('title') || 'OpenIndex'
  const description = url.searchParams.get('description') || ''
  const logo = new URL('/logo-dark.png', url.origin).href

  const [wasm, interRegular, interSemiBold] = await Promise.all([
    loadAsset(wasmUrl, url.origin),
    loadAsset('/fonts/inter-regular.woff2', url.origin),
    loadAsset('/fonts/inter-semibold.woff2', url.origin),
  ])

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '72px 80px',
        backgroundColor: '#0a0a0a',
        color: '#f7f7f7',
        fontFamily: 'Inter',
      }}
    >
      <img src={logo} alt="" style={{ width: 64, height: 64 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 30,
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: 900,
              color: 'rgba(247, 247, 247, 0.55)',
            }}
          >
            {description}
          </div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 24,
          fontWeight: 400,
          color: 'rgba(247, 247, 247, 0.4)',
        }}
      >
        openindex.splits.org
      </div>
    </div>,
    {
      module: wasm,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400 },
        { name: 'Inter', data: interSemiBold, weight: 600 },
      ],
      width: 1200,
      height: 630,
      format: 'png',
      headers: {
        'cache-control': 'public, max-age=3600, s-maxage=86400',
      },
    },
  )
}
