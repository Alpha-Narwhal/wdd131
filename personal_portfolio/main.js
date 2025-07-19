import projects from './projects.mjs';

function projectTemplate(project, index) {
  const layoutClass = (index % 2 === 0) ? 'project-left' : 'project-right';

  return `
    <article class="project-card ${layoutClass}" id="project-${project.id}">
      <h2 class="project-title">${project.title}</h2>
      <div class="project-image-link">
        <img 
          class="project-image" 
          src="${project.image}" 
          alt="${project.title} screenshot" 
        />
      </div>
      <div class="project-text">
        <p class="project-description">${project.description}</p>
        <a href="${project.projectLink}" target="_blank" rel="noopener noreferrer" class="project-button">Go Take a Look!</a>
      </div>
    </article>
    ${index < projects.length - 1 ? '<hr class="solid-line" />' : ''}
  `;
}

function renderProjects(projectList) {
  const container = document.getElementById('project-container');
  const html = projectList.map(projectTemplate).join('');
  container.innerHTML = html;
}

function setupModal() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');

  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('project-image')) {
      modalImg.src = e.target.src;
      modal.classList.remove('hidden');
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modalImg.src = '';
    }
  });
}

function init() {
  renderProjects(projects);
  setupModal();
}

init();
