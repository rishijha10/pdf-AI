// import React from "react";
import styles from "./Trial.module.css";
import pdfFile from "../../assets/zz.pdf";
import React from "react";
import { IoIosSend } from "react-icons/io";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// const Trial = () => {
//   return (
//     <div className={styles.container}>
//       {/* <Document file={pdfFile}>
//         <Page pageNumber={1} />
//       </Document> */}
//       <div className={styles.inner}>
//         <iframe src={pdfFile} width="100%" height="100%"></iframe>
//       </div>
//     </div>
//   );
// };

// export default Trial;

// Create Document Component
// const Trial = () => (
//   <div className={styles.container}>
//     <div className={styles.inner}>
//        <PDFViewer style={{ marginTop: "90px" }}>
//      <Document file={pdfFile}>
//        <Page size="A4" style={styles.page}>
//        </Page>
//      </Document>
//   </PDFViewer>
//     </div>
//   </div>
// );
// export default Trial;

const Trial = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.innerLeft}>
          <iframe width={"100%"} height={"100%"} src={pdfFile} />
        </div>
        <div className={styles.innerRight}>
          <section className={styles.upperSection}></section>
          <section className={styles.lowerSection}>
            <form className={styles.promptForm}>
              <IoIosSend className={styles.sendIcon} />
              <input placeholder="Enter your question (max 1,000 words)" />
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Trial;
