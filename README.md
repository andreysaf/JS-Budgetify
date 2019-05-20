# JS-Budgetify
Responsive budget app to help you with finances. You can add your income, expenses to receive budget and percentage of income made vs. spent.

<img src="https://i.imgur.com/HB6bCY8.png" title="source: imgur.com" />

Written with HTML, CSS, JS.

### Installing
Download or clone repository and run:

```
index.html
```

### app.js structure

The app.js is split into 3 components: controller, UIController and budgetController. The app is initialized by calling controller.init();

```
controller - Responsible for app initiliazation, setting up event listeners, 
and calling appropriate methods of UI and budget components when adding or removing expenses.

UIController - Performs DOM manipulation, updating the user interface.

budgetController - Creates the data structure of the app and handles calculation of income, 
expenses and budget.
```

### Future plans
Import from Scotiabank and BMO financial statements.
Support estimation for RRSP, TFSA.
