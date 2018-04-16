//Hide the alert by default
$('#alert').hide();
$('#alert-close').click(function () {
    $('#alert').toggle(500);
})

/* Begin Update Item Transaction Code */
function checkItemIncreaseInputsFilled() {
    let increase_text = $("#price-increase").val();
    let selection_text = $("#item-selection").val();

    if (increase_text != "" && selection_text != "Please Make a Selection") {
        $("#btn-submit-item-update").prop('disabled', false); // Enable the submit button for item-update
    }
    else {
        $("#btn-submit-item-update").prop('disabled', true); // disable the submit button for item-update
    }
};

$("#price-increase").on('input', function (e) {
    checkItemIncreaseInputsFilled();
});

$("#item-selection").on('input', function (e) {
    checkItemIncreaseInputsFilled();
});

function itemIncreaseSubmitClick() {
    let increase_double = parseFloat($("#price-increase").val());
    if (isNaN(increase_double)) {
        alert("Please enter a number.");
    }
    else {
        increase_double = increase_double / 100; // convert to percentage
        increase_double += 1; // add one so it is now an increase
        let increase_text = increase_double.toString();
        let item_selection = $("#item-selection").val();

        if (item_selection == "Please Make a Selection") {
            alert("Please select an item type.")
        }
        else {
            let data = { increase: increase_text, item_type: item_selection };

            $.ajax({
                url: "http://localhost:5252/home/updateItemPrice",
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (response) {
                    $('#alert').toggle(500);
                    //alert("Success! Check the 'Item' page to view the new price.");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                    alert("Unsuccessful.");
                }
            });
        }
    }
}
$("#btn-submit-item-update").click(itemIncreaseSubmitClick);

/* End Update Item Transaction Code */

/* Begin Total Amount Purchased Code */
function checkTotalAmountInputsFilled() {
    let customer = $("#customer-selection").val();
    console.log(customer);
    let type = $("#return-item-selection").val();
    console.log(type);
    let date = $('#year').val() + '-' + $('#month').val() + '-' + $('#day').val();
    console.log(date);

    if (customer != "" && type != "Please Make a Selection" && date != "") {
        $("#btn-return-amount").prop('disabled', false); // Enable the submit button for return-amount
    }
    else {
        $("#btn-return-amount").prop('disabled', true); // disable the submit button for return-amount
    }
};

$("#customer-selection").on('input', function (e) {
    checkTotalAmountInputsFilled();
});

$("#return-item-selection").on('input', function (e) {
    checkTotalAmountInputsFilled();
});

$("#day").on('input', function (e) {
    checkTotalAmountInputsFilled();
});

$("#month").on('input', function (e) {
    checkTotalAmountInputsFilled();
});

$("#year").on('input', function (e) {
    checkTotalAmountInputsFilled();
});

function itemReturnAmountSubmitClick() {
    let customer = $("#customer-selection").val();
    let name = $("#customer-selection option:selected").text();
    let type = $("#return-item-selection").val();
    let date = $('#year').val() + '-' + $('#month').val() + '-' + $('#day').val();
    let itemReturnAmountURL = 'http://localhost:5252/home/returnAmount/' + customer + '/' + type + '/' + date;
    console.log(itemReturnAmountURL);

    // AJAX GET to get amount of that item purchased
    $.get(itemReturnAmountURL, function (data) {
        data = jQuery.parseJSON(data);
        console.log(data.data[0].amount);
        let recievedData = data.data;
        let amount = recievedData[0].amount;
        let body = "Customer " + name + " has purchased " + amount + " items on " + date + ".";
        $('#modal-body').html(body);
        $('#modal').modal('toggle');
    });
}

$("#btn-return-amount").click(itemReturnAmountSubmitClick);
/* End Total Amount Purchased Code */

/* Dropdown fillers */
// AJAX GET to get item types and call buildItemTypeDropdown
$.get("http://localhost:5252/home/getItemTypes", function (data) {
    data = jQuery.parseJSON(data);
    let recievedData = data.data;
    let emptyMessage = "Please Make a Selection"
    buildItemTypeDropdown(recievedData, $("#item-selection"), emptyMessage); // build item-selection dropdown
    buildItemTypeDropdown(recievedData, $("#return-item-selection"), emptyMessage); // build return-item-selection dropdown
});

// Builds dropdown for item type 
function buildItemTypeDropdown(result, dropdown, emptyMessage) {
    // Remove current options
    dropdown.html('');

    // Add the empty option with the empty message
    dropdown.append('<option>' + emptyMessage + '</option>');

    // Check result isnt empty
    if (result != '') {
        // Loop through each of the results and append the option to the dropdown
        $.each(result, function (k, v) {
            dropdown.append('<option>' + v.Type + '</option>');
        });
    }
}

// AJAX GET to get customers and call buildCustomerDropdown
$.get("http://localhost:5252/customer/getCustomers", function (data) {
    data = jQuery.parseJSON(data);
    let recievedData = data.data;
    let emptyMessage = "Please Make a Selection"
    buildCustomerDropdown(recievedData, $("#customer-selection"), emptyMessage); // build item-selection dropdown
});

function buildCustomerDropdown(result, dropdown, emptyMessage) {
    // Remove current options
    dropdown.html('');

    // Add the empty option with the empty message
    dropdown.append('<option>' + emptyMessage + '</option>');

    // Check result isnt empty
    if (result != '') {
        // Loop through each of the results and append the option to the dropdown
        $.each(result, function (k, v) {
            dropdown.append('<option value="' + v.Cust_ID + '">' + v.Name + '</option>');
        });
    }
}

/* End Dropdown fillers */