const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");

const profileBox = document.getElementById("profileBox");

searchBtn.addEventListener("click", async () => {

  const username = document
    .getElementById("username")
    .value
    .trim();

  if(username === ""){
    alert("Please enter username");
    return;
  }

  loading.style.display = "block";

  profileBox.style.display = "none";

  try{

    const response = await fetch(
      `https://api.github.com/users/${username}`
    );

    const data = await response.json();

    if(data.message === "Not Found"){
      alert("User Not Found");
      loading.style.display = "none";
      return;
    }

    document.getElementById("avatar").src =
      data.avatar_url;

    document.getElementById("name").innerText =
      data.name || data.login;

    document.getElementById("bio").innerText =
      data.bio || "No Bio Available";

    document.getElementById("followers").innerText =
      data.followers;

    document.getElementById("following").innerText =
      data.following;

    document.getElementById("repos").innerText =
      data.public_repos;

    document.getElementById("location").innerText =
      data.location || "Location Not Available";

    document.getElementById("profileLink").href =
      data.html_url;

    loading.style.display = "none";

    profileBox.style.display = "block";

  }

  catch(error){

    loading.style.display = "none";

    alert("Something went wrong");

  }

});