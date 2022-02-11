/**
 * @Author: Caven
 * @Date: 2020-08-29 20:54:37
 */

import { Cesium } from '@dc-modules/namespace'
import { PlotEventType } from '@dc-modules/event'
import { Transform } from '@dc-modules/transform'
import { Polyline } from '@dc-modules/overlay'
import { distanceCartesian } from '../../math/distance'

import Draw from './Draw'
import { Overlay } from '../../overlay'

const DEF_STYLE = {
  width: 3,
  material: Cesium.Color.YELLOW.withAlpha(0.6)
}

class DrawPolyline extends Draw {
  constructor(style) {
    super()
    this._style = {
      ...DEF_STYLE,
      ...style
    }

    this._measureLabelText = '开始测量'
    this._measureLabelPosition = undefined
  }

  /**
   *
   * @private
   */
  _mountedHook() {
    this.drawTool.tooltipMess = '左击选择点位,右击结束'
    this._delegate = new Cesium.Entity({
      polyline: {
        ...this._style,
        clampToGround: this._options.clampToModel,
        classificationType: this._options?.clampToModel
          ? Cesium.ClassificationType.BOTH
          : Cesium.ClassificationType.TERRAIN,
        positions: new Cesium.CallbackProperty(() => {
          return this._positions
        }, false)
      }
    })
    this._layer.entities.add(this._delegate)
    this._measureLabel = this._layer.entities.add({
      position: new Cesium.CallbackProperty(() => {
        return this._measureLabelPosition
      }, false),
      label: {
        text: new Cesium.CallbackProperty(() => {
          return this._measureLabelText
        }, false),
        font: '14px sans-serif',
        showBackground: true,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        classificationType: this._options?.clampToModel
          ? Cesium.ClassificationType.BOTH
          : Cesium.ClassificationType.TERRAIN
      }
    })
  }

  /**
   *
   * @private
   */
  _stopdHook() {
    let overlay = new Polyline(
      Transform.transformCartesianArrayToWGS84Array(this._positions)
    ).setStyle(this._style)
    overlay._delegate = this._delegate
    overlay._label = this._measureLabel
    //overlay._delegate.polyline._positions = this._positions
    this._options.onDrawStop && this._options.onDrawStop(overlay)
    // let polyline = new Polyline(
    //   Transform.transformCartesianArrayToWGS84Array(this._positions)
    // ).setStyle(this._style)
    // overlay.delegate.polyline.positions = this._positions
    //this._options.onDrawStop && this._options.onDrawStop(polyline)
    this._updateMeasureLabel()
  }

  /**
   *
   * @param position
   * @returns {boolean}
   * @private
   */
  _onDrawAnchor(position) {
    this._positions.push(position)
    this.drawTool.fire(PlotEventType.CREATE_ANCHOR, { position })
    this._options.onDrawAnchor && this._options.onDrawAnchor(position)
    this._updateMeasureLabel()
  }

  _updateMeasureLabel() {
    if (this._positions?.length > 1) {
      let distance = distanceCartesian(this._positions)
      this._measureLabelText = `距离：${distance}米`
      this._measureLabelPosition = this._positions[this._positions.length - 1]
    }
  }
}

export default DrawPolyline
