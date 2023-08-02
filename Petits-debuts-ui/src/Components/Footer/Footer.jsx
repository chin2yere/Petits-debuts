import * as React from "react";
import "./Footer.css";
//this is the page that displays the footer
export default function Footer() {
  return (
    <nav className="footer">
      <div className="row-footer">
        <div className="col-footer">
          <p>Copyright 2023</p>
          <p>Refer a friend to win prizes</p>
          <p>Thank you for shopping with us</p>
        </div>
        <div className="col-footer">
          <p>Owned by Chinyere Platforms</p>
          <p>Mailing address : 1 hacker way</p>
          <p>Telephone: +123 456-7899</p>
        </div>
      </div>
    </nav>
  );
}
