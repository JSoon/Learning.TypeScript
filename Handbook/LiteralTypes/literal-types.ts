interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}

function setupMap(config: MapConfig): object {
  return config
}

setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 126 });