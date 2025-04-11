
const minutes = document.querySelector('.arrow-minutes');
const hours = document.querySelector('.arrow-hours');
const secundes = document.querySelector('.arrow-secundes');
const datemount = document.getElementById("hours-minutes-secund")
const arrow = document.querySelectorAll('.arrow i')

function UpdateHours() {
    const dates = new Date();
    let secund = dates.getSeconds();
    let minuts = dates.getMinutes();
    let hour = dates.getHours();
    let updatehours = hour;
    let ampm = "";
    let checkhour = updatehours < 10 ? '0' + hour : hour;
    let checkminutes = minuts < 10 ? '0' + minuts : minuts;
    let checksecunds = secund < 10 ? '0' + secund : secund;

    if (hour >= 12) {
        ampm = "PM"
        updatehours % 12
    }
    else {
        ampm = "AM"
        updatehours
    }
    datemount.innerHTML = `${checkhour}:${checkminutes}:${checksecunds}  ${ampm}`
}

setInterval(() => {
    UpdateHours()
})

setInterval(() => {
    updateHoursMinutes()
})

function updateHoursMinutes() {
    const dates = new Date();
    const sec = dates.getSeconds();
    const min = dates.getMinutes();
    const hour = dates.getHours();
    const secundformat = (sec / 60) * 360;
    const minutforamt = (min / 60) * 360;
    const formathours = ((hour % 12) / 12) * 360 + (min / 60) * 30
    hours.style.transform = `rotate(${formathours}deg)`;
    minutes.style.transform = `rotate(${minutforamt}deg)`;
    secundes.style.transform = `rotate(${secundformat}deg)`;
}

const curentdate = document.querySelector('.curent-date p');
const date = document.querySelector('.date');
const days = document.querySelector('.calendar-day');
const arrowmount = document.querySelectorAll('.calendar-arrow i');
let dates = new Date();
let curentmount = dates.getMonth();
let year = dates.getFullYear();
let curentdaynumber = dates.getDay();
const mountarr = ['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս',
    'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր'];
const curentday = ['Կիր', 'Երկ', 'Երք', 'Չրք', 'Հնգ', 'Ուրբ', 'Շբթ'];

const renderCalendar = () => {
    let firsDayMount = new Date(year, curentmount, 1).getDay();
    let lasDateMount = new Date(year, curentmount + 1, 0).getDate();
    let lastdays = new Date(year, curentmount + 1, 0).getDay();
    let lastdateoflastmount = new Date(year, curentmount, 0).getDate();
    let litag = "";
    let day = "";

    for (let i = firsDayMount; i > 0; i--) {
        litag += `<li class="inactive">${lastdateoflastmount - i + 1}</li>`
    }
    for (let i = 1; i <= lasDateMount; i++) {
        let isActive = i === dates.getDate() && curentmount === new Date().getMonth() &&
            year === dates.getFullYear() ? "active" : ""
        litag += `<li class=${isActive}>${i}</li>`

    }
    for (let i = lastdays; i < 6; i++) {
        litag += `<li class="inactive">${i - lastdays + 1}</li>`
    }
    for (let i = 0; i < curentday.length; i++) {
        let isdayclass = curentday[i] === curentday[curentdaynumber] ? "active" : ""
        day += `<li class=${isdayclass}>${curentday[i]}</li>`
    }
    curentdate.innerHTML = `${curentday[curentdaynumber]},  ${mountarr[curentmount]} ${year}`;
    date.innerHTML = litag;
    days.innerHTML = day
}

renderCalendar()

arrowmount.forEach((element) => {
    element.addEventListener("click", () => {
        ChangeCalendar(element)
    })
})

function ChangeCalendar(element) {
    return element.classList.contains('fa-angle-right') ? NextCalendar() : PrevCalendar();
}

function NextCalendar() {
    curentmount++;
    if (curentmount > 11) {
        curentmount = 0;
        year++
    }
    renderCalendar()
}

function PrevCalendar() {
    curentmount--
    if (curentmount < 0) {
        curentmount = 11;
        year--
    }
    renderCalendar()
}