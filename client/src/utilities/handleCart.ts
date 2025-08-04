import { fetchArt } from "./handleArtoworks";


type CartType = {
  id: number,
  title: string,
  medium: string,
  dimensions: string,
  price: number,
  quantity: number,
  mainImage: string,
  stock_quantity: number
}


export function addToCart(id: number, quantity: number) {
  const cart: CartType[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const { title, medium, dimensions, price, mainImage, stock_quantity } = fetchArt(id)!;



  const existingItem = cart.findIndex((item: CartType) => item.id === id);
    console.log(quantity)

  if (existingItem !== -1) {
    console.log(cart.find((item: CartType) => item.id === id), ';');
    cart[existingItem].quantity += quantity;
  }
  
  else {
    cart.push({ id, title, medium, dimensions, price, quantity, mainImage, stock_quantity });

  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(id: number, quantity: number | undefined = undefined) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (!quantity) {
    cart.splice(cart.indexOf(id), 1);
  }
  else {
    cart.find((item: CartType) => item.id === id)!.quantity -= quantity;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function fetchCart(): CartType[] {
  // comes from an api 
  console.log(JSON.parse(localStorage.getItem('cart') || '[]'));
  return JSON.parse(localStorage.getItem('cart') || '[]');

}