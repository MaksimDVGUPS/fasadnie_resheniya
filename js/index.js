document.addEventListener('DOMContentLoaded', () => {
    // Ленивая загрузка
    yall()

    // Открытие модального окна с формой
    const allModals = document.querySelectorAll('.modal')
    const modalClose = document.querySelectorAll('.modal__close')

    // Увеличение фото из галереи
    const galleryModal = document.querySelector('#galleryModal')
    const modalImg = document.querySelector('.gallery__modal-img')
    const galleryImages = document.querySelectorAll('.gallery__img')

    for(const image of galleryImages) {
        image.addEventListener('click', () => {
            modalImg.src = image.querySelector('img:first-child').src
            galleryModal.classList.add('modal-active')
        })
    }

    // Появление лупы на изображениях в галерее
    const glass = document.createElement('img')
    glass.src = 'img/glass.svg'
    glass.classList.add('gallery__hover')

    for(const image of galleryImages) {
        image.addEventListener('mouseover', () => {
            image.appendChild(glass)
        })
    }

    // Закрытие всех форм на крестик
    for(const close of modalClose) {
        close.addEventListener('click', () => {
            for(const modal of allModals) {
                if (modal.classList.contains('modal-active')) {
                    modal.classList.remove('modal-active')
                }
            }
        })
    }

    // Закрытие форм по клику за ее пределами
    const modalOuters = document.querySelectorAll('.modal__outer')

    for(const modalOuter of modalOuters) {
        modalOuter.addEventListener('click', () => {
            modalOuter.parentNode.classList.remove('modal-active')
        })
    }

    // Маска для телефона
    const phoneMask = new Inputmask('+7 (999) 999-99-99')
    const phoneInputs = document.querySelectorAll('input[type="tel"]')
    phoneMask.mask(phoneInputs) // Initial call

    // Отправка форм
    const forms = document.querySelectorAll('.modal__form')

    for (const form of forms) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault()

            // Удаление старых ошибок
            const oldErrors = form.querySelectorAll('.modal__error')
            if (oldErrors) {
                for (const oldError of oldErrors) {
                    oldError.parentElement.removeChild(oldError)
                }
            }

            // Валидация
            const inputs = form.querySelectorAll('input')
            let hasErrors = false

            for (const input of inputs) {
                switch (input.name) {
                    case "name":
                        if (input.value.length < 3) {
                            createFormError('Слишком короткое имя', input)
                            hasErrors = true
                            break
                        }
                        if (input.value.length > 15) {
                            createFormError('Слишком длинное имя', input)
                            hasErrors = true
                            break
                        }
                        if (!/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(input.value)) {
                            createFormError('Некорректное имя', input)
                            hasErrors = true
                            break
                        }
                        break;
                    case "phone":
                        if (input.value.includes('_') || !input.value) {
                            createFormError('Введите корректный телефон', input)
                            hasErrors = true
                        }
                        break
                    case "agree":
                        if (!input.checked) {
                            createFormError('Нажмите галочку', input)
                            hasErrors = true
                        }
                        break
                    default:
                        break
                }
            }

            // Если прошли валидацию, добавляем дополнительные поля и отправляем форму
            if (!hasErrors) {
                const formData = new FormData(form)

                if (this.id === 'calculatorModalForm') {
                    formData.append('calc_glass-type', calculatorFormData.get('calc_glass-type'))
                    formData.append('calc_fasad', calculatorFormData.get('calc_fasad'))
                    formData.append('calc_door-type', calculatorFormData.get('calc_door-type'))
                    formData.append('calc_doors-count', calculatorFormData.get('calc_doors-count'))
                    formData.append('calc_width', calculatorFormData.get('calc_width'))
                    formData.append('calc_height', calculatorFormData.get('calc_height'))
                    if (calculatorFormData.get('calc_additional[]')) {
                        formData.append('calc_additional[]', calculatorFormData.getAll('calc_additional[]'))
                    }
                }

                const response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: formData
                })
                if (response.ok) {
                    form.innerHTML = `
                        <div class="modal__thx">Спасибо за то, что отправили заявку! В ближайшее время наш менеджер с Вами свяжется!</div>
                    `
                } else {
                    alert('Что-то пошло не так... Повторите попытку позже.')
                }
            }
        })
    }

    // Скачивание прайс-листа
    const priceButton = document.querySelector('.pricelist__button')

    priceButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.setAttribute('href', 'price.pdf'); 
        link.setAttribute('download', 'Прайс-лист');
        link.setAttribute('target','_blank');
        link.style.display = 'none';
        document.body.appendChild(link); 
        link.click(); 
        document.body.removeChild(link);
    })
})

