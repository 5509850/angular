//Модель
var model = {
    payments: [{ month: '0 месяц', amount: '$0', perc: '$0', main: '$0', pay: '$0', passed: false, style: 'well', font: 'inherit' }]
};



//Модуль

var myApp = angular.module("App", ["AngularPrint"]);

//var myApp = angular.module("App", ['AngularPrint', '...']);
//Контоллер      
myApp.controller("CourceListCtrl", CourceList);

function CourceList($scope) {
    $scope.data = model;   
    $scope.paymentMonth = 'Ежемесячные платежи:';  

    var am = parseFloat(localStorage.loan_amount);
    var ap = parseFloat(localStorage.loan_apr);
    var ye = parseFloat(localStorage.loan_years);
    var co = parseFloat(localStorage.loan_commis);
    var an = (localStorage.loan_annu);
    if (isNaN(am)) {
        am = 10000;
    }
    if (isNaN(ap)) {
        ap = 10;
    }
    if (isNaN(ye)) {
        ye = 2;
    }
    if (isNaN(co)) {
        co = 0;
    }
    if (!isNaN(an)) {
        if (an == 1)
            $scope.payment = {
                type: 'Annu'
            };
        else
        {
            $scope.payment = {
                type: 'Diff'
            };
        }
    }
    else {
        $scope.payment = {
            type: 'Annu'
        };
    }
    $scope.amount = am;
    $scope.apr = ap;
    $scope.years = ye;
    $scope.commis = co;

    $scope.amountText = $scope.amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

    //обработчик нажатия по кнопке "Печать"          
    $scope.printDiv = function (divName) {

        //var printContents = document.getElementById(divName).innerHTML;
        //var popupWin = window.open('', '_blank', 'width=300,height=300');
        //popupWin.document.open();
        //popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
        //popupWin.document.close();
    }

    $scope.clear = function () {
        $scope.data.payments.length = 0; // clear array
        $scope.amountText = $scope.amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        $scope.monthly = '';
        $scope.percent = '';
        $scope.total = '';
        chart();
    }

    //обработчик нажатия по кнопке "Расчитать"  
    $scope.calculateByMonth = function () {
        var an = 0;
        if ($scope.payment.type == 'Annu')
        {
            an = 1;
        }
        save($scope.amount, $scope.apr, $scope.years, $scope.commis, an);
        $scope.commisShow = $scope.commis > 0;
        $scope.data.payments.length = 0; // clear array

        if ($scope.payment.type == 'Annu') { //Аннуитетные-------------------------      
            var interest = parseFloat($scope.apr / 100);
            var percTotal = 0;
            var mainTotal = 0;
            var monthlyTotal = 0;
            $scope.paymentMonth = 'Ежемесячные платежи:';

            var amountRest = $scope.amount; //остаток основного долга
            var percent = parseFloat(amountRest * interest / 12);
            var monthly = ($scope.amount * (interest / 12)) / (1 - (1 / Math.pow(1 + (interest / 12), ($scope.years * 12)))) + $scope.commis; // fixed
            $scope.monthly = monthly.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            var mainloan = monthly - percent - $scope.commis;

            for (i = 1; i < ($scope.years * 12) + 1; i++) {
                var mystyle = 'success';
                if (i % 2 == 0) {
                    mystyle = 'success';
                }
                else {
                    mystyle = 'warning';
                }
                $scope.data.payments.push({
                    month: i + '-й месяц',
                    amount: amountRest.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                    perc: (percent + $scope.commis).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                    main: mainloan.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                    pay: monthly.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                    passed: false,
                    style: mystyle,
                    font: 'inherit'
                });

                amountRest -= mainloan;
                mainTotal += mainloan;
                percTotal += percent + $scope.commis;
                monthlyTotal += monthly;

                percent = parseFloat(amountRest * interest / 12);
                mainloan = monthly - percent - $scope.commis;
            }
            //Итого:
            $scope.data.payments.push({
                month: "ИТОГО:",
                amount: "0",
                perc: percTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                main: mainTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                pay: monthlyTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                passed: true,
                style: 'danger',
                font: 'large'
            });
            $scope.total = monthlyTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            $scope.percent = percTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            var a = parseFloat($scope.amount);
            var b = parseFloat($scope.apr) / 100 / 12;
            var c = parseFloat(monthly);
            var d = parseFloat($scope.years) * 12;
            var t = monthlyTotal;
            chart(a, b, c, d, t);        
        }
        else { //Дифференцированные платежи           --------------------------------------------------------------------------------------        
            var interest = parseFloat($scope.apr / 100);
            var percTotal = 0;
            var mainTotal = 0;
            var monthlyTotal = 0;

            $scope.paymentMonth = 'Первый платеж:';

            var amountRest = $scope.amount; //остаток основного долга            
            var mainloan = parseFloat($scope.amount / ($scope.years * 12)); //fixed
            var percent = parseFloat(amountRest * interest / 12);
            var monthly = mainloan + percent + $scope.commis;

            $scope.monthly = monthly.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');            

            for (i = 1; i < ($scope.years * 12) + 1; i++) {
                var mystyle = 'success';
                if (i % 2 == 0) {
                    mystyle = 'success';
                }
                else {
                    mystyle = 'warning';
                }
                $scope.data.payments.push({
                    month: i + '-й месяц',
                    amount: amountRest.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                    perc: (percent + $scope.commis).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                    main: mainloan.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                    pay: monthly.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                    passed: false,
                    style: mystyle,
                    font: 'inherit'
                });

                amountRest -= mainloan;
                mainTotal += mainloan;
                percTotal += percent + $scope.commis;
                monthlyTotal += monthly;

                percent = parseFloat(($scope.amount - (i * ($scope.amount / ($scope.years * 12)))) * (interest / 12));
                monthly = mainloan + percent + $scope.commis;
            }
            //Итого:
            $scope.data.payments.push({
                month: "ИТОГО:",
                amount: "0",
                perc: percTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                main: mainTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                pay: monthlyTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
                passed: true,
                style: 'danger',
                font: 'large'
            });
            $scope.total = monthlyTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            $scope.percent = percTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            var a = parseFloat($scope.amount);
            var b = parseFloat($scope.apr) / 100 / 12;
            var c = parseFloat($scope.amount / 12 / $scope.years);
            var d = parseFloat($scope.years) * 12;
            var t = monthlyTotal;
            chart(a, b, c, d, t);
        }
    }

    $scope.showText = function (passed) {
        return passed ? "Да" : "Нет";
    }
    $scope.setStyle = function (passed) {
        return passed ? "color:green" : "color:red; font-weight: bold";
    }
    $scope.newPaymentTypeValue = function (value) {
        $scope.log = value;
    }
}

