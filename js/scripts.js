(async () => {
    try { 
        const [aboutResult, projectsResult] = await Promise.all([
            getAboutData(),
            getProjectsData(),
        ]);
    createAboutMeContainer(aboutResult);
    createProjectsContainer(projectsResult);
}   catch (err) {
    console.error("Failed: ", err);
}
})();

async function getAboutData() {
    const url = "./data/aboutMeData.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    }   catch (error) {
        console.error(error.message);
    }
}

const createAboutMeContainer = (aboutResult) => {
    const aboutMeContainer = document.getElementById("aboutMe");
    if (aboutMeContainer && aboutResult) {
        const aboutParagraph = document.createElement("p");
        aboutParagraph.textContent = aboutResult.aboutMe;
        aboutMeContainer.appendChild(aboutParagraph);
        const aboutImage = document.createElement("img");
        aboutImage.src = aboutResult.headshot;
        const aboutImageContainer = document.createElement("div");
        aboutImageContainer.className = "headshotContainer";
        aboutImageContainer.appendChild(aboutImage);
        aboutMeContainer.appendChild(aboutImageContainer);
    }
};

async function getProjectsData() {
    const url = "./data/projectsData.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }
        return await response.json();
    }   catch (error) {
        console.error(error.message);
    }
}

const createSpotlight = (project) => {
    const spotlightContainer = document.getElementById("projectSpotlight");
    const spotlightTitles = document.getElementById("spotlightTitles");
    if (spotlightContainer && project) {
        const h3 = document.createElement("h3");
        h3.innerText = project.project_name || "Project Spotlight";
        const paragraph = document.createElement("p");
        paragraph.innerText = project.long_description || "no description available.";
        const link = document.createElement("a");
        link.innerText = "Click here to see more...";
        link.href = project.url || "#";
        spotlightTitles.replaceChildren(h3,paragraph,link);
        const spotlightImage = project.spotlight_image || "./images/spotlight_placeholder_bg.webp";
        spotlightContainer.style.backgroundImage = `url("${spotlightImage}")`;

        spotlightContainer.style.backgroundSize = "cover";
        spotlightContainer.style.backgroundPosition = "center";
        spotlightContainer.style.backgroundRepeat = "no-repeat0;"
    }
};

const addprojectsEventListener = (projectsData) => {
    const projectsContainer = document.getElementById("projectList");
    if (!projectsContainer || !projectsData) return;
    projectsContainer.addEventListener ("click", (event) => {
        const card = event.target.closest(".projectCard");
        if (!card || !projectsContainer.contains(card)) return;
        const project = projectsData.find((p) => p.project_id === card.id) || null;
        createSpotlight(project);
    });
};

const createProjectsContainer = (projectsData) => {
    const projectsContainer = document.getElementById("projectList");
    const projectFragment = document.createDocumentFragment();
    if (projectsContainer && projectsData) {
        projectsData.forEach((project, i) => {
            if (i === 0) {
                createSpotlight(project);
            }
            const projectDiv = document.createElement("div");
            projectDiv.id = project.project_id;
            projectDiv.className = "projectCard";
            const projectImage = project.card_image || "./images/card_placeholder_bg.webp";
            projectDiv.style.backgroundImage = `url("${projectImage}")`;
            projectDiv.style.backgroundSize = "cover";
            projectDiv.style.backgroundPosition = "center";
            projectDiv.style.backgroundRepeat = "no-repeat";

            const projectHeading = document.createElement("h4");
            projectHeading.innerText = project.project_name || "A project.";

            const projectParagraph = document.createElement("p");
            projectParagraph.innerText = project.short_description || "Check it out to find out!";

            projectDiv.appendChild(projectHeading);
            projectDiv.appendChild(projectParagraph);

            projectFragment.appendChild(projectDiv);
        });

        projectsContainer.appendChild(projectFragment);
        addProjectsEventListener(projectsData);
    }
};

/*document.addEventListener("DOMContentLoaded", async () => {
    const aboutData = await getAboutData();
    if (aboutData) {
        createAboutMeContainer(aboutData);
    }

    const projectsData = await getProjectsData();
    if (projectsData && projectsData.length > 0) {
        createProjectsContainer(projectsData);
    }
});*/ 

