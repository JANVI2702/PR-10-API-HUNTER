import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPosts, setSearchTerm, setCurrentPage, setfilter, clearFilter
} from "./Slice/FetchPostSlice";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function PostList() {
    const dispatch = useDispatch();

    const {
        items,
        status,
        error,
        searchTerm,
        currentPage,
        postPerPage,
        filters,
    } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts({ page: currentPage, limit: 100 }));
    }, [dispatch, currentPage, postPerPage]);

    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const handleUserFilter = (userId) => {
        dispatch(setfilter({ userId }));
    };

    const handleClearFilter = () => {
        dispatch(clearFilter());
    };

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "failed") {
        return (
            <div className="alert alert-danger text-center" role="alert">
                <h2>Error</h2>
                <p>{error}</p>
                <button className="btn btn-danger" onClick={() => dispatch(fetchPosts({ page: 1, limit: postPerPage }))}>
                    Try Again
                </button>
            </div>
        );
    }

    const filteredPosts = items.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.body.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesUser = !filters.userId || post.userId === filters.userId;

        return matchesSearch && matchesUser;
    });

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6 mb-3">
                    <input
                        type="text"
                        placeholder="Search post"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="form-control"
                    />
                </div>
                {searchTerm && (
                    <div className="col-auto">
                        <button className="btn btn-warning" onClick={() => dispatch(setSearchTerm(""))}>Cancel</button>
                    </div>
                )}
            </div>

            <div className="row justify-content-center mb-3">
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={filters.userId || ""}
                        onChange={(e) => handleUserFilter(e.target.value ? Number(e.target.value) : null)}
                    >
                        <option value="">All users</option>
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                User {i + 1}
                            </option>
                        ))}
                    </select>
                </div>
                {(filters.userId || searchTerm) && (
                    <div className="col-auto">
                        <button className="btn btn-secondary" onClick={handleClearFilter}>Clear filter</button>
                    </div>
                )}
            </div>

            <div className="row">
                {filteredPosts.map((post) => (
                    <div key={post.id} className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">User ID: {post.userId}</h5>
                                <h6 className="card-subtitle mb-2 my-2 text-dark">Title :{post.title}</h6>
                                <p className="card-text">Discription  : {post.body}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostList;
