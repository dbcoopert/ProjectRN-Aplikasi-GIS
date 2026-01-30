export interface Wisata {
  id: number;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  img: string;
  desc: string;
}

export const DATA_WISATA: Wisata[] = [
  {
    id: 1,
    name: "Curug Cikaso",
    lat: -7.3608,
    lng: 106.6186,
    rating: 4.8,
    reviews: 1240,
    img: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=400",
    desc: "Air terjun legendaris dengan tiga aliran megah di kawasan Cibitung.",
  },
  // Tambahkan data lainnya...
];