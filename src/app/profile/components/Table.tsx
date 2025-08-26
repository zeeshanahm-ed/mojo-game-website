import React from 'react';
import { useTranslation } from 'react-i18next';

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
    price?: string;
    product?: string;
    renewalDate?: string;
    paymentType?: string;
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
    const { t } = useTranslation();
    return (
        <div className={`font-secondary ${className}`}>
            {/* Header */}
            <div className="py-6 px-4 md:px-10 border-b border-black">
                <h2 className="md:text-4xl text-xl font-semibold">{t(title)}</h2>
                {subtitle && (
                    <p className="text-sm mt-2 text-gray-600">{t(subtitle)}</p>
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
                                    className={`px-6 py-5 capitalize flex-1 text-left font-medium text-dark-gray ${column.width || ''}`}
                                >
                                    {t(column.header)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((row: CommissionData, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 text-base  flex-1">
                                    {'purchaseDate' in row ? row.purchaseDate : row.date || '-'}
                                </td>
                                <td className="px-6 py-4 text-base  flex-1">
                                    {row.product || row.category || '-'}
                                </td>
                                <td className="px-6 py-4 text-base  flex-1">
                                    {row.paymentType || row.totalUsage || '-'}
                                </td>
                                {row.renewalDate &&
                                    <td className="px-6 py-4 text-base  flex-1">
                                        {row.renewalDate || '-'}
                                    </td>}
                                <td className="px-6  py-4 flex-1 text-base ">
                                    <span className='flex gap-3 items-baseline'> {row.price && <p className='!text-sm text-light-gray'>SAR</p>} {row.price || row.commissionEarned || '-'}</span>
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