function save(amount, apr, years, commis, annu) {
    if (window.localStorage) {  // Only do this if the browser supports it
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_commis = commis;
        localStorage.loan_annu = annu;
    }
}

// Chart monthly loan balance, interest and equity in an HTML <canvas> element.
// If called with no arguments then just erase any previously drawn chart.
function chart(principal, interest, monthly, payments, total) {

   
    var graph = document.getElementById("graph"); // Get the <canvas> tag
    graph.width = graph.width;  // Magic to clear and reset the canvas element

    // If we're called with no arguments, or if this browser does not support
    // graphics in a <canvas> element, then just return now.
    if (arguments.length == 0 || !graph.getContext) return;

    // Get the "context" object for the <canvas> that defines the drawing API
    var g = graph.getContext("2d"); // All drawing is done with this object
    var width = graph.width, height = graph.height; // Get canvas size

    // These functions convert payment numbers and dollar amounts to pixels
    function paymentToX(n) { return n * width / payments; }
    function amountToY(a) { return height - (a * height / (monthly * payments * 1.05)); }

    //-------------------------------------------------------------------------------------------

    // Payments are a straight line from (0,0) to (payments, monthly*payments)
    g.moveTo(paymentToX(0), amountToY(0));         // Start at lower left
    g.lineTo(paymentToX(payments),                 // Draw to upper right
             amountToY(monthly * payments));
    g.lineTo(paymentToX(payments), amountToY(0));  // Down to lower right
    g.closePath();                                 // And back to start
    g.fillStyle = "#f88";                          // Light red
    g.fill();                                      // Fill the triangle
    g.font = "bold 16px sans-serif";               // Define a font
    g.fillText("Выплаты по процентам", 20, 20);  // Draw text in legend

    //-------------------------------------------------------------------------------------------
    // Cumulative equity is non-linear and trickier to chart
    /*
    var equity = 0;
    g.beginPath();                                 // Begin a new shape
    g.moveTo(paymentToX(0), amountToY(0));         // starting at lower-left
    for (var p = 1; p <= payments; p++) {
        // For each payment, figure out how much is interest
        var thisMonthsInterest = (principal - equity) * interest;
        equity += (monthly - thisMonthsInterest);  // The rest goes to equity
        g.lineTo(paymentToX(p), amountToY(equity)); // Line to this point
    }
    g.lineTo(paymentToX(payments), amountToY(0));  // Line back to X axis
    g.closePath();                                 // And back to start point
    g.fillStyle = "green";                         // Now use green paint
    g.fill();                                      // And fill area under curve
    g.fillText("Выплаты по основному долгу", 20, 35);             // Label it in green
    */
    //-------------------------------------------------------------------------------------------
    // Loop again, as above, but chart loan balance as a thick black line

    //var bal = principal;
    //g.beginPath();
    //g.moveTo(paymentToX(0), amountToY(bal));
    //for (var p = 1; p <= payments; p++) {
    //    var thisMonthsInterest = bal * interest;
    //    bal -= (monthly - thisMonthsInterest);     // The rest goes to equity        
    //    g.lineTo(paymentToX(p), amountToY(bal));    // Draw line to this point
    //}

    g.strokeStyle = 'lightgray';
    g.lineWidth = 7;                               // Use a thick line
    g.stroke();                                    // Draw the balance curve
    g.fillStyle = "white";                         // Switch to white text
    g.fillText("Сумма долга", 20, 50);             // Legend entry

    // Now make yearly tick marks and year numbers on X axis
    g.textAlign = "center";                          // Center text over ticks
    var y = amountToY(0);                          // Y coordinate of X axis
    for (var year = 1; year * 12 <= payments; year++) { // For each year
        var x = paymentToX(year * 12);               // Compute tick position
        g.fillRect(x - 0.5, y - 3, 1, 3);                 // Draw the tick
        if (year == 1) g.fillText("Год", x, y - 5); // Label the axis
        if (year % 5 == 0 && year * 12 !== payments) // Number every 5 years
            g.fillText(String(year), x, y - 5);
    }

    // Mark payment amounts along the right edge
    g.textAlign = "right";                         // Right-justify text
    g.textBaseline = "middle";                     // Center it vertically
    var ticks = [total, principal];     // The two points we'll mark
    var rightEdge = paymentToX(payments);          // X coordinate of Y axis
    for (var i = 0; i < ticks.length; i++) {        // For each of the 2 points
        var y = amountToY(ticks[i]);               // Compute Y position of tick
        g.fillRect(rightEdge - 3, y - 0.5, 3, 1);       // Draw the tick mark
        g.fillText(String(i.toFixed(0)),
        //g.fillText(String(ticks[i].toFixed(0)),    // And label it.
                   rightEdge - 5, y);
    }
}
