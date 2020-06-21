import {Seller, Buyer, Services} from "./Services";
import {Dataset} from "./Dataset";

export interface UserHistory {
    id: string
    purchaseDate: string
    seller: Seller
    buyer: Buyer
    dataset: Dataset
    service: Services
    comment: any
}
