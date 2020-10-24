const upload = document.querySelector("#jsUpload");

if (upload) {
  const fileInput = upload.querySelector("#file");
  const video = upload.querySelector("#jsVideoContainer video");
  fileInput.addEventListener("input", () => {
    const videoFile = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
      video.src = e.target.result;
    };

    reader.readAsDataURL(videoFile);
  });
}
