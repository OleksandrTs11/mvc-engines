// МОДЕЛЬ — усе, що пов'язано з даними: звідки брати, як завантажити, як розпарсити.
// Модель нічого не знає про представлення (view).

// Посилання на дані у форматі TSV.
// Варіант 1: локальний файл data.tsv (працює через Live Server або на хостингу).
// Варіант 2: Google Таблиця → Файл → Поділитися → Опублікувати в інтернеті →
//            Аркуш1 → «Значення, розділені табуляцією (.tsv)» → вставити посилання сюди.
const URL_DATA = './data.tsv';

// Формат TSV: рядки розділені переносом рядка (\r\n у Google, \n у звичайних файлах),
// комірки — табуляцією.
const SEPARATOR_LINE = /\r?\n/;
const SEPARATOR_CELL = '\t';

export default class ModelEngines {
    // Запит за даними: повертає Promise з текстом файлу
    loadData() {
        return fetch(URL_DATA).then(response => {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.text();
        });
    }

    // Обробка даних: текст → двовимірний масив → масив об'єктів
    parseData(data) {
        const tableArr = data
            .trim()
            .split(SEPARATOR_LINE)
            .map(line => line.split(SEPARATOR_CELL));

        // Перший рядок — назви колонок
        const names = tableArr.shift();

        // Кожен наступний рядок перетворюємо на об'єкт { order, engine, language, year, author }
        const formatedData = tableArr.map(el => {
            const row = {};
            names.forEach((name, i) => {
                row[name] = el[i];
            });
            return row;
        });

        return { names, formatedData };
    }
}
