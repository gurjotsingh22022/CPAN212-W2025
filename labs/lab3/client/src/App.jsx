import './App.css';
import ImageGallery from './ImageGallery';
import DogUploader from './DogUploader';

function App() {
    return (
      <div className="app-container">
      <header>
          <h1>🐾 Image Gallery & Dog Uploader</h1>
      </header>
      <main>
          <ImageGallery />
          <DogUploader />
      </main>
  </div>
    );
}

export default App;
