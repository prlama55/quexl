import {Buyer, Seller} from "./Services";

export interface  Dataset {
    id: string,
    dataFormat :string,
    dataString : string
    buyer: Buyer,
    createdAt: string,
}

