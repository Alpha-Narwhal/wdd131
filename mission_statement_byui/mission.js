const themeSelector = document.querySelector('#mode-select'); 

function changeTheme() {
    const mode = themeSelector.value
    const body = document.body;
    const logo = document.querySelector('img');

    if (mode === "dark") {
        body.id = 'dark';
        logo.src = 'byui-logo_white.png'; 
    } else {
        body.removeAttribute('id');
        logo.src = 'byui-logo.webp';
    }
}

themeSelector.addEventListener('change', changeTheme);
