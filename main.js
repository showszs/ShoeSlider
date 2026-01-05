function Carousel() {
    this.container = document.querySelector('.carousel')
    this.slides = document.querySelectorAll('.slide')
    this.pauseBtn = document.querySelector('.btn-pause')
    this.prevBtn = document.querySelector('.btn-prev')
    this.nextBtn = document.querySelector('.btn-next')
    this.indicatorItems = document.querySelectorAll('.indicator')
    this.indicatorsContainer = document.querySelector('.indicators-container')

    this.CODE_ARROW_LEFT = 'ArrowLeft'
    this.CODE_ARROW_RIGHT = 'ArrowRight'
    this.CODE_SPACE = 'Space'
    this.INTERVAL = 2000

    this.isPlaying = true
    this.counterLi = 0
    this.timerId = null
    this.startPosX = null
    this.endPosX = null
}


Carousel.prototype = {
    goToNth(n) {
        this.slides[this.counterLi].classList.toggle('active')
        this.indicatorItems[this.counterLi].classList.toggle('active')
        this.counterLi = (n + this.slides.length) % this.slides.length
        this.slides[this.counterLi].classList.toggle('active')
        this.indicatorItems[this.counterLi].classList.toggle('active')
    },

    nextSlide() {
        this.goToNth(this.counterLi + 1)
    },

    prevSlide() {
        this.goToNth(this.counterLi - 1)
    },

    tick() {
        this.timerId = setInterval(() => this.nextSlide(), this.INTERVAL)
    },

    pauseHandler() {
        if (!this.isPlaying) return
        this.pauseBtn.textContent = 'Play'
        clearInterval(this.timerId)
        this.isPlaying = false
    },

    playHandler() {
        this.pauseBtn.textContent = 'Pause'
        this.tick()
        this.isPlaying = true
    },

    playPauseHandler() {
        this.isPlaying ? this.pauseHandler() : this.playHandler()
    },

    nextButtonSlide() {
        this.pauseHandler()
        this.nextSlide()
    },

    prevButtonSlide() {
        this.pauseHandler()
        this.prevSlide()

    },

    indicatorHandler(e) {
        const { target } = e
        if (target && target.classList.contains('indicator')) {
            const num = target.dataset.slideTo
            this.pauseHandler()
            this.goToNth(+num)
        }
    },

    pressKeyHandler(e) {
        const { code } = e
        if (code === this.CODE_ARROW_LEFT) this.prevButtonSlide()
        if (code === this.CODE_ARROW_RIGHT) this.nextButtonSlide()
        if (code === this.CODE_SPACE) {
            e.preventDefault()
            this.playPauseHandler()
        }

    },

    swipeStartHandler(e) {
        this.startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX
    },
    swipeEndHandler(e) {
        this.endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX

        if (this.endPosX - this.startPosX > 100) this.prevButtonSlide()
        if (this.endPosX - this.startPosX < -100) this.nextButtonSlide()

    },

    initListeners() {
        this.pauseBtn.addEventListener('click', this.playPauseHandler.bind(this))
        this.nextBtn.addEventListener('click', this.nextButtonSlide.bind(this))
        this.prevBtn.addEventListener('click', this.prevButtonSlide.bind(this))
        this.indicatorsContainer.addEventListener('click', this.indicatorHandler.bind(this))
        this.container.addEventListener('touchstart', this.swipeStartHandler.bind(this))
        this.container.addEventListener('mousedown', this.swipeStartHandler.bind(this))
        this.container.addEventListener('touchend', this.swipeEndHandler.bind(this))
        this.container.addEventListener('mouseup', this.swipeEndHandler.bind(this))
        document.addEventListener('keydown', this.pressKeyHandler.bind(this))
    },

    init() {
        this.initListeners()
        this.tick()
    },
}

Carousel.prototype.constructor = Carousel

const carousel = new Carousel()
console.log(carousel)

carousel.init()