import React from "react";
import styles from "./ThreeBox.module.css";
import boxImg1 from "./../../assets/boximg1.png";
import boxImg2 from "./../../assets/boximg2.png";
import boxImg3 from "./../../assets/boximg3.png";
const ThreeBox = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.left}>
          <div className={styles.upBox} data-aos="fade-up" data-aos-once="true">
            <h1>1. Easily Upload your PDF</h1>
            <p>
              Drag and drop or just upload your PDF from your <br />
              computer anything up to 50MB – and let our software <br />
              start its wizardry! When your document has uploaded you <br />
              are ready to chat with the PDF AI reader.
            </p>
            <img src={boxImg1}></img>
          </div>
          <div className={styles.downBox} data-aos="fade-up" data-aos-once="true">
            <h1>3. Cite the Source of Information</h1>
            <p>
              Without needing to rescan the whole <br />
              document again, you chat to the PDF and <br />
              ask for the sources of its answers. The AI <br />
              PDF reader will link straight to the page of <br />
              the answer making your citation process a <br />
              piece of cake!
            </p>
            <img src={boxImg2}></img>

          </div>
        </div>

        <div className={styles.right} data-aos="fade-up" data-aos-once="true">
          <h1>2. Ask Questions, Get Answers</h1>

          <p>
            Start your chat with the PDF. Our AI PDF reader <br />
            understands your simple language questions and scans the <br />
            document finding answers to your questions without you <br />
            having to manually search the document yourself. Ask more
            <br />
            questions and the AI PDF reader will find the answers you <br />
            need.
          </p>
          <img src={boxImg3}></img>

        </div>
      </div>
    </div>
  );
};

export default ThreeBox;
