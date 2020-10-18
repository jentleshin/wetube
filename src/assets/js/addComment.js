import axios from "axios";
// eslint-disable-next-line
import regeneratorRuntime from "regenerator-runtime";

const addCommentForm = document.querySelector("#jsAddCommentForm");

let commentList;

const CLEAR_ICON = `<span class="material-icons"> clear </span>`;

const addFakeComment = (commentId, currentUserName, text) => {
  const li = document.createElement("li");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  const button = document.createElement("button");

  li.id = commentId;
  div1.innerText = currentUserName;
  div2.innerText = text;
  button.innerHTML = CLEAR_ICON;
  button.addEventListener("click", deleteComment);

  li.append(div1);
  li.append(div2);
  li.append(button);
  commentList.append(li);
};

const sendComment = async (text) => {
  const url = window.location.href;
  const videoId = url.split("videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/add-comment`,
    method: "POST",
    data: { text },
  });
  const {
    data: { currentUserName, commentId },
    status,
  } = response;
  if (status === 200) {
    addFakeComment(commentId, currentUserName, text);
  }
};

const deleteComment = async (event) => {
  const li = event.target.parentElement.parentElement;
  const commentId = li.id;
  const response = await axios({
    url: `/api/${commentId}/delete-comment`,
    method: "POST",
    data: { commentId },
  });
  if (response.status === 200) {
    li.remove();
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentTextArea = addCommentForm.querySelector("textArea");
  const text = commentTextArea.value;
  sendComment(text);
  commentTextArea.value = "";
};
const init = () => {
  commentList = document.querySelector("#jsCommentList");
  const buttons = commentList.querySelectorAll("button");
  addCommentForm.addEventListener("submit", handleSubmit);
  buttons.forEach((button) => {
    button.addEventListener("click", deleteComment);
  });
};
if (addCommentForm) {
  init();
}
