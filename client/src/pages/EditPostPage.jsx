import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost } from '../redux/features/post/postSlice';
import axios from '../utils/axios';

export default function EditPostPage() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append('title', title);
      updatedPost.append('text', text);
      updatedPost.append('id', params.id);
      updatedPost.append('image', newImage);
      dispatch(updatePost(updatedPost));
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = () => {
    navigate('/posts');
  };

  return (
    <div>
      <form
        className="w-1/3 mx-auto py-10 flex flex-col justify-center items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="btnPageBig">
          ADD IMAGE:
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              setNewImage(e.target.files[0]);
              setOldImage('');
            }}
          />
        </label>
        <div className="flex object-cover py-6">
          {oldImage && <img src={`http://localhost:5000/${oldImage}`} alt={oldImage.name} />}
          {newImage && <img src={URL.createObjectURL(newImage)} alt={newImage.name} />}
        </div>

        <section className="w-full mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title post"
            className="inputPageBig"
          />
        </section>
        <section className="w-full mb-6">
          <textarea
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text post"
            className="inputPageBig min-h-[90px]"
          />
        </section>

        <div className="flex gap-10 items-center justify-center mt-4">
          <button
          type='button'
            onClick={submitHandler}
            className="btnPage"
          >
            UPDATE
          </button>
          <button
          type='button'
            onClick={clearFormHandler}
            className="btnPageRed"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}
