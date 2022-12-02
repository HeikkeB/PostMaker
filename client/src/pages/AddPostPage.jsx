import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPost } from '../redux/features/post/postSlice';

export default function AddPostPage() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      data.append('image', image);
      dispatch(createPost(data));
      toast.success('Congratulations! Create Post!', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
  };

  const clearFormHandler = () => {
    setTitle('');
    setText('');
    navigate('/');
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
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <div className="flex object-cover py-6">
          {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
        </div>

        <section className='w-full mb-6'>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title post"
            className="inputPageBig"
          />
        </section>
        <section className='w-full mb-6'>
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
            ADD POST
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
