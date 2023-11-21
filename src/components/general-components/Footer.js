import React from 'react'
import classes from './Footer.module.css'
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className={classes.container}>
        <div className={classes.innercontainer}>
            <div className={classes.one}>
                <hr className={classes.line1}></hr>
                <div className={classes.logo_full}>
                    <section className={classes.logo}>
                        <div className={`${classes.first} `}></div>
                        <div className={`${classes.second}`}></div>
                        <div className={`${classes.third} `}></div>
                    </section>
                    <p>OfficeGPT</p>
                </div>
                <ul className={classes.list}>
                    <li>Product</li>
                    <li>Solution</li>
                    <li>Pricing</li>
                    <li>Resources</li>
                    <li>Partners</li>
                </ul>
                <div className={classes.social}>
                    <FaLinkedin />
                    <FaXTwitter />
                </div>
            </div>
            <div className={classes.two}>
                <hr className={classes.line2}></hr>
                <p> &copy; 2023 OfficeGPT. All rights reserved.</p>
            </div>
        </div>
    </div>
  )
}

export default Footer