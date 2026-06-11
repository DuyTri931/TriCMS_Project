import React, { useEffect, useState } from "react";
import categoryService from "../services/categoryService";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);

                const result = await categoryService.getAllCategories();

                console.log("DỮ LIỆU CHUYÊN MỤC:", result);

                const data = result.data ? result.data : result;

                setCategories(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Lỗi khi tải chuyên mục bài viết:", error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="card shadow-sm border mb-4">
            <div className="card-header bg-dark text-white font-weight-bold">
                CHUYÊN MỤC TIN TỨC
            </div>

            <ul className="list-group list-group-flush">
                {loading ? (
                    <li className="list-group-item text-muted">
                        Đang tải chuyên mục...
                    </li>
                ) : categories.length === 0 ? (
                    <li className="list-group-item text-muted">
                        Chưa có chuyên mục nào.
                    </li>
                ) : (
                    categories.map((item) => (
                        <li
                            className="list-group-item d-flex justify-content-between align-items-center"
                            key={item.id}
                        >
                            <span>{item.name}</span>
                            <span className="text-muted">&gt;</span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default CategoryList;