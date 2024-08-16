import React from "react";

import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div>
      <div className="footersss">
        <div className="revnitroFooter">
          <div className="footersection1">
            <div>
              <img src="/images/Group 26.png" alt="footer-logo" />
              <div className="copyrightssection">
                <div className="copyrightsflex">
                  <span>&nbsp;&nbsp;2024 Revnitro - All rights reserved</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footersection2">
            <div className="headingdiv">
              <a href="https://revnitro.com/">Company</a>
            </div>
            <div className="footercontents">
              <a href="https://revnitro.com/team.html">Team</a>
            </div>
            <div className="footercontents">
              <a href="https://revnitro.com/">Revnitro shop</a>
            </div>
            <div className="footercontents">
              <Link to="/Contact">Contact Us</Link>
            </div>
            <div className="footercontents">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://forum.revnitro.com/LoginPage"
              >
                Account
              </a>
            </div>
          </div>
          <div className="footersection3">
            <div className="headingdiv">
              <a href="https://revnitro.com/">Resources</a>
            </div>
            <div className="footercontents">
              <Link to="https://revnitro.com/vehicle-purchase-consultation.html">
                Vehicle Consultation
              </Link>
            </div>
            <div className="footercontents">
              <Link to="/BusinessCollabration">Business Collaboration</Link>
            </div>
          </div>
          <div className="footersection4">
            <div className="headingdiv">
              <a href="https://revnitro.com/">Social</a>
            </div>
            <div className="footercontents">
              <a
                href="https://www.instagram.com/revnitro_official/?hl=en"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
            <div className="footercontents">
              <a
                href="https://www.instagram.com/revnitro_official/?hl=en"
                target="_blank"
                rel="noreferrer"
              >
                Threads
              </a>
            </div>
            <div className="footercontents">
              <a
                href="https://www.facebook.com/p/RevNitro-100064120381674/"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
