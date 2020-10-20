import ResizeObserver from "resize-observer-polyfill";
const videoDetail = document.querySelector("#jsVideoDetail");

if (videoDetail) {
  const wrapper = videoDetail.querySelector("#jsVideoDetailWrapper");
  const comments = videoDetail.querySelector("#jsVideoComments");
  let timer = null;
  let delay = 500;
  const resizeComments = () => {
    console.log(wrapper.offsetHeight);
    comments.style.height = `${wrapper.offsetHeight}px`;
  };

  document.addEventListener("DOMContentLoaded", function handleOnce() {
    resizeComments();
    document.removeEventListener("DOMContentLoaded", handleOnce);
  });

  const ro = new ResizeObserver((entries, observer) => {
    for (const entry of entries) {
      const { height } = entry.contentRect;
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log(height);
        comments.style.height = `${height + 2}px`;
      }, delay);
    }
  });
  ro.observe(wrapper);
}
