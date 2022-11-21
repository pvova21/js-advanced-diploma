# js-advanced-diploma

[![Build status](https://ci.appveyor.com/api/projects/status/ofkcb8oqih8a3ehl?svg=true)](https://ci.appveyor.com/project/pvova21/js-advanced-diploma)

# Дипломное задание к курсу «Продвинутый JavaScript». Retro Game

###### tags: `netology` `advanced js`

## Предыстория

Вы неплохо овладели не только продвинутыми возможностями JS, но и инфраструктурными инструментами. Вам поручили первый проект: разработать небольшую пошаговую игру.

Есть нюансы – UI уже написали за вас, спроектировали некоторые базовые классы, но на этом разработку забросили. 

Вам нужно реанимировать проект, переведя его на работу с npm, Babel, Webpack, ESLint (ну и дальше по списку), а также дописать оставшуюся функциональность, потому что ресурсов на разработку и проектирование с нуля, как обычно, нет :).

## Концепция игры

Двухмерная игра в стиле фэнтези, где игроку предстоит выставлять своих персонажей против 
персонажей нечисти. После каждого раунда восстанавливается жизнь уцелевших персонажей 
игрока и повышается их уровень. Максимальный уровень - 4.

Игру можно сохранять и восстанавливать из сохранения.

## Ожидаемый результат

Что вы должны получить в итоге: https://youtu.be/3iB3AerDJ0w

## Файловая структура

Ключевые сущности:
1. GamePlay - класс, отвечающий за взаимодействие с HTML-страницей
2. GameController - класс, отвечающий за логику приложения (важно: это не контроллер в терминах MVC), там вы будете работать больше всего
3. Character - базовый класс, от которого вы будете наследоваться и реализовывать специализированных персонажей
4. GameState - объект, который хранит текущее состояние игры (может сам себя воссоздавать из другого объекта)
5. GameStateService - объект, который взаимодействует с текущим состоянием (сохраняет данные в localStorage для последующей загрузки)
6. PositionedCharacter - Character, привязанный к координате на поле. Обратите внимание, что несмотря на то, что поле выглядит как двумерный массив, внутри оно хранится как одномерный (считайте это своеобразным `legacy`, с которым вам придётся бороться)
7. Team - класс для команды (набор персонажей), представляющих компьютер и игрока
8. generators - модуль, содержащий вспомогательные функции для генерации команды и персонажей

## Ключевые задачи

1. Отрисовать поле
2. Разместить на поле игровых персонажей
3. Вывод информации о персонаже
4. Выбор персонажа
5. Научить ходить
6. Научить сражаться
7. Разработка ИИ
8. Прохождение уровней
9. Сохранение и загрузка
10. Публикация проекта

**Важно**: авто-тесты обязательны только к тем задачам, где это явно обозначено. 
В остальных задачах вы можете их реализовывать по желанию.

## 1. Отрисовать поле

Этапы:
1. Настройте Webpack и необходимое окружение
2. Отрисовка поля
3. Отрисовка границ поля

### Настройка окружения

1. Установите и настройте Webpack, Webpack DevServer, Babel, ESLint.
2. Подключите загрузчик изображений

Подключите файл `src/js/index.js` как точку входа

Обратите внимание, что изначально картинки, прописанные в CSS, не собираются,
т.к. не подключен соответствующий loader:
1. Для webpack до 5 версии используйте [url-loader](https://v4.webpack.js.org/loaders/url-loader/)
2. Начиная с webpack 5 версии используется механизм [Asset Modules](https://webpack.js.org/guides/asset-modules/)   

### Отрисовка поля

Размер поля фиксирован (8x8)

Пришло время наконец начать подключать геймплей. Для этого у вас есть класс GamePlay. 
Объект этого класса уже создан и привязан к HTML-странице. 
Вам необходимо вызвать метод `drawUi` с нужной темой для отрисовки на экране 
(вызывайте этот метод в методе `init` класса `GameController`).

Названия тем фиксированы и перечислены в модуле `themes.js`. 
Отредактируйте модуль так, чтобы можно было использовать определённый в нём объект 
(а не прописывать каждый раз строки руками). На данном этапе достаточно выбрать тему `prairie`.

Если настройка Webpack и Webpack Dev Server выполнена корректно, 
вы увидите поле вида: ![](https://i.imgur.com/JfmSroP.png)

В задаче про уровни необходимо будет сделать привязку к уровню:
* Level 1: prairie
* Level 2: desert
* Level 3: arctic
* Level 4: mountain

### Отрисовать границы

Необходимо, чтобы поле выглядело так: 

![](https://i.imgur.com/SbRwuAL.png)

Для этого в модуле `src/js/utils.js` допишите реализацию функции `calcTileType` так, чтобы она возвращала строки:
* top-left
* top-right
* top
* bottom-left
* bottom-right
* bottom
* right
* left
* center

Особенности:

1. Поле всегда квадратное 
2. Оно хранится как одномерный массив (считайте это своеобразным legacy, с которым вам придётся бороться). 

Например, для поля 8x8:
1. Ячейка с индексом 0 - верхний левый элемент
2. Ячейка с индексом 8 - первый элемент на второй строке

![](https://i.postimg.cc/tgcX178R/SbRwuAL2.png)

**Напишите авто-тест на эту функцию.**

### Критерии выполнения

1. Вы написали авто-тест на функцию *calcTileType*
2. Вы видите на экране поле как на [образце](https://i.imgur.com/SbRwuAL.png)
3. При сборке проекта и запуске Webpack Dev Server вы не видите ошибок
4. Проверка eslint не даёт ошибок

## 2. Разместить на поле игровых персонажей

Пример результата:

![](https://i.postimg.cc/gkfksgDy/Screenshot-from-2022-08-09-17-55-43.png)

Для этого:

1. Создать классы персонажей
2. Научитесь формировать случайные составы команды игрока и соперника
3. Разместите сформированные команды

### Классы персонажей

У игрока и соперника в команде могут быть только определённые классы персонажей

#### Классы игрока

1. Bowman (Лучник)
2. Swordsman (Мечник)
3. Magician (Маг)

#### Классы соперника

4. Vampire (Вампир)
5. Undead (Восставший из мёртвых)
6. Daemon (Демон)

### Создание классов персонажей

Создайте папку `src/js/characters` и создайте в ней одноимённые файлы с классами персонажей, 
которые наследуются от базового класса `src/js/Character.js`

Описание свойств персонажа:

1. level - его уровень, от 1 до 4
2. attack - показатель атаки
3. defence - показатель защиты
4. health - здоровье персонажа
4. type - строка с одним из допустимых значений:
   *'swordsman'*, *'bowman'*, *'magician'*, *'daemon'*, *'undead'*, *'vampire'*. 

   К этим значениям привязаны изображения персонажей на поле.

Укажите начальные характеристики каждого класса:

| Класс     | attack | defence |
|-----------|--------|---------|
| Bowman    | 25     | 25      |
| Swordsman | 40     | 10      |
| Magician  | 10     | 40      |
| Vampire   | 25     | 25      |
| Undead    | 40     | 10      |
| Daemon    | 10     | 10      |


Конструктор каждого класса принимает 

Пример:

```js
const character = new Swordsman(3);
character.level // 3
```

В игре с каждым новым уровнем у персонажей увеличиваются показатели здоровья, атаки и защиты. 
На данном этапе необходимо только сохранять текущий уровень персонажа. 
Улучшением характеристик вы займётесь в следующем блоке

### Доработайте класс Character

Класс `Character` был спроектирован как базовый, чтобы вы могли унаследовать от него своих 
персонажей. Поэтому неплохо бы запретить создавать объекты этого класса
через `new Character(level)`, но при этом создание наследников должно работать 
без проблем: `new Daemon`, где `class Daemon extends Character`. 

Ознакомьтесь с документацией на [new.target](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/new.target) 
и реализуйте подобную логику, выбрасывая ошибку в конструкторе `Character`.

### Формирование команд

Для этого допишите: 
1. Вспомогательные функции в модуле `src/js/generators.js`
2. Класс `src/js/Team.js` для хранения команд персонажей игрока и соперника

#### characterGenerator 

*characterGenerator* - функция генератор, которая формирует случайного персонажа 
из списка переданных классов.

Пример работы:

```js
const playerTypes = [Bowman, Swordsman, Magician]; // доступные классы игрока
const playerGenerator = characterGenerator(playerTypes, 2); // в данном примере персонажи игрока могут быть 1 или 2-ого уровней

const character1 = playerGenerator.next().value; // случайный персонаж из списка playerTypes с уровнем 1 или 2
character1.type; // magician
character1.attack; // 10
character1.level; // 2

const character2 = playerGenerator.next().value; // ещё один случайный персонаж
character2.level; // 1
character2.type; // swordsman

playerGenerator.next().value; // можно вызывать бесконечно
playerGenerator.next().value;
playerGenerator.next().value;
playerGenerator.next().value;
playerGenerator.next().value; // всегда получим нового случайного персонажа со случайным уровнем
```
#### Класс Team

*Класс Team* хранит команду игрока или соперника. Реализуйте хранение персонажей по вашему усмотрению.

Например:
```js
const characters = [new Swordsman(2), new Bowman(3)]; // Обратите внимание на new в отличие от playerTypes в прошлом примере
const team = new Team(characters);

team.characters // [swordsman, bowman]
```

#### generateTeam

*generateTeam* - формирует команду на основе `characterGenerator`. Для формирования всех персонажей
на поле потребуется вызвать generateTeam дважды: для команд игрока и соперника.

Функция возвращает экземпляр класса Team

```js
const playerTypes = [Bowman, Swordsman, Magician]; // доступные классы игрока
const team = generateTeam(playerTypes, 3, 4); // массив из 4 случайных персонажей playerTypes с уровнем 1, 2 или 3

team.characters[0].level // 3
team.characters[1].level // 3
team.characters[2].level // 1
```

### Отрисовка команд персонажей

Персонажи генерируются случайным образом в столбцах 1 и 2 для игрока и в столбцах 7 и 8 для соперника:

![](https://i.imgur.com/XqcV1uW.jpg)

Чтобы привязать персонаж к ячейке, воспользуйтесь классом PositionedCharacter в `src/js/PositionedCharacter.js`

Например:
```js
const character = new Bowman(2);
const position = 8; // для поля 8x8 лучник будет находиться слева на второй строке
const positionedCharacter = new PositionedCharacter(character, position); 
```

Для отрисовки воспользуйтесь методом `redrawPositions` класса `src/js/GamePlay.js`, 
Метод принимает на вход массив объектов `PositionedCharacter`. Для упрощения при любом дальнейшем изменении игрового поля 
(перемещение персонажа или его смерть) мы предлагаем вам целиком перерисовать игровое поле с помощью данного метода.

Логику формирования и отрисовки команд игрока и соперника, как и логику всей игры рекомендуется выполнять в 
классе `src/js/GameController.js`

**Важно! На поле в одной клетке не могут одновременно находиться два персонажа!**

### Авто-тесты

1. Напишите тесты на то, что исключение выбрасывается при создании
объекта класса Character и не выбрасывается при создании объектов унаследованных классов
2. Проверьте, правильные ли характеристики содержат создаваемые персонажи 1-ого уровня
3. Проверьте, выдаёт ли генератор `characterGenerator` бесконечно новые персонажи из списка (учёт аргумента *allowedTypes*)
4. Проверьте, в нужном ли количестве и диапазоне уровней (учёт аргумента *maxLevel*) создаются персонажи при вызове `generateTeam`

### Критерии выполнения

1. Написаны авто-тесты по базовому классу Character и классам персонажей
2. После загрузки страницы на поле случайным образом находятся команды игрока и соперника. 

    Каждая перезагрузка страницы начинает игру заново, а следовательно, формирует новые составы команд на поле.

3. При сборке проекта и запуске Webpack Dev Server вы не видите ошибок
4. Проверка eslint не даёт ошибок


## 3. Вывод информации о персонаже

Вам нужно реализовать отображение краткой информации о персонаже с использованием [`tagged templates`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

![](https://i.imgur.com/SljJjE0.png)

`GamePlay` может уведомлять вас о событиях, происходящих с игровым полем через механизм callback'ов.

Для игрового поля предусмотрены:
1. Вход указателя мыши в ячейку поля (`addCellEnterListener`)
2. Выход указателя мыши из ячейки поля (`addCellLeaveListener`)
3. Клик мышью по ячейке поля (`addCellClickListener`)

Чтобы добавить "слушателя" на определённое событие, используйте методы, указанные рядом с описанием событий, в качестве аргумента передавая callback. 
Callback принимает всего один аргумент - индекс ячейки поля, на которой происходит событие.

Как это сделать:

1. Подпишитесь из `GameController` на событие `cellEnter` (в качестве коллбека передавайте метод `onCellEnter` из `GameController` - подумайте, как правильно это сделать, вспомните про то, что такое на самом деле методы в классе и про `this`)
    
    Как это должно выглядеть:
    ```javascript
    // GameController:
    someMethodName() { // <- что это за метод и где это нужно сделать решите сами
       this.gameplay.addCellEnterListener(this.onCellEnter);
    }
    
    onCellEnter(cellIndex) {
        // some logic here
    }
    ```
2. При возникновении события `cellEnter` проверяйте, есть ли в поле персонаж, если есть используйте метод `showCellTooltip` из класса `GamePlay` для отображения информации
3. При возникновении события `cellLeave` скрывайте подсказку (метод `hideCellTooltip`)

Формат информации:
"🎖1 ⚔10 🛡40 ❤50", где:
* 1 - level
* 10 - значение атаки
* 40 - значение защиты
* 50 - значение жизни

🎖 U+1F396 - медалька (уровень)
⚔ U+2694 - мечи (атака)
🛡 U+1F6E1 - щит (защита)
❤ U+2764 - сердце (уровень жизни)

Создайте метод/функцию, который выдаёт информацию в данном формате

Важно: подсказка показывается только если в поле есть персонаж!

### Критерии выполнения

1. Написаны авто-тесты, проверяющие созданный метод на корректность вывода характеристик
2. При наведении на персонаж показывается информация с его характеристиками
3. При сборке проекта и запуске Webpack Dev Server вы не видите ошибок
4. Проверка eslint не даёт ошибок

## 4. Выбор персонажа

Настало время научить приложение выбирать персонажа для следующего хода. Для этого:
1. Нужно помнить, чей сейчас ход: игрока или компьютера
2. Нужно реагировать на клик пользователя по определённой ячейке игрового поля

Для хранения состояния мы предлагаем вам воспользоваться объектами специального класса `GameState` 
и хранить в нём информацию о том, чей шаг следующий (продумайте самостоятельно, как вы это будете делать).

**Важно: в новой игре игрок всегда начинает первым**

Для того, чтобы реагировать на клик на ячейке поля в классе `GamePlay`, реализован метод `addCellClickListener`, 
который в качестве аргумента принимает callback. Подпишитесь из `GameController` на событие `cellClick`
(в качестве коллбека передавайте метод `onCellClick` из `GameController` - подумайте, как правильно это сделать, 
вспомните про то, что такое на самом деле методы в классе и про `this`).

```javascript
// GameController:
someMethodName() { // <- что это за метод и где это нужно сделать решите сами
   this.gameplay.addCellClickListener(this.onCellClick);
}

onCellClick(cellIndex) {
    // some logic here
}
```

В методе `onCellClick`, проверяйте, есть ли в ячейке персонаж и это персонаж игрока (т.е. `Bowman`, `Swordsman` или `Magician`). 
Если нет - выводите сообщение об ошибке с помощью метода `showError` из класса `GamePlay`. 

Если это персонаж игрока, то необходимо выделить ячейку с помощью метода `selectCell` из класса `GamePlay`:

![](https://i.imgur.com/HUlj3x7.png)

Примечание: `showError` работает, конечно очень просто, просто выводя `alert`, но на то она и Retro Game :).

Важно: выделить можно только одного персонажа! Если вы выделяете другого (персонажа игрока), 
с предыдущего выделение снимается (см. метод `deselectCell` из класса `GamePlay`).

### Критерии выполнения

1. Выбор персонажа работает в соответствие с принципами выше
2. При сборке проекта и запуске Webpack Dev Server вы не видите ошибок
3. Проверка eslint не даёт ошибок

## 5. Ход игрока

Сообщения об ошибках, это конечно, неплохо. Но гораздо лучше, когда пользователь сразу получает визуальный отклик.

Если персонаж игрока выбран, то дальнейшие возможные действия могут быть:
1. Выбрать другого персонажа 
2. Перейти на другую клетку (в рамках допустимых переходов)
3. Атаковать противника (в рамках допустимого радиуса атаки)
4. Недопустимое действие (наведение на ячейку, не попадающую под первые три варианта)

Вам необходимо в свободной форме реализовать подобную логику. При этом:

1. Если мы собираемся выбрать другого персонажа, то поле не подсвечивается, а курсор приобретает форму `pointer` 
(см. модуль `src/js/cursors.js` и метод `setCursor` из класса `GamePlay`):

    ![](https://i.imgur.com/yNI25eV.png)

2. Если мы собираемся перейти на другую клетку (в рамках допустимых переходов), то поле подсвечивается зелёным, курсор приобретает форму `pointer`:

    ![](https://i.imgur.com/Je5zqN0.png)

3. Если мы собираемся атаковать противника (в рамках допустимого радиуса атаки), то поле подсвечивается красным, курсор приобретает форму `crosshair`:

    ![](https://i.imgur.com/gUlSc6O.png)

4. Если мы собираемся выполнить недопустимое действие, то курсор приобретает форму `notallowed` (в этом случае при клике так же выводится сообщение об ошибке):

    ![](https://i.imgur.com/O8QsL40.png)

Смену хода, бой и перемещение персонажей вы рассмотрите в следующих блоках

### Особенности атаки и движения персонажей

Направление движения аналогично ферзю в шахматах. 
Персонажи разного типа могут ходить на разное расстояние 
(в базовом варианте можно перескакивать через других персонажей, т.е. как конь в шахматах, 
единственное правило - ходим по прямым и по диагонали):

* Мечники/Скелеты - 4 клетки в любом направлении
* Лучники/Вампиры - 2 клетки в любом направлении
* Маги/Демоны - 1 клетка в любом направлении

![](https://i.imgur.com/yp8vjhL.jpg)

Дальность атаки тоже ограничена:
* Мечники/Скелеты - могут атаковать только соседнюю клетку
* Лучники/Вампиры - на ближайшие 2 клетки
* Маги/Демоны - на ближайшие 4 клетки

Клетки считаются "по радиусу", допустим для мечника зона поражения будет выглядеть вот так:

![](https://i.imgur.com/gJ8DXPU.jpg)

Для лучника(отмечено красным):

![](https://i.imgur.com/rIINaFD.png)

### Критерии выполнения

1. Написаны авто-тесты на особенности атаки и движения каждого класса персонажей
2. Курсор мышки меняется в зависимости от ячейки и ситуации на игровом поле
3. При сборке проекта и запуске Webpack Dev Server вы не видите ошибок
4. Проверка eslint не даёт ошибок

## 6. Перемещение

Перемещение: Выбирается свободное поле, на которое можно передвинуть персонажа (для этого на поле необходимо кликнуть левой кнопкой мыши)

Вы сделали визуальное отображение, пора заняться перемещением. Реализуйте логику, 
связанную с перемещением в `GameController` и обновите отображаемых на экране персонажей с 
помощью метода `redrawPositions`. Не забывайте убирать выделения ячеек и делать переход хода.

## 7. Атака

Пора заняться атакой. Реализуйте логику, связанную с атакой в `GameController`: 
для отображения урона используйте метод `showDamage` из `GamePlay`. 
Обратите внимание, что он возвращает `Promise` - добейтесь того, чтобы анимация урона доходила 
до конца. Обратите внимание, что после атаки должна пересчитываться полоска жизни над персонажем 
(она автоматически пересчитывается в `redrawPositions`).

Урон рассчитывается по формуле: `Math.max(attacker.attack - target.defence, attacker.attack * 0.1)`, 
где `attacker` - атакующий персонаж, `target` - атакованный персонаж

При совершении атаки вы должны уменьшить здоровье атакованного персонажа на размер урона.

## 8. Ответные действия компьютера

Пора и компьютеру научиться отвечать на атаки игрока. 
Реализуйте стратегию атаки компьютера на персонажей игрока 
(например, атакуем первого доступного, самого слабого/сильного из всех доступных, либо придумайте собственную тактику).

Игрок и компьютер последовательно выполняют по одному игровому действию, после чего управление передаётся противостоящей стороне. 

## 9. Смерть, повышение уровня персонажей

Реализуйте логику:
1. Персонажи исчезают после смерти (поле освобождается)
2. В случае, если у противника не осталось персонажей:
   1. Повысьте уровень персонажа
   2. Начните игру на новом уровне

### Повышение уровня персонажа

1. Показатель health приводится к значению: текущий уровень + 80 (но не более 100). 

    Т.е. если у персонажа 1 после окончания раунда уровень жизни был 10, а персонажа 2 - 80, то после levelup:
    - персонаж 1 - жизнь станет 90
    - персонаж 2 - жизнь станет 100

2. Повышение показателей атаки/защиты привязаны к оставшейся жизни по формуле: 

    `attackAfter = Math.max(attackBefore, attackBefore * (80 + life) / 100)`, т.е. если у персонажа после окончания раунда жизни осталось 50%, то его показатели улучшатся на 30%. Если  жизни осталось 1%, то показатели никак не увеличатся.
3. Внесите учёт логики при создании персонажа выше 1 уровня:

   ```js
    const character = new Daemon(3); // Создаёт персонажа 1-уровня и 2 раза повышает его уровень и характеристики
   ```
   
### Новый уровень игры

После перехода на новый уровень смените тему игры (prairie -> desert -> arctic -> mountain)

## 10. Game Over, New Game и статистика

После завершения игры (проигрыша игрока) или завершения всех 4 уровней игровое поле необходимо заблокировать (т.е. не реагировать на события, происходящие на нём).

При нажатии на кнопку `New Game`, должна стартовать новая игра, но при этом максимальное количество баллов (очков), набранное за предыдущие игры, должно сохраняться в `GameState`.

Для подписки на события клика на кнопку `New Game` используйте метод `addNewGameListener` из класса `GamePlay`.

## 11. Хранение состояния

Спроектируйте и реализуйте класс `GameState` (модуль `GameState`), который позволяет хранить всю информацию об текущем состоянии игры. Хранящейся в нём информации должно быть достаточно, чтобы сохранить полное состояние игры и восстановиться из него.

Сервис `GameStateService` умеет с помощью методов `save` и `load` загружать состояние из локального хранилища браузера при перезагрузке.

Удостоверьтесь, что игра стартует с нужной точки после перезагрузки.

Обратите внимание, что метод `load` может выдавать ошибку.

**Напишите авто-тест с моком для метода `load`, который проверяет реакцию вашего приложения на успешную и не успешную загрузку (при неуспешной загрузке должно выводиться сообщение через `GamePlay` - подумайте, как вы это будете тестировать).**

## 12. Deployment

Ваше приложение уже достаточно хорошо, если вы добрались до этого пункта. Необходимо выложить ваше творение в сеть. Воспользуйтесь для этого сервисом [GitHub Pages](https://pages.github.com). 
Если кратко, то достаточно создать ветку с названием `gh-pages` в вашем репозитории и положить туда только содержимое сборки (каталог `dist`, если вдруг вы забыли), после чего запушить всё на GitHub.

GitHub Pages создаст веб-сайт по адресу: https://<ваш логин>.github.io/<название репозитория>

Ваше приложение автоматически развернётся на сервере (см. вкладку `Environments`):

![](https://i.imgur.com/kHpYWyL.png)

На странице будет указана ссылка на сам сайт и история развёртываний:

![](https://i.imgur.com/ZnNVdFA.png)

## 13. Дополнительные задания (не обязательны для выполнения)

1. Уберите ограничение в 4 уровня и реализуйте бесконечный цикл level'ов. Сохраняйте и выводите максимальное количество баллов в состоянии игры.
2. Улучшите пользовательский интерфейс: 
   1. Откажитесь от alert в сообщениях в пользу 
   2. Визуально на поле показывайте границы атаки и движения персонажей
3. Отладьте баланс, чтобы ходить и бить врагов не было мучительно долго и скучно
4. Сделайте стратегию соперника более интересной/непредсказуемой
