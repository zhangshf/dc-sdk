/**
 * @Author: Caven
 * @Date: 2020-04-10 17:02:28
 */

import { Cesium } from '@dc-modules/namespace'

const BaseEventType = {
  ADD: 'add',
  REMOVE: 'remove'
}

const MouseEventType = {
  LEFT_DOWN: Cesium.ScreenSpaceEventType.LEFT_DOWN,
  LEFT_UP: Cesium.ScreenSpaceEventType.LEFT_UP,
  CLICK: Cesium.ScreenSpaceEventType.LEFT_CLICK,
  RIGHT_DOWN: Cesium.ScreenSpaceEventType.RIGHT_DOWN,
  RIGHT_UP: Cesium.ScreenSpaceEventType.RIGHT_UP,
  RIGHT_CLICK: Cesium.ScreenSpaceEventType.RIGHT_CLICK,
  DB_CLICK: Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
  MOUSE_MOVE: Cesium.ScreenSpaceEventType.MOUSE_MOVE,
  WHEEL: Cesium.ScreenSpaceEventType.WHEEL,
  MOUSE_OVER: 'mouseover',
  MOUSE_OUT: 'mouseout'
}

const ViewerEventType = {
  ADD_LAYER: 'addLayer',
  REMOVE_LAYER: 'removeLayer',
  ADD_EFFECT: 'addEffect',
  REMOVE_EFFECT: 'removeEffect',
  LEFT_DOWN: Cesium.ScreenSpaceEventType.LEFT_DOWN,
  LEFT_UP: Cesium.ScreenSpaceEventType.LEFT_UP,
  CLICK: Cesium.ScreenSpaceEventType.LEFT_CLICK,
  RIGHT_DOWN: Cesium.ScreenSpaceEventType.RIGHT_DOWN,
  RIGHT_UP: Cesium.ScreenSpaceEventType.RIGHT_UP,
  RIGHT_CLICK: Cesium.ScreenSpaceEventType.RIGHT_CLICK,
  DB_CLICK: Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
  MOUSE_MOVE: Cesium.ScreenSpaceEventType.MOUSE_MOVE,
  WHEEL: Cesium.ScreenSpaceEventType.WHEEL
}

const SceneEventType = {
  CAMERA_MOVE_END: 'cameraMoveEnd',
  CAMERA_CHANGED: 'cameraChanged',
  PRE_UPDATE: 'preUpdate',
  POST_UPDATE: 'postUpdate',
  PRE_RENDER: 'preRender',
  POST_RENDER: 'postRender',
  MORPH_COMPLETE: 'morphComplete',
  CLOCK_TICK: 'clockTick'
}

const OverlayEventType = {
  ...BaseEventType,
  LEFT_DOWN: Cesium.ScreenSpaceEventType.LEFT_DOWN,
  LEFT_UP: Cesium.ScreenSpaceEventType.LEFT_UP,
  CLICK: Cesium.ScreenSpaceEventType.LEFT_CLICK,
  RIGHT_DOWN: Cesium.ScreenSpaceEventType.RIGHT_DOWN,
  RIGHT_UP: Cesium.ScreenSpaceEventType.RIGHT_UP,
  RIGHT_CLICK: Cesium.ScreenSpaceEventType.RIGHT_CLICK,
  DB_CLICK: Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
  MOUSE_MOVE: Cesium.ScreenSpaceEventType.MOUSE_MOVE,
  MOUSE_OVER: 'mouseover',
  MOUSE_OUT: 'mouseout',
  POSITION_UPDATE: 'positionUpdate'
}

const LayerGroupEventType = BaseEventType

const LayerEventType = {
  ...BaseEventType,
  LEFT_DOWN: Cesium.ScreenSpaceEventType.LEFT_DOWN,
  LEFT_UP: Cesium.ScreenSpaceEventType.LEFT_UP,
  CLICK: Cesium.ScreenSpaceEventType.LEFT_CLICK,
  RIGHT_DOWN: Cesium.ScreenSpaceEventType.RIGHT_DOWN,
  RIGHT_UP: Cesium.ScreenSpaceEventType.RIGHT_UP,
  RIGHT_CLICK: Cesium.ScreenSpaceEventType.RIGHT_CLICK,
  DB_CLICK: Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
}

const TrackEventType = {
  ...BaseEventType,
  POST_RENDER: 'postRender',
  ACTIVATE: 'activate',
  DEACTIVATE: 'deactivate',
  RESET_TIME_LINE: 'restTimeLine'
}

const PathEventType = {
  ...BaseEventType,
  POST_RENDER: 'postRender',
  RESET_TIME_LINE: 'restTimeLine'
}

/**
 * 标绘事件
 * @type {{DRAW_ANCHOR: string, EDIT_START: string, CLEAR_ANCHOR: string, ANCHOR_MOVING: string, EDIT_STOP: string, DRAW_STOP: string, DRAW_START: string, EDIT_ANCHOR_STOP: string, CREATE_ANCHOR: string, UPDATE_ANCHOR: string}}
 */
const PlotEventType = {
  DRAW_START: 'drawStart',
  DRAW_STOP: 'drawStop',
  EDIT_START: 'editStart',
  EDIT_STOP: 'editEnd',
  DRAW_ANCHOR: 'drawAnchor',
  CREATE_ANCHOR: 'createAnchor',
  UPDATE_ANCHOR: 'updateAnchor',
  ANCHOR_MOVING: 'anchorMoving',
  EDIT_ANCHOR_STOP: 'editAnchorStop',
  CLEAR_ANCHOR: 'clearAnchor'
}

/**
 * 测量事件
 * @type {{DRAW_ANCHOR: string, EDIT_START: string, CLEAR_ANCHOR: string, ANCHOR_MOVING: string, EDIT_STOP: string, DRAW_STOP: string, DRAW_START: string, EDIT_ANCHOR_STOP: string, CREATE_ANCHOR: string, UPDATE_ANCHOR: string}}
 */
const MeasureEventType = {
  DRAW_START: 'drawStart',
  DRAW_STOP: 'drawStop',
  EDIT_START: 'editStart',
  EDIT_STOP: 'editEnd',
  DRAW_ANCHOR: 'drawAnchor',
  CREATE_ANCHOR: 'createAnchor',
  UPDATE_ANCHOR: 'updateAnchor',
  ANCHOR_MOVING: 'anchorMoving',
  EDIT_ANCHOR_STOP: 'editAnchorStop',
  CLEAR_ANCHOR: 'clearAnchor'
}

export {
  MouseEventType,
  ViewerEventType,
  SceneEventType,
  LayerGroupEventType,
  LayerEventType,
  OverlayEventType,
  TrackEventType,
  PathEventType,
  PlotEventType,
  MeasureEventType
}