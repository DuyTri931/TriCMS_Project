import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import blogService from "../../services/blogService";
import { getImageUrl } from "../../components/imageHelper";
import "./PostDetailPage.css";

function PostDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await blogService.getPostById(id);
                setPost(data);
            } catch (err) {
                console.error("Lỗi khi tải chi tiết bài viết:", err);
                setError("Không tìm thấy bài viết hoặc có lỗi xảy ra.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div>
                <Header />
                <div className="container text-center py-5 my-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Đang tải...</span>
                    </div>
                    <p className="mt-3 text-muted">Đang tải nội dung bài viết...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div>
                <Header />
                <div className="container text-center py-5 my-5">
                    <i className="fas fa-exclamation-circle fa-4x text-danger mb-3"></i>
                    <h3>Opps! Có lỗi xảy ra</h3>
                    <p className="text-muted">{error || "Không tìm thấy bài viết."}</p>
                    <Link to="/blog" className="btn btn-success mt-3">Quay lại Blog</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const createdDate = new Date(post.createdDate || post.createdAt || Date.now()).toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });

    return (
        <div>
            <Header />
            <div className="post-detail-header">
                <div className="container">
                    <Link to="/blog" className="back-to-blog">
                        <i className="fa-solid fa-arrow-left"></i> Quay lại Blog
                    </Link>
                    <div className="post-meta">
                        {post.categoryName && (
                            <span><i className="fa-solid fa-folder"></i> {post.categoryName}</span>
                        )}
                        <span><i className="fa-solid fa-calendar"></i> {createdDate}</span>
                    </div>
                    <h1 className="post-title">{post.title}</h1>
                </div>
            </div>

            <main className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <img 
                            src={getImageUrl(post.imageUrl)} 
                            alt={post.title} 
                            className="post-featured-image" 
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80" }}
                        />
                        
                        {/* We use dangerouslySetInnerHTML to render rich text from CKEditor/TinyMCE */}
                        <div 
                            className="post-content" 
                            dangerouslySetInnerHTML={{ __html: post.content }} 
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default PostDetailPage;
