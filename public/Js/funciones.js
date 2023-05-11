var typed = new Typed(".typing", {
    strings: ["", "Diseñador Web", "Desarrollador Web", "Front end Developer", "Freelancer"],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true
})

/* aparte*/
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".seccion"),
    totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("activo")) {
                addBackSection(j);
                // allSection[j].classList.add("back-seccion");
            }
            navList[j].querySelector("a").classList.remove("activo")
        }
        this.classList.add("activo")
        showSection(this);
        if (window.innerWidth < 1200) {
            aparteSectionTogglerBtn();
        }
    })
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-seccion")
    }
}

function addBackSection(num) {
    allSection[num].classList.add("back-seccion")
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("activo");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("activo")
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("activo");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("activo")
        }
    }
}
document.querySelector(".contactame").addEventListener("click", function() {
    const sectionIndex = this.getAttribute("data-section-index");
    //console.log(sectionIndex)
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
})
const navTogglerBtn = document.querySelector(".activador-nav"),
    aparte = document.querySelector(".aparte");
navTogglerBtn.addEventListener("click", () => {
    aparteSectionTogglerBtn();
})

function aparteSectionTogglerBtn() {
    aparte.classList.toggle("open")
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}