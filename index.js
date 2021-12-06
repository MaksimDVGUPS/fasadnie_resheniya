document.addEventListener('DOMContentLoaded', () => {
    // Ленивая загрузка
    yall()

    // Открытие модального окна с формой
    const allModals = document.querySelectorAll('.modal')
    const leadModal = document.querySelector('#leadModal')
    const modalButtons = document.querySelectorAll('.nav__item-button, .home__button, .specials__card, .technology__master, .technology__buy')
    const modalClose = document.querySelectorAll('.modal__close')

    for (const button of modalButtons) {
        button.addEventListener('click', () => {
            leadModal.classList.add('modal-active')
        })
    }

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

    // Закрытие всех форм
    for(const close of modalClose) {
        close.addEventListener('click', () => {
            for(const modal of allModals) {
                if (modal.classList.contains('modal-active')) {
                    modal.classList.remove('modal-active')
                }
            }
        })
    }

    // Маска для телефона
    const phoneMask = new Inputmask('+7 (999) 999-99-99')
    const phoneInputs = document.querySelectorAll('input[type="tel"]')
    phoneMask.mask(phoneInputs) // Initial call

    // Отправка формы
    const form = document.querySelector('.modal__form')

    form.addEventListener('submit', async (e) => {
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

    // Переключение вкладок с вариантами остекления
    const tabs = document.querySelectorAll('.variants__tab')
    const technologies = document.querySelectorAll('.technology')

    for(const tabEl of tabs) {
        tabEl.addEventListener('click', () => {
            for(const tab of tabs) {
                tab.classList.remove('variants__tab-active')
            }
            tabEl.classList.add('variants__tab-active')
            for (const technology of technologies) {
                technology.classList.remove('technology-active')
                if(tabEl.id === technology.id) {
                    technology.classList.add('technology-active')
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

// Отображение ошибки в форме
function createFormError (text, where) {
    const error = document.createElement('div')
    error.className = 'modal__error'
    error.textContent = text
    where.insertAdjacentElement('beforebegin', error)
}