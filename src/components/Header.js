/* eslint-disable jsx-a11y/anchor-is-valid */
import Logo from "../img/logo.png";
import Search from "../img/search.png";
import Cart from "../img/cart.png";
import Member from "../img/member.png";
import { useState } from "react";
import { Link } from "react-router-dom";


function Header({ totalProduct }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [searchInput, setSearchInput] = useState();
  const inputSubmit = (event) => {
    setSearchInput(event.target.value);
  };

  const search = (e) => {
    if (searchInput === "") {
      alert("請輸入");
    } else {
      window.location.href = `/products.html?search=${searchInput}`;
    }
  };

  return (
    <header>
      <div className="webhead">
        <div className="navbar">
          <div className="logo-category">
            <div className="logo">
              <a href="./products.html?category=all">
                <img src={Logo} alt="logo" />
              </a>
            </div>

            <div className="category">
              <a href="./products.html?category=women" className="women">
                女裝
              </a>
              <a href="./products.html?category=men" className="men">
                男裝
              </a>
              <a
                href="./products.html?category=accessories"
                className="accessories"
              >
                配件
              </a>
            </div>

            <div className="mobile-search-btn-outside">
              <img
                src={Search}
                alt="search"
                onClick={handleToggle}
                style={{ display: isOpen ? "none" : "block" }}
              />
            </div>

            <div
              className="mobile-search"
              style={{ display: isOpen ? "block" : "none" }}
            >
              <div className="mobile-search-box">
                <div className="mobile-search-area">
                  <input
                    className="mobile-input"
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onInput={inputSubmit}
                  />
                  <img
                    className="mobile-search-btn-inside"
                    src={Search}
                    alt="search"
                    onClick={search}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="search-cart-member">
          <div className="search">
            <div className="search-form">
              <input
                className="input"
                type="text"
                placeholder="Search"
                value={searchInput}
                onInput={inputSubmit}
              />
              <img
                className="search-btn"
                src={Search}
                alt="search"
                onClick={search}
              />
            </div>
          </div>

          <div className="cart-member">
            <div className="cart">
              <Link to={"./checkout"}>
                <div>
                  <img src={Cart} alt="cart" />
                </div>
              </Link>
            </div>
            <Link to={"./checkout"}>
              <div className="cart-number">
                <p>{totalProduct}</p>
              </div>
            </Link>
          </div>

          <div className="member">
            <a>
              <img src={Member} alt="member-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="black-line"></div>
    </header>
  );
}

export default Header;
