//Budget Controller
var budgetController = (function (){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    //Generate UUID
    var uniqueID = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

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
        expenseContainer : '.expenses_list'
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
                html = '<div class="item clearfix" id="%id%"><div class="item_description">%description%</div>\
                <div class="right clearfix"><div class="item_value">%value%</div><div class="item_delete">\
                <button class="item_delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="%id%"><div class="item_description">%description%</div>\
                <div class="right clearfix"><div class="item_value">%value%</div><div class="item_percentage">21%</div>\
                    <div class="item_delete"><button class="item_delete-btn"><i class="ion-ios-close-outline"></i></button>\
                    </div></div></div>'
            }

            //Update the string with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            console.log("HTML: ", newHtml)

            //Insert the string into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

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
    };

    var updateBudget = function() {
        // 1. Calculate the budget

        // 2. Return the budget

        // 3. Display the budget on the UI

    }

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

    }

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListerners();
        }
    }

})(budgetController, UIController);

controller.init();