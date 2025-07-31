

export function fetchAllArtoworks() {
  // come from an api
  return [
    {
      id: 1,
      title: "Whispers of the Horizon",
      medium: "Acrylic on Canvas",
      size: "89x24",
      description: "A serene abstract landscape with muted pastels, evoking calm and balance.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
      mainImage: "horizon_main.jpg",
      images: ["horizon_1.jpg", "horizon_2.jpg", "horizon_3.jpg"],
      price: 1200.00,
      types: ["Abstract", "Landscape"],
      instaVideoLink: "https://www.instagram.com/reel/abc123",
      framed: true,
      created_at: "2024-05-14T10:30:00Z",
      availability: "Available",
      stock_quantity: 1,
      featured: true
    },
    {
      id: 2,
      title: "City in Motion",
      medium: "Oil on Canvas",
      size: "60x48",
      description: "A vibrant urban impression with bold brushstrokes capturing the energy of a bustling city. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
      mainImage: "city_motion_main.jpg",
      images: ["city_motion_1.jpg", "city_motion_2.jpg"],
      price: 2200.50,
      types: ["Modern", "Urban"],
      instaVideoLink: "https://www.instagram.com/reel/xyz456",
      framed: false,
      created_at: "2023-11-20T15:45:00Z",
      availability: "Sold",
      stock_quantity: 0,
      featured: false
    },
    {
      id: 3,
      title: "Golden Silence",
      medium: "Mixed Media",
      size: "30x40",
      description: "A minimal piece combining gold leaf and textured paint to create a meditative aura.",
      mainImage: "golden_silence_main.jpg",
      images: ["golden_silence_1.jpg", "golden_silence_2.jpg", "golden_silence_3.jpg"],
      price: 1500.00,
      types: ["Minimal", "Luxury"],
      instaVideoLink: "https://www.instagram.com/reel/gld789",
      framed: true,
      created_at: "2024-08-02T09:00:00Z",
      availability: "Reserved",
      stock_quantity: 1,
      featured: true
    },
    {
      id: 4,
      title: "Ocean’s Whisper",
      medium: "Watercolor on Paper",
      size: "24x18",
      description: "Soft water tones and delicate gradients capture the peaceful movement of ocean waves.",
      mainImage: "ocean_whisper_main.jpg",
      images: ["ocean_whisper_1.jpg", "ocean_whisper_2.jpg"],
      price: 850.75,
      types: ["Nature", "Watercolor"],
      instaVideoLink: "https://www.instagram.com/reel/ocn234",
      framed: false,
      created_at: "2024-02-10T14:15:00Z",
      availability: "Available",
      stock_quantity: 2,
      featured: false
    },
    {
      id: 5,
      title: "Crimson Dreams",
      medium: "Acrylic on Canvas",
      size: "72x36",
      description: "A bold, striking artwork with deep reds and abstract shapes that ignite emotion.",
      mainImage: "crimson_dreams_main.jpg",
      images: ["crimson_dreams_1.jpg", "crimson_dreams_2.jpg"],
      price: 1750.99,
      types: ["Abstract", "Contemporary"],
      instaVideoLink: "https://www.instagram.com/reel/crm555",
      framed: true,
      created_at: "2024-09-18T11:20:00Z",
      availability: "Available",
      stock_quantity: 1,
      featured: true
    }
  ];
}


export function fetchCart() {
  // comes from an api 
  return [
    { id: 1, title: "Whispers of Banaras", shortDsc: "Acrylic on Canvas - 89x24", price: 1110.75, quantity: 1, img: "https://placehold.co/800?text=Hello+World&font=roboto" },
    { id: 2, title: "Mountain Serenity", shortDsc: "Oil on Canvas - 30x40", price: 71111.77, quantity: 1, img: "https://via.placeholder.com/80" },
    { id: 3, title: "Urban Reflections", shortDsc: "Mixed Media - 20x24", price: 1150, quantity: 1, img: "https://via.placeholder.com/80" },
    { id: 4, title: "Romy Trousers", shortDsc: "Portrait on Canvas - 30x40", price: 2150, quantity: 1, img: "https://via.placeholder.com/80" },
    { id: 5, title: "Renname", shortDsc: "Renname on Canvas - 30x40", price: 5000, quantity: 1, img: "https://via.placeholder.com/80" },
  ]

}