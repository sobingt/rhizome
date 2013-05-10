var map;

function init(){
  map = new OpenLayers.Map('map');
  var osm = new OpenLayers.Layer.OSM("Simple OSM Map");

  var layer = new OpenLayers.Layer.Vector("POIs", {
    strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1.1})],
    protocol: new OpenLayers.Protocol.HTTP({
      url: "/demo/textfile.txt",
      format: new OpenLayers.Format.Text()
    })
  });

  map.addLayers([osm, layer]);
  //map.zoomToMaxExtent();

  map.setCenter(
    new OpenLayers.LonLat(-122.26, 37.87).transform(
      new OpenLayers.Projection("EPSG:4326"),
      map.getProjectionObject()
    ), 13
  );    

  // Interaction; not needed for initial display.
  selectControl = new OpenLayers.Control.SelectFeature(layer);
  map.addControl(selectControl);
  selectControl.activate();
  layer.events.on({
    'featureselected': onFeatureSelect,
    'featureunselected': onFeatureUnselect
  });
}


// Needed only for interaction, not for the display.
function onPopupClose(evt) {
  // 'this' is the popup.
  var feature = this.feature;
  if (feature.layer) { // The feature is not destroyed
    selectControl.unselect(feature);
  } else { // After "moveend" or "refresh" events on POIs layer all 
           //     features have been destroyed by the Strategy.BBOX
    this.destroy();
  }
}
function onFeatureSelect(evt) {
  feature = evt.feature;
  popup = new OpenLayers.Popup.FramedCloud("featurePopup",
    feature.geometry.getBounds().getCenterLonLat(),
    new OpenLayers.Size(100,100),
    "<h6><a href=\"/decision/1\">" + feature.attributes.title + "</a></h6>" +
    "<span>" + feature.attributes.description + "</span>",
    null, true, onPopupClose);
  feature.popup = popup;
  popup.feature = feature;
  map.addPopup(popup, true);
}
function onFeatureUnselect(evt) {
  feature = evt.feature;
  if (feature.popup) {
    popup.feature = null;
    map.removePopup(feature.popup);
    feature.popup.destroy();
    feature.popup = null;
  }
}
$(window).load(function () {
  init();
});