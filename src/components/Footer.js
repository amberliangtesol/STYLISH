/* eslint-disable jsx-a11y/anchor-is-valid */
import Line from "../img/line.png";
import Twitter from "../img/twitter.png";
import Facebook from "../img/facebook.png";
import CartMobile from "../img/cart-mobile.png";
import MemberMobile from "../img/member-mobile.png";
import { Link } from "react-router-dom";


function Footer({ totalProduct }) {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="information">
          <a className="info about-us">關於 Stylish</a>
          <a className="info service-term">服務條款</a>
          <a className="info privite-term">隱私政策</a>
          <a className="info contact-us">聯絡我們</a>
          <a className="faq">FAQ</a>
        </div>
        <div className="social-media-icon">
          <a className="line">
            <img src={Line} alt="line icon" />
          </a>
          <a className="twitter">
            <img src={Twitter} alt="twitter icon" />
          </a>
          <a className="facebook">
            <img src={Facebook} alt="facebook icon" />
          </a>
        </div>
        <p className="copy-right">© 2018. All rights reserved.</p>
      </div>

      <div className="mobile-cart-member">
        <div className="mobile-cart">
          <div className="cart">
            <Link to={"./checkout"}>
              <div>
                <img src={CartMobile} alt="cart" />
              </div>
            </Link>
            <Link to={"./checkout"}>
              <p className="mobile-cart-p">購物車</p>
            </Link> 
          </div>
          <Link to={"./checkout"}>
            <div className="mobile-cart-number">
              <p>{totalProduct}</p>
            </div>
          </Link>
        </div>
        <div className="middle-line"></div>
        <div className="mobile-member">
          <a>
            <img src={MemberMobile} alt="member-icon" />
          </a>
          <p className="mobile-member-p">會員</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
