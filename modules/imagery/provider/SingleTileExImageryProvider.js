import { Cesium } from '@dc-modules/namespace'
import ImageryType from '../ImageryType'
/**
 * @typedef {Object} SingleTileExImageryProvider.ConstructorOptions
 *
 * Initialization options for the SingleTileExImageryProvider constructor
 *
 * @property {Resource|String} url The url for the tile.
 * @property {Rectangle} [rectangle=Rectangle.MAX_VALUE] The rectangle, in radians, covered by the image.
 * @property {Credit|String} [credit] A credit for the data source, which is displayed on the canvas.
 * @property {Ellipsoid} [ellipsoid] The ellipsoid.  If not specified, the WGS84 ellipsoid is used.
 */

/**
 * Provides a single, top-level imagery tile.  The single image is assumed to use a
 * 重写SingleTileExImageryProvider解决其不支持WebMercator坐标系的问题
 * {@link GeographicTilingScheme,WebMercatorTilingScheme}.
 *
 * @alias SingleTileExImageryProvider
 * @constructor
 * Created by shangfei_zhang on 2020/10/9.
 *
 * @param {SingleTileExImageryProvider.ConstructorOptions} options Object describing initialization options
 *
 * @see ArcGisMapServerImageryProvider
 * @see BingMapsImageryProvider
 * @see GoogleEarthEnterpriseMapsProvider
 * @see OpenStreetMapImageryProvider
 * @see TileMapServiceImageryProvider
 * @see WebMapServiceImageryProvider
 * @see WebMapTileServiceImageryProvider
 * @see UrlTemplateImageryProvider
 */
function SingleTileExImageryProvider(options) {
  options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT)
  //>>includeStart('debug', pragmas.debug);
  if (!Cesium.defined(options.url)) {
    throw new Cesium.DeveloperError('options.url is required.')
  }
  //>>includeEnd('debug');

  /**
   * The default alpha blending value of this provider, with 0.0 representing fully transparent and
   * 1.0 representing fully opaque.
   *
   * @type {Number|undefined}
   * @default undefined
   */
  this.defaultAlpha = options.defaultAlpha

  /**
   * The default alpha blending value on the night side of the globe of this provider, with 0.0 representing fully transparent and
   * 1.0 representing fully opaque.
   *
   * @type {Number|undefined}
   * @default undefined
   */
  this.defaultNightAlpha = options.defaultNightAlpha

  /**
   * The default alpha blending value on the day side of the globe of this provider, with 0.0 representing fully transparent and
   * 1.0 representing fully opaque.
   *
   * @type {Number|undefined}
   * @default undefined
   */
  this.defaultDayAlpha = options.defaultDayAlpha

  /**
   * The default brightness of this provider.  1.0 uses the unmodified imagery color.  Less than 1.0
   * makes the imagery darker while greater than 1.0 makes it brighter.
   *
   * @type {Number|undefined}
   * @default undefined
   */
  this.defaultBrightness = options.defaultBrightness

  /**
   * The default contrast of this provider.  1.0 uses the unmodified imagery color.  Less than 1.0 reduces
   * the contrast while greater than 1.0 increases it.
   *
   * @type {Number|undefined}
   * @default undefined
   */
  this.defaultContrast = options.defaultContrast

  /**
   * The default hue of this provider in radians. 0.0 uses the unmodified imagery color.
   *
   * @type {Number|undefined}
   * @default undefined
   */
  this.defaultHue = options.defaultHue

  /**
   * The default saturation of this provider. 1.0 uses the unmodified imagery color. Less than 1.0 reduces the
   * saturation while greater than 1.0 increases it.
   *
   * @type {Number|undefined}
   * @default undefined
   */
  this.defaultSaturation = options.defaultSaturation

  /**
   * The default gamma correction to apply to this provider.  1.0 uses the unmodified imagery color.
   *
   * @type {Number|undefined}
   * @default undefined
   */
  this.defaultGamma = options.defaultGamma

  /**
   * The default texture minification filter to apply to this provider.
   *
   * @type {TextureMinificationFilter}
   * @default undefined
   */
  this.defaultMinificationFilter = options.defaultMinificationFilter

  /**
   * The default texture magnification filter to apply to this provider.
   *
   * @type {TextureMagnificationFilter}
   * @default undefined
   */
  this.defaultMagnificationFilter = options.defaultMagnificationFilter

  var resource = Cesium.Resource.createIfNeeded(options.url)

  var rectangle = Cesium.defaultValue(
    options.rectangle,
    Cesium.Rectangle.MAX_VALUE
  )

  if (options.tilingScheme === 'WebMercator') {
    this._tilingScheme = new Cesium.WebMercatorTilingScheme({
      rectangleSouthwestInMeters: options.rectangleSouthwestInMeters,
      rectangleNortheastInMeters: options.rectangleNortheastInMeters,
      numberOfLevelZeroTilesX: 1,
      numberOfLevelZeroTilesY: 1,
      ellipsoid: options.ellipsoid
    })
  } else {
    this._tilingScheme = new Cesium.GeographicTilingScheme({
      rectangle: rectangle,
      numberOfLevelZeroTilesX: 1,
      numberOfLevelZeroTilesY: 1,
      ellipsoid: options.ellipsoid
    })
  }

  this._resource = resource
  this._image = undefined
  this._texture = undefined
  this._tileWidth = 0
  this._tileHeight = 0

  this._errorEvent = new Cesium.Event()

  this._ready = false
  this._readyPromise = Cesium.when.defer()

  var credit = options.credit
  if (typeof credit === 'string') {
    credit = new Cesium.Credit(credit)
  }
  this._credit = credit

  var that = this
  var error

  function success(image) {
    that._image = image
    that._tileWidth = image.width
    that._tileHeight = image.height
    that._ready = true
    that._readyPromise.resolve(true)
    Cesium.TileProviderError.handleSuccess(that._errorEvent)
  }

  function failure(e) {
    var message = 'Failed to load image ' + resource.url + '.'
    error = Cesium.TileProviderError.handleError(
      error,
      that,
      that._errorEvent,
      message,
      0,
      0,
      0,
      doRequest,
      e
    )
    that._readyPromise.reject(new Cesium.RuntimeError(message))
  }

  function doRequest() {
    Cesium.ImageryProvider.loadImage(null, resource)
      .then(success)
      .otherwise(failure)
  }

  doRequest()
}

