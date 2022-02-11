/**
 * @Author: Caven
 * @Date: 2020-08-30 22:39:34
 */

import { Cesium } from '@dc-modules/namespace'
import { PlotEventType } from '@dc-modules/event'
import { midCartesian } from '@dc-modules/math'
import Edit from './Edit'
import { distanceCartesian } from '../../math/distance'

class EditPolyline extends Edit {
  constructor(overlay) {
    super(overlay)
  }

  /**
   *
   * @private
   */
  _mountedHook() {
    this._delegate.polyline.clampToGround = this._options.clampToModel
    this._delegate.polyline.classificationType = this._options?.clampToModel
      ? Cesium.ClassificationType.BOTH
      : Cesium.ClassificationType.TERRAIN
    this._delegate.polyline.positions = new Cesium.CallbackProperty(() => {
      if (this._positions.length > 1) {
        return this._positions
      } else {
        return null
      }
    }, false)
    this._layer.entities.add(this._delegate)
    this._measureLabelText = this._overlay._label.label.text.getValue()
    this._overlay._label.label.text = new Cesium.CallbackProperty(() => {
      return this._measureLabelText
    }, false)
    this._measureLabelPosition = this._overlay._label.position.getValue()
    this._overlay._label.position = new Cesium.CallbackProperty(() => {
      return this._measureLabelPosition
    }, false)
  }

  /**
   *
   * @private
   */
  _mountAnchor() {
    let positions = [].concat(
      this._overlay.delegate.polyline.positions.getValue(
        Cesium.JulianDate.now()
      )
    )
    for (let i = 0; i < positions.length - 1; i++) {
      let mid = midCartesian(positions[i], positions[i + 1])
      this._positions.push(positions[i])
      this._positions.push(mid)
    }
    this._positions.push(positions[positions.length - 1])
    this._positions.forEach((item, index) => {
      this.editTool.fire(PlotEventType.CREATE_ANCHOR, {
        position: item,
        index: index,
        isMid: index % 2 !== 0
      })
    })
  }

  /**
   *
   * @param pickedAnchor
   * @param position
   * @returns {boolean}
   * @private
   */
  _onEditAnchorStop({ pickedAnchor, position }) {
    let properties = pickedAnchor.properties.getValue(Cesium.JulianDate.now())
    let currentIndex = properties.index
    if (properties.isMid) {
      let preMidPosition = midCartesian(
        this._positions[currentIndex],
        this._positions[currentIndex - 1]
      )
      let nextMidPosition = midCartesian(
        this._positions[currentIndex],
        this._positions[currentIndex + 1]
      )
      this._positions.splice(
        currentIndex,
        1,
        preMidPosition,
        position,
        nextMidPosition
      )
      this.editTool.fire(PlotEventType.CLEAR_ANCHOR)
      this._positions.forEach((item, index) => {
        this.editTool.fire(PlotEventType.CREATE_ANCHOR, {
          position: item,
          index: index,
          isMid: index % 2 !== 0
        })
      })
    }
    this._updateMeasureLabel()
  }

  _updateMeasureLabel() {
    this._measureLabelText = `距离：${distanceCartesian(this._positions)}米`
    this._measureLabelPosition = this._positions[this._positions.length - 1]
  }
  /**
   *
   * @param pickedAnchor
   * @param position
   * @private
   */
  _onAnchorMoving({ pickedAnchor, position }) {
    let properties = pickedAnchor.properties.getValue(Cesium.JulianDate.now())
    let currentIndex = properties.index
    this._positions[currentIndex] = position
    if (!properties.isMid && this._options.maxAnchorSize > 2) {
      let preAnchorIndex = -1
      let preMidAnchorIndex = -1
      let nextAnchorIndex = -1
      let nextMidAnchorIndex = -1
      let len = this._positions.length

      if (currentIndex === 0) {
        nextAnchorIndex = currentIndex + 2
        nextMidAnchorIndex = currentIndex + 1
      } else if (properties.index === len - 1) {
        preAnchorIndex = currentIndex - 2
        preMidAnchorIndex = currentIndex - 1
      } else {
        preAnchorIndex = currentIndex - 2
        preMidAnchorIndex = currentIndex - 1
        nextAnchorIndex = currentIndex + 2
        nextMidAnchorIndex = currentIndex + 1
      }

      if (preAnchorIndex > 0) {
        let preMidPosition = midCartesian(
          this._positions[preAnchorIndex],
          this._positions[currentIndex]
        )
        this._positions[preMidAnchorIndex] = preMidPosition
        this.editTool.fire(PlotEventType.UPDATE_ANCHOR, {
          index: preMidAnchorIndex,
          position: preMidPosition
        })
      }

      if (nextAnchorIndex > 0) {
        let nextMidPosition = midCartesian(
          this._positions[nextAnchorIndex],
          this._positions[currentIndex]
        )
        this._positions[nextMidAnchorIndex] = nextMidPosition
        this.editTool.fire(PlotEventType.UPDATE_ANCHOR, {
          index: nextMidAnchorIndex,
          position: nextMidPosition
        })
      }
    }
  }
}

export default EditPolyline
