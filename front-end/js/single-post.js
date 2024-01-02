/* eslint-disable strict */
'use strict';
console.log('single-post.js file was loaded');

const postId = 8;
const postUrl = 'http://localhost:3000/api/posts';
const commentUrl = 'http://localhost:3000/api/comments/post';

const els = {
  title: document.getElementById('title'),
  author: document.getElementById('author'),
  date: document.getElementById('date'),
  content: document.getElementById('content'),
  commentBlock: document.getElementById('comments-list-block'),
  commentsList: document.getElementById('comments-list-el'),
};
console.log('els ===', els);
// parsiusti posta kurio id yra postId
(async () => {
  const [currentPostObj, error] = await getDataFetch(`${postUrl}/${postId}`);
  console.log('error ===', error);

  console.log('currentPostObj ===', currentPostObj);
  // surasyti reiksmes
  fillPostDataHtml(currentPostObj);
  // parsiusti komentarus skirtus tam postui (getDataFetch)
  const [commentsArr, commError] = await getDataFetch(
    `${commentUrl}/${postId}`
  );
  console.log('commentsArr ===', commError);
  console.log('commentsArr ===', commentsArr);
  // jei yra komentaru tada rodyti comentaru bloka (id="comments-list-block")
  if (commentsArr.length === 0) {
    return;
  }
  els.commentBlock.classList.remove('d-none');
  els.commentsList.innerHTML = '';
  // komentaru bloke sugeneruoti komentarus is gautos informacijos
  commentsArr.forEach((oneCommObj) => {
    // pagaminti el
    const commEl = makeOneCommentEl(oneCommObj);
    // ideti i sarasa
    els.commentsList.append(commEl);
  });
})();

// supildyti html reiksmes su post informacija
function fillPostDataHtml(postObj) {
  els.title.textContent = postObj.title;
  els.author.textContent = postObj.author;
  els.content.textContent = postObj.body;
  const formatedDate = new Date(postObj.date).toLocaleDateString('lt-LT', {
    dateStyle: 'long',
  });
  els.date.textContent = formatedDate;
}

/*
<li class="col-md-6">
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">Author</h5>
      <h6 class="card-subtitle mb-2 text-muted">Date</h6>
      <p class="card-text">Comment</p>
    </div>
  </div>
</li>
*/

// make One comment html el
function makeOneCommentEl(commObj) {
  console.log('commObj ===', commObj);
  const liEl = document.createElement('li');
  liEl.classList.add('col-md-6');
  liEl.innerHTML = `
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">${commObj.author}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${
        commObj.created_at.split('T')[0]
      }</h6>
      <p class="card-text">${commObj.content}</p>
    </div>
  </div>
  `;
  return liEl;
}

// helper fetch fn

async function getDataFetch(url) {
  try {
    const resp = await fetch(url);
    if (resp.ok === false) {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: resp.status,
        message: resp.statusText,
      };
    }
    const data = await resp.json();
    return [data, null];
  } catch (error) {
    console.log('error getDataFetch ===', error);
    return [null, error];
  }
}
