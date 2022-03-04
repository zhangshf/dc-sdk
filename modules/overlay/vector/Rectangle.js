/**
 * @Author: Caven
 * @Date: 2020-04-14 20:46:23
 */

import { Cesium } from '@dc-modules/namespace'
import State from '@dc-modules/state/State'
import Parse from '@dc-modules/parse/Parse'
import { Util } from '@dc-modules/utils'
import { Transform } from '@dc-modules/transform'
import Overlay from '../Overlay'

class Rectangle extends Overlay {
  constructor(positions) {
    super()
    this._positions = Parse.parsePositions(positions)
    this._delegate = new Cesium.Entity({ rectangle: {} })
    this._state = State.INITIALIZED
  }

  get type() {
    return Overlay.getOverlayType('rectangle')
  }

  set positions(positions) {
    this._positions = Parse.parsePositions(positions)
    this._delegate.rectangle.coordinates = Cesium.Rectangle.fromCartesianArray(
      Transform.transformWGS84ArrayToCartesianArray(this._positions)
    )
    return this
  }

  get positions() {
    return this._positions
  }

  _mountedHook() {
    /**
     * set the location
     */
    this.positions = this._positions
  }

  /**
   * @param text
   * @param textStyle
   * @returns {Rectangle}
   */
  setLabel(text, textStyle) {
    this._delegate.position = Cesium.Cartographic.toCartesian(
      Cesium.Rectangle.center(
        this._delegate.rectangle,
        new Cesium.Cartographic()
      )
    )
    this._delegate.label = {
      ...textStyle,
      text: text
    }
    return this
  }

  /**
   * Sets Style
   * @param style
   * @returns {Rectangle}
   */
  setStyle(style) {
    if (Object.keys(style).length === 0) {
      return this
    }
    delete style['positions']
    Util.merge(this._style, style)
    Util.merge(this._delegate.rectangle, style)
    return this
  }
}

Overlay.registerType('rectangle')

export default Rectangle
