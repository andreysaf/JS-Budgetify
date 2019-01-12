//Budget Controller
var budgetController = (function (){

})();

//UI Controller
var UIController = (function () {

    return {
        getInput: function() {
            var type = document.getElementById('add_type').checked;
            console.log(type);
        }
    };

})();

//Global App Controller
var controller = (function (budgetCtrl, UICtrl) {

    var ctrlAddItem = function() {
        // 1. Get the field input data

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI
        console.log('It works!');
    }

    document.querySelector('.add_btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
        if (e.keyCode === 13 || e.which === 13){
            ctrlAddItem();
        }
    });

})(budgetController, UIController);