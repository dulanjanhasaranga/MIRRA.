# MIRRA storefront on Specific: one Vite + React app, served in production by the
# Cloudflare Worker that ships with it (src/worker/index.ts handles /api/orders
# and /api/newsletter). `vite preview` runs that Worker, so a single service
# covers both the static storefront and the API.
#
# There is nothing else to declare yet: the catalogue is static data in
# src/data/products.ts and the demo checkout persists nothing. When orders or
# newsletter signups need to survive a restart, add a Postgres block here and
# pass its URL to the service:
#
#   postgres "main" {}
#   env = { DATABASE_URL = postgres.main.url }
#
# The service starts with `npm start` → server.mjs, which serves the production
# build and the Worker on the PORT Specific injects. Specific's managed node base
# installs with npm and has no bun, so the commands below run the package.json
# scripts through npm; the build itself is unchanged.

build "web" {
  base    = "node"
  command = "npm run build"
}

service "web" {
  build   = build.web
  command = "npm start"

  endpoint {
    public = true

    health_check {
      path = "/api/health"
    }
  }

  env = {
    PORT = port
  }

  dev {
    command = "npm run dev -- --host 0.0.0.0 --port $PORT"
  }
}
