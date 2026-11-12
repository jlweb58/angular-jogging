declare namespace google.maps.visualization {
  interface WeightedLocation {
    location: google.maps.LatLng | google.maps.LatLngLiteral;
    weight: number;
  }

  interface HeatmapLayerOptions {
    data?: Array<google.maps.LatLng | WeightedLocation> | google.maps.MVCArray<google.maps.LatLng | WeightedLocation> | null;
    dissipating?: boolean | null;
    gradient?: string[] | null;
    map?: google.maps.Map | null;
    maxIntensity?: number | null;
    opacity?: number | null;
    radius?: number | null;
  }
}
