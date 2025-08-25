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
    { key: 'purchaseDate', header: 'Purchase Date' },
    { key: 'product', header: 'Product' },
    { key: 'paymentType', header: 'Payment Type' },
    { key: 'renewalDate', header: 'Renewal Date' },
    { key: 'packPrice', header: 'Pack Price' }
];

function TransactionsContent() {
    return (
        <div>
            <DynamicTable
                title="Transaction history"
                columns={transactionColumns}
                data={transactionData}
            />
        </div>
    )
}

export default TransactionsContent;