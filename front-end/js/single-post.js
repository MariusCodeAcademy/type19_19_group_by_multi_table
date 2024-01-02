/* eslint-disable strict */
'use strict';
console.log('single-post.js file was loaded');

const postId = 8;
const postUrl = 'http://localhost:3000/api/posts';

const els = {
  title: document.getElementById('title'),
  author: document.getElementById('author'),
  date: document.getElementById('date'),
  content: document.getElementById('content'),
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

  // jei yra komentaru tada rodyti comentaru bloka (id="comments-list-block")

  // komentaru bloke sugeneruoti komentarus is gautos informacijos
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
