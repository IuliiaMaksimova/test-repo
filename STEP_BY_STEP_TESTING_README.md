# 🧪 Пошаговое тестирование с зависимостями

## 📋 Обзор

Новая система тестирования реализует пошаговый подход с автоматическим пропуском тестов при падении предыдущих шагов.

## 🏗️ Структура файлов

```
Utils/
├── testState.js        # Управление состоянием тестов
├── testSteps.js        # Базовые шаги тестирования
└── afterEach.js        # Автоматические скриншоты при падении

Tests/
├── headerSteps.test.js     # Тесты хедера по шагам
├── footerSteps.test.js     # Тесты футера по шагам
├── homePageSteps.test.js   # Тесты главной страницы по шагам
└── demoSteps.test.js       # Демо-тест
```

## 🎯 Принципы работы

### 1. **Последовательность шагов:**

1. **Страница открывается и отображается**
2. **Все кнопки есть и отображаются**
3. **Клик по кнопке**
4. **Переход на страницу по кнопке**
5. **Корректное отображение страницы**
6. **Возврат на главную страницу**

### 2. **Зависимости между шагами:**

- Каждый шаг зависит от успешного выполнения предыдущего
- При падении одного шага все последующие автоматически пропускаются
- Состояние падений сохраняется глобально для всех тестов

### 3. **Автоматические скриншоты:**

- При падении любого теста автоматически сохраняется скриншот
- Скриншоты сохраняются в `test-results/screenshots/`
- Имена файлов содержат название теста и timestamp

## 🚀 Использование

### Базовый пример:

```javascript
import { TestSteps } from '../Utils/testSteps.js';

describe('My Test Suite', function () {
  let testSteps;

  before(async function () {
    testSteps = new TestSteps('MySuite');
    await testSteps.setup();
  });

  after(async function () {
    await testSteps.teardown();
  });

  beforeEach(function () {
    testSteps.setLogger(this.currentTest.fullTitle());
  });

  it('Step 1: Page opens and displays', async function () {
    if (testSteps.shouldSkipTest('Step1')) {
      this.skip();
    }

    try {
      await testSteps.step1_PageOpensAndDisplays();
    } catch (error) {
      testSteps.handleTestError('Step1', error);
    }
  });
});
```

## 📊 Доступные шаги

### `step1_PageOpensAndDisplays()`

- Проверяет загрузку страницы
- Проверяет наличие основных элементов

### `step2_AllButtonsPresentAndVisible()`

- Проверяет наличие кнопок хедера и футера
- Проверяет их видимость

### `step3_ClickButton(locator, buttonName)`

- Выполняет клик по указанной кнопке
- Логирует действие

### `step4_NavigateToPage(expectedUrlPart)`

- Ожидает перехода на страницу
- Проверяет URL страницы

### `step5_PageDisplaysCorrectly()`

- Проверяет корректность отображения страницы
- Проверяет заголовок страницы

### `step6_ReturnToMainPage()`

- Возвращается на главную страницу
- Проверяет успешный возврат

## 🔧 Управление состоянием

### `TestStateManager`

- Отслеживает упавшие тесты
- Управляет пропуском последующих тестов
- Сохраняет состояние между тестами

### Методы:

- `markTestAsFailed(testName)` - помечает тест как упавший
- `isTestFailed(testName)` - проверяет, упал ли тест
- `hasAnyFailedTests()` - проверяет наличие упавших тестов
- `shouldSkipTest(testName)` - определяет, нужно ли пропустить тест

## 📈 Преимущества

1. **🎯 Четкая структура** - каждый шаг имеет определенную цель
2. **🔄 Зависимости** - тесты выполняются только при успехе предыдущих
3. **📸 Автоматические скриншоты** - при падении сохраняется визуальная информация
4. **⚡ Эффективность** - не тратится время на выполнение заведомо неудачных тестов
5. **📊 Детальное логирование** - каждый шаг подробно логируется
6. **🛠️ Переиспользование** - базовые шаги можно использовать в разных тестах

## 🎨 Примеры результатов

### Успешный тест:

```
✔ Step 1: Page opens and displays
✔ Step 2: All buttons are present and visible
✔ Step 3: Click Download button
✔ Step 4: Navigate to Download page
✔ Step 5: Download page displays correctly
✔ Step 6: Return to main page
```

### Тест с падением:

```
✔ Step 1: Page opens and displays
✔ Step 2: All buttons are present and visible
✔ Step 3: Click Privacy Policy button
❌ Step 4: Navigate to Privacy Policy page (FAILED)
⏭️ Step 5: Privacy Policy page displays correctly (SKIPPED)
⏭️ Step 6: Return to main page (SKIPPED)
```

## 🚀 Запуск тестов

```bash
# Запуск всех пошаговых тестов
npm test -- --grep "Step by Step"

# Запуск конкретного теста
npm test -- --grep "Demo - Step by Step"

# Запуск всех тестов
npm test
```

## 📁 Структура результатов

```
test-results/
├── screenshots/
│   ├── Test_Name_Step_1__2025-09-20T05-15-32-638Z.png
│   └── Test_Name_Step_4__2025-09-20T05-14-46-072Z.png
└── pagesource/
    ├── Test_Name_Step_1__2025-09-20T05-15-32-638Z.html
    └── Test_Name_Step_4__2025-09-20T05-14-46-072Z.html
```

## 🎉 Заключение

Новая система пошагового тестирования обеспечивает:

- **Надежность** - четкая последовательность проверок
- **Эффективность** - автоматический пропуск при падениях
- **Отладку** - детальные логи и скриншоты
- **Масштабируемость** - легко добавлять новые шаги и тесты
