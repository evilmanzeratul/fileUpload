import { useState } from 'react';
import './App.css';
import { storage } from './firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

function App() {

  const [imageUpload, setImageUpload] = useState(null)

  async function uploadImage() {
    if (!imageUpload) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    try {
      await uploadBytes(imageRef, imageUpload)
      alert("Image Uploaded")
    } catch (err) {
      console.error(err)
    }

  }

  return (
    <div className="App">
      <input type="file" onChange={(e) => { setImageUpload(e.target.files[0]) }} />

      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default App;
