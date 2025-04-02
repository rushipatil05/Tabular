/**
 * @copyright Created by @RUSHIKESH PATIL
 */

import React, { useState, useRef } from 'react';
import { Table as TableIcon, ClipboardCopy, Linkedin } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const [tableData, setTableData] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const tableRef = useRef(null);

  const convertToTable = () => {
    if (!input.trim()) return;
    
    const rows = input.trim().split('\n');
    const data = rows.map(row => row.split('\t'));
    setTableData(data);
  };

  const copyTable = async () => {
    if (!tableRef.current || !tableData.length) return;

    try {
      const tableHTML = `
        <table style="border-collapse: collapse; width: 100%; border: 1px solid #000;">
          <thead>
            <tr>
              ${tableData[0].map(header => `
                <th style="border: 2px solid #000; padding: 8px; background-color: #f9fafb; font-weight: bold; text-transform: uppercase;">
                  ${header}
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${tableData.slice(1).map(row => `
              <tr>
                ${row.map(cell => `
                  <td style="border: 2px solid #000; padding: 8px;">
                    ${cell}
                  </td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      const blob = new Blob([tableHTML], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({
        'text/html': blob
      });
      
      await navigator.clipboard.write([clipboardItem]);
      
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy table:', err);
      alert('Failed to copy table to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-6">
          <TableIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Table Converter
          </h1>
          <p className="text-sm text-gray-600">
            Transform your tab-separated table data into a beautifully formatted table with just one click
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 pb-2">
              <label className="block text-sm text-gray-700 mb-2">
                Paste your tab-separated values here:
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-[180px] p-3 text-gray-900 placeholder-gray-400 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 font-mono text-sm resize-none"
                placeholder="Example:\nHeader 1\tHeader 2\tHeader 3\nValue 1\tValue 2\tValue 3"
              />
            </div>
            <div className="px-4 pb-4">
              <button
                onClick={convertToTable}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <TableIcon className="w-4 h-4 mr-2" />
                Convert to Table
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        {tableData.length > 0 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-medium text-gray-900">
                  Generated Table: Copy the generated table and paste it into the Word file.
                </h2>
                <button
                  onClick={copyTable}
                  className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                    copySuccess
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  <ClipboardCopy className="w-4 h-4 mr-1.5" />
                  {copySuccess ? 'Copied!' : 'Copy Table'}
                </button>
              </div>
            </div>
            <div className="p-4 overflow-x-auto">
              <table ref={tableRef} className="w-full border-collapse">
                <thead>
                  <tr>
                    {tableData[0]?.map((header, i) => (
                      <th
                        key={i}
                        className="px-4 py-2 text-left font-bold text-gray-900 border border-gray-300 bg-gray-50"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.slice(1).map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="px-4 py-2 text-gray-700 border border-gray-300"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Connect with me:</p>
          <a
            href="https://linkedin.com/in/rushikesh-patil-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;