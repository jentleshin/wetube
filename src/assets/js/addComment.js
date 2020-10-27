// eslint-disable-next-line
import regeneratorRuntime from "regenerator-runtime";

import axios from "axios";
import { oneLineTrim } from "common-tags";
const addCommentForm = document.querySelector("#jsAddCommentForm");

let commentList;

const CLEAR_ICON = `<span class="material-icons md-18"> clear </span>`;

const addFakeComment = (commentId, currentUserName, avatarUrl, text) => {
  const li = document.createElement("li");
  const button = document.createElement("button");

  li.id = commentId;
  li.innerHTML = oneLineTrim`
  <div class="avatar">
    <div class="avatar__wrapper"><img src="${avatarUrl}"/></div>
  </div>
  <div class="videoComments__content">
    <span class="videoComments__creator">${currentUserName}</span>
    &nbsp&nbsp
    <span class="videoComments__text">${text}</span>
  </div>
  `;
  button.innerHTML = CLEAR_ICON;
  button.addEventListener("click", deleteComment);
  li.append(button);
  commentList.append(li);
  commentList.scrollTo(0, commentList.scrollHeight);
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
    data: { avatarUrl, currentUserName, commentId },
    status,
  } = response;
  if (status === 200) {
    addFakeComment(commentId, currentUserName, avatarUrl, text);
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
