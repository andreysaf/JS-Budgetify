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

})();

//UI Controller
var UIController = (function () {
    var DOMStrings = {
        inputType : 'add_type',
        inputDescription : '.add_description',
        inputValue : '.add_value',
        inputButton : '.add_btn'
    }

    return {
        getInput: function() {
            return {
                type : document.getElementById(DOMStrings.inputType).checked,
                description : document.querySelector(DOMStrings.inputDescription).value,
                value : document.querySelector(DOMStrings.inputValue).value
            };
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

    var ctrlAddItem = function() {
        // 1. Get the field input data
        var input = UICtrl.getInput();
        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

    }

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListerners();
        }
    }

})(budgetController, UIController);

controller.init();