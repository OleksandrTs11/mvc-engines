// КОНТРОЛЕР — посередник між моделлю та представленням.
// Модель і view не знають одна про одну (пасивна модель),
// контролер викликає їх у правильному порядку і передає дані.

import ModelEngines from './model_engines.js';
import ViewEngines from './view_engines.js';

export default class ControllerEngines {
    constructor() {
        this.model = new ModelEngines();
        this.view = new ViewEngines();
        this.start();
    }

    start() {
        this.model.loadData()                               // 1. запит за даними
            .then(data => {
                const allData = this.model.parseData(data); // 2. обробка даних
                this.view.renderData(allData);              // 3. візуалізація
            })
            .catch(() => {
                this.view.renderError('Не вдалося завантажити дані');
            });
    }
}
