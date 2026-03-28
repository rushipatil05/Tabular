import { ClipboardCopy } from 'lucide-react';

function TableOutput({ tableData, copySuccess, onCopy, formatCell, tableRef }) {
    if (!tableData.length) {
        return null;
    }

    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
            <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">
                        Generated Table: Copy the generated table and paste it into the Word
                        file.
                    </h2>
                    <button
                        onClick={onCopy}
                        className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${copySuccess
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            }`}
                    >
                        <ClipboardCopy className="mr-1.5 h-4 w-4" />
                        {copySuccess ? 'Copied!' : 'Copy Table'}
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto p-4">
                <table ref={tableRef} className="w-full border-collapse">
                    <thead>
                        <tr>
                            {tableData[0]?.map((header, index) => (
                                <th
                                    key={index}
                                    className="border border-gray-300 bg-gray-50 px-4 py-2 text-left font-bold text-gray-900"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="border border-gray-300 px-4 py-2 text-gray-700"
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{ __html: formatCell(cell) }}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableOutput;
