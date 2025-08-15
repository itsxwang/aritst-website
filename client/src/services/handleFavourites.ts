const favouritesId : string[] = JSON.parse(localStorage.getItem("favourites") || "[]");

export function addToFavourites(artworkId: string) {
    favouritesId.push(artworkId);
    localStorage.setItem("favourites", JSON.stringify(favouritesId));
}

export function removeFromFavourites(artworkId: string) {
    favouritesId.splice(favouritesId.indexOf(artworkId), 1);
    localStorage.setItem("favourites", JSON.stringify(favouritesId));
}

export function getFavourites(): string[] {
    return favouritesId;
}

export function isFavourite(artworkId: string): boolean {
    return favouritesId.includes(artworkId);
}