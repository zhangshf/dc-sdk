/**
 * @Author: Caven
 * @Date: 2021-06-03 21:06:17
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Overlay from '../Overlay'
import BillboardPrimitive from './BillboardPrimitive'

const DEF_STYLE = {
  maxOffsetY: 10,
  offsetAmount: 0.1
}

class BounceBillboardPrimitive extends BillboardPrimitive {
  constructor(position, icon) {
    super(position, icon)
    this._currentOffset = new Cesium.Cartesian2(0, 0)
    this._isUp = true
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('bounce_billboard_primitive')
  }

  /**
   *
   * @private
   */
  _addedHook() {
    if (!this._delegate || !this._layer) {
      return
    }
    this._delegate.layerId = this._layer?.layerId
    this._delegate.overlayId = this._id
    this._layer.delegate.add(this)
  }

  /**
   *
   * @private
   */
  _removedHook() {
    if (!this._layer) {
      return
    }
    this._layer.delegate.remove(this)
  }

  update() {
    if (!this._show) {
      return
    }
    let maxOffsetY = this._style?.maxOffsetY || DEF_STYLE.maxOffsetY
    let offsetAmount = this._style?.offsetAmount || DEF_STYLE.offsetAmount
    if (this._currentOffset.y >= 0) {
      this._isUp = true
    } else if (this._currentOffset.y <= -maxOffsetY) {
      this._isUp = false
    }
    this._currentOffset.y += offsetAmount * (this._isUp ? -1 : 1)
    this._delegate.pixelOffset = this._currentOffset
  }

  /**
   * @return {*}
   */
  destroy() {
    return Cesium.destroyObject(this)
  }
}

Overlay.registerType('bounce_billboard_primitive')

export default BounceBillboardPrimitive
