/**
 * @Author: shangfei_zhang
 * @Date: 2022-01-07 19:15
 */

import { Cesium } from '@dc-modules/namespace'
import { MeasureEventType } from '../EventType'
import Event from '../Event'

class MeasureEvent extends Event {
  constructor() {
    super()
  }

  /**
   *
   * @private
   */
  _registerEvent() {
    Object.keys(MeasureEventType).forEach(key => {
      let type = MeasureEventType[key]
      this._cache[type] = new Cesium.Event()
    })
  }
}

export default MeasureEvent
