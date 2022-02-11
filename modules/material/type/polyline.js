/**
 * @Author: Caven
 * @Date: 2021-02-27 23:23:12
 */

import { Cesium } from '@dc-modules/namespace'

const LineFlickerMaterial = require('../shader/polyline/PolylineFlickerMaterial.glsl')
const LineFlowMaterial = require('../shader/polyline/PolylineFlowMaterial.glsl')
const LineImageTrailMaterial = require('../shader/polyline/PolylineImageTrailMaterial.glsl')
const LineLightingMaterial = require('../shader/polyline/PolylineLightingMaterial.glsl')
const LineLightingTrailMaterial = require('../shader/polyline/PolylineLightingTrailMaterial.glsl')
const LineTrailMaterial = require('../shader/polyline/PolylineTrailMaterial.glsl')

/**
 * PolylineFlicker
 * @type {string}
 */
Cesium.Material.PolylineFlickerType = 'PolylineFlicker'
Cesium.Material._materialCache.addMaterial(
  Cesium.Material.PolylineFlickerType,
  {
    fabric: {
      type: Cesium.Material.PolylineFlickerType,
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
        speed: 1
      },
      source: LineFlickerMaterial
    },
    translucent: function(material) {
      return true
    }
  }
)

/**
 * PolylineFlow
 * @type {string}
 */
Cesium.Material.PolylineFlowType = 'PolylineFlow'
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineFlowType, {
  fabric: {
    type: Cesium.Material.PolylineFlowType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      speed: 1,
      percent: 0.03,
      gradient: 0.1
    },
    source: LineFlowMaterial
  },
  translucent: function(material) {
    return true
  }
})

/**
 * PolylineImageTrail
 * @type {string}
 */
Cesium.Material.PolylineImageTrailType = 'PolylineImageTrail'
Cesium.Material._materialCache.addMaterial(
  Cesium.Material.PolylineImageTrailType,
  {
    fabric: {
      type: Cesium.Material.PolylineImageTrailType,
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
        image: Cesium.Material.DefaultImageId,
        speed: 1,
        repeat: new Cesium.Cartesian2(1, 1)
      },
      source: LineImageTrailMaterial
    },
    translucent: function(material) {
      return true
    }
  }
)

/**
 * PolylineLighting
 * @type {string}
 */
Cesium.Material.PolylineLightingType = 'PolylineLighting'
Cesium.Material._materialCache.addMaterial(
  Cesium.Material.PolylineLightingType,
  {
    fabric: {
      type: Cesium.Material.PolylineLightingType,
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
        image: Cesium.Material.DefaultImageId
      },
      source: LineLightingMaterial
    },
    translucent: function(material) {
      return true
    }
  }
)

/**
 * PolylineLightingTrail
 * @type {string}
 */
Cesium.Material.PolylineLightingTrailType = 'PolylineLightingTrail'
Cesium.Material._materialCache.addMaterial(
  Cesium.Material.PolylineLightingTrailType,
  {
    fabric: {
      type: Cesium.Material.PolylineLightingTrailType,
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
        image: Cesium.Material.DefaultImageId,
        speed: 3.0
      },
      source: LineLightingTrailMaterial
    },
    translucent: function(material) {
      return true
    }
  }
)

/**
 * PolylineTrail
 * @type {string}
 */
Cesium.Material.PolylineTrailType = 'PolylineTrail'
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailType, {
  fabric: {
    type: Cesium.Material.PolylineTrailType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.7),
      image: Cesium.Material.DefaultImageId,
      speed: 1,
      repeat: new Cesium.Cartesian2(1, 1)
    },
    source: LineTrailMaterial
  },
  translucent: function(material) {
    return true
  }
})
