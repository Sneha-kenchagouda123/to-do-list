// script.js

// Select elements
const newTaskInput = document.getElementById('new-task');
const prioritySelect = document.getElementById('priority');
const deadlineInput = document.getElementById('deadline');
const categorySelect = document.getElementById('category');
const addCategoryButton = document.getElementById('add-category-btn');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const clearAllButton = document.getElementById('clear-all-btn');
const searchInput = document.getElementById('search');
const progressDisplay = document.getElementById('progress');
const themeToggleButton = document.getElementById('theme-toggle');

// Initialize category options
addCategoryButton.addEventListener('click', () => {
    const category = prompt('Enter new category:');
    if (category) {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categorySelect.appendChild(option);
    }
});

// Add new task
addTaskButton.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    const priority = prioritySelect.value;
    const deadline = deadlineInput.value;
    const category = categorySelect.value;

    if (!taskText) {
        alert('Please enter a task!');
        return;
    }

    addTask({ text: taskText, priority, deadline, category, completed: false });
    newTaskInput.value = '';
    deadlineInput.value = '';
    updateProgress();
});

// Add task to the list
function addTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-priority', task.priority);

    const span = document.createElement('span');
    span.textContent = `${task.text} (${task.deadline || 'No deadline'}) - ${task.category || 'Uncategorized'}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        li.remove();
        updateProgress();
    });

    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}

// Update progress
function updateProgress() {
    const tasks = taskList.children.length;
    const completedTasks = [...taskList.children].filter(task => task.classList.contains('completed')).length;
    const progress = tasks > 0 ? Math.round((completedTasks / tasks) * 100) : 0;
    progressDisplay.textContent = `Completed: ${progress}%`;
}

// Dark mode toggle
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
