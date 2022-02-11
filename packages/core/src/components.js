/**
 * @Author: Caven
 * @Date: 2021-03-13 17:17:19
 */

import { Cesium } from '@dc-modules/namespace'

/**
 * base
 */
import Position from '@dc-modules/position/Position'
import Parse from '@dc-modules/parse/Parse'
import { Util, DomUtil, PlotUtil } from '@dc-modules/utils'
import { Transform, CoordTransform } from '@dc-modules/transform'
import { MouseEventType, SceneEventType } from '@dc-modules/event'
import { MouseMode } from '@dc-modules/option'
import {
  area,
  bounds,
  center,
  curve,
  distance,
  heading,
  isBetween,
  midCartesian,
  midPosition,
  parabola
} from '@dc-modules/math'
import Viewer from '@dc-modules/viewer/Viewer'

/**
 * imagery
 */
import { ImageryType, ImageryLayerFactory } from '@dc-modules/imagery'

/**
 * terrain
 */
import { TerrainType, TerrainFactory } from '@dc-modules/terrain'

/**
 * layer
 */
import {
  LayerType,
  Layer,
  ClusterLayer,
  CzmlLayer,
  DynamicLayer,
  FeatureGridLayer,
  GeoJsonLayer,
  HtmlLayer,
  KmlLayer,
  LabelLayer,
  LayerGroup,
  PrimitiveLayer,
  TilesetLayer,
  TopoJsonLayer,
  VectorLayer
} from '@dc-modules/layer'

/**
 * overlay
 */
import {
  OverlayType,
  Overlay,
  CustomBillboard,
  CustomLabel,
  DynamicBillboard,
  DynamicModel,
  Model,
  Tileset,
  AttackArrow,
  DoubleArrow,
  FineArrow,
  GatheringPlace,
  TailedAttackArrow,
  BillboardPrimitive,
  BounceBillboardPrimitive,
  BounceLabelPrimitive,
  CloudPrimitive,
  DiffuseWallPrimitive,
  ElecEllipsoidPrimitive,
  FlowLinePrimitive,
  LabelPrimitive,
  ModelCollectionPrimitive,
  ModelPrimitive,
  PointPrimitive,
  PolylinePrimitive,
  ScanCirclePrimitive,
  TrailLinePrimitive,
  VideoPrimitive,
  WaterPrimitive,
  Billboard,
  Box,
  Circle,
  Corridor,
  Cylinder,
  DivIcon,
  Ellipse,
  Ellipsoid,
  Label,
  Plane,
  Point,
  Polygon,
  Polyline,
  PolylineVolume,
  Rectangle,
  Wall
} from '@dc-modules/overlay'

/**
 * material
 */
import {
  CircleBlurMaterialProperty,
  CircleDiffuseMaterialProperty,
  CircleFadeMaterialProperty,
  CirclePulseMaterialProperty,
  CircleScanMaterialProperty,
  CircleSpiralMaterialProperty,
  CircleVaryMaterialProperty,
  CircleWaveMaterialProperty,
  EllipsoidElectricMaterialProperty,
  EllipsoidTrailMaterialProperty,
  PolylineFlickerMaterialProperty,
  PolylineFlowMaterialProperty,
  PolylineImageTrailMaterialProperty,
  PolylineLightingMaterialProperty,
  PolylineLightingTrailMaterialProperty,
  PolylineTrailMaterialProperty,
  RadarLineMaterialProperty,
  RadarSweepMaterialProperty,
  RadarWaveMaterialProperty,
  WallImageTrailMaterialProperty,
  WallLineTrailMaterialProperty,
  WallTrailMaterialProperty,
  WaterMaterialProperty
} from '@dc-modules/material'

/**
 *
 * effect
 */
import Effect from '@dc-modules/effect/Effect'

/**
 * animation
 */
import {
  AnimationType,
  AroundView,
  AroundPoint,
  CircleScan,
  Flying,
  GlobeRotate,
  RadarScan
} from '@dc-modules/animation'

/**
 *
 * roaming
 */
import {
  KeyboardRoaming,
  RoamingController,
  RoamingPath
} from '@dc-modules/roaming'

/**
 *
 * history-track
 */
import {
  TrackController,
  Track,
  TrackViewMode
} from '@dc-modules/history-track'

/**
 *
 * weather
 */
import Weather from '@dc-modules/weather/Weather'

/**
 * 标绘工具
 * plot
 */
import Plot from '@dc-modules/plot/Plot'

/**
 * 测量工具
 * measure
 */
import Measure from '@dc-modules/measure/Measure'
/**
 *
 * wind
 */
import WindLayer from '@dc-modules/wind/WindLayer'

/**
 *
 * heat
 */
import HeatLayer from '@dc-modules/heat/HeatLayer'

/**
 * exts
 */
import { GroundSkyBox } from '@dc-modules/exts'

/**
 * thirdPart
 */
import thirdPart from '@dc-modules/thirdpart'

Cesium.Math.area = area
Cesium.Math.bounds = bounds
Cesium.Math.center = center
Cesium.Math.distance = distance
Cesium.Math.heading = heading
Cesium.Math.isBetween = isBetween
Cesium.Math.midCartesian = midCartesian
Cesium.Math.mid = midPosition
Cesium.Math.midPosition = midPosition
Cesium.Math.parabola = parabola
Cesium.Math.curve = curve

const components = {
  /**
   * base
   */
  Position,
  Parse,
  P: Parse,
  Util,
  DomUtil,
  PlotUtil,
  Transform,
  T: Transform,
  CoordTransform,
  CT: CoordTransform,
  MouseEventType,
  SceneEventType,
  MouseMode,
  Math: Cesium.Math,
  Viewer,
  World: Viewer,
  Map: Viewer,
  /**
   * imagery
   */
  ImageryType,
  ImageryLayerFactory,
  /**
   * terrain
   */
  TerrainType,
  TerrainFactory,
  /**
   * layer
   */
  LayerType,
  Layer,
  ClusterLayer,
  CzmlLayer,
  DynamicLayer,
  FeatureGridLayer,
  GeoJsonLayer,
  HtmlLayer,
  KmlLayer,
  LabelLayer,
  LayerGroup,
  PrimitiveLayer,
  TilesetLayer,
  TopoJsonLayer,
  VectorLayer,
  /**
   * overlay
   */
  OverlayType,
  Overlay,
  CustomBillboard,
  CustomLabel,
  DynamicBillboard,
  DynamicModel,
  Model,
  Tileset,
  AttackArrow,
  DoubleArrow,
  FineArrow,
  GatheringPlace,
  TailedAttackArrow,
  BillboardPrimitive,
  BounceBillboardPrimitive,
  BounceLabelPrimitive,
  CloudPrimitive,
  DiffuseWallPrimitive,
  ElecEllipsoidPrimitive,
  FlowLinePrimitive,
  LabelPrimitive,
  ModelCollectionPrimitive,
  ModelPrimitive,
  PointPrimitive,
  PolylinePrimitive,
  ScanCirclePrimitive,
  TrailLinePrimitive,
  VideoPrimitive,
  WaterPrimitive,
  Billboard,
  Box,
  Circle,
  Corridor,
  Cylinder,
  DivIcon,
  Ellipse,
  Ellipsoid,
  Label,
  Plane,
  Point,
  Polygon,
  Polyline,
  PolylineVolume,
  Rectangle,
  Wall,
  /**
   * material
   */
  CircleBlurMaterialProperty,
  CircleDiffuseMaterialProperty,
  CircleFadeMaterialProperty,
  CirclePulseMaterialProperty,
  CircleScanMaterialProperty,
  CircleSpiralMaterialProperty,
  CircleVaryMaterialProperty,
  CircleWaveMaterialProperty,
  EllipsoidElectricMaterialProperty,
  EllipsoidTrailMaterialProperty,
  PolylineFlickerMaterialProperty,
  PolylineFlowMaterialProperty,
  PolylineImageTrailMaterialProperty,
  PolylineLightingMaterialProperty,
  PolylineLightingTrailMaterialProperty,
  PolylineTrailMaterialProperty,
  RadarLineMaterialProperty,
  RadarSweepMaterialProperty,
  RadarWaveMaterialProperty,
  WallImageTrailMaterialProperty,
  WallLineTrailMaterialProperty,
  WallTrailMaterialProperty,
  WaterMaterialProperty,
  /**
   * effect
   */
  Effect,
  /**
   * animation
   */
  AnimationType,
  AroundView,
  AroundPoint,
  CircleScan,
  Flying,
  GlobeRotate,
  RadarScan,
  /**
   *
   * roaming
   */
  KeyboardRoaming,
  RoamingController,
  RoamingPath,
  /**
   *
   * track
   */
  TrackController,
  Track,
  TrackViewMode,
  /**
   * weather
   */
  Weather,
  /**
   * plot
   */
  Plot,
  /**
   * Measure
   */
  Measure,
  /**
   * wind
   */
  WindLayer,
  /**
   * heat
   */
  HeatLayer,
  /**
   * exts
   */
  GroundSkyBox,
  /**
   * thirdPart
   */
  ...thirdPart
}

export default components
