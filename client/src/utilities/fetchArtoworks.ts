

export function fetchAllArtoworks() {
    // come from an api
    return [
    {
      id: 1,
      title: "Whispers of Banaras",
      shortDsc: "Acrylic on Canvas - 89x24",
      description: "...",
      price: "42,000",
      image: "https://via.placeholder.com/600x400?text=Whispers+of+Banaras",
      types: ["acrylic", "canvas"],
    },
    {
      id: 2,
      title: "Mountain Serenity",
      shortDsc: "Oil on Canvas - 30x40",
      description: "...",
      price: "1,80,000",
      image: "https://via.placeholder.com/600x400?text=Mountain+Serenity",
      types: ["abstract", "canvas"],
    },
    {
      id: 3,
      title: "Urban Reflections",
      shortDsc: "Mixed Media - 20x24",
      description: "...",
      price: "95,000",
      image: "https://via.placeholder.com/600x400?text=Urban+Reflections",
      types: ["portrait"],
    },
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