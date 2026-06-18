import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getImageUrl } from "../../components/imageHelper";
import blogService from "../../services/blogService";

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await blogService.getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết bài viết:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <div>
      <Header />
      <main className="container my-5" style={{ maxWidth: "900px" }}>
        {loading ? (
          <div className="text-center text-muted">Đang tải bài viết...</div>
        ) : !post ? (
          <div className="alert alert-warning">Không tìm thấy bài viết.</div>
        ) : (
          <article>
            <h1 className="font-weight-bold mb-3">{post.title}</h1>
            <p className="text-muted">Ngày đăng: {post.createdDate ? new Date(post.createdDate).toLocaleDateString("vi-VN") : "Đang cập nhật"}</p>
            <img src={getImageUrl(post.imageUrl)} alt={post.title} className="img-fluid rounded shadow-sm mb-4" />
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content || "" }} />
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default BlogDetail;
