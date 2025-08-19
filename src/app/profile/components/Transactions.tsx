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
        gamePack: 'Games Pack 05',
        discount: '10%',
        packPrice: '1.5'
    },
    {
        purchaseDate: '02/03/2025',
        gamePack: 'Games Pack 03',
        discount: '15%',
        packPrice: '1.5'
    },
    {
        purchaseDate: '02/03/2025',
        gamePack: 'Games Pack 05',
        discount: '-',
        packPrice: '0.0'
    },
    {
        purchaseDate: '02/03/2025',
        gamePack: 'Games Pack 03',
        discount: '15%',
        packPrice: '1.5'
    }
];


const transactionColumns: TableColumn[] = [
    { key: 'purchaseDate', header: 'Purchase Date' },
    { key: 'gamePack', header: 'Game Pack' },
    { key: 'discount', header: 'Discount' },
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