document.getElementById("show-login").onclick = () => {
  document.getElementById("login-form").classList.remove("hidden");
  document.getElementById("signup-form").classList.add("hidden");
  document.getElementById("show-login").classList.add("active");
  document.getElementById("show-signup").classList.remove("active");
};

document.getElementById("show-signup").onclick = () => {
  document.getElementById("signup-form").classList.remove("hidden");
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("show-signup").classList.add("active");
  document.getElementById("show-login").classList.remove("active");
};

function signUp() {
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim().toLowerCase();
  const password = document.getElementById("signup-password").value;

  if (!name || !email || !password) return alert("Please fill all fields.");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.email === email)) {
    return alert("User already exists.");
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created! Please log in.");
  document.getElementById("show-login").click();
}

function signIn() {
  const email = document.getElementById("login-email").value.trim().toLowerCase();
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return alert("Invalid email or password.");

  const profile = JSON.parse(localStorage.getItem("userProfile_" + email)) || {};

   const currentUser = {
    name: user.name,
    email: user.email,
    role: profile.role || "Mentee" 
  };

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  
  alert("Logged in successfully!");
  window.location.href = "profile.html";
}

