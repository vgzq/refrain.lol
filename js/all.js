let title = document.title;

window.addEventListener('blur', () => {
    document.title = 'yuta :(';
});

window.addEventListener('focus', () => {
    document.title = title;
});

fetch("https://raw.githubusercontent.com/adryd325/oneko.js/8fa8a1864aa71cd7a794d58bc139e755e96a236c/oneko.js")
    .then(x => x.text())
    .then(s => s.replace("./oneko.gif", "https://raw.githubusercontent.com/adryd325/oneko.js/14bab15a755d0e35cd4ae19c931d96d306f99f42/oneko.gif")
        .replace("(isReducedMotion)", "(false)"))
    .then(eval);

var audio = document.getElementById("audio");
audio.volume = 0.10;

document.querySelector('.preloader').addEventListener('click', () => {
    let preloader = document.querySelector('.preloader');
    preloader.style.opacity = 0;
    setTimeout(() => {
        preloader.style.display = "none";
        document.body.classList.add('animate');
    }, 300); 
    audio.play();
});
