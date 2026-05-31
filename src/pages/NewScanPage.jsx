import { useState } from 'react';
import toast from 'react-hot-toast';
import Heading from '../components/Heading.jsx';
import ImageInput from '../components/ImageInput.jsx';
import BodyText from '../components/BodyText.jsx';
import { createSession, editStatus } from '../utils/api/session.js';
import { uploadImage } from '../utils/api/session-image.js';
import { makePrediction } from '../utils/api/classification-result.js';
import { useNavigate } from 'react-router-dom';
import { FaCameraRetro } from 'react-icons/fa6';

const NewScanPage = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const [loading, setLoading] = useState(false);

  const onUploadHandler = async () => {
    setLoading(true);

    if (image === null) {
      toast.error('Image must be filled');
      setLoading(false);
      return;
    }

    try {
      const { sessionId } = await toast.promise(createSession(), {
        loading: 'Creating new session',
        success: 'Session created successfully',
        error: (err) => err?.message ?? 'Error while trying to create new session'
      });

      await toast.promise(uploadImage({ sessionId, image }), {
        loading: 'Uploading image',
        success: 'Image uploaded successfully',
        error: (err) => err?.message ?? 'Error while trying to upload image'
      });

      await toast.promise(makePrediction({ sessionId }), {
        loading: 'Making prediction/classification',
        success: 'Disease predicted/classified successfully',
        error: (err) => err?.message ?? 'Error while trying to make prediction/classification'
      });

      await toast.promise(editStatus({ id: sessionId, status: 'completed' }), {
        loading: 'Finishing things up',
        success: 'Finished!',
        error: (err) => err?.message ?? 'Error while finishing'
      });

      setLoading(false);

      toast.loading('Success! Redirecting to view result...', {
        duration: 750,
      });

      setTimeout(() => {
        navigate(`/results/${sessionId}`);
      }, 750);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

  };

  return (
    <section className="w-full min-h-dvh lg:h-auto px-container-margin mx-auto flex flex-col justify-center items-center lg:items-start">
      <div className="flex flex-col gap-lg">
        <div>
          <div className="flex items-center gap-sm mb-xs">
            <Heading>New prediction</Heading>
          </div>
          <p className="text-label-md font-label-md text-primary dark:text-inverse-primary flex gap-sm">Scan to begin analysis <FaCameraRetro /></p>
        </div>
        <ImageInput
          setImage={imageHandler}
          loading={loading}
          onUploadHandler={onUploadHandler}
        />
        {image && (
          <BodyText>Selected: {image.name}</BodyText>
        )}
      </div>
    </section>
  );
};

export default NewScanPage;
