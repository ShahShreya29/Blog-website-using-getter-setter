var emailData = sessionStorage.getItem("ce");
var users = JSON.parse(localStorage.getItem("users")) || [];

// Find the user with the matching email
var user = users.find(function (user) {
  return user.email === emailData;
});
if (user) {
  var role = user.role;
  var name = user.name;
  sessionStorage.setItem("role", role);
}
let ur = sessionStorage.getItem("role");
console.log(ur);
welcomeHeading.innerHTML = `
  <h2 id="welcomeHeading">Welcome <span id="username">${user.name}</span>!</h2>`;
if (ur === "admin") {
  {
    function setLocalStorage() {
      const showBlog = document.querySelector("#blog");
      if (localStorage.getItem("blogs")) {
        showBlog.innerHTML = "";
        const arr = JSON.parse(localStorage.getItem("blogs"));
        if (arr.length > 0) {
          arr.forEach((blog, id) => {
            const div1 = document.createElement("div");
            div1.setAttribute("class", "one");
            const displayBlog = `
                        <div class="card" id="one" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${blog.title}</h5>
                                <p class="card-text">${blog.content}</p>
                                <button class="btn btn-warning m-2" onClick="editBlog(${id})">Edit</button>
                                <button class="btn btn-danger m-2" onClick="deleteBlog(${id})">Delete</button>
                            </div>
                        </div>
                    `;
            div1.insertAdjacentHTML("afterbegin", displayBlog);
            showBlog.insertAdjacentElement("afterbegin", div1);
          });
        } else {
          showBlog.innerHTML = `<div class="text-center noBlog" >No Blogs Yet</div>`;
        }
      } else {
        localStorage.setItem("blogs", JSON.stringify([]));
      }
    }

    // Invoke setLocalStorage after a delay
    setTimeout(setLocalStorage, 2);

    // Event listener for adding or updating a blog
    const submitBtn = document.querySelector("#add");
    submitBtn.addEventListener("click", addOrUpdateBlog);

    function addOrUpdateBlog(event) {
      event.preventDefault();

      const title = document.querySelector("#title").value;
      const content = document.querySelector("#content").value;

      if (title === "" || content === "") {
        alert("All fields are required.");
        return;
      }
      const arr = JSON.parse(localStorage.getItem("blogs"));
      const arrData = {
        title: title,
        content: content,
      };

      arr.push(arrData);
      localStorage.setItem("blogs", JSON.stringify(arr));
      document.querySelector("#title").value = "";
      document.querySelector("#content").value = "";

      setLocalStorage();
      alert("Blog added successfully.");
    }

    // Function to edit a blog
    function editBlog(id) {
      let arr = JSON.parse(localStorage.getItem("blogs")) || [];
      let title = arr[id].title;
      let content = arr[id].content;

      document.querySelector("#title").value = title;
      document.querySelector("#content").value = content;

      const submitBtn = document.querySelector("#add");
      submitBtn.innerText = "Update";

      submitBtn.removeEventListener("click", addOrUpdateBlog);
      submitBtn.addEventListener("click", function updateBlog(event) {
        event.preventDefault();

        const updatedTitle = document.querySelector("#title").value;
        const updatedContent = document.querySelector("#content").value;

        arr[id].title = updatedTitle;
        arr[id].content = updatedContent;

        localStorage.setItem("blogs", JSON.stringify(arr));

        document.querySelector("#title").value = "";
        document.querySelector("#content").value = "";

        submitBtn.innerText = "Add Blog";
        submitBtn.removeEventListener("click", updateBlog);
        submitBtn.addEventListener("click", addOrUpdateBlog);

        setLocalStorage();

        alert("Blog updated successfully.");
      });
    }

    // Function to delete a blog
    function deleteBlog(id) {
      let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      blogs.splice(id, 1);
      localStorage.setItem("blogs", JSON.stringify(blogs));
      setLocalStorage();
    }
  }
} else {
  document.getElementById("blogElement").style.display = "none";
  const showBlog = document.querySelector("#blog");
  if (localStorage.getItem("blogs")) {
    showBlog.innerHTML = "";
    const arr = JSON.parse(localStorage.getItem("blogs"));
    if (arr.length > 0) {
      arr.forEach((blog) => {
        const div1 = document.createElement("div");
        div1.setAttribute("class", "one");
        const displayBlog = `
              <div class="card" id="one" style="width: 18rem;">
                  <div class="card-body">
                      <h5 class="card-title">${blog.title}</h5>
                      <p class="card-text">${blog.content}</p>
                      </div>
              </div>
          `;
        div1.insertAdjacentHTML("afterbegin", displayBlog);
        showBlog.insertAdjacentElement("afterbegin", div1);
      });
    } else {
      showBlog.innerHTML = `<div class="text-center noBlog" >No Blogs Yet</div>`;
    }
  }
}
