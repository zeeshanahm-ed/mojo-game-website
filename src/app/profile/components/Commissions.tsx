import React from 'react'
import DynamicTable, { CommissionData } from './Table';

// Types for the table 

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
  { key: 'date', header: 'date' },
  { key: 'category', header: 'category' },
  { key: 'totalUsage', header: 'totalUsage' },
  { key: 'comissionEarned', header: 'commissionEarned' }
];

function CommissionsContent() {
  return (
    <div>
      <DynamicTable
        title="commissionsOnSuggestions"
        subtitle='commissionNote'
        columns={CommissionsColumns}
        data={commissionData}
      />
    </div>
  )
}

export default CommissionsContent;