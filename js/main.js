const carousel = document.getElementById('days-carousel');

const weekLabels = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
let activeIndex = 0;

// Gera a semana atual começando na segunda-feira
function generateCurrentWeek() {
    const today = new Date();
    const todayDay = today.getDay();

    // Calcula a segunda-feira da semana atual
    const diffToMonday = todayDay === 0 ? -6 : 1 - todayDay;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    const week = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);

        week.push({
        label: weekLabels[date.getDay()],
        dayNumber: date.getDate(),
        fullDate: date, // guarda o Date real
        isToday: date.toDateString() === today.toDateString()
        });
    }

    return week;
}

const daysOfWeek = generateCurrentWeek();

// Define o dia de hoje como ativo inicialmente
activeIndex = daysOfWeek.findIndex(day => day.isToday);

function renderCarousel() {
    carousel.innerHTML = '';

    daysOfWeek.forEach((day, index) => {
        const button = document.createElement('button');
        button.classList.add('day');

        if (index === activeIndex) {
            button.classList.add('active');
        }

        button.innerHTML = `
            <strong>${day.label}</strong>
            <span>${day.dayNumber}</span>
        `;

        button.addEventListener('click', () => {
            setActiveDay(index);
        });

        carousel.appendChild(button);
    });
}

function setActiveDay(index) {
    activeIndex = index;
    renderCarousel();

    console.log(
        `Dia selecionado: ${dayToISO(daysOfWeek[index])}`
    );
}

// Converte para YYYY-MM-DD (pronto para API)
function dayToISO(day) {
    return day.fullDate.toISOString().split('T')[0];
}


renderCarousel();