import React, { useState, useEffect } from "react";

function Product({ setTotalProduct }) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const productUrl = `https://api.appworks-school.tw/api/1.0/products/details?id=${id}`;
  const [posts, setPosts] = useState();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const localStorageStock = JSON.parse(localStorage.getItem("cart")) || [];
  // console.log("localStorageStock",localStorageStock);
  const maxStock =
    selectedColor?.code && selectedSize
      ? posts.data.variants.find(
          (variant) =>
            variant.color_code === selectedColor.code &&
            variant.size === selectedSize
        )?.stock
      : 0;

  //console.log({ maxStock, selectedColor, selectedSize, selectedQuantity });

  function handleColorClick(selectedColor) {
    setSelectedColor(selectedColor);
  }

  function handleSizeClick(selectedSize) {
    setSelectedSize(selectedSize);
  }

  function handleQuantityClick(plusOrMinus, maxStock) {
    maxStock = Number(maxStock);
    if (plusOrMinus === "plus" && selectedQuantity < (maxStock || 0)) {
      setSelectedQuantity(selectedQuantity + 1);
    } else if (plusOrMinus === "minus" && selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  }

  function handleAddtoCart() {
    if (
      selectedColor !== undefined &&
      selectedSize !== null &&
      selectedQuantity !== 0
    ) {
      //console.log("按下加入購物車");
      const item = {
        id: posts.data.id,
        img: posts.data.main_image,
        name: posts.data.title,
        price: posts.data.price,
        color: selectedColor,
        size: selectedSize,
        qty: selectedQuantity,
      };
      //console.log("item:",item);

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const cartItemIndex = cart.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color.code === item.color.code &&
          cartItem.size === item.size
      );

      let updatedCart;
      if (cartItemIndex === -1) {
        updatedCart = [...cart, item];
      } else {
        updatedCart = [...cart];
        updatedCart[cartItemIndex].qty += item.qty;
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      const totalQuantity = updatedCart.reduce((total, i) => total + i.qty, 0);
      setTotalProduct(totalQuantity);

      const newPosts = { ...posts };
      const variantIndex = newPosts.data.variants.findIndex(
        (variant) =>
          variant.color_code === selectedColor.code &&
          variant.size === selectedSize
      );
      if (variantIndex !== -1) {
        newPosts.data.variants[variantIndex].stock -= selectedQuantity;
        // setMaxStock(newPosts.data.variants[variantIndex].stock);
      }
      setPosts(newPosts);
    }
    setSelectedColor(null);
    setSelectedSize(null);
    setSelectedQuantity(0);
  }

  useEffect(() => {
    fetch(productUrl)
      .then((response) => response.json())
      .then((response) => {
        //console.log("response.data.vatriants",response.data.variants);
        const updatedVariants = response.data.variants.map(function (variant) {
          const itemFromLocalstorage = localStorageStock.find(
            (stock) =>
              stock.color.code === variant.color_code &&
              stock.size === variant.size
          );

          if (itemFromLocalstorage) {
            let updatedStock = variant.stock - itemFromLocalstorage.qty;
            return {
              ...variant,
              stock: updatedStock,
            };
          } else {
            return variant;
          }
        });

        const updatedPosts = {
          data: {
            ...response.data,
            variants: updatedVariants,
          },
        };

        //console.log({ updatedPosts })

        setPosts(updatedPosts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (posts === undefined) {
    return null;
  }

  return (
    <section className="product">
      <section className="product-top">
        <img
          className="product-image-top"
          src={posts.data.main_image}
          alt="product"
        />
        <div className="product-info">
          <ul>
            <li className="product-name">{posts.data.title}</li>
            <li className="product-id">{posts.data.id}</li>
            <li className="product-price">TWD.{posts.data.price}</li>
            <li className="split1"></li>
            <li>
              <ul className="product-color">
                <p>顏色｜</p>
                {posts.data.colors.map((color, index) => (
                  <li
                    key={index}
                    className={`colorblock ${
                      selectedColor === color ? "active" : ""
                    }`}
                    style={{ backgroundColor: "#" + color.code }}
                    onClick={() => handleColorClick(color)}
                  ></li>
                ))}
              </ul>
            </li>
            <li>
              <ul className="product-size">
                <p>尺寸｜</p>
                {posts.data.sizes.map((size, index) => (
                  <li
                    key={index}
                    className={`size ${
                      selectedColor &&
                      posts.data.variants.find(
                        (variant) =>
                          variant.color_code === selectedColor.code &&
                          variant.size === size
                      ).stock > 0
                        ? ""
                        : "out-of-stock"
                    } ${selectedSize === size ? "active" : ""}`}
                    onClick={() => {
                      handleSizeClick(size);
                      setSelectedQuantity(0);
                    }}
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <ul className="product-in-stock">
                <p>數量｜</p>
                <div className="quantity-container">
                  <div
                    className="minus"
                    type="button"
                    onClick={() => handleQuantityClick("minus")}
                  >
                    -
                  </div>
                  <div className="quantity">{selectedQuantity}</div>
                  <div
                    className="plus"
                    type="button"
                    onClick={() => handleQuantityClick("plus", maxStock)}
                  >
                    +
                  </div>
                </div>
              </ul>
            </li>
            <button
              className="add-to-cart"
              onClick={handleAddtoCart}
              style={{
                cursor:
                  selectedColor === undefined ||
                  selectedSize === null ||
                  selectedQuantity === 0
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              加入購物車
            </button>
            <div className="product-detail">
              {posts.data.note}
              <br />
              <br />
              {posts.data.texture}
              <br />
              {posts.data.description.split("\r\n")[0]}
              <br />
              {posts.data.description.split("\r\n")[1]}
              <br />
              <br />
              清洗：{posts.data.wash}
              <br />
              產地：{posts.data.place}
            </div>
          </ul>
        </div>
      </section>

      <section className="product-bottom">
        <div className="more-info">
          <p className="more-info-p">更多產品資訊</p>
          <div className="split2"></div>
        </div>
        <p className="description">{posts.data.story}</p>
        <div className="product-images-bottom">
          {posts.data.images.map((image, index) => (
            <img
              key={index}
              className="product-image-bottom"
              src={image}
              alt="product"
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default Product;
