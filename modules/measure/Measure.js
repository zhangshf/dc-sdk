/**
 * @Author: shangfei_zhang
 * @Date: 2020-08-29 19:26:06
 */

import { Cesium } from '@dc-modules/namespace'
import { OverlayType } from '@dc-modules/overlay'

import DrawPolyline from './draw/DrawPolyline'
import DrawPolygon from './draw/DrawPolygon'
import MeasureType from './MeasureType'
import EditPolyline from './edit/EditPolyline'
import EditPolygon from './edit/EditPolygon'

class Measure {
  constructor(viewer, options = {}) {
    this._viewer = viewer
    this._options = options
    this._layer = new Cesium.CustomDataSource('measure-layer')
    this._viewer.dataSources.add(this._layer)
    this._currentWorker = undefined
    this._state = undefined
    this._type = undefined
  }

  get viewer() {
    return this._viewer
  }

  get layer() {
    return this._layer
  }

  get state() {
    return this._state
  }

  get type() {
    return this._type
  }

  /**
   *
   * @param type
   * @param style
   * @private
   */
  _createDrawWorker(type, style) {
    let drawWorker = undefined
    switch (type) {
      case MeasureType.DISTANCE:
        drawWorker = new DrawPolyline(style)
        break
      case MeasureType.AERA:
        drawWorker = new DrawPolygon(style)
        break
      default:
        break
    }
    return drawWorker
  }
  /**
   *
   * @param overlay
   * @private
   */
  _createEditWorker(overlay) {
    let editWorker = undefined
    switch (overlay.type) {
      case OverlayType.POLYLINE:
        editWorker = new EditPolyline(overlay)
        break
      case OverlayType.POLYGON:
        editWorker = new EditPolygon(overlay)
        break
      default:
        break
    }
    return editWorker
  }
  /**
   *
   * @param overlay
   * @param callback
   * @param clampToModel
   * @returns {Plot}
   */
  edit(overlay, callback, clampToModel = false) {
    this._state = 'edit'
    if (this._currentWorker) {
      this._currentWorker.stop()
    }
    this._currentWorker = this._createEditWorker(overlay)?.start(this, {
      ...this._options,
      onEditStop: callback,
      clampToModel: clampToModel ?? this._options.clampToModel
    })
    return this
  }
  /**
   *
   * @param type
   * @param style
   * @param clampToModel
   * @returns {Measure}
   */
  activate(type, style = {}, clampToModel = false) {
    this._type = type
    this._state = 'draw'
    if (this._currentWorker) {
      this._currentWorker.stop()
    }
    this._currentWorker = this._createDrawWorker(type, style)?.start(this, {
      ...this._options,
      onDrawStop: overlay => {
        this.edit(overlay, undefined, clampToModel)
      },
      clampToModel: clampToModel ?? this._options.clampToModel
    })
    return this
  }

  /**
   *
   * @returns {Measure}
   */
  deactivate() {
    //this._viewer.dataSources.remove(this._layer)
    //this._viewer = undefined
    this._layer.entities.removeAll()
    return this
  }
}

export default Measure
