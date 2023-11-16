import React from 'react'
import styles from './ThreeBox.module.css'
const ThreeBox = () => {
  return (
    <div className={styles.container}>
        <div className={styles.innerContainer}>
        <div className={styles.left}> 
       <div className={styles.upBox}>
        <h1>
            1. Easily Upload your PDF
        </h1>
        <p>
        Drag and drop or just upload your PDF from your <br/>computer  anything up to 50MB – and let our software <br/>start its wizardry! When your document has uploaded you <br/>are ready to chat with the PDF AI reader.
        </p>
       </div>
       <div className={styles.downBox}></div>
       </div>


       <div className={styles.right}></div>

        </div>
    </div>
  )
}

export default ThreeBox