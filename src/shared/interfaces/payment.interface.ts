import {TransactionType} from "./transaction-type.interface.ts";
import {TransactionStatus} from "./transaction-status.interface.ts";

export interface Payment {
    email: string;
    type: TransactionType;
    amount: number;
    currency: string;
    status: TransactionStatus;
    description: string | null;
    transactionReference: string;
    createdAt: Date,
}