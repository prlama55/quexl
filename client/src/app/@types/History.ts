import {Buyer, Seller, Service} from "./Services";
import {Dataset} from "./Dataset";
import {User} from "./User";
export interface HistoryElement {
    historyId: string
    status: string
    buyer: Buyer
    comments: Comment[]
    comment?: string
    outputDataset?: string
    dataset: Dataset
    histories: HistoryElement[]
    id: string
    purchaseDate: string
    seller: Seller
    service: Service
}
export interface Comment {
    comment: string
    commentedBy: User
    dataset: Dataset
    historyId: string
    id: string
    service: Service
    updatedDate: string
}
export interface UserHistory {
    buyerHistory: HistoryElement[]
    sellerHistory: HistoryElement[]
}
