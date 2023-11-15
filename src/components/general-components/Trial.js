// import React from "react";
// import styles from "./Trial.module.css";
import pdfFile from "../../assets/zz.pdf";
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
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const Trial = () => (
  // <div className={styles.container}>
  //   <div className={styles.inner}>
  <PDFViewer style={{ marginTop: "90px" }}>
    <Document file={pdfFile}>
      <Page size="A4" style={styles.page}>
        {/* <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View> */}
      </Page>
    </Document>
  </PDFViewer>
  //   </div>
  // </div>
);
export default Trial;
