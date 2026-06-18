export const CART_KEY = "football_store_cart";

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartChanged"));
}

export function getCartCount() {
  return getCart().reduce((total, item) => total + Number(item.quantity || 0), 0);
}

export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === product.id);
  const stock = Number(product.stockQuantity ?? product.stock ?? 0);

  if (quantity <= 0) return { ok: false, message: "Số lượng không hợp lệ!" };

  if (index >= 0) {
    const nextQuantity = cart[index].quantity + quantity;
    if (stock > 0 && nextQuantity > stock) {
      return { ok: false, message: "Số lượng sản phẩm trong kho không đủ!" };
    }
    cart[index].quantity = nextQuantity;
  } else {
    if (stock > 0 && quantity > stock) {
      return { ok: false, message: "Số lượng sản phẩm trong kho không đủ!" };
    }
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      stockQuantity: stock,
      quantity,
    });
  }

  saveCart(cart);
  return { ok: true, message: "Đã thêm sản phẩm vào giỏ hàng!" };
}
