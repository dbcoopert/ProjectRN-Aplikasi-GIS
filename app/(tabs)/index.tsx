import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Platform, Linking, Text } from 'react-native';
import { DATA_WISATA, Wisata } from '../../src/data/wisataData';
import PlaceCard from '../../src/components/PlaceCard';

// 1. Inisialisasi variabel Map secara dinamis
let MapView: any = View;
let Marker: any = View;
let PROVIDER_GOOGLE: any = null;

// 2. Hanya impor react-native-maps jika BUKAN di Web
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
}

export default function MapScreen() {
  const [selectedPlace, setSelectedPlace] = useState<Wisata | null>(null);
  const [search, setSearch] = useState('');

  // 3. Tampilan khusus jika dibuka di Web agar tidak crash
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <Text style={styles.webText}>
          Peta Mobile tidak tersedia di Browser.{"\n"}
          Silakan buka melalui aplikasi Expo Go di HP Anda.
        </Text>
      </View>
    );
  }

  const openMaps = (lat: number, lng: number, name: string) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${name}@${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}(${name})`,
    });
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -6.9889,
          longitude: 106.5514,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {DATA_WISATA.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((place) => (
          <Marker
            key={place.id}
            coordinate={{ latitude: place.lat, longitude: place.lng }}
            onPress={() => setSelectedPlace(place)}
          />
        ))}
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Cari Wisata Sukabumi..."
          style={styles.input}
          onChangeText={setSearch}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <PlaceCard
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        onNavigate={() => selectedPlace && openMaps(selectedPlace.lat, selectedPlace.lng, selectedPlace.name)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: { 
    position: 'absolute', 
    top: 60, 
    width: '90%', 
    alignSelf: 'center', 
    backgroundColor: 'white', 
    borderRadius: 12, 
    elevation: 5, 
    paddingHorizontal: 15,
    zIndex: 10 
  },
  input: { height: 50, color: '#1e293b' },
  webContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
  webText: { textAlign: 'center', fontSize: 16, color: '#64748b', lineHeight: 24 }
});