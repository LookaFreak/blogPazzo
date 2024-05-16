import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostAuthor from '../components/PostAuthor';
import { UserContext } from '../context/userContext';
import Loader from '../components/Loader';
import CommentForm from '../components/CommentForm'; // Importa la tua componente CommentForm

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [creatorID, setCreatorID] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    // Funzione per gestire l'invio del commento
    const handleCommentSubmit = async (commentData) => {
        try {
            // Invia il commento al server o gestisci l'invio del commento
            console.log('Commento inviato:', commentData);
        } catch (error) {
            console.error('Errore durante l\'invio del commento:', error);
            // Gestisci l'errore in base alle tue esigenze
        }
    };

    useEffect(() => {
        const getPost = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
                setPost(response.data);
                setCreatorID(response.data.creator);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        getPost();
    }, [id]);

    if (isLoading) {
        return <Loader />;
    }

    const removePost = async () => {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
        if (!response) {
            setError("Post deletion failed. Please try again");
        }

        navigate('/');
    };

    return (
        <section className='post-detail'>
            {error && <p className='error'>{error}</p>}
            {post && <div className="container post-detail__container">
                <div className="post-detail__header">
                    <PostAuthor authorID={creatorID} createdAt={post?.createdAt} />
                    {currentUser?.id === post?.creator && <div className="post-detail__buttons">
                        <Link to={`/posts/${post?._id}/edit`} className="btn sm primary">Edit</Link>
                        <Link className='btn sm danger' onClick={removePost}>Delete</Link>
                    </div>}
                </div>
                <h1>{post?.title}</h1>
                <div className="post-detail__thumbnail">
                    <img src={`${process.env.REACT_APP_ASSET_URL}/uploads/${post?.thumbnail}`} alt="" />
                </div>
                <p dangerouslySetInnerHTML={{ __html: post?.description }} />
                <CommentForm postId={id} userId={currentUser?.id} onCommentSubmit={handleCommentSubmit} />
            </div>}
        </section>
    );
};

export default PostDetail;