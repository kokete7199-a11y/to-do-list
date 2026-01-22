const API_URL = "https://jsonplaceholder.typicode.com/posts";
const postsDiv = document.getElementById("posts");
const form = document.getElementById("postForm");
const loading = document.getElementById("loading");

// GET
async function getPosts() {
  try {
    loading.textContent = "جاري المعالجة...";
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    showPosts(data.slice(0, 10));
  } catch (err) {
    alert("Error loading posts");
  } finally {
    loading.textContent = "";
  }
}

// SHOW
function showPosts(posts) {
  postsDiv.innerHTML = "";
  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <button onclick="editPost(${post.id}, this)">Edit</button>
      <button onclick="deletePost(${post.id}, this)">Delete</button>
    `;
    postsDiv.appendChild(div);
  });
}

// POST
form.onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, body })
    });

    if (res.status !== 201) throw new Error();

    const newPost = await res.json();
    addPostToDOM(newPost);
    form.reset();
  } catch {
    alert("Error adding post");
  }
};

function addPostToDOM(post) {
  const div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <button onclick="editPost(${post.id}, this)">Edit</button>
    <button onclick="deletePost(${post.id}, this)">Delete</button>
  `;
  postsDiv.prepend(div);
}

// PUT
async function editPost(id, btn) {
  const newTitle = prompt("Enter new title");
  if (!newTitle) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: newTitle })
    });

    if (!res.ok) throw new Error();

    btn.parentElement.querySelector("h3").textContent = newTitle;
  } catch {
    alert("Error updating post");
  }
}

// DELETE
async function deletePost(id, btn) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error();

    btn.parentElement.remove();
  } catch {
    alert("Error deleting post");
  }
}

// INIT
getPosts();
