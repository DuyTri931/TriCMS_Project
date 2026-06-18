const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL || "https://localhost:7057";

export function getImageUrl(imageUrl) {
  if (!imageUrl) {
    return "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80";
  }

  if (imageUrl.startsWith("http")) return imageUrl;

  if (imageUrl.startsWith("/")) return `${IMAGE_BASE_URL}${imageUrl}`;

  return `${IMAGE_BASE_URL}/${imageUrl}`;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Number(value || 0));
}
