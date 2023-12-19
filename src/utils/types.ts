export interface UserInterface {
    id: number,
    name: string,
    picture: {
        height: number,
        width: number,
        is_silhouette: boolean,
        url: string
    }
}