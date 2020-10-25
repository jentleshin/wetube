const upload = document.querySelector("#jsUpload");

if (upload) {
  const fileInput = upload.querySelector("#file");
  const video = upload.querySelector("#jsVideoContainer video");
  const recordButton = upload.querySelector("#jsRecordButton");
  // let mediaRecorder;

  //upload video
  fileInput.addEventListener("input", () => {
    const videoFile = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
      video.src = e.target.result;
    };

    reader.readAsDataURL(videoFile);
  });

  //record video
  const createStream = () => {
    const stream = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: { min: 1280, ideal: 1280, max: 1920 },
        height: { min: 720, ideal: 720, max: 1080 },
      },
    });
    return stream;
  };
  const createMediaRecorder = (stream) => {
    const options = { mimeType: "video/webm; codecs=vp9" };
    const mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = function uploadVideo(even) {
      const recordedSourceUrl = URL.createObjectURL(even.data);
      video.srcObject = null;
      video.src = recordedSourceUrl;
      video.muted = false;
      download(recordedSourceUrl, "recordedVideo.webm");
    };
    return mediaRecorder;
  };
  const download = (fileSourceUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileSourceUrl;
    link.download = fileName;
    document.body.append(link);
    link.click();
  };
  const startRecord = async () => {
    try {
      //set stream
      const stream = await createStream();

      //play stream
      video.srcObject = stream;
      video.play();
      video.muted = true;

      //start recording
      const mediaRecorder = createMediaRecorder(stream);
      mediaRecorder.start();

      //change button
      recordButton.value = "Stop Recording";
      recordButton.addEventListener("click", function stopRecordWrapper() {
        stopRecord(stream, mediaRecorder);
        recordButton.removeEventListener("click", stopRecordWrapper);
      });
    } catch (error) {
      console.log(error);
      recordButton.value = "Permission needed.";
    } finally {
      recordButton.removeEventListener("click", startRecord);
    }
  };
  const stopRecord = (stream, mediaRecorder) => {
    //Stop Recording
    mediaRecorder.stop();

    //stop stream
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());

    //Change Button
    recordButton.value = "Record Video";
    recordButton.addEventListener("click", startRecord);
  };
  recordButton.addEventListener("click", startRecord);
}
