/**
 * @copyright Created by @RUSHIKESH PATIL
 */

import { useRef, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import InputSection from './components/InputSection';
import TableOutput from './components/TableOutput';
import { buildTableHtml, formatCell, parseTableInput } from './utils/tableUtils';

function App() {
  const [input, setInput] = useState('');
  const [tableData, setTableData] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const tableRef = useRef(null);

  const convertToTable = () => {
    setTableData(parseTableInput(input));
  };

  const copyTable = async () => {
    if (!tableRef.current || !tableData.length) {
      return;
    }

    try {
      const tableHTML = buildTableHtml(tableData);

      const blob = new Blob([tableHTML], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({
        'text/html': blob,
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
    <div className="flex min-h-screen flex-col items-center bg-white px-4 py-8">
      <div className="w-full max-w-3xl">
        <Header />

        <InputSection
          input={input}
          onInputChange={setInput}
          onConvert={convertToTable}
        />

        <TableOutput
          tableData={tableData}
          copySuccess={copySuccess}
          onCopy={copyTable}
          formatCell={formatCell}
          tableRef={tableRef}
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;