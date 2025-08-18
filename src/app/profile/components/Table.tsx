import React from 'react';

interface TableColumn {
    key: string;
    header: string;
    width?: string;
}

interface DynamicTableProps {
    title: string;
    subtitle?: string;
    columns: TableColumn[];
    data: any[];
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
            <div className="p-6 border-b border-black">
                <h2 className="text-4xl font-semibold  mb-1">{title}</h2>
                {subtitle && (
                    <p className="text-sm text-gray-600">{subtitle}</p>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-black">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-5 text-left font-medium text-dark-gray ${column.width || ''}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 text-base text-gray-900">
                                    {row.purchaseDate || '-'}
                                </td>
                                <td className="px-6 py-4 text-base text-gray-900">
                                    {row.gamePack || '-'}
                                </td>
                                <td className="px-6 py-4 text-base text-gray-900">
                                    {row.discount || '-'}
                                </td>
                                <td className="px-6 py-4 text-base text-gray-900">
                                    {row.packPrice || '-'}
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