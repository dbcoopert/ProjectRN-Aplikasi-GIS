import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Wisata } from "../data/wisataData";

interface Props {
  place: Wisata | null;
  onClose: () => void;
  onNavigate: () => void;
}

const PlaceCard: React.FC<Props> = ({ place, onClose, onNavigate }) => {
  if (!place) return null;

  return (
    <View style={styles.card}>
      <Image source={{ uri: place.img }} style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.rating}>
          ⭐ {place.rating} ({place.reviews} Rev)
        </Text>
        <Text numberOfLines={2} style={styles.desc}>
          {place.desc}
        </Text>
        <View style={styles.btnGroup}>
          <TouchableOpacity style={styles.btnNav} onPress={onNavigate}>
            <Text style={styles.btnText}>Navigasi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnClose} onPress={onClose}>
            <Text style={styles.btnTextClose}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 20,
    width: "92%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 10,
    overflow: "hidden",
  },
  img: { width: "100%", height: 140 },
  info: { padding: 15 },
  title: { fontSize: 18, fontWeight: "bold" },
  rating: { color: "#f59e0b", marginVertical: 4 },
  desc: { color: "#64748b", fontSize: 13, marginBottom: 10 },
  btnGroup: { flexDirection: "row", gap: 10 },
  btnNav: {
    flex: 2,
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnClose: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "bold" },
  btnTextClose: { color: "#1e293b" },
});

export default PlaceCard;
