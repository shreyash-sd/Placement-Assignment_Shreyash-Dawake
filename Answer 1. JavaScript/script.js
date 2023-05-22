// Fetch existing blog posts from the API
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => {
    const blogList = document.getElementById('blogList');
    posts.forEach(post => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="deleteBtn" data-id="${post.id}">Delete</button>
      `;
      blogList.appendChild(listItem);
    });
    
    // Attach event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', deletePost);
    });
  });

// Function to handle adding a new blog post
function addPost() {
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;

  if (title && body) {
    // Create new blog post object
    const newPost = {
      title: title,
      body: body
    };

    // Send a POST request to add the new post
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(post => {
      const blogList = document.getElementById('blogList');
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="deleteBtn" data-id="${post.id}">Delete</button>
      `;
      blogList.appendChild(listItem);
      
      // Attach event listener to the delete button of the new post
      const deleteButton = listItem.querySelector('.deleteBtn');
      deleteButton.addEventListener('click', deletePost);
      
      // Clear the input fields
      document.getElementById('title').value = '';
      document.getElementById('body').value = '';
    });
  }
}

// Function to handle deleting a blog post
function deletePost(event) {
  const postId = event.target.dataset.id;

  // Send a DELETE request to remove the post
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      // Remove the post from the UI
      const listItem = event.target.parentNode;
      listItem.remove();
    }
  });
}

// Attach event listener to the add button
document.getElementById('addBtn').addEventListener('click', addPost);
