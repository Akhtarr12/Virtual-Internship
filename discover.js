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
            }
          ,
          {
            id: "mentor5",
            name: "samuel Lee",
           
              role: "Mentor",
              skills: "Artificial Intelligence, Deep Learning, TensorFlow",
              bio: "AI researcher and practitioner with a focus on computer vision and natural language processing.",
              avatar: "https://randomuser.me/api/portraits/men/67.jpg"
            }
            ,  {
                id: "mentor6",
                name: "Sohail Akhtar",
                role: "Mentor",
                  skills: "Product Management, Agile, Scrum",
                  bio: "Product leader specializing in agile methodologies and building successful digital products.",
                  avatar: "https://randomuser.me/api/portraits/women/35.jpg"
                }
              ,
              {
                id: "mentor7",
                name: "Anand Kumar",
                role: "Mentor",
                  skills: "DevOps, Cloud Computing, AWS",
                  bio: "DevOps engineer with extensive experience in AWS infrastructure and CI/CD pipelines.",
                  avatar: "https://randomuser.me/api/portraits/men/45.jpg"
                }
                ,{
                    id: "mentor8",
                    name: "Caroline Lee",
                    role: "Mentor",
                      skills: "Data Science, Python, Machine Learning",
                      bio: "Senior data scientist with 5+ years experience, passionate about mentoring aspiring data professionals.",
                      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
                    }
                  ,
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
            }
          ,
          {
            id: "mentee5",
            name: "sam ali",
            role: "Mentee",
              skills: "Java, Android Development",
              bio: "Engineering student passionate about mobile app development.",
              avatar: "https://randomuser.me/api/portraits/men/42.jpg"
            }
          ,
          {
            id: "mentee6",
            name: "Neha Sharma",
            role: "Mentee",
              skills: "Data Analysis, Excel, SQL",
              bio: "Business analyst looking to transition into data science.",
              avatar: "https://randomuser.me/api/portraits/women/33.jpg"
            }
          
      
  ];
  
 
  const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  const userRole = userProfile.role || "Mentee"; 
  const showRole = userRole === "Mentor" ? "Mentee" : "Mentor";
  
  document.getElementById("discoverHeading").textContent = `Discover ${showRole}s`;
  document.getElementById("searchInput").placeholder = `Search in the world of ${showRole.toLowerCase()}s`;
  
  let allUsers = showRole === "Mentor" ? mentors : mentees;
  let filteredUsers = allUsers.slice();
  
  function renderUsers(users) {
    const usersGrid = document.getElementById("usersList");
    usersGrid.innerHTML = "";
    if (users.length === 0) {
      usersGrid.innerHTML = "<p>No users found</p>";
      return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    const requests = JSON.parse(localStorage.getItem("connectionRequests")) || [];
  
    users.forEach(user => {
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
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
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
  
  document.getElementById("searchBtn").addEventListener("click", function() {
    const term = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!term) {
      filteredUsers = allUsers.slice();
    } else {
      filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.skills.toLowerCase().includes(term) ||
        user.bio.toLowerCase().includes(term)
      );
    }
    renderUsers(filteredUsers);
  });
  
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }
  
  
  renderUsers(filteredUsers);
  

  

  