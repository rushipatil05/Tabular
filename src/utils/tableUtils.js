export const parseTableInput = (input) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
        return [];
    }

    const rows = trimmedInput.split('\n');

    return rows
        .map((row) => {
            if (row.includes('|')) {
                return row
                    .split('|')
                    .map((cell) => cell.trim())
                    .filter((cell) => cell !== '');
            }

            return row.split('\t').map((cell) => cell.trim());
        })
        .filter((row) => !row.every((cell) => /^-+$/.test(cell)));
};

export const formatCell = (text) => {
    if (!text) {
        return '';
    }

    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

    return formatted;
};

export const buildTableHtml = (tableData) => {
    if (!tableData.length) {
        return '';
    }

    return `
    <table style="border-collapse: collapse; width: 100%; border: 1px solid #000;">
      <thead>
        <tr>
          ${tableData[0]
            .map(
                (header) => `
<th style="border: 2px solid #000; padding: 8px; background-color: #f9fafb; font-weight: bold; text-transform: uppercase;">
  ${formatCell(header)}
</th>
`
            )
            .join('')}
        </tr>
      </thead>
      <tbody>
        ${tableData
            .slice(1)
            .map(
                (row) => `
            <tr>
              ${row
                        .map(
                            (cell) => `
<td style="border: 2px solid #000; padding: 8px;">
  ${formatCell(cell)}
</td>
`
                        )
                        .join('')}
            </tr>
          `
            )
            .join('')}
      </tbody>
    </table>
  `;
};
