import { useState, useRef, useEffect, useCallback } from 'react';
import { FaUpload, FaCamera, FaRotate, FaFileArrowUp } from 'react-icons/fa6';
import Button from './Button';

const ImageInput = ({ setImage, loading, onUploadHandler }) => {
  const [mode, setMode] = useState('camera');
  const [preview, setPreview] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('user');

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    stopStream();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (_err) {
      setCameraError('Camera access denied or not available.');
    }
  }, [facingMode, stopStream]);

  useEffect(() => {
    if (mode === 'camera') startCamera();
  }, [facingMode, mode]);

  useEffect(() => {
    if (mode === 'camera' && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [mode]);

  useEffect(() => () => stopStream(), [stopStream]);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
      setImage({ target: { files: [file] } });
      setPreview(canvas.toDataURL('image/jpeg'));
      stopStream();
      setMode('preview');
    }, 'image/jpeg');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(e);
    setPreview(URL.createObjectURL(file));
    stopStream();
    setMode('preview');
  };

  const handleReset = () => {
    stopStream();
    setPreview(null);
    setCameraError(null);
    setImage({ target: { files: [] } });
    if (fileInputRef.current) fileInputRef.current.value = '';
    setMode('camera');
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">

      {mode === 'camera' && (
        <>
          <div className="relative flex justify-center w-full overflow-hidden">
            {cameraError ? (
              <div className="w-auto h-64 flex items-center justify-center text-sm text-red-400">
                {cameraError}
              </div>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-auto max-h-80 border-outline bg-surface dark:bg-inverse-surface p-2 rounded-lg border"
              />
            )}

            <Button
              type="button"
              onClick={() => setFacingMode((f) => (f === 'user' ? 'environment' : 'user'))}
              title="Flip camera"
              className="absolute top-2 right-2 lg:right-20 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <FaRotate />
            </Button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 w-full lg:w-180">
            <Button
              onClick={capturePhoto}
              disabled={!!cameraError}
            >
              <FaCamera />
            </Button>
            <div className="flex-1 flex flex-col justify-center items-end">
              <label className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-outline font-label-md text-xs cursor-pointer hover:bg-surface-variant transition-colors text-on-surface dark:text-inverse-on-surface dark:hover:text-on-surface-variant">
                <FaFileArrowUp />
                Upload from files
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <p
                className="mt-1 text-label-bold font-label-bold text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                    SVG, PNG, JPG or GIF.
              </p>

            </div>
          </div>
        </>
      )}

      {mode === 'preview' && preview && (
        <>
          <div className="w-full lg:w-180 overflow-hidden flex items-center justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-80 object-contain border-outline bg-surface dark:bg-inverse-surface p-2 rounded-lg border"
            />
          </div>

          <div className="w-full flex flex-row items-center justify-center gap-md">
            <Button
              onClick={handleReset}
              variant='outlined'
              className='flex-1'
              startIcon={<FaRotate />}
            >
            Retake / Use Different Image
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              onClick={onUploadHandler}
              startIcon={<FaUpload />}
            >Upload</Button>
          </div>
        </>
      )}

    </div>
  );
};

export default ImageInput;
