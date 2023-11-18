import React from 'react'
import styles from "./GetStartdedSection.module.css"

const GetstartedSection = () => {
  return (
    <div className={styles.container}>
        <div className={styles.innerContainer}>
            <h1>Begin your Generative AI journey with <br />your data.</h1>
            <button>Get started -{">"}</button>

        </div>
    </div>
  )
}

export default GetstartedSection