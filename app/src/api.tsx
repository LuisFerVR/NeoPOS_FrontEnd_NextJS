import { TransactionsResponseSchema } from "./schemas";

export async function getSalesByDate( date: string) {
    const url = `/api/sales?transactionDate=${date}`;
    const req = await fetch(url);
    const res = await req.json();
    const transactions = TransactionsResponseSchema.parse(res);
    console.log('Transactions:', transactions);
    return transactions;
}