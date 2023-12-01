import React from "react";
import styles from "./SecuritySection.module.css";
import { IoDocumentLockOutline } from "react-icons/io5";
import { BsDatabaseLock } from "react-icons/bs";
import { RiChatPrivateLine } from "react-icons/ri";
const SecuritySection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div
          className={styles.threeCards}
          data-aos="fade-right"
          data-aos-once="true"
          data-aos-duration="1000"
        >
          <IoDocumentLockOutline className={styles.icon} />
          <hr className={styles.hrLine} />
          <h1>Robust Document Encryption:</h1>
          <p>
            OfficeGPT uses advanced encryption to secure PDFs. Documents are
            protected during storage and transmission, restricting access to
            authorized users.
          </p>
        </div>
        <div
          className={styles.threeCards}
          data-aos="fade-right"
          data-aos-once="true"
          data-aos-delay="50"
          data-aos-duration="1000"
        >
          <BsDatabaseLock className={styles.icon} />
          <hr className={styles.hrLine} />
          <h1>End-to-End Data Integrity:</h1>
          <p>
            OfficeGPT maintains data integrity, prevents changes. Trust
            accurate, unaltered information, emphasizing our commitment to
            end-to-end security.
          </p>
        </div>
        <div
          className={styles.threeCards}
          data-aos="fade-right"
          data-aos-once="true"
          data-aos-delay="100"
          data-aos-duration="1000"
        >
          <RiChatPrivateLine className={styles.icon} />
          <hr className={styles.hrLine} />
          <h1>Privacy Controls For Chat Interactions:</h1>
          <p>
            OfficeGPT's chat ensures privacy. Designed for sensitive
            information, you control shared details, ensuring secure,
            confidential communication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
