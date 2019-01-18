//Budget Controller
var budgetController = (function (){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Generate UUID
    var uniqueID = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    };

    //Calculate total
    var calculateTotal = function(type) {
        var sum = 0;

        data.allItems[type].forEach(function(cur) {
            sum = sum + cur.value;
        });

        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, desc, val) {
            var newItem, ID;
            ID = uniqueID();

            if (type === 'exp'){
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            }

            data.allItems[type].push(newItem);
            return newItem;

        },

        calculateBudget: function() {
            //calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');
            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the percentage of income that we spent
            if (data.totals.inc > 0){
                data.totals.percentage = Math.round((data.totals.exp/data.totals.inc)*100); 
            } else {
                data.totals.percentage = -1;
            }
               
        },

        deleteItem: function(type, id) {
            var ids, index;

            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.totals.percentage
            }
        },

        testing: function() {
            return data;
        }
    }

})();

//UI Controller
var UIController = (function () {
    var DOMStrings = {
        inputType : 'add_type',
        inputDescription : '.add_description',
        inputValue : '.add_value',
        inputButton : '.add_btn',
        incomeContainer : '.income_list',
        expenseContainer : '.expenses_list',
        budgetLabel : '.budget_value',
        incomeLabel : '.budget_income-value',
        expenseLabel : '.budget_expenses-value',
        percentageLabel : '.budget_expenses-percentage',
        container : '.container'

    }

    return {
        getInput: function() {
            return {
                type : document.getElementById(DOMStrings.inputType).checked ? 'exp' : 'inc',
                description : document.querySelector(DOMStrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;

            //Build new string
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc_%id%"><div class="item_description">%description%</div>\
                <div class="right clearfix"><div class="item_value">%value%</div><div class="item_delete">\
                <button class="item_delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp_%id%"><div class="item_description">%description%</div>\
                <div class="right clearfix"><div class="item_value">%value%</div><div class="item_percentage">21%</div>\
                    <div class="item_delete"><button class="item_delete-btn"><i class="ion-ios-close-outline"></i></button>\
                    </div></div></div>'
            }

            //Update the string with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert the string into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function(selectorId) {
            var element;
            element = document.getElementById(selectorId);
            element.parentNode.removeChild(element);
        },

        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + 
            DOMStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();

        },

        displayBudget: function(obj) {
            console.log(obj);
            document.querySelector(DOMStrings.budgetLabel).textContent = '$' + obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = '$' + obj.totalIncome;
            document.querySelector(DOMStrings.expenseLabel).textContent = '$' + obj.totalExpenses;
            
            if(obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = 0 + '%';
            }

        },

        getDOMStrings: function() {
            return DOMStrings;
        }
    };

})();

//Global App Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListerners = function() {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13){
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var ctrlAddItem = function() {
        var input, newItem;
        // 1. Get the field input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0){
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            // 4. Clear fields
            UICtrl.clearFields();
            // 5. Calculate and update budget
            updateBudget();
        }

    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('_');
            type = splitID[0];
            ID = splitID[1];
        }

        //Delete item from the budget controller
        budgetCtrl.deleteItem(type, ID);

        //Delete the item from the UI
        UICtrl.deleteListItem(itemID);

        //Update budget
        updateBudget();
    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListerners();
        }
    }

})(budgetController, UIController);

controller.init();