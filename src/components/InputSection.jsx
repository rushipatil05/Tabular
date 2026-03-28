import { Table as TableIcon } from 'lucide-react';

function InputSection({ input, onInputChange, onConvert }) {
    return (
        <div className="mb-8">
            <div className="overflow-hidden rounded-xl bg-white shadow-md">
                <div className="p-4 pb-2">
                    <label className="mb-2 block text-sm text-gray-700">
                        Paste your tab-separated values here:
                    </label>
                    <textarea
                        value={input}
                        onChange={(event) => onInputChange(event.target.value)}
                        className="h-[180px] w-full resize-none rounded-lg border-2 border-gray-200 p-3 font-mono text-sm text-gray-900 placeholder-gray-400 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="Example:\nHeader 1\tHeader 2\tHeader 3\nValue 1\tValue 2\tValue 3"
                    />
                </div>
                <div className="px-4 pb-4">
                    <button
                        onClick={onConvert}
                        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <TableIcon className="mr-2 h-4 w-4" />
                        Convert to Table
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InputSection;
