const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".nav");
const gallery = document.querySelector(".gallery");

function toggleMenu() {
      menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

function handleResize() {
    if (window.innerWidth > 1000) {
        menu.classList.remove("hide");
    } else {
        menu.classList.add("hide");
    }
}

handleResize();
window.addEventListener("resize", handleResize);

function openModal(event) {
    const clickedImage = event.target.closest("img");
    if (!clickedImage) return;
    const src = clickedImage.src;
    const alt = clickedImage.alt;
    const baseName = src.split("-")[0];
    const fullSrc = baseName + "-full.jpeg";

    let modal = document.querySelector("dialog");
    if (!modal) {
        modal = document.createElement("dialog");
        modal.innerHTML = `<img><button class='close-viewer'>X</button>`;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector(".close-viewer");
        closeButton.addEventListener("click", () => {
            modal.close();
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });

        modal.addEventListener("close", () => {
            document.body.classList.remove("modal-open");
        });
    }

    const modalImage = modal.querySelector("img");
    modalImage.src = fullSrc;
    modalImage.alt = alt;

    document.body.classList.add("modal-open");
    modal.showModal();
}


gallery.addEventListener("click", openModal);
