import { useState } from 'react';

function DogUploader() {
    const [dogImage, setDogImage] = useState('');
    const [imgFile, setImgFile] = useState('');
    const [uploaded, setUploaded] = useState(false);

    const fetchDogImage = async () => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        setDogImage(data.message);
        setUploaded(false);  // Reset upload status
    };

    const uploadDogImage = async () => {
        const response = await fetch(dogImage);
        const blob = await response.blob();
        const filename = Date.now();
        const file = new File([blob], filename, { type: blob.type });

        const formData = new FormData();
        formData.append('file', file, 'dogImage.jpg');

        await fetch('http://localhost:8000/save/single', {
            method: 'POST',
            body: formData,
        });

        setUploaded(true);
    };

    return (
        <section className="dog-uploader">
            <h2>Upload Random Dog Image</h2>
            <button className="btn fetch-btn" onClick={fetchDogImage}>Get Random Dog Image</button>

            {dogImage && (
                <div className="dog-preview">
                    <img src={dogImage} alt="Random Dog" />
                    <button className="btn upload-btn" onClick={uploadDogImage}>Upload to Server</button>
                    {uploaded && <p className="success-msg">✅ Image uploaded successfully!</p>}
                </div>
            )}
        </section>
    );
}

export default DogUploader;
