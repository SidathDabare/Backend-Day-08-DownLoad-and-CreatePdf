/** @format */

import PdfPrinter from "pdfmake"
// Define font files

export const getPDFReadableStream = (products) => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  }

  const printer = new PdfPrinter(fonts)

  const docDefinition = {
    // content: booksArray.map(book => {
    //   return {
    //     text: `${book.title} - ${book.category}`,
    //     style: "header",
    //   }
    // }),
    content: [
      {
        text: `${products.name}`,
        style: "header",
      },
      {
        text: `${products.brand}`,
        style: "header",
      },
      {
        text: `${products.category}`,
        style: "header",
      },
      {
        text: `${products.price}`,
        style: "subheader",
      },
      {
        text: `${products.description}`,
        style: "small",
      },
      //   {
      //     image: `${products.imageUrl}`,
      //     style: "subheader",
      //   },
    ],

    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      quote: {
        italics: true,
      },
      small: {
        fontSize: 8,
      },
    },
  }
  // export const getPDFReadableStream = (booksArray) => {
  //   const fonts = {
  //     Roboto: {
  //       normal: "Helvetica",
  //       bold: "Helvetica-Bold",
  //     },
  //   }

  //   const printer = new PdfPrinter(fonts)

  //   const tableContent = [
  //     ["TITLE", "CATEGORY" ],
  //     ...booksArray.map((book) => {
  //       return [book.name, book.category]
  //     }),
  //   ]

  //   console.log(tableContent)

  //   const docDefinition = {
  //     // content: booksArray.map(book => {
  //     //   return {
  //     //     text: `${book.title} - ${book.category}`,
  //     //     style: "header",
  //     //   }
  //     // }),
  //     content: [
  //       {
  //         style: "tableExample",
  //         table: {
  //           body: tableContent,
  //         },
  //       },
  //     ],

  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //       },
  //       subheader: {
  //         fontSize: 15,
  //         bold: true,
  //       },
  //     },
  //   }

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {})
  pdfReadableStream.end()

  return pdfReadableStream
}
