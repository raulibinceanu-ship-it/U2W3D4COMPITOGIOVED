const API_KEY = "I4Rf3ZW27ACB7DO1wb0WnK3xNBVFRAD60hiVtMSdFEkxp1hCd9yH1tRg";
const album = document.getElementById("album");

function loadImages(query) {
  fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      album.innerHTML = "";
      data.photos.forEach((photo) => createCard(photo));
    });
}

function createCard(photo) {
  const col = document.createElement("div");
  col.classList.add("col-md-4", "mb-4");

  col.innerHTML = `
    <div class="card shadow-sm">
      <img src="${photo.src.medium}" class="card-img-top clickable" data-id="${photo.id}" data-photographer="${photo.photographer}" data-link="${photo.photographer_url}">
      <div class="card-body">
        <p class="card-text clickable" data-id="${photo.id}" data-photographer="${photo.photographer}" data-link="${photo.photographer_url}">
          ${photo.photographer}
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <button class="btn btn-sm btn-outline-danger hide-btn">Hide</button>
          <small class="text-muted">${photo.id}</small>
        </div>
      </div>
    </div>
  `;

  col.querySelector(".hide-btn").addEventListener("click", () => col.remove());

  col.querySelectorAll(".clickable").forEach((el) =>
    el.addEventListener("click", () => {
      const id = el.dataset.id;
      const photographer = el.dataset.photographer;
      const link = el.dataset.link;
      window.location.href = `detail.html?id=${id}&photographer=${photographer}&link=${link}`;
    })
  );

  album.appendChild(col);
}

document
  .getElementById("loadImages")
  .addEventListener("click", () => loadImages("hamsters"));
document
  .getElementById("loadSecondaryImages")
  .addEventListener("click", () => loadImages("tigers"));
document.getElementById("searchBtn").addEventListener("click", () => {
  const value = document.getElementById("searchInput").value.trim();
  if (value !== "") loadImages(value);
});
