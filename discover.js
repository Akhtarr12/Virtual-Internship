const mentors = [
  {
    id: "mentor1",
    name: "Ayesha Khan",
    role: "Mentor",
    skills: "Data Science, Python, ML",
    bio: "5+ years experience in machine learning and data analytics.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "mentor2",
    name: "Rahul Sharma",
    role: "Mentor",
    skills: "Web Development, JavaScript, React",
    bio: "Full stack developer and coding mentor.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "mentor3",
    name: "Vikram Patel",
    role: "Mentor",
    skills: "Mobile App Development, Flutter, React Native",
    bio: "Mobile app developer who has published over 15 apps on App Store and Google Play.",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg"
  },
  {
    id: "mentor4",
    name: "Zoya Mirza",
    role: "Mentor",
    skills: "Digital Marketing, SEO, Content Strategy",
    bio: "Digital marketing expert who has worked with startups and Fortune 500 companies.",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg"
  },
  {
    id: "mentor5",
    name: "samuel Lee",
    role: "Mentor",
    skills: "Artificial Intelligence, Deep Learning, TensorFlow",
    bio: "AI researcher and practitioner with a focus on computer vision and natural language processing.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    id: "mentor6",
    name: "Sohail Akhtar",
    role: "Mentor",
    skills: "Product Management, Agile, Scrum",
    bio: "Product leader specializing in agile methodologies and building successful digital products.",
    avatar: "https://randomuser.me/api/portraits/women/35.jpg"
  },
  {
    id: "mentor7",
    name: "Anand Kumar",
    role: "Mentor",
    skills: "DevOps, Cloud Computing, AWS",
    bio: "DevOps engineer with extensive experience in AWS infrastructure and CI/CD pipelines.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: "mentor8",
    name: "Caroline Lee",
    role: "Mentor",
    skills: "Data Science, Python, Machine Learning",
    bio: "Senior data scientist with 5+ years experience, passionate about mentoring aspiring data professionals.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "mentor9",
    name: "Jack Smith",
    role: "Mentor",
    skills: "Web Development, JavaScript, React",
    bio: "Full stack developer with 7 years experience specializing in React and Node.js ecosystems.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  }
];

const mentees = [
  {
    id: "mentee1",
    name: "Michelle Wong",
    role: "Mentee",
    skills: "UI Design, Sketch",
    bio: "Design student passionate about creating intuitive user experiences.",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg"
  },
  {
    id: "mentee2",
    name: "Carlos Rodriguez",
    role: "Mentee",
    skills: "HTML, CSS, JavaScript",
    bio: "Self-taught developer looking to improve.",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    id: "mentee3",
    name: "Mohammed Ali",
    role: "Mentee",
    skills: "JavaScript, HTML, CSS",
    bio: "Self-taught developer looking to break into professional web development.",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg"
  },
  {
    id: "mentee4",
    name: "Aisha Kapoor",
    role: "Mentee",
    skills: "Content Writing, Social Media",
    bio: "Communications graduate looking to specialize in digital marketing.",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg"
  },
  {
    id: "mentee5",
    name: "sam ali",
    role: "Mentee",
    skills: "Java, Android Development",
    bio: "Engineering student passionate about mobile app development.",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg"
  },
  {
    id: "mentee6",
    name: "Neha Sharma",
    role: "Mentee",
    skills: "Data Analysis, Excel, SQL",
    bio: "Business analyst looking to transition into data science.",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg"
  }
];

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
console.log("Current user:", currentUser);

let usersToShow = [];
let oppositeRoleLabel = "";


if (currentUser.role === "Mentor") {
  usersToShow = mentees;
  oppositeRoleLabel = "Mentee";
  console.log("User is a Mentor, showing Mentees");
} 

else if (currentUser.role === "Mentee") {
  usersToShow = mentors;
  oppositeRoleLabel = "Mentor";
  console.log("User is a Mentee, showing Mentors");
}
else {
  usersToShow = mentors;  
  oppositeRoleLabel = "Mentor";
  console.log("User role not recognized, defaulting to show Mentors");
}

console.log("User role:", currentUser.role);
console.log("Showing role:", oppositeRoleLabel);
console.log("Users to display count:", usersToShow.length);

document.getElementById("discoverHeading").textContent = `Discover ${oppositeRoleLabel}s`;
document.getElementById("searchInput").placeholder = `Search in the world of ${oppositeRoleLabel.toLowerCase()}s`;

let filteredUsers = usersToShow.slice();
const itemsPerPage = 4;
let currentPage = 1;
let totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

function renderUsers(users, page = 1) {
  const usersGrid = document.getElementById("usersList");
  usersGrid.innerHTML = "";
  
  if (users.length === 0) {
    usersGrid.innerHTML = "<p>No users found</p>";
    document.getElementById("prevBtn").disabled = true;
    document.getElementById("nextBtn").disabled = true;
    document.getElementById("pageInfo").textContent = "Page 0 of 0";
    return;
  }
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, users.length);
  const paginatedUsers = users.slice(startIndex, endIndex);

  document.getElementById("prevBtn").disabled = page <= 1;
  document.getElementById("nextBtn").disabled = page >= Math.ceil(users.length / itemsPerPage);
  document.getElementById("pageInfo").textContent = `Page ${page} of ${Math.ceil(users.length / itemsPerPage)}`;
  
  const requests = JSON.parse(localStorage.getItem("connectionRequests")) || [];

  paginatedUsers.forEach(user => {
    const alreadyRequested = requests.some(req =>
      req.targetId === user.id &&
      req.senderId === currentUser.id &&
      req.status === "pending"
    );

    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <img class="user-avatar" src="${user.avatar}" alt="${user.name}">
      <div class="user-name">${user.name}</div>
      <div class="user-role">${user.role}</div>
      <div class="user-skills">Skills: ${user.skills}</div>
      <div class="user-bio">${user.bio}</div>
      <button class="request-btn" data-userid="${user.id}" ${alreadyRequested ? 'disabled' : ''}>
        ${alreadyRequested ? 'Requested' : 'Request Connection'}
      </button>
    `;
    usersGrid.appendChild(card);
  });

  document.querySelectorAll(".request-btn").forEach(btn => {
    if (!btn.disabled) {
      btn.addEventListener("click", function() {
        const userId = this.getAttribute("data-userid");
        sendConnectionRequest(userId, this);
      });
    }
  });
}

function sendConnectionRequest(userId, button) {
  const requests = JSON.parse(localStorage.getItem("connectionRequests")) || [];
  requests.push({
    id: Date.now().toString(),
    senderId: currentUser.id,
    targetId: userId,
    status: "pending",
    timestamp: new Date().toISOString()
  });
  localStorage.setItem("connectionRequests", JSON.stringify(requests));
  button.disabled = true;
  button.textContent = "Requested";
  alert("Connection request sent!");
}

document.getElementById("prevBtn").addEventListener("click", function() {
  if (currentPage > 1) {
    currentPage--;
    renderUsers(filteredUsers, currentPage);
  }
});

document.getElementById("nextBtn").addEventListener("click", function() {
  if (currentPage < Math.ceil(filteredUsers.length / itemsPerPage)) {
    currentPage++;
    renderUsers(filteredUsers, currentPage);
  }
});

document.getElementById("searchBtn").addEventListener("click", function() {
  const term = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!term) {
    filteredUsers = usersToShow.slice();
  } else {
    filteredUsers = usersToShow.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.skills.toLowerCase().includes(term) ||
      user.bio.toLowerCase().includes(term)
    );
  }
  currentPage = 1; 
  renderUsers(filteredUsers, currentPage);
});

document.getElementById("searchInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

renderUsers(filteredUsers, currentPage);
