// const apiUrl = "http://localhost:3000"; // URL for the JSON Server

// document.addEventListener("DOMContentLoaded", () => {
//   if (document.getElementById("registerForm")) {
//     document
//       .getElementById("registerForm")
//       .addEventListener("submit", registerUser);
//   }
//   if (document.getElementById("loginForm")) {
//     document.getElementById("loginForm").addEventListener("submit", loginUser);
//   }
//   if (document.getElementById("logout")) {
//     document.getElementById("logout").addEventListener("click", logoutUser);
//   }
//   if (document.getElementById("username")) {
//     document.getElementById("username").innerText =
//       localStorage.getItem("username");
//   }
//   if (
//     localStorage.getItem("role") === "teacher" &&
//     document.getElementById("add-student")
//   ) {
//     document.getElementById("add-student").style.display = "block";
//     document
//       .getElementById("add-student")
//       .addEventListener("click", addStudentForm);
//   }
//   if (document.getElementById("student-list")) {
//     loadStudents();
//   }
// });

// function registerUser(event) {
//   event.preventDefault();
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   const role = document.getElementById("role").value;

//   fetch(`${apiUrl}/users`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password, role }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       alert("Registration successful");
//       window.location.href = "login.html";
//     })
//     .catch((error) => {
//       document.getElementById("error-message").innerText =
//         "Registration failed";
//     });
// }

// function loginUser(event) {
//   event.preventDefault();
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   fetch(`${apiUrl}/users?username=${username}&password=${password}`)
//     .then((response) => response.json())
//     .then((users) => {
//       if (users.length > 0) {
//         localStorage.setItem("username", users[0].username);
//         localStorage.setItem("role", users[0].role);
//         window.location.href = "landing.html";
//       } else {
//         document.getElementById("error-message").innerText =
//           "Username or password không đúng";
//       }
//     })
//     .catch((error) => {
//       document.getElementById("error-message").innerText = "Login failed";
//     });
// }

// function logoutUser() {
//   localStorage.removeItem("username");
//   localStorage.removeItem("role");
//   window.location.href = "index.html";
// }

// function loadStudents() {
//   fetch(`${apiUrl}/students`)
//     .then((response) => response.json())
//     .then((students) => {
//       const studentList = document.getElementById("student-list");
//       studentList.innerHTML = "";
//       students.forEach((student) => {
//         const studentItem = document.createElement("div");
//         studentItem.classList.add("student-item");
//         studentItem.innerHTML = `
//                 <span>${student.name}</span>
//                 ${
//                   localStorage.getItem("role") === "teacher"
//                     ? `
//                     <button class="edit-button" data-id="${student.id}"><i class="material-icons">edit</i></button>
//                     <button class="delete-button" data-id="${student.id}"><i class="material-icons">delete</i></button>
//                 `
//                     : ""
//                 }
//             `;
//         studentList.appendChild(studentItem);
//       });
//       attachStudentEventListeners();
//     })
//     .catch((error) => {
//       console.error("Error loading students:", error);
//     });
// }

// function addStudentForm() {
//   if (localStorage.getItem("role") !== "teacher") {
//     document.getElementById("error-message").innerText =
//       "Only teachers can add students.";
//     return;
//   }
//   const studentList = document.getElementById("student-list");
//   const studentForm = document.createElement("div");
//   studentForm.classList.add("student-item");
//   studentForm.innerHTML = `
//         <input type="text" id="new-student-name" placeholder="Student Name">
//         <button onclick="addStudent()">Add</button>
//     `;
//   studentList.appendChild(studentForm);
// }

// function addStudent() {
//   if (localStorage.getItem("role") !== "teacher") {
//     document.getElementById("error-message").innerText =
//       "Only teachers can add students.";
//     return;
//   }
//   const studentName = document.getElementById("new-student-name").value;

//   fetch(`${apiUrl}/students`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name: studentName }),
//   })
//     .then((response) => response.json())
//     .then((student) => {
//       loadStudents();
//     })
//     .catch((error) => {
//       console.error("Error adding student:", error);
//     });
// }

// function editStudent(id) {
//   const studentName = prompt("Enter new name for the student:");
//   if (studentName) {
//     fetch(`${apiUrl}/students/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: studentName }),
//     })
//       .then((response) => response.json())
//       .then((student) => {
//         loadStudents();
//       })
//       .catch((error) => {
//         console.error("Error editing student:", error);
//       });
//   }
// }

// function deleteStudent(id) {
//   if (confirm("Are you sure you want to delete this student?")) {
//     fetch(`${apiUrl}/students/${id}`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         loadStudents();
//       })
//       .catch((error) => {
//         console.error("Error deleting student:", error);
//       });
//   }
// }

