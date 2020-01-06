<template>
  <div class="map-contain">
    <div id="map">123</div>
    <div class="info" />
    <div class="pane">
      <a @click="show">Show layer</a>
      <a @click="hide">Hide Layer</a>
    </div>
  </div>
</template>

<script>
import * as maptalks from 'maptalks'
export default {
  name: 'Maptalks',
  data() {
    return {
      map: '',
      marker: ''
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const arcUrl = [
        {
          url: 'http://203.207.224.108:2050/mapserver/tms/services/globalimage/MapServer',
          title: '全球基础地理(搭配影像)数据'
        }, {
          url: 'http://203.207.224.108:2050/mapserver/tms/services/100wshiliang/MapServer',
          title: '全球电子地图数据'
        }, {
          url: 'http://203.207.224.108:2050/mapserver/tms/services/globalimage/MapServer',
          title: '全球影像数据'
        }, {
          url: 'http://203.207.224.108:2050/mapserver/tms/services/globaldem/MapServer',
          title: '全球基础地理与地形数据'
        }
      ]

      maptalks.SpatialReference.loadArcgis(arcUrl[0].url + '?f=pjson', function(err, conf) {
        if (err) {
          throw new Error(err)
        }
        var ref = conf.spatialReference
        ref.projection = 'EPSG:4326'
        // conf.tileSystem = [1, -1, -180, 140]
        const map = new maptalks.Map('map', {
          center: [120, 36],
          zoom: 8,
          minZoom: 1,
          maxZoom: 16,
          spatialReference: ref,
          // zoomControl: true, // 视图大小进度条
          scaleControl: true, // add scale control
          overviewControl: true, // 地图右下角视图框
          layerSwitcherControl: {
            'position': 'top-right',
            // title of base layers
            'baseTitle': 'Base Layers',
            // title of layers
            'overlayTitle': 'Layers',
            // layers you don't want to manage with layer switcher
            'excludeLayers': [],
            // css class of container element, maptalks-layer-switcher by default
            'containerClass': 'maptalks-layer-switcher'
          },
          baseLayer: new maptalks.GroupTileLayer('base', [
            new maptalks.TileLayer(arcUrl[0].title, {
              urlTemplate: arcUrl[0].url + '/tile/{z}/{y}/{x}',
              'tileSystem': conf.tileSystem,
              'tileSize': conf.tileSize
            }),
            new maptalks.TileLayer(arcUrl[1].title, {
              urlTemplate: arcUrl[1].url + '/tile/{z}/{y}/{x}',
              'tileSystem': conf.tileSystem,
              'tileSize': conf.tileSize
            })
          ]),
          layers: [
            new maptalks.VectorLayer('v')
          ]
        })
        map.addLayer(new maptalks.TileLayer(arcUrl[2].title, {
          'urlTemplate': arcUrl[2].url + '/tile/{z}/{y}/{x}',
          'opacity': 0.2,
          'tileSystem': conf.tileSystem,
          'tileSize': conf.tileSize
        }))
        map.addLayer(new maptalks.TileLayer(arcUrl[3].title, {
          'urlTemplate': arcUrl[3].url + '/tile/{z}/{y}/{x}',
          'opacity': 0.2,
          'tileSystem': conf.tileSystem,
          'tileSize': conf.tileSize
        }))
        var zoomControl = new maptalks.control.Zoom({
          'position': 'top-left',
          'slider': true,
          'zoomLevel': true
        }).addTo(map)
        function hide() {
          zoomControl.hide()
        }

        function show() {
          if (zoomControl.getMap()) {
            zoomControl.show()
          } else {
            map.addControl(zoomControl)
          }
        }

        function remove() {
          zoomControl.remove()
        }

        new maptalks.control.Toolbar({
          position: 'bottom-left',
          items: [
            {
              item: 'Show',
              click: show
            },
            {
              item: 'Hide',
              click: hide
            },
            {
              item: 'Remove',
              click: remove
            }
          ]
        }).addTo(map)

        const marker = new maptalks.Marker([120, 36], {
          'properties': {
            'name': 'point marker'
          }
        }).addTo(map.getLayer('v'))
        document.querySelector('.info').innerHTML = JSON.stringify(marker.toGeoJSON())
        this.marker = marker
        console.log(map, marker)
      })
    },
    show() {
      this.marker.show()
    },
    hide() {
      this.marker.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
.map-contain{
  position: relative;
}
#map {
  width: 1060px;
  height: 720px;
  border: 1px solid black;
}
.info {
  position: absolute;
  background-color :rgba(13, 13, 13, 0.5);
  padding: 10px 10px 10px 10px;
  font: 13px bold sans-serif;
  color: #fff;
  left: 0px;
  top: 0px;
  width: 782px;;
  height: 70px;
  overflow: hidden;
}
.pane{
  background:#34495e;
  line-height: 28px;
  color:#fff;
  z-index: 10;
  position: absolute;
  left: 350px;
  bottom: 23px;
  a {
    display: block;
    color:#fff;
    text-align: left;
    padding: 0 10px;
    min-width: 28px;
    min-height: 28px;
    float: left;
  }
}
</style>
