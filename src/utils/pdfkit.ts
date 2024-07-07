import PDFDocument from "pdfkit-table";

interface Row {
  [key: string]: any;
}

class PdfKit {
  columns: string[];
  rows: Row[];
  titulo: string;

  constructor(columns: string[], rows: Row[], titulo: string) {
    this.columns = columns;
    this.rows = rows;
    this.titulo = titulo;
  }

  buildpdf(dataCallback: (chunk: Buffer) => void, endCallback: () => void): void {
    const doc = new PDFDocument();

    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    // agregar titulo
    doc.fontSize(20).text(this.titulo, { align: "center" });
    doc.moveDown();

    // definiendo el cuerpo de la tabla
    const table = {
      headers: this.columns,
      rows: this.rows.map((row) =>
        this.columns.map((col) => (row[col] !== null && row[col] !== undefined ? row[col] : ""))
      ),
    };

    // agregndo la tabla
    doc.table(table, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(9),
      prepareRow: (row, i) => doc.font("Helvetica").fontSize(8),
    });

    doc.end();
  }
}

export default PdfKit;
