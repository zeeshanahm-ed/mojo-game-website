import React from 'react';

interface TableColumn {
    key: string;
    header: string;
    width?: string;
}

export interface CommissionData {
    date?: string;
    category?: string;
    totalUsage?: string;
    commissionEarned?: string;
    purchaseDate?: string;
    gamePack?: string;
    discount?: string;
    packPrice?: string;
}

interface DynamicTableProps {
    title: string;
    subtitle?: string;
    columns: TableColumn[];
    data: CommissionData[];
    className?: string;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
    title,
    subtitle,
    columns,
    data,
    className = ""
}) => {
    return (
        <div className={`font-secondary ${className}`}>
            {/* Header */}
            <div className="py-6 px-4 md:px-10 border-b border-black">
                <h2 className="md:text-4xl text-xl font-semibold">{title}</h2>
                {subtitle && (
                    <p className="text-sm mt-2 text-gray-600">{subtitle}</p>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full">
                    <thead>
                        <tr className="border-b border-black">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-5 w-1/4 text-left font-medium text-dark-gray ${column.width || ''}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((row: CommissionData, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 text-base  w-1/4">
                                    {'purchaseDate' in row ? row.purchaseDate : row.date || '-'}
                                </td>
                                <td className="px-6 py-4 text-base  w-1/4">
                                    {row.gamePack || row.category || '-'}
                                </td>
                                <td className="px-6 py-4 text-base  w-1/4">
                                    {row.discount || row.totalUsage || '-'}
                                </td>
                                <td className="px-6  py-4 w-1/4 text-base ">
                                    <span className='flex gap-3 items-baseline'> {row.packPrice && <p className='!text-sm text-light-gray'>SAR</p>} {row.packPrice || row.commissionEarned || '-'}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DynamicTable;