// Форма для расчета стоимости
$('.header__callback, .home__btn, .technology .btn-outline').on('click', () => {
    $('#callbackModal').addClass('modal-active')
})

// Слайдеры
$('.photo-slider__container').slick({
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 960,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 680,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$('.profile__slider').slick({
    arrows: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 6
            }
        },
        {
            breakpoint: 1050,
            settings: {
                slidesToShow: 5
            }
        },
        {
            breakpoint: 960,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 680,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        },
    ]
});

$('.certificates__slider').slick({
    arrows: false,
    autoplay: true,
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 5
            }
        },
        {
            breakpoint: 1050,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 680,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 320,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$('.partners__slider').slick({
    arrows: false,
    autoplay: true,
    dots: true,
    rows: 2,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [

        {
            breakpoint: 680,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2
            }
        }
    ]
});

// Отображение ошибки в форме
function createFormError (text, where) {
    const error = document.createElement('div')
    error.className = 'modal__error'
    error.textContent = text
    where.insertAdjacentElement('beforebegin', error)
}

// Скрипты для калькулятора
// Матрица путей к картинкам
const calcSrc = [
    ['img/calc_size-1.svg', 'img/calc_size-3.svg', 'img/calc_size-5.svg', 'img/calc_size-7.svg'],
    ['img/calc_size-2.svg', 'img/calc_size-4.svg', 'img/calc_size-6.svg', 'img/calc_size-8.svg']
]

// Начальные индексы
let glassType = 0
let fasadType = 0

const calcCountHTML = `
    <div class="calculator__count">
        <span>Кол-во:</span>
        <input type="number" min="1" step="1" placeholder="шт." name="calc__doors-count" required>
    </div>
`

// Клик по radio инпуту
$('.calculator__radios input[type=radio]').on('input', function () {
    const inputName = $(this).attr('name')
    const inputPosition = $(this).index()

    // Проверяем название инпута
    if (inputName === 'calc_glass-type') {
        // Проверяем его номер
        switch (inputPosition) {
            case 0:
                glassType = 0
                break

            case 2:
                glassType = 1
                break

            default:
                break
        }
    } else if (inputName === 'calc_fasad') {
        switch (inputPosition) {
            case 0:
                fasadType = 0
                break

            case 2:
                fasadType = 1
                break

            case 4:
                fasadType = 2
                break

            case 6:
                fasadType = 3
                break

            default:
                break
        }
    } else if (inputName === 'calc_door-type') {
        $('.calculator__count').remove()
        $(this).next().append(calcCountHTML)
    }

    // Меняем картинку
    $('.calculator__size img').attr('src', calcSrc[glassType][fasadType])
})

// Данные из калькулятора
let calculatorFormData = new FormData()

// HTML для ошибки
const calculatorError = `<p class="calculator__error">Выберите один из вариантов</p>`

// Обработчик Submit на калькуляторе
$('.calculator__form').on('submit', function (e) {
    e.preventDefault()

    $('.calculator__error').remove()

    let errors = 0

    calculatorFormData = new FormData($(this)[0])

    // Валидация
    if (!calculatorFormData.get('calc_glass-type')) {
        $('#calc_glass-type-1').parent().parent().append(calculatorError)
        errors++
    }

    if (!calculatorFormData.get('calc_fasad')) {
        $('#calc_fasad-1').parent().parent().append(calculatorError)
        errors++
    }

    if (!calculatorFormData.get('calc_door-type')) {
        $('#calc_door-type-1').parent().parent().append(calculatorError)
        errors++
    }

    if (errors !== 0) {
        return false
    }

    $('#calculatorModal').addClass('modal-active')
})