export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-es', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}