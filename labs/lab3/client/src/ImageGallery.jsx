import { useState } from 'react';

function ImageGallery() {
    const [images, setImages] = useState([]);

    const fetchRandomImages = async () => {
        const response = await fetch('http://localhost:8000/fetch/multiple');
        const data = await response.json();
        // Convert base64 data to Blob URLs
        const imageBlobs = data.map((image) => {
            const byteCharacters = atob(image.data); // Decode base64
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: image.mimeType });
            return URL.createObjectURL(blob);
          });
          console.log(imageBlobs)
          setImages(imageBlobs);
    };

    return (
        <section className="image-gallery">
            <h2>Random Image Gallery</h2>
            <button className="btn fetch-btn" onClick={fetchRandomImages}>Get Random Images</button>
            <div className="image-grid">
                {images.map((img, index) => (
                    <img key={index} src={`${img}`} alt={`Random ${index}`} />
                ))}
            </div>
        </section>
    );
}

export default ImageGallery;
