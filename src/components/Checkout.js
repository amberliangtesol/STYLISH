import React, { useState, useEffect } from "react";
import Trashcan from "../img/cart-remove.png";
import { Link } from "react-router-dom";

function Checkout({ setTotalProduct }) {
  const deliveryFee = 30;
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    time: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
  });

  // console.log(form);
  const handleDelete = (index) => {
    const newCartData = [...cartData];
    const product = newCartData[index];
    newCartData.splice(index, 1);
    setCartData(newCartData);
    localStorage.setItem("cart", JSON.stringify(newCartData));
    alert(`${product.name} 刪除成功`);
    window.location.reload();
  };

  useEffect(() => {
    const num = cartData.reduce((acc, product) => acc + product.qty, 0);
    setTotalProduct(num);
  }, [cartData]);

  return (
    <section className="checkout">
      <div className="shopping-cart-list">
        <div className="shopping-cart-title">購物車</div>
        <div className="shopping-cart-list-qty">數量</div>
        <div className="shopping-cart-list-price">單價</div>
        <div className="shopping-cart-list-total">小計</div>
      </div>

      <section className="shopping-cart-container">
        {cartData.map((product, index) => {
          return (
            <section className="product-detail-each" key={index}>
              <section className="product-detail-each-right">
                <Link to={`/?id=${product.id}`}>
                  <img
                    className="product-detail-image"
                    src={product.img}
                    alt="product"
                  />
                </Link>
                <section className="product-detail-info">
                  <div className="product-detail-name">{product.name}</div>
                  <div className="product-detail-id">{product.id}</div>
                  <div className="product-detail-color">
                    顏色｜{product.color.name}
                  </div>
                  <div className="product-detail-size">
                    尺寸｜{product.size}
                  </div>
                </section>
              </section>
              <section className="product-detail-each-left">
                <section className="product-detail-list">
                  <div className="product-detail-list-qty">數量</div>
                  <div className="product-detail-list-price">單價</div>
                  <div className="product-detail-list-total">小計</div>
                </section>

                <section className="product-detail-fact">
                  <div className="product-detail-qty-container">
                    <select
                      className="product-detail-qty"
                      value={product.qty}
                      onChange={(e) => {
                        const newCartData = [...cartData];
                        newCartData[index].qty = parseInt(e.target.value);
                        setCartData(newCartData);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify(newCartData)
                        );
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="product-detail-price">
                    TWD.{product.price}
                  </div>
                  <div className="product-detail-total">
                    TWD.{product.price * product.qty}
                  </div>
                </section>
                <img
                  className="product-detail-delete"
                  src={Trashcan}
                  alt="delete"
                  onClick={handleDelete}
                />
              </section>
            </section>
          );
        })}
      </section>

      <form className="order-detail-container">
        <div className="order-detail-title">訂購資料</div>
        <div className="order-detail-split"></div>

        <fieldset className="order-name">
          <legend className="order-name-p">收件人姓名</legend>
          <input
            id="name"
            name="name"
            className="order-name-input"
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            required
          />
          <p className="order-name-reminder-p">
            務必填寫完整收件人姓名，避免包裹無法順利簽收
          </p>
        </fieldset>

        <fieldset className="order-phone">
          <legend className="order-phone-p">手機</legend>
          <input
            className="order-phone-input"
            type="text"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={(e) => {
              setForm({
                ...form,
                phone: e.target.value,
              });
            }}
            required
          />
        </fieldset>

        <fieldset className="order-address">
          <legend className="order-address-p">地址</legend>
          <input
            className="order-address-input"
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={(e) => {
              setForm({
                ...form,
                address: e.target.value,
              });
            }}
            required
          />
        </fieldset>

        <fieldset className="order-Email-address">
          <legend className="order-Email-address-p">Email</legend>
          <input
            className="order-Email-address-input"
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={(e) => {
              setForm({
                ...form,
                email: e.target.value,
              });
            }}
            required
          />
        </fieldset>

        <fieldset className="order-transport-time">
          <legend className="order-transport-time-p">配送時間</legend>
          <div className="radio-input">
            <input
              type="radio"
              id="morning"
              name="time"
              value="08:00-12:00"
              checked={form.time === "08:00-12:00"}
              onChange={(e) => {
                setForm({
                  ...form,
                  time: e.target.value,
                });
              }}
              required
            />
            <label htmlFor="morning">08:00-12:00</label>
            <input
              type="radio"
              id="afternoon"
              name="time"
              value="14:00-18:00"
            />
            <label
              htmlFor="afternoon"
              checked={form.time === "14:00-18:00"}
              onChange={(e) => {
                setForm({
                  ...form,
                  time: e.target.value,
                });
              }}
              required
            >
              14:00-18:00
            </label>
            <input
              type="radio"
              id="none"
              name="time"
              value="不指定"
              checked={form.time === "不指定"}
              onChange={(e) => {
                setForm({
                  ...form,
                  time: e.target.value,
                });
              }}
              required
            />
            <label htmlFor="none">不指定</label>
          </div>
        </fieldset>
      </form>

      <section className="payment-detail-container">
        <div className="payment-detail-title">付款資料</div>
        <div className="payment-detail-split"></div>

        <form className="payment-detail">
          <fieldset className="payment-card-no">
            <legend className="payment-card-no-p">信用卡號碼</legend>
            <input
              className="payment-card-no-input"
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="**** **** **** ****"
              value={form.cardNumber}
              onChange={(e) => {
                setForm({
                  ...form,
                  cardNumber: e.target.value,
                });
              }}
              required
            />
          </fieldset>

          <fieldset className="payment-card-expirationDate">
            <legend className="payment-card-expirationDate-p">有效期限</legend>
            <input
              className="payment-card-expirationDate-input"
              placeholder="MM / YY"
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={form.expirationDate}
              onChange={(e) => {
                setForm({
                  ...form,
                  expirationDate: e.target.value,
                });
              }}
              required
            />
          </fieldset>

          <fieldset className="payment-card-securitycode">
            <legend className="payment-card-securitycode-p">安全碼</legend>
            <input
              className="payment-card-securitycode-input"
              placeholder="後三碼"
              type="text"
              id="securityCode"
              name="securityCode"
              value={form.securityCode}
              onChange={(e) => {
                setForm({
                  ...form,
                  securityCode: e.target.value,
                });
              }}
              required
            />
          </fieldset>
        </form>
      </section>

      <section className="confirm-payment-container">
        <section className="confirm-payment-total">
          <p className="confirm-payment-p">總金額</p>
          <div className="currancy">NT.</div>
          <div className="confirm-payment-total-num">
            {cartData.reduce(
              (acc, product) => acc + product.price * product.qty,
              0
            )}
          </div>
        </section>

        <section className="confirm-payment-delivery-fee">
          <p className="confirm-payment-delivery-p">運費</p>
          <div className="currancy">NT.</div>
          <div className="confirm-payment-delivery-fee-num">
            {cartData.length === 0 ? "0" : deliveryFee}
          </div>
        </section>

        <div className="confirm-payment-split"></div>

        <section className="confirm-payment-price">
          <p className="confirm-payment-price-p">應付金額</p>
          <div className="currancy">NT.</div>
          <div className="confirm-payment-price-num">
            {cartData.reduce(
              (acc, product) => acc + product.price * product.qty,
              0
            ) + (cartData.length === 0 ? 0 : deliveryFee)}
          </div>
        </section>

        <button
          className="confirm-payment-btn"
          disabled={cartData.length === 0}
          onClick={() =>
            alert(
              `【請再次確認您的收件資訊】\n 收件人姓名：${form.name} \n 手機：${form.phone} \n 地址：${form.address} \n Email:${form.email} \n 配送時間：${form.time} \n 信用卡號碼：${form.cardNumber} \n 有效期限：${form.expirationDate} \n 安全碼：${form.securityCode}`
            )
          }
        >
          確認付款
        </button>
      </section>
    </section>
  );
}

export default Checkout;
