const videoDetail = document.querySelector("#jsVideoDetail");

if (videoDetail) {
  const wrapper = videoDetail.querySelector("#jsVideoDetailWrapper");
  const comments = videoDetail.querySelector("#jsVideoComments");

  const resizeComments = () => {
    console.log(wrapper.offsetHeight);
    comments.style.height = `${wrapper.offsetHeight}px`;
  };

  document.addEventListener("DOMContentLoaded", function handleOnce() {
    resizeComments();
    document.removeEventListener("DOMContentLoaded", handleOnce());
  });
  window.addEventListener("resize", resizeComments);
}
