import { digitalAssets as seedAssets, archives as seedArchives } from '../data/assets'
import { loadState, saveState } from '../utils/storage'

const ASSETS_KEY = 'stackwell.assets'
const ARCHIVES_KEY = 'stackwell.archives'

function readAssets() {
  return loadState(ASSETS_KEY, seedAssets)
}
function writeAssets(list) {
  saveState(ASSETS_KEY, list)
}

// GET /api/assets
export async function getAssets() {
  return readAssets()
}

// GET /api/assets/:id
export async function getAssetById(id) {
  return readAssets().find((a) => a.id === id) || null
}

// POST /api/assets
export async function addAsset(asset) {
  const list = readAssets()
  const newAsset = {
    ...asset,
    id: `a${Date.now()}`,
    uploaded: new Date().toISOString().slice(0, 10),
  }
  writeAssets([newAsset, ...list])
  return newAsset
}

// DELETE /api/assets/:id
export async function deleteAsset(id) {
  writeAssets(readAssets().filter((a) => a.id !== id))
  return { success: true }
}

// GET /api/archives
export async function getArchives() {
  return loadState(ARCHIVES_KEY, seedArchives)
}

// GET /api/archives/:id
export async function getArchiveById(id) {
  const list = loadState(ARCHIVES_KEY, seedArchives)
  return list.find((a) => a.id === id) || null
}
