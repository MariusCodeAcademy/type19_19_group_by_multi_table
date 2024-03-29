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
  console.log('pObj ===', pObj);
  const liEl = document.createElement('li');
  liEl.className = 'col-md-6 col-lg-4';

  const cardFooter = `
  <div class="card-footer ">
    <p class="lead mb-0">Comments: ${pObj.comment_count}</p>
  </div>
  `;

  let postBody = `
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">${pObj.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${pObj.date.split('T')[0]}</h6>
      <p class="card-text">${pObj.author}</p>
      <a href="single-post.html?postId=${
        pObj.post_id
      }" class="btn btn-primary">Read more</a>
    </div>
    ${pObj.comment_count > 0 ? cardFooter : ''}
  </div>  
  `;

  liEl.innerHTML = postBody;
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
