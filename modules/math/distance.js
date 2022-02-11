/**
 * @Author: Caven
 * @Date: 2020-03-31 20:58:06
 */

import { Cesium } from '@dc-modules/namespace'
import { Transform } from '@dc-modules/transform'

/**
 * 计算经纬度坐标距离
 * @param positions
 * @returns {string}
 */
export default function distance(positions) {
  let distance = 0
  if (positions && Array.isArray(positions)) {
    for (let i = 0; i < positions.length - 1; i++) {
      let c1 = Transform.transformWGS84ToCartographic(positions[i])
      let c2 = Transform.transformWGS84ToCartographic(positions[i + 1])
      let geodesic = new Cesium.EllipsoidGeodesic()
      geodesic.setEndPoints(c1, c2)
      let s = geodesic.surfaceDistance
      s = Math.sqrt(Math.pow(s, 2) + Math.pow(c2.height - c1.height, 2))
      distance += s
    }
  }

  return distance.toFixed(3)
}

/**
 * 计算三维坐标距离
 * @param positions
 * @returns {string}
 */
export function distanceCartesian(positions) {
  //空间两点距离计算函数
  let distance = 0
  for (let i = 0; i < positions.length - 1; i++) {
    let point1cartographic = Cesium.Cartographic.fromCartesian(positions[i])
    let point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1])
    /**根据经纬度计算出距离**/
    let geodesic = new Cesium.EllipsoidGeodesic()
    geodesic.setEndPoints(point1cartographic, point2cartographic)
    let s = geodesic.surfaceDistance
    //返回两点之间的距离
    s = Math.sqrt(
      Math.pow(s, 2) +
        Math.pow(point2cartographic.height - point1cartographic.height, 2)
    )
    distance = distance + s
  }
  return distance.toFixed(3)
}
