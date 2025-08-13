const favouritesId : number[] = JSON.parse(localStorage.getItem("favourites") || "[]");

export function addToFavourites(artworkId: number) {
    favouritesId.push(artworkId);
    localStorage.setItem("favourites", JSON.stringify(favouritesId));
}

export function removeFromFavourites(artworkId: number) {
    favouritesId.splice(favouritesId.indexOf(artworkId), 1);
    localStorage.setItem("favourites", JSON.stringify(favouritesId));
}

export function getFavourites(): number[] {
    return favouritesId;
}

export function isFavourite(artworkId: number): boolean {
    return favouritesId.includes(artworkId);
}