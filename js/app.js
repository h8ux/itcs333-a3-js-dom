document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const errorMsg = document.getElementById('error-msg');
    const todoList = document.getElementById('todo-list');
    const counter = document.getElementById('counter');
    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');
    // قاعدين نسيف المتغيرات من احين حق نستخدمهم بسرعه عقب
    let currentFilter = 'all';
    // هاي بتكون نفس الحالة للفلتر اذا على الكل او لا بس افتراضيا على الكل

    function updatecounter() {
        const item = todoList.querySelectorAll('li');
        let activecount = 0;
        item.forEach(item => {
            if (!item.classList.contains('completed'))
                activecount++;
        })
        counter.textContent = activecount + " items left ";
    };

    const applyFilter = () => {
        const item = todoList.querySelectorAll('li');
        item.forEach(item => {
            const isCompleted = item.classList.contains('completed');
            if (currentFilter === 'all')
                item.style.display = ' ';
            else if (currentFilter === 'active')
                item.style.display = isCompleted ? 'none' : '';
            else if (currentFilter === 'done')
                item.style.display = isCompleted ? '' : 'none';
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();

        if (text === '') {
            errorMsg.classList.remove('hidden');
            return;
        }

        errorMsg.classList.add('hidden');
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.className = 'item-text';
        span.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        input.value = '';
        updatecounter();
        applyFilter();
        // عشان يحط كل شي لمكانه بعد اضافة عنصر

        filterAll.addEventListener('click', () => {
            currentFilter = 'all';
            applyFilter();
        });
        filterActive.addEventListener('click', () => {
            currentFilter = 'active';
            applyFilter();
        });
        filterDone.addEventListener('click', () => {
            currentFilter = 'done';
            applyFilter();
        });

    });
    todoList.addEventListener('click', (e) => {
        const target = e.target; // يعني الزرار الي طقيناه يصير تارقت
        const li = target.closest('li');
        if (!li)
            return;

        if (target.classList.contains('delete-btn')) {
            li.remove();
            updatecounter();
            return;
        }
        if (target.classList.contains('item-text') || target.tagName === "LI") {
            li.classList.toggle('completed');
            updatecounter();
            applyFilter();
        }
    });



})