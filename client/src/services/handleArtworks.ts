export type Artwork = {
  _id: string;
  title: string;
  medium: string;
  dimensions: string;
  description: string;
  mainImage: string;
  images: string[];
  price: number;
  types: string[];
  instaVideoLink: string;
  framed: "Yes" | "No" | "On Request";
  created_at: string;
  availability: "Available" | "Reserved" | "Sold";
  stock_quantity: number;
  featured: boolean;
  isPrintsAvailable: boolean;
};

export async function fetchAllArtoworks(): Promise<Artwork[]> {

  return await fetch('http://localhost:7001/api/artworks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) =>
    res.json()
  ).then((data) => data);

}

export async function fetchArt(id: string) {
  return fetchAllArtoworks().then((artoworks) => artoworks.find((art) => art._id === id));
}



export function removeArtowork(id: string) {
  const updatedArtoworks = fetchAllArtoworks().then((artoworks) => artoworks.filter((art) => art._id !== id));
  localStorage.setItem('artoworks', JSON.stringify(updatedArtoworks));
}

export function updateArtwork(_id: string, artwork: Artwork) {
  return fetch('http://localhost:7001/api/artworks', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _id,
      artwork,
    }),
  })
}