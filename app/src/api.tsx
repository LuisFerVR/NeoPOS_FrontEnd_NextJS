import { TransactionsResponseSchema } from "./schemas";

export async function getSalesByDate( date: string) {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api?transactionDate=${date}`;
    const req = await fetch(url);
    console.log('Fetching sales data:', req);
    const res = await req.json();
    const transactions = TransactionsResponseSchema.parse(res);
    console.log('Transactions:', transactions);
    return transactions;
}