import { TileJSON } from 'ol/source'
import { isArray, isNumber, pick } from '../utils'
import tileImageSource from './tile-image-source'

/**
 * Base TileJSON source mixin.
 */
export default {
  mixins: [
    tileImageSource,
  ],
  props: {
    // ol/source/TileJSON
    tileJson: Object,
    url: String,
    jsonp: Boolean,
    tileSize: {
      type: [Number, Array],
      default: () => [256, 256],
      validator: value => isNumber(value) ||
        (isArray(value) && value.length === 2 && value.every(isNumber)),
    },
  },
  computed: {
    tileSizeArr () {
      return isArray(this.tileSize) ? this.tileSize : [this.tileSize, this.tileSize]
    },
  },
  methods: {
    /**
     * @return {module:ol/source/TileJSON}
     * @protected
     */
    createSource () {
      return new TileJSON({
        // ol/source/Source
        attributions: this.currentAttributions,
        projection: this.projection,
        wrapX: this.wrapX,
        // ol/source/Tile
        cacheSize: this.cacheSize,
        transition: this.transition,
        // ol/source/UrlTile
        tileLoadFunction: this.resolvedTileLoadFunc,
        // ol/source/TileImage
        crossOrigin: this.crossOrigin,
        reprojectionErrorThreshold: this.reprojectionErrorThreshold,
        tileClass: this.tileClass,
        // ol/source/TileJSON
        jsonp: this.jsonp,
        tileJSON: this.tileJson,
        url: this.url,
      })
    },
    .../*#__PURE__*/pick(tileImageSource.methods, [
      'beforeInit',
      'init',
      'deinit',
      'beforeMount',
      'mount',
      'unmount',
      'refresh',
      'scheduleRefresh',
      'remount',
      'scheduleRemount',
      'recreate',
      'scheduleRecreate',
      'getServices',
      'subscribeAll',
      'resolveSource',
      'resolveOlObject',
    ]),
  },
}
