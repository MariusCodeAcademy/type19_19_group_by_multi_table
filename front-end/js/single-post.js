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
})();

// supildyti html reiksmes su post informacija

// parsiusti komentarus skirtus tam postui

// jei yra komentaru tada rodyti comentaru bloka

// komentaru bloke sugeneruoti komentarus

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
