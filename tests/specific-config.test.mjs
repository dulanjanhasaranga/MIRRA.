// Guards the Specific integration (`specific.hcl`): `specific dev` and
// `specific deploy` fail late and confusingly when the service block is
// incomplete, so the contract the platform needs is asserted here instead.
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const config = await readFile(new URL('../specific.hcl', import.meta.url), 'utf8')

test('defines the web service', () => {
  assert.ok(
    config.includes('service "web" {'),
    'specific.hcl should declare the web service',
  )
})

test('the web service has a start command', () => {
  assert.ok(
    config.includes('command = "npm start"'),
    'the web service should start with npm start (server.mjs)',
  )
})

test('the web service is public and health-checked', () => {
  assert.match(config, /endpoint\s*\{/)
  assert.match(config, /public\s*=\s*true/)
  assert.match(config, /path\s*=\s*"\/api\/health"/)
})

test('the web service gets its port from Specific', () => {
  assert.match(config, /PORT\s*=\s*port/)
})
