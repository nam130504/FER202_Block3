import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue } = useContext(CartContext);
  const [message, setMessage] = useState("");

  const handleCheckout = () => {
    setMessage("🎉 Thanh toán thành công! Cảm ơn bạn đã đặt hàng.");
    clearCart();
  };

  return (
    <div className="cart">
      <h2>🛒 Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <p>{`Tổng số món: ${cartItems.length}`}</p>
            <p>{`Tổng giá trị: $${totalValue}`}</p>
            <button onClick={clearCart}>🗑 Clear Cart</button>
            <button onClick={handleCheckout}>💳 Xác nhận đơn hàng</button>
          </div>
        </div>
      )}
      {message && <p className="success-msg">{message}</p>}
    </div>
  );
};

export default Cart;
