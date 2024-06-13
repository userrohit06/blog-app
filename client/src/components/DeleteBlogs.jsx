import axios from "axios"

const DeleteButton = ({ blogId, onDelete }) => {
    const URI = import.meta.env.VITE_BACKEND_URI

    const handleDelete = async () => {
        try {
            await axios.delete(`${URI}/blogs/blog/${blogId}`)
            onDelete()
        } catch (error) {
            console.log(error);
        }
    }
    return <button onClick={handleDelete}>Delete</button>
}

export default DeleteButton