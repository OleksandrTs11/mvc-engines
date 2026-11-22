// ПРЕДСТАВЛЕННЯ (VIEW) — усе, що пов'язано з відображенням даних користувачу.
// View нічого не знає про модель: отримує готові дані від контролера.

// Підписи колонок українською (ключі — назви колонок з таблиці даних)
const TITLES = {
    order: '№',
    engine: 'Рушій',
    language: 'Мова',
    year: 'Рік',
    author: 'Автор'
};

export default class ViewEngines {
    constructor() {
        // Посилання на елемент на сторінці, куди вставляємо таблицю
        this.domTable = document.querySelector('.engines-table');
    }

    // Головний метод: формує thead + tbody і вставляє в таблицю
    renderData({ names, formatedData }) {
        const html = this.getTableHead(names) + this.getTableBody(formatedData, names);
        this.domTable.innerHTML = html;
    }

    getTableHead(names) {
        return `
            <thead>
                <tr>
                    ${names.map(name => `<th scope="col">${TITLES[name] || name}</th>`).join('')}
                </tr>
            </thead>`;
    }

    getTableBody(data, names) {
        return `
            <tbody>
                ${data.map(row => `
                    <tr>
                        ${names.map(name => `<td>${row[name]}</td>`).join('')}
                    </tr>`).join('')}
            </tbody>`;
    }

    renderError(message) {
        this.domTable.innerHTML = `<caption class="text-danger">${message}</caption>`;
    }
}
