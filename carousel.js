function Carousel() {
    this._container = document.querySelector('.carousel')
    this._containerSlides = document.querySelector('.container-slides')
    this._slides = document.querySelectorAll('.slide')

    this._CODE_ARROW_LEFT = 'ArrowLeft'
    this._CODE_ARROW_RIGHT = 'ArrowRight'
    this._CODE_SPACE = 'Space'
    this._INTERVAL = 2000

    this._isPlaying = true
    this._counterLi = 0
}


Carousel.prototype = {
    _goToNth(n) {
        this._slides[this._counterLi].classList.toggle('active')
        this._indicatorItems[this._counterLi].classList.toggle('active')
        this._counterLi = (n + this._slides.length) % this._slides.length
        this._slides[this._counterLi].classList.toggle('active')
        this._indicatorItems[this._counterLi].classList.toggle('active')
    },

    _nextSlide() {
        this._goToNth(this._counterLi + 1)
    },

    _prevSlide() {
        this._goToNth(this._counterLi - 1)
    },

    _tick() {
        this._timerId = setInterval(() => this._nextSlide(), this._INTERVAL)
    },

    _pause() {
        if (!this._isPlaying) return
        this._pauseBtn.textContent = 'Play'
        clearInterval(this._timerId)
        this._isPlaying = false
    },

    _play() {
        this._pauseBtn.textContent = 'Pause'
        this._tick()
        this._isPlaying = true
    },

    _playPauseHandler() {
        this._isPlaying ? this._pause() : this._play()
    },

    _nextButtonSlide() {
        this._pause()
        this._nextSlide()
    },

    _prevButtonSlide() {
        this._pause()
        this._prevSlide()

    },

    _indicator(e) {
        const { target } = e
        if (target && target.classList.contains('indicator')) {
            const num = target.dataset.slideTo
            this._pause()
            this._goToNth(+num)
        }
    },

    _pressKey(e) {
        const { code } = e
        if (code === this._CODE_ARROW_LEFT) this._prevButtonSlide()
        if (code === this._CODE_ARROW_RIGHT) this._nextButtonSlide()
        if (code === this._CODE_SPACE) {
            e.preventDefault()
            this._playPauseHandler()
        }

    },

    _swipeStart(e) {
        this._startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX
    },
    _swipeEnd(e) {
        this._endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX

        if (this._endPosX - this._startPosX > 100) this._prevButtonSlide()
        if (this._endPosX - this._startPosX < -100) this._nextButtonSlide()

    },

    _initControls() {
        const controls = document.createElement('div')
        const PREV = `<button class="btn btn-prev">Prev</button>`
        const PAUSE = `<button class="btn btn-pause">Pause</button>`
        const NEXT = `<button class="btn btn-next">Next</button>`
        controls.innerHTML = PREV + PAUSE + NEXT
        controls.setAttribute('class', 'controls')
        this._containerSlides.append(controls)

        this._pauseBtn = document.querySelector('.btn-pause')
        this._prevBtn = document.querySelector('.btn-prev')
        this._nextBtn = document.querySelector('.btn-next')
    },

    _initIndicators() {
        const indicators = document.createElement('div')
        indicators.setAttribute('class', 'indicators-container')
        for (let i = 0; i < this._slides.length; i++) {
            const indicator = document.createElement('div')
            indicator.setAttribute('class', i ? 'indicator' : 'indicator active')
            indicator.dataset.slideTo = i
            indicators.append(indicator)
        }
        this._containerSlides.append(indicators)

        this._indicatorItems = document.querySelectorAll('.indicator')
        this._indicatorsContainer = document.querySelector('.indicators-container')
    },

    _initListeners() {
        this._pauseBtn.addEventListener('click', this._playPauseHandler.bind(this))
        this._nextBtn.addEventListener('click', this._nextButtonSlide.bind(this))
        this._prevBtn.addEventListener('click', this._prevButtonSlide.bind(this))
        this._indicatorsContainer.addEventListener('click', this._indicator.bind(this))
        this._container.addEventListener('touchstart', this._swipeStart.bind(this))
        this._container.addEventListener('mousedown', this._swipeStart.bind(this))
        this._container.addEventListener('touchend', this._swipeEnd.bind(this))
        this._container.addEventListener('mouseup', this._swipeEnd.bind(this))
        document.addEventListener('keydown', this._pressKey.bind(this))
    },

    init() {
        this._initControls()
        this._initIndicators()
        this._initListeners()
        this._tick()
    },
}

Carousel.prototype.constructor = Carousel