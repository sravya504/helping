import React, { useState } from 'react';
import './Donation.css';

function Donation() {
  const [copyText, setCopyText] = useState('Copy UPI ID');
  const [copyClass, setCopyClass] = useState('');

  const copyUpiId = () => {
    navigator.clipboard.writeText('helpinghandsrgukt@sbi').then(() => {
      setCopyText('Copied!');
      setCopyClass('copied');
      setTimeout(() => {
        setCopyText('Copy UPI ID');
        setCopyClass('');
      }, 1500);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert("Please manually copy the UPI ID: helpinghandsrgukt@sbi");
    });
  };

  return (
    <div>
      {/* <div className="top-header">
        <h1>HELPING HANDS</h1>
        <p className="subtitle">RGUKT-NUZVID</p>
        <p className="tagline">A Student's Initiative - An Abode of Service</p>
        <p className="reg-info">(Regd No. 313/2019 under the A.P. Societies Registration Act, 2001)</p>
      </div> */}

      <main className="donation-section">
        <h2>Donate to HELPING HANDS RGUKT NUZVID either using QR scanner or Bank details</h2>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6 mb-4">
              <div className="card donation-card qr-code-card">
                <div className="card-body p-0">
                  <img src="/images/qr.jpg" alt="QR Code for Donation" className="qr-code" />
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-6 mb-4">
              <div className="card donation-card details-card">
                <div className="card-body p-0 text-start">
                  <div className="upi-details">
                    <h3>UPI DETAILS</h3>
                    <p>
                      <strong>MERCHANT NAME :</strong>
                      <span className="upi-value">RGU IIIT HELPING HANDS NUZVID</span>
                    </p>
                    <p>
                      <strong>UPI ID :</strong>
                      <span id="upiIdValue" className="upi-value">helpinghandsrgukt@sbi</span>
                      <button className={`copy-button ${copyClass}`} onClick={copyUpiId}>{copyText}</button>
                    </p>
                  </div>

                  <p className="separator text-center">(or)</p>

                  <div className="account-details">
                    <h3>ACCOUNT DETAILS</h3>
                    <p>
                      <strong>ACCOUNT NAME :</strong>
                      <span>HELPING HANDS RGUKT NUZVID</span>
                    </p>
                    <p>
                      <strong>ACCOUNT NUMBER :</strong>
                      <span>62115627011</span>
                    </p>
                    <p>
                      <strong>IFSC CODE :</strong>
                      <span>SBIN0021233</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Donation;
