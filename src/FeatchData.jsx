import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "./Slice";

const FetchData = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(fetchPost())
    }, [dispatch])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error}</p>

    return (
        <div>
            <h2>Fetch DATA</h2>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default FetchData;