import {User} from "./User";

export interface Seller extends User{
}
export interface Buyer extends User{

}

export interface Services {
    id: string
    price: number
    seller: Seller,
    title: string
    createdAt: string,
    description: string
}
