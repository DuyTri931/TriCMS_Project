import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "./imageHelper";

function PostCard({ item }) {
  const plainText = (item.content || "").replace(/<[^>]+>/g, "");
  const summary = plainText.length > 110 ? plainText.substring(0, 110) + "..." : plainText;

  return (
    <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "14px", overflow: "hidden" }}>
      <img src={getImageUrl(item.imageUrl)} alt={item.title} className="card-img-top" style={{ height: "180px", objectFit: "cover" }} />
      <div className="card-body d-flex flex-column">
        <p className="text-muted small mb-2">{item.createdDate ? new Date(item.createdDate).toLocaleDateString("vi-VN") : "Đang cập nhật"}</p>
        <h6 className="font-weight-bold text-dark">{item.title}</h6>
        <p className="text-muted small">{summary || "Đang cập nhật nội dung bài viết."}</p>
        <Link to={`/blog/${item.id}`} className="btn btn-outline-dark btn-sm mt-auto">Đọc thêm</Link>
      </div>
    </div>
  );
}

export default PostCard;
