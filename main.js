(function () {
    const container = document.querySelector('.carousel')
    const slides = document.querySelectorAll('.slide')
    const pauseBtn = document.querySelector('.btn-pause')
    const prevBtn = document.querySelector('.btn-prev')
    const nextBtn = document.querySelector('.btn-next')
    const indicatorItems = document.querySelectorAll('.indicator')
    const indicatorsContainer = document.querySelector('.indicators-container')

    const CODE_ARROW_LEFT = 'ArrowLeft'
    const CODE_ARROW_RIGHT = 'ArrowRight'
    const CODE_SPACE = 'Space'
    const INTERVAL = 2000

    let isPlaying = true
    let counterLi = 0
    let timerId = null
    let startPosX = null
    let endPosX = null


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

    function pressKeyHandler(e) {
        const { code } = e
        if (code === CODE_ARROW_LEFT) prevButtonSlide()
        if (code === CODE_ARROW_RIGHT) nextButtonSlide()
        if (code === CODE_SPACE) {
            e.preventDefault()
            playPauseHandler()
        }

    }

    function swipeStartHandler(e) {
        startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX
    }
    function swipeEndHandler(e) {
        endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX

        if (endPosX - startPosX > 100) prevButtonSlide()
        if (endPosX - startPosX < -100) nextButtonSlide()

    }

    function initListeners() {
        pauseBtn.addEventListener('click', playPauseHandler)
        nextBtn.addEventListener('click', nextButtonSlide)
        prevBtn.addEventListener('click', prevButtonSlide)
        indicatorsContainer.addEventListener('click', indicatorHandler)
        container.addEventListener('touchstart', swipeStartHandler)
        container.addEventListener('mousedown', swipeStartHandler)
        container.addEventListener('touchend', swipeEndHandler)
        container.addEventListener('mouseup', swipeEndHandler)
        document.addEventListener('keydown', pressKeyHandler)
    }

    function init() {
        initListeners()
        tick()
    }

    init()

}())

