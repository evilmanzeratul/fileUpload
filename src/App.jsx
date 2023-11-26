import { useState, useEffect } from 'react';
import './App.css';
import { storage } from './firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

function App() {

  const [imageUpload, setImageUpload] = useState(null)
  const [imageList, setImageList] = useState([])

  const imagesListRef = ref(storage, "images/")

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

  async function getImage() {
    try {
      const response = await listAll(imagesListRef)
      response.items.forEach(async (item) => {
        const url = await getDownloadURL(item)
        setImageList((prev) => [...prev, url])
      });
      console.log(imageList);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getImage()
  }, [])
  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageList((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  console.log(imageList)

  return (
    <div className="App">
      <input type="file" onChange={(e) => { setImageUpload(e.target.files[0]) }} />

      <button onClick={uploadImage}>Upload Image</button>

      {imageList.map((url) => {
        return <img src={url} />
      })}
    </div>
  );
}

export default App;
