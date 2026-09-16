import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

describe('地理篇：历代疆域与古都变迁数据集校验', () => {
  const dataPath = resolve(process.cwd(), 'data/geography/dynasties_geography.json')
  const routesPath = resolve(process.cwd(), 'data/geography/historical_routes.json')

  it('dynasties_geography.json 文件应存在且格式合法', () => {
    expect(existsSync(dataPath)).toBe(true)
    const raw = readFileSync(dataPath, 'utf-8')
    const list = JSON.parse(raw)
    expect(Array.isArray(list)).toBe(true)
    expect(list.length).toBe(23)
  })

  it('朝代序列应从夏朝开始至1999年澳门回归结束', () => {
    const list = JSON.parse(readFileSync(dataPath, 'utf-8'))
    expect(list[0].id).toBe('xia')
    expect(list[0].name).toContain('夏')
    expect(list[list.length - 1].id).toBe('prc1999')
    expect(list[list.length - 1].name).toContain('澳门回归')
  })

  it('每个历史阶段必须具备完整的都城古今对照与经纬度', () => {
    const list = JSON.parse(readFileSync(dataPath, 'utf-8'))
    for (const d of list) {
      expect(d.id).toBeDefined()
      expect(d.name).toBeDefined()
      expect(d.period).toBeDefined()
      expect(Array.isArray(d.capitals)).toBe(true)
      expect(d.capitals.length).toBeGreaterThan(0)

      for (const cap of d.capitals) {
        expect(cap.ancient).toBeDefined()
        expect(cap.modern).toBeDefined()
        expect(Array.isArray(cap.coords)).toBe(true)
        expect(cap.coords.length).toBe(2)
        const [lng, lat] = cap.coords
        expect(lng).toBeGreaterThanOrEqual(70)
        expect(lng).toBeLessThanOrEqual(140)
        expect(lat).toBeGreaterThanOrEqual(15)
        expect(lat).toBeLessThanOrEqual(55)
      }
    }
  })

  it('每个历史阶段必须具备极盛四至与封闭疆域多边形', () => {
    const list = JSON.parse(readFileSync(dataPath, 'utf-8'))
    for (const d of list) {
      expect(d.territory).toBeDefined()
      expect(d.territory.east).toBeDefined()
      expect(d.territory.west).toBeDefined()
      expect(d.territory.south).toBeDefined()
      expect(d.territory.north).toBeDefined()

      expect(Array.isArray(d.boundary)).toBe(true)
      expect(d.boundary.length).toBeGreaterThanOrEqual(8)
      // 检查多边形首尾闭合
      const first = d.boundary[0]
      const last = d.boundary[d.boundary.length - 1]
      expect(first[0]).toBeCloseTo(last[0], 1)
      expect(first[1]).toBeCloseTo(last[1], 1)
    }
  })

  it('1997香港回归与1999澳门回归需包含专属回归节点与特写信息', () => {
    const list = JSON.parse(readFileSync(dataPath, 'utf-8'))
    const hk = list.find(d => d.id === 'prc1997')
    const macau = list.find(d => d.id === 'prc1999')

    expect(hk).toBeDefined()
    expect(hk.specialTag).toContain('香港')
    expect(hk.capitals.some(c => c.ancient.includes('香港特别行政区'))).toBe(true)

    expect(macau).toBeDefined()
    expect(macau.specialTag).toContain('澳门')
    expect(macau.capitals.some(c => c.ancient.includes('澳门特别行政区'))).toBe(true)
  })

  it('historical_routes.json 应包含长城、大运河、丝绸之路及长江黄河', () => {
    expect(existsSync(routesPath)).toBe(true)
    const routes = JSON.parse(readFileSync(routesPath, 'utf-8'))
    expect(routes.greatWall).toBeDefined()
    expect(routes.grandCanal).toBeDefined()
    expect(routes.silkRoad).toBeDefined()
    expect(routes.maritimeSilkRoad).toBeDefined()
    expect(routes.yellowRiver).toBeDefined()
    expect(routes.yangtzeRiver).toBeDefined()
  })

  it('china_geo.json 应存在且为合法的中国省界 GeoJSON 数据集', () => {
    const chinaGeoPath = resolve(process.cwd(), 'data/geography/china_geo.json')
    expect(existsSync(chinaGeoPath)).toBe(true)
    const geo = JSON.parse(readFileSync(chinaGeoPath, 'utf-8'))
    expect(geo.type).toBe('FeatureCollection')
    expect(Array.isArray(geo.features)).toBe(true)
    expect(geo.features.length).toBeGreaterThanOrEqual(30)
  })

  it('每个历史阶段必须具备涵盖省区数组且格式合法', () => {
    const list = JSON.parse(readFileSync(dataPath, 'utf-8'))
    for (const d of list) {
      expect(Array.isArray(d.provinces)).toBe(true)
      expect(d.provinces.length).toBeGreaterThanOrEqual(5)
      for (const p of d.provinces) {
        expect(typeof p).toBe('string')
        expect(p.length).toBeGreaterThan(1)
      }
    }
  })

  it('provinces_config.json 应包含全国 34 个省级行政区的中心点与 Zoom 视口配置', () => {
    const cfgPath = resolve(process.cwd(), 'data/geography/provinces_config.json')
    expect(existsSync(cfgPath)).toBe(true)
    const cfg = JSON.parse(readFileSync(cfgPath, 'utf-8'))
    const keys = Object.keys(cfg)
    expect(keys.length).toBe(34)
    for (const [name, val] of Object.entries(cfg)) {
      expect(Array.isArray(val.center)).toBe(true)
      expect(val.center.length).toBe(2)
      expect(val.center[0]).toBeGreaterThanOrEqual(70)
      expect(val.center[0]).toBeLessThanOrEqual(135)
      expect(val.center[1]).toBeGreaterThanOrEqual(15)
      expect(val.center[1]).toBeLessThanOrEqual(55)
      expect(typeof val.zoom).toBe('number')
      expect(val.zoom).toBeGreaterThanOrEqual(1.5)
    }
  })

  it('全量历史都城数据集必须具备合法的省份归属与经纬度坐标', () => {
    const list = JSON.parse(readFileSync(dataPath, 'utf-8'))
    let totalCapitals = 0
    for (const d of list) {
      expect(Array.isArray(d.capitals)).toBe(true)
      expect(d.capitals.length).toBeGreaterThanOrEqual(2)
      for (const c of d.capitals) {
        totalCapitals++
        expect(typeof c.ancient).toBe('string')
        expect(typeof c.modern).toBe('string')
        expect(typeof c.province).toBe('string')
        expect(['primary', 'secondary', 'regional', 'temporary']).toContain(c.type)
        expect(Array.isArray(c.coords)).toBe(true)
        expect(c.coords.length).toBe(2)
        expect(c.coords[0]).toBeGreaterThanOrEqual(70)
        expect(c.coords[0]).toBeLessThanOrEqual(135)
        expect(c.coords[1]).toBeGreaterThanOrEqual(15)
        expect(c.coords[1]).toBeLessThanOrEqual(55)
      }
    }
    expect(totalCapitals).toBeGreaterThanOrEqual(70)
  })
})
