'use strict';
console.log('front.js file was loaded');

const postUrl = 'http://localhost:3000/api/posts';

const postsList = document.getElementById('posts-list');

// parisiusti visus postus

(async () => {
  const [postsArr, error] = await getDataFetch(postUrl);

  console.log('error ===', error);

  console.log('postsArr ===', postsArr);
  const elsArr = postsArr.map(makeSinglePost);
  console.log('elsArr ===', elsArr);
  postsList.append(...elsArr);
})();

// sugeneruoti juos htmle

function makeSinglePost(pObj) {
  const liEl = document.createElement('li');
  liEl.className = 'col-md-6 col-lg-4';
  liEl.innerHTML = `
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">Title</h5>
      <h6 class="card-subtitle mb-2 text-muted">Date</h6>
      <p class="card-text">autorius</p>
      <a href="#" class="btn btn-primary">Read more</a>
    </div>
    <div class="card-footer">
      <p class="lead mb-0">Comments: 6</p>
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
