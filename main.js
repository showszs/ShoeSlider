const slides = document.querySelectorAll('.slide')
const pauseBtn = document.querySelector('.btn-pause')
const prevBtn = document.querySelector('.btn-prev')
const nextBtn = document.querySelector('.btn-next')
const indicatorItems = document.querySelectorAll('.indicator')
const indicatorsContainer = document.querySelector('.indicators-container')
const INTERVAL = 2000

let isPlaying = true
let counterLi = 0
let timerId = null


function goToNth(n) {
    slides[counterLi].classList.toggle('active')
    indicatorItems[counterLi].classList.toggle('active')
    counterLi = (n + slides.length) % slides.length
    slides[counterLi].classList.toggle('active')
    indicatorItems[counterLi].classList.toggle('active')
}

function nextSlide() {
    goToNth(counterLi + 1)
}

function prevSlide() {
    goToNth(counterLi - 1)
}

function tick() {
    timerId = setInterval(nextSlide, INTERVAL)
}

function pauseHandler() {
    if (!isPlaying) return
    pauseBtn.textContent = 'Play'
    clearInterval(timerId)
    isPlaying = false
}

function playHandler() {
    pauseBtn.textContent = 'Pause'
    tick()
    isPlaying = true
}

function playPauseHandler() {
    isPlaying ? pauseHandler() : playHandler()
}

function nextButtonSlide() {
    pauseHandler()
    nextSlide()
}

function prevButtonSlide() {
    pauseHandler()
    prevSlide()

}

function indicatorHandler(e) {
    const { target } = e
    if (target && target.classList.contains('indicator')) {
        const num = target.dataset.slideTo
        pauseHandler()
        goToNth(+num)
    }
}

pauseBtn.addEventListener('click', playPauseHandler)
nextBtn.addEventListener('click', nextButtonSlide)
prevBtn.addEventListener('click', prevButtonSlide)
indicatorsContainer.addEventListener('click', indicatorHandler)

tick()                   