// function attachStudentEventListeners() {
//   const editButtons = document.querySelectorAll(".edit-button");
//   editButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       editStudent(button.getAttribute("data-id"));
//     });
//   });

//   const deleteButtons = document.querySelectorAll(".delete-button");
//   deleteButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       deleteStudent(button.getAttribute("data-id"));
//     });
//   });
// }
const apiUrl = "http://localhost:3000"; // URL for the JSON Server

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  displayUsername();
  toggleAddStudentButton();
  loadStudents();
});

function setupEventListeners() {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const logoutButton = document.getElementById("logout");
  const addStudentButton = document.getElementById("add-student");

  if (registerForm) {
    registerForm.addEventListener("submit", registerUser);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", logoutUser);
  }

  if (addStudentButton && localStorage.getItem("role") === "teacher") {
    addStudentButton.style.display = "block";
    addStudentButton.addEventListener("click", addStudentForm);
  }
}

function displayUsername() {
  const username = localStorage.getItem("username");
  if (username && document.getElementById("username")) {
    document.getElementById("username").innerText = username;
  }
}

function toggleAddStudentButton() {
  if (
    localStorage.getItem("role") === "teacher" &&
    document.getElementById("add-student")
  ) {
    document.getElementById("add-student").style.display = "block";
  }
}

function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
  })
    .then((response) => response.json())
    .then(() => {
      alert("Registration successful");
      window.location.href = "login.html";
    })
    .catch(() => {
      document.getElementById("error-message").innerText =
        "Registration failed";
    });
}

function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(`${apiUrl}/users?username=${username}&password=${password}`)
    .then((response) => response.json())
    .then((users) => {
      if (users.length > 0) {
        localStorage.setItem("username", users[0].username);
        localStorage.setItem("role", users[0].role);
        window.location.href = "landing.html";
      } else {
        document.getElementById("error-message").innerText =
          "Username or password incorrect";
      }
    })
    .catch(() => {
      document.getElementById("error-message").innerText = "Login failed";
    });
}

function logoutUser() {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  window.location.href = "index.html";
}

function loadStudents() {
  fetch(`${apiUrl}/students`)
    .then((response) => response.json())
    .then((students) => {
      const studentList = document.getElementById("student-list");
      studentList.innerHTML = "";
      students.forEach((student) => {
        const studentItem = document.createElement("div");
        studentItem.classList.add("student-item");
        studentItem.innerHTML = `
          <span>${student.name}</span>
          ${
            localStorage.getItem("role") === "teacher"
              ? `
                <button class="edit-button" data-id="${student.id}">
                  <i class="material-icons">edit</i>
                </button>
                <button class="delete-button" data-id="${student.id}">
                  <i class="material-icons">delete</i>
                </button>
              `
              : ""
          }
        `;
        studentList.appendChild(studentItem);
      });
      attachStudentEventListeners();
    })
    .catch((error) => {
      console.error("Error loading students:", error);
    });
}

function addStudentForm() {
  if (localStorage.getItem("role") !== "teacher") {
    document.getElementById("error-message").innerText =
      "Only teachers can add students.";
    return;
  }
  const studentList = document.getElementById("student-list");
  const studentForm = document.createElement("div");
  studentForm.classList.add("student-item");
  studentForm.innerHTML = `
    <input type="text" id="new-student-name" placeholder="Student Name">
    <button onclick="addStudent()">Add</button>
  `;
  studentList.appendChild(studentForm);
}

function addStudent() {
  if (localStorage.getItem("role") !== "teacher") {
    document.getElementById("error-message").innerText =
      "Only teachers can add students.";
    return;
  }
  const studentName = document.getElementById("new-student-name").value;

  fetch(`${apiUrl}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: studentName }),
  })
    .then((response) => response.json())
    .then(() => {
      loadStudents();
    })
    .catch((error) => {
      console.error("Error adding student:", error);
    });
}

function editStudent(id) {
  const studentName = prompt("Enter new name for the student:");
  if (studentName) {
    fetch(`${apiUrl}/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: studentName }),
    })
      .then((response) => response.json())
      .then(() => {
        loadStudents();
      })
      .catch((error) => {
        console.error("Error editing student:", error);
      });
  }
}

function deleteStudent(id) {
  if (confirm("Are you sure you want to delete this student?")) {
    fetch(`${apiUrl}/students/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        loadStudents();
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  }
}

function attachStudentEventListeners() {
  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      editStudent(button.getAttribute("data-id"));
    });
  });

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      deleteStudent(button.getAttribute("data-id"));
    });
  });
}
