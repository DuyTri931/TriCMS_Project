import React, { useState, useEffect } from 'react';
import blogService from '../services/blogService';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const backendUrl = 'https://localhost:7057';

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);

                const result = await blogService.getAllPosts();

                console.log('DỮ LIỆU BÀI VIẾT TỪ API:', result);

                const data = result.data ? result.data : result;

                setPosts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Lỗi khi tải danh sách bài viết:', error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) {
            return 'https://via.placeholder.com/400x220?text=No+Image';
        }

        if (imageUrl.startsWith('http')) {
            return imageUrl;
        }

        return `${backendUrl}${imageUrl}`;
    };

    const getSummary = (post) => {
        if (post.shortDescription) {
            return post.shortDescription;
        }

        if (post.content) {
            const plainText = post.content.replace(/<[^>]+>/g, '');
            return plainText.length > 100
                ? plainText.substring(0, 100) + '...'
                : plainText;
        }

        return 'Đang cập nhật nội dung tóm tắt cho bài viết...';
    };

    const formatDate = (date) => {
        if (!date) {
            return 'Đang cập nhật';
        }

        return new Date(date).toLocaleDateString('vi-VN');
    };

    if (loading) {
        return (
            <div className="text-center my-4">
                Đang tải tin tức thời trang...
            </div>
        );
    }

    return (
        <div className="mt-5">
          

            {posts.length === 0 ? (
                <p className="text-muted">
                    Chưa có bài viết tin tức nào.
                </p>
            ) : (
                <div className="row">
                    {posts.map((post) => (
                        <div className="col-md-6 mb-4" key={post.id}>
                            <div className="card h-100 shadow-sm border-light">
                                <img
                                    src={getImageUrl(post.imageUrl)}
                                    alt={post.title}
                                    className="card-img-top"
                                    style={{
                                        height: '180px',
                                        objectFit: 'cover'
                                    }}
                                />

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title font-weight-bold">
                                        <a
                                            href={`/post/${post.id}`}
                                            className="text-dark text-decoration-none"
                                        >
                                            {post.title}
                                        </a>
                                    </h5>

                                    <p className="card-text text-muted small">
                                        Ngày đăng: {formatDate(post.createdDate)}
                                    </p>

                                    <p className="card-text">
                                        {getSummary(post)}
                                    </p>

                                    <div className="mt-auto">
                                        <a
                                            href={`/post/${post.id}`}
                                            className="btn btn-outline-dark btn-sm w-100"
                                        >
                                            Đọc thêm
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostList;