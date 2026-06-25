import React, { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import Pagination from "../../components/Pagination";
import blogService from "../../services/blogService";

function LatestBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Show 3 blogs per page on Home

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getAllPosts();
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi khi tải tin tức:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const currentPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="font-weight-bold mb-0">Tin bóng đá & hướng dẫn chọn đồ</h4>
        <span className="text-muted small">Dữ liệu lấy từ API /api/Posts</span>
      </div>
      {loading ? (
        <div className="text-center text-muted">Đang tải bài viết...</div>
      ) : posts.length === 0 ? (
        <p className="text-muted">Chưa có bài viết nào.</p>
      ) : (
        <>
          <div className="row">
            {currentPosts.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <PostCard item={item} />
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          )}
        </>
      )}
    </section>
  );
}

export default LatestBlog;
