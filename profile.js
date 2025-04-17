document.addEventListener("DOMContentLoaded", function () {
    const avatarInput = document.getElementById("avatarInput");
    if (avatarInput) {
      avatarInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            document.getElementById("avatarPreview").src = evt.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }
  });
  
 
  window.onload = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.email) return;
    const profile = JSON.parse(localStorage.getItem("userProfile_" + currentUser.email)) || {};
  
    document.getElementById("displayName").innerText = profile.name || "";
    document.getElementById("displayGender").innerText = profile.gender || "";
    document.getElementById("displayRole").innerText = profile.role || "";
    document.getElementById("displaySkills").innerText = profile.skills || "";
    document.getElementById("displayBio").innerText = profile.bio || "";
    document.getElementById("avatarImg").src = profile.avatar || "default-avatar.png";
  };
  
  function editProfile() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.email) return;
    const profile = JSON.parse(localStorage.getItem("userProfile_" + currentUser.email)) || {};
  
    document.getElementById("name").value = profile.name || "";
    document.getElementById("gender").value = profile.gender || "";
    document.getElementById("role").value = profile.role || "";
    document.getElementById("skills").value = profile.skills || "";
    document.getElementById("bio").value = profile.bio || "";
    document.getElementById("avatarPreview").src = profile.avatar || "default-avatar.png";
  
    document.getElementById("profileDisplay").classList.add("hidden");
    document.getElementById("profileForm").classList.remove("hidden");
  }
  
  function cancelEdit() {
    document.getElementById("profileForm").classList.add("hidden");
    document.getElementById("profileDisplay").classList.remove("hidden");
  }
  
  function saveProfile() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.email) return;
    const avatarPreview = document.getElementById("avatarPreview");
    const profile = {
      name: document.getElementById("name").value,
      gender: document.getElementById("gender").value,
      role: document.getElementById("role").value,
      skills: document.getElementById("skills").value,
      bio: document.getElementById("bio").value,
      avatar: avatarPreview.src
    };
    localStorage.setItem("userProfile_" + currentUser.email, JSON.stringify(profile));
    window.location.reload();
  }
  
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }
  
  function goToDiscover() {
    window.location.href = "discover.html";
  }
  