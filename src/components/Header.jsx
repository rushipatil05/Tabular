import { Table as TableIcon } from 'lucide-react';

function Header() {
    return (
        <div className="mb-6 text-center">
            <TableIcon className="mx-auto mb-3 h-8 w-8 text-blue-600" />
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Table Converter</h1>
            <p className="text-sm text-gray-600">
                Transform your tab-separated table data into a beautifully formatted
                table with just one click
            </p>
        </div>
    );
}

export default Header;
