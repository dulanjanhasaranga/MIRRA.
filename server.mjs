// Entrypoint for the Specific service (see specific.hcl).
//
// `vite preview` serves the production build and, through the Cloudflare Vite
// plugin, runs the Worker from src/worker/index.ts in workerd — so this one
// process answers both the storefront and /api/*. Specific injects PORT and
// sends SIGTERM on redeploys, which we pass through to a clean server close.
import { preview } from 'vite'

const port = Number(process.env.PORT ?? 3000)

const server = await preview({
  preview: { host: '0.0.0.0', port },
})

server.printUrls()

let closing = false
const shutdown = () => {
  if (closing) return
  closing = true
  server.httpServer.close(() => process.exit(0))
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
