import React from 'react'
import DynamicTable from './Table';

// Types for the table data
interface CommissionData {
  date: string;
  category: string;
  totalUsage: string;
  commissionEarned: string;
}

interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

// Sample data and usage examples
const commissionData: CommissionData[] = [
  {
    date: '02/03/2025',
    category: 'Wrestling',
    totalUsage: '15%',
    commissionEarned: '02 Credit'
  },
  {
    date: '02/03/2025',
    category: 'Mixed Martial Arts',
    totalUsage: '10%',
    commissionEarned: '01 Credits'
  },
  {
    date: '02/03/2025',
    category: 'Football',
    totalUsage: '13%',
    commissionEarned: '0 Credits'
  }
];


const CommissionsColumns: TableColumn[] = [
  { key: 'dated', header: 'Dated' },
  { key: 'category ', header: 'Category' },
  { key: 'totalUsage', header: 'Total usage' },
  { key: 'comissionEarned', header: 'Comission Earned' }
];

function CommissionsContent() {
  return (
    <div>
      <DynamicTable
        title="Commissions on your suggestions"
        subtitle='you will get the credits as a commission on your categories usage '
        columns={CommissionsColumns}
        data={commissionData}
      />
    </div>
  )
}

export default CommissionsContent;