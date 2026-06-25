import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostCard from "../../components/PostCard";
import Pagination from "../../components/Pagination";
import blogService from "../../services/blogService";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getAllPosts();
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi khi tải blog:", error);
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
    <div>
      <Header />
      <section className="bg-light py-4 border-bottom">
        <div className="container">
          <h2 className="font-weight-bold mb-1">Tin tức bóng đá</h2>
          <p className="text-muted mb-0">Lịch thi đấu, hướng dẫn chọn giày và kinh nghiệm bảo quản đồ thể thao.</p>
        </div>
      </section>
      <main className="container my-5">
        {loading ? <div className="text-center text-muted">Đang tải bài viết...</div> : (
          <>
            <div className="row">
              {currentPosts.map((item) => <div className="col-md-4 mb-4" key={item.id}><PostCard item={item} /></div>)}
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
      </main>
      <Footer />
    </div>
  );
}

export default Blog;
