declare namespace google.maps.visualization {
  interface WeightedLocation {
    location: google.maps.LatLng | google.maps.LatLngLiteral;
    weight: number;
  }

  interface HeatmapLayerOptions {
    data: google.maps.visualization.WeightedLocation[];
  }
}
