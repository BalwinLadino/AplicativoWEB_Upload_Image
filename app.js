const imagePreview = document.getElementById('img-preview');
const imageUploader = document.getElementById('img-uploader');
const imageUploadbar = document.getElementById('img-upload-bar');

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dufwzfdvm/image/upload';
const CLOUDINARY_UPLOAD_PRESET='bprz0xrh';

imageUploader.addEventListener('change', async (e) => {
   const file = e.target.files[0];
   const formData = new FormData();
   formData.append('file', file);
   formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

   const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      },
      onUploadProgress(e){
         console.log(Math.round((e.loaded * 100) / e.total));
         const progress =  (e.loaded * 100) / e.total;
         imageUploadbar.setAttribute('value', progress);
}
   });
   console.log(res);
   imagePreview.src = res.data.secure_url;
});

