import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (inventory) => {
  const doc = new jsPDF();

  // Add Title and Header info
  doc.setFontSize(18);
  doc.text('StockSync - Inventory Report', 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

  // Define the table columns
  const tableColumn = ["ID", "Item Name", "Category", "Quantity", "Price", "Location"];
  
  // Map the data from your MySQL inventory state
  const tableRows = inventory.map(item => [
    item.id,
    item.name,
    item.category,
    item.quantity,
    `$${item.price}`,
    item.location
  ]);

  // Generate the table
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 35,
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] }, // Match your blue UI theme
  });

  // Save the PDF
  doc.save(`StockSync_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};