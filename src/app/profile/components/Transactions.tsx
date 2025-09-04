import React from 'react'
import DynamicTable, { CommissionData } from './Table';


interface TableColumn {
    key: string;
    header: string;
    width?: string;
}

// Sample data and usage examples
const transactionData: CommissionData[] = [
    {
        purchaseDate: '02/03/2025',
        product: 'Subscription plan',
        paymentType: 'Card payment',
        price: '1.5',
        renewalDate: '03/03/2025',
    },
    {
        purchaseDate: '02/03/2025',
        product: 'Subscription plan',
        paymentType: 'Card payment',
        price: '1.5',
        renewalDate: '03/03/2025',
    },
    {
        purchaseDate: '02/03/2025',
        product: 'Subscription plan',
        paymentType: 'Card payment',
        price: '1.5',
        renewalDate: '03/03/2025',
    },
    {
        purchaseDate: '02/03/2025',
        product: 'Subscription plan',
        paymentType: 'Card payment',
        price: '1.5',
        renewalDate: '03/03/2025',
    }
];


const transactionColumns: TableColumn[] = [
    { key: 'purchaseDate', header: 'purchaseDate' },
    { key: 'product', header: 'product' },
    { key: 'paymentType', header: 'paymentType' },
    { key: 'renewalDate', header: 'renewalDate' },
    { key: 'packPrice', header: 'packPrice' }
];

function TransactionsContent() {
    return (
        <div>
            <DynamicTable
                title="billingOfSubscriptions"
                columns={transactionColumns}
                data={transactionData}
            />
        </div>
    )
}

export default TransactionsContent;