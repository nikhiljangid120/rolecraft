import assert from 'node:assert/strict'
import { mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import { detectAgents } from './agent-detection.js'

test('detects an installed agent by its skills directory', (t) => {
  const dir = join(process.env.HOME, '.agents', 'skills')
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  mkdirSync(dir, { recursive: true })

  const found = detectAgents()
  assert.ok(
    found.some((a) => a.flag === 'agents'),
    `expected 'agents' to be detected, got ${JSON.stringify(found.map((a) => a.flag))}`,
  )
})
