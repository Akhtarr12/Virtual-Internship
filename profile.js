window.onload = () => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    if (profile) {
      document.getElementById("displayName").innerText = profile.name;
      document.getElementById("displayGender").innerText = profile.gender;
      document.getElementById("displayRole").innerText = profile.role;
      document.getElementById("displaySkills").innerText = profile.skills;
      document.getElementById("displayBio").innerText = profile.bio;
    }
  };
  
  function editProfile() {
    const profile = JSON.parse(localStorage.getItem("userProfile")) || {};
    document.getElementById("name").value = profile.name || "";
    document.getElementById("gender").value = profile.gender || "";
    document.getElementById("role").value = profile.role || "";
    document.getElementById("skills").value = profile.skills || "";
    document.getElementById("bio").value = profile.bio || "";
  
    document.getElementById("profileDisplay").classList.add("hidden");
    document.getElementById("profileForm").classList.remove("hidden");
  }
  
  function cancelEdit() {
    document.getElementById("profileForm").classList.add("hidden");
    document.getElementById("profileDisplay").classList.remove("hidden");
  }
  
  function saveProfile() {
    const profile = {
      name: document.getElementById("name").value,
      gender: document.getElementById("gender").value,
      role: document.getElementById("role").value,
      skills: document.getElementById("skills").value,
      bio: document.getElementById("bio").value,
    };
  
    localStorage.setItem("userProfile", JSON.stringify(profile));
    window.location.reload(); 
  }
  
  function logout() {
    localStorage.clear();
    window.location.href = "login.html";
  }
  
  function goToDiscover() {
    window.location.href = "discover.html"; 
  }
  