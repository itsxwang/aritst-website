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
  framed: string;
  created_at: string;
  availability: string;
  stock_quantity: number;
  featured: boolean;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchAllArtoworks(): Promise<Artwork[]> {

  return await fetch(`${BACKEND_URL}/api/artworks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) =>
    res.json()
  ).then((data) => data);

}

export function fetchArt(id: string) {
  return fetchAllArtoworks().then((artoworks) => artoworks.find((art) => art._id === id));
}



export function removeArtowork(id: string) {
  const updatedArtoworks = fetchAllArtoworks().then((artoworks) => artoworks.filter((art) => art._id !== id));
  localStorage.setItem('artoworks', JSON.stringify(updatedArtoworks));
}

export function updateArtwork(_id: string, artwork: Artwork) {
  return fetch(`${BACKEND_URL}/api/artworks`, {
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