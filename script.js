document.addEventListener('DOMContentLoaded', function() {
    updateGreeting();
    updateBanner();
    generateCalendar(currentMonth, currentYear);
    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('event-modal').style.display = 'none';
    });
    document.getElementById('prev-month').addEventListener('click', function() {
        navigateMonth(-1);
    });
    document.getElementById('next-month').addEventListener('click', function() {
        navigateMonth(1);
    });
    document.getElementById('add-event-btn').addEventListener('click', addEvent);
    document.getElementById('sign-out').addEventListener('click', function() {
        // Placeholder for sign-out functionality
        console.log('Signing out...');
    });
});

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar(month, year) {
    const daysContainer = document.getElementById('calendar-days');
    const datesContainer = document.getElementById('calendar-dates');
    const monthYearLabel = document.getElementById('month-year');
    
    daysContainer.innerHTML = '';
    datesContainer.innerHTML = '';
    
    monthYearLabel.textContent = `${["January", "February", "March", "April", "May", "June",
                                       "July", "August", "September", "October", "November", "December"][month]} ${year}`;
    
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;
        daysContainer.appendChild(dayElement);
    });
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('calendar-date');
        dateElement.textContent = i;
        dateElement.setAttribute('data-date', i);
        dateElement.addEventListener('click', function() { showEventModal(i); });
        datesContainer.appendChild(dateElement);
    }
}

function navigateMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    generateCalendar(currentMonth, currentYear);
}

function showEventModal(date) {
    document.getElementById('event-modal').setAttribute('data-date', date);
    document.getElementById('event-modal').style.display = 'block';
}

function addEvent() {
    const date = document.getElementById('event-modal').getAttribute('data-date');
    const eventDetails = document.getElementById('event-input').value.trim();
    const eventColor = document.querySelector('input[name="event-color"]:checked').value;
    if (eventDetails) {
        const dateElement = document.querySelector(`.calendar-date[data-date="${date}"]`);
        const eventElement = document.createElement('div');
        eventElement.textContent = eventDetails;
        eventElement.style.backgroundColor = eventColor;
        eventElement.style.color = '#ffffff';
        eventElement.style.marginTop = '5px';
        dateElement.appendChild(eventElement);
        
        document.getElementById('event-input').value = '';
        document.getElementById('event-modal').style.display = 'none';
    }
}

function updateGreeting() {
    const username = "User"; // Replace with dynamic data if available
    const hour = new Date().getHours();
    let greeting = "Good evening";
    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    
    document.getElementById('greeting').textContent = `${greeting}, ${username}!`;
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const task = taskInput.value.trim();
    if (task !== '') {
        const taskList = document.getElementById('task-list');
        const li = document.createElement('li');
        li.className = 'task-item';
        
        const taskText = document.createElement('p');
        taskText.textContent = task;
        
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'delete-task';
        deleteBtn.addEventListener('click', function() { taskList.removeChild(li); });
        
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        
        taskInput.value = ''; // Clear input after adding
    }
}

function updateBanner() {
    const hour = new Date().getHours();
    const banner = document.getElementById('time-of-day-banner');
    if (hour < 12) {
        banner.style.backgroundImage = "url('https://images.pexels.com/photos/910411/pexels-photo-910411.jpeg?cs=srgb&dl=pexels-gareth-davies-910411.jpg&fm=jpg')";
    } else if (hour < 18) {
        banner.style.backgroundImage = "url('https://images.pexels.com/photos/460370/pexels-photo-460370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
    } else {
        banner.style.backgroundImage = "url('https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')";
    }
}