Object.defineProperties(SingleTileExImageryProvider.prototype, {
  /**
   * Gets the URL of the single, top-level imagery tile.
   * @memberof SingleTileImageryProvider.prototype
   * @type {String}
   * @readonly
   */
  url: {
    get: function() {
      return this._resource.url
    }
  },

  /**
   * Gets the proxy used by this provider.
   * @memberof SingleTileImageryProvider.prototype
   * @type {Proxy}
   * @readonly
   */
  proxy: {
    get: function() {
      return this._resource.proxy
    }
  },

  /**
   * Gets the width of each tile, in pixels. This function should
   * not be called before {@link SingleTileImageryProvider#ready} returns true.
   * @memberof SingleTileImageryProvider.prototype
   * @type {Number}
   * @readonly
   */
  tileWidth: {
    get: function() {
      //>>includeStart('debug', pragmas.debug);
      if (!this._ready) {
        throw new Cesium.DeveloperError(
          'tileWidth must not be called before the imagery provider is ready.'
        )
      }
      //>>includeEnd('debug');

      return this._tileWidth
    }
  },

  /**
   * Gets the height of each tile, in pixels.  This function should
   * not be called before {@link SingleTileImageryProvider#ready} returns true.
   * @memberof SingleTileImageryProvider.prototype
   * @type {Number}
   * @readonly
   */
  tileHeight: {
    get: function() {
      //>>includeStart('debug', pragmas.debug);
      if (!this._ready) {
        throw new Cesium.DeveloperError(
          'tileHeight must not be called before the imagery provider is ready.'
        )
      }
      //>>includeEnd('debug');

      return this._tileHeight
    }
  },

  /**
   * Gets the maximum level-of-detail that can be requested.  This function should
   * not be called before {@link SingleTileImageryProvider#ready} returns true.
   * @memberof SingleTileImageryProvider.prototype
   * @type {Number|undefined}
   * @readonly
   */
  maximumLevel: {
    get: function() {
      //>>includeStart('debug', pragmas.debug);
      if (!this._ready) {
        throw new Cesium.DeveloperError(
          'maximumLevel must not be called before the imagery provider is ready.'
        )
      }
      //>>includeEnd('debug');

      return 0
    }
  },

  /**
   * Gets the minimum level-of-detail that can be requested.  This function should
   * not be called before {@link SingleTileImageryProvider#ready} returns true.
   * @memberof SingleTileImageryProvider.prototype
   * @type {Number}
   * @readonly
   */
  minimumLevel: {
    get: function() {
      //>>includeStart('debug', pragmas.debug);
      if (!this._ready) {
        throw new Cesium.DeveloperError(
          'minimumLevel must not be called before the imagery provider is ready.'
        )
      }
      //>>includeEnd('debug');

      return 0
    }
  },

  /**
   * Gets the tiling scheme used by this provider.  This function should
   * not be called before {@link SingleTileImageryProvider#ready} returns true.
   * @memberof SingleTileImageryProvider.prototype
   * @type {TilingScheme}
   * @readonly
   */
  tilingScheme: {
    get: function() {
      //>>includeStart('debug', pragmas.debug);
      if (!this._ready) {
        throw new Cesium.DeveloperError(
          'tilingScheme must not be called before the imagery provider is ready.'
        )
      }
      //>>includeEnd('debug');

      return this._tilingScheme
    }
  },

  /**
   * Gets the rectangle, in radians, of the imagery provided by this instance.  This function should
   * not be called before {@link SingleTileImageryProvider#ready} returns true.
   * @memberof SingleTileImageryProvider.prototype
   * @type {Rectangle}
   * @readonly
   */
  rectangle: {
    get: function() {
      return this._tilingScheme.rectangle
    }
  },

  /**
   * Gets the tile discard policy.  If not undefined, the discard policy is responsible
   * for filtering out "missing" tiles via its shouldDiscardImage function.  If this function
   * returns undefined, no tiles are filtered.  This function should
   * not be called before {@link SingleTileImageryProvider#ready} returns true.
   * @memberof SingleTileImageryProvider.prototype
   * @type {TileDiscardPolicy}
   * @readonly
   */
  tileDiscardPolicy: {
    get: function() {
      //>>includeStart('debug', pragmas.debug);
      if (!this._ready) {
        throw new Cesium.DeveloperError(
          'tileDiscardPolicy must not be called before the imagery provider is ready.'
        )
      }
      //>>includeEnd('debug');

      return undefined
    }
  },

  /**
   * Gets an event that is raised when the imagery provider encounters an asynchronous error.  By subscribing
   * to the event, you will be notified of the error and can potentially recover from it.  Event listeners
   * are passed an instance of {@link TileProviderError}.
   * @memberof SingleTileImageryProvider.prototype
   * @type {Event}
   * @readonly
   */
  errorEvent: {
    get: function() {
      return this._errorEvent
    }
  },

  /**
   * Gets a value indicating whether or not the provider is ready for use.
   * @memberof SingleTileImageryProvider.prototype
   * @type {Boolean}
   * @readonly
   */
  ready: {
    get: function() {
      return this._ready
    }
  },

  /**
   * Gets a promise that resolves to true when the provider is ready for use.
   * @memberof SingleTileImageryProvider.prototype
   * @type {Promise.<Boolean>}
   * @readonly
   */
  readyPromise: {
    get: function() {
      return this._readyPromise.promise
    }
  },

  /**
   * Gets the credit to display when this imagery provider is active.  Typically this is used to credit
   * the source of the imagery.  This function should not be called before {@link SingleTileImageryProvider#ready} returns true.
   * @memberof SingleTileImageryProvider.prototype
   * @type {Credit}
   * @readonly
   */
  credit: {
    get: function() {
      return this._credit
    }
  },

  /**
   * Gets a value indicating whether or not the images provided by this imagery provider
   * include an alpha channel.  If this property is false, an alpha channel, if present, will
   * be ignored.  If this property is true, any images without an alpha channel will be treated
   * as if their alpha is 1.0 everywhere.  When this property is false, memory usage
   * and texture upload time are reduced.
   * @memberof SingleTileImageryProvider.prototype
   * @type {Boolean}
   * @readonly
   */
  hasAlphaChannel: {
    get: function() {
      return true
    }
  },

  type: {
    get: function() {
      return ImageryType.SINGLE_TILE_EX
    }
  }
})

/**
 * Gets the credits to be displayed when a given tile is displayed.
 *
 * @param {Number} x The tile X coordinate.
 * @param {Number} y The tile Y coordinate.
 * @param {Number} level The tile level;
 * @returns {Credit[]} The credits to be displayed when the tile is displayed.
 *
 * @exception {DeveloperError} <code>getTileCredits</code> must not be called before the imagery provider is ready.
 */
SingleTileExImageryProvider.prototype.getTileCredits = function(x, y, level) {
  return undefined
}

/**
 * Requests the image for a given tile.  This function should
 * not be called before {@link SingleTileImageryProvider#ready} returns true.
 *
 * @param {Number} x The tile X coordinate.
 * @param {Number} y The tile Y coordinate.
 * @param {Number} level The tile level.
 * @param {Request} [request] The request object. Intended for internal use only.
 * @returns {Promise.<HTMLImageElement|HTMLCanvasElement>|undefined} A promise for the image that will resolve when the image is available, or
 *          undefined if there are too many active requests to the server, and the request
 *          should be retried later.  The resolved image may be either an
 *          Image or a Canvas DOM object.
 *
 * @exception {DeveloperError} <code>requestImage</code> must not be called before the imagery provider is ready.
 */
SingleTileExImageryProvider.prototype.requestImage = function(
  x,
  y,
  level,
  request
) {
  //>>includeStart('debug', pragmas.debug);
  if (!this._ready) {
    throw new Cesium.DeveloperError(
      'requestImage must not be called before the imagery provider is ready.'
    )
  }
  //>>includeEnd('debug');

  return this._image
}

/**
 * Picking features is not currently supported by this imagery provider, so this function simply returns
 * undefined.
 *
 * @param {Number} x The tile X coordinate.
 * @param {Number} y The tile Y coordinate.
 * @param {Number} level The tile level.
 * @param {Number} longitude The longitude at which to pick features.
 * @param {Number} latitude  The latitude at which to pick features.
 * @return {Promise.<ImageryLayerFeatureInfo[]>|undefined} A promise for the picked features that will resolve when the asynchronous
 *                   picking completes.  The resolved value is an array of {@link ImageryLayerFeatureInfo}
 *                   instances.  The array may be empty if no features are found at the given location.
 *                   It may also be undefined if picking is not supported.
 */
SingleTileExImageryProvider.prototype.pickFeatures = function(
  x,
  y,
  level,
  longitude,
  latitude
) {
  return undefined
}

ImageryType.SINGLE_TILE_EX = 'single_tile_ex'
export default SingleTileExImageryProvider
