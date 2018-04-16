//hide new order by default
$('#create-order').hide();

/* Formatting function for row details - modify as you need */
function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Order Id:</td>' +
        '<td>' + d.Order_id + '</td>' +
        '<td>Order Date:</td>' +
        '<td>' + d.Order_date + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Customer Id:</td>' +
        '<td>' + d.Customer_id + '</td>' +
        '<td>Customer Name:</td>' +
        '<td>' + d.Customer_name + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Item Id:</td>' +
        '<td>' + d.Item_id + '</td>' +
        '<td>Item Name:</td>' +
        '<td>' + d.Item_name + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Total Price:</td>' +
        '<td>' + "$" + d.Total_price + '</td>' +
        '<td>Employee Ssn:</td>' +
        '<td>' + d.Employee_ssn + '</td>' +
        '</tr>' +
        '</table>';
}

$(document).ready(function () {
    var table = $('#table-id').DataTable({
        ajax: "http://localhost:5252/order/all",

        "columns": [
            {
                data: 'Select',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, row, meta) {
                    var a = '<a data-toggle="tooltip" data-placement="bottom" title="Show More Info"><i id="drop" class="fa fa-angle-right" style="cursor: pointer"></i></a>'
                    return a;
                },
                width: "10%"
            },
            { data: "Order_id" },
            { data: "Item_name" },
            { data: "Customer_name" },
            { data: "Total_price", 
              render: $.fn.dataTable.render.number(',', '.', 2, '$')}
        ]
    });

    $('#table-id tbody').on('click', '#drop', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        $(this, '#drop').toggleClass("fa-angle-right fa-angle-down");
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
});

function saveClick() {
    $("#btn-save").prop('disabled', true);
    $("#btn-save").removeClass("btn-primary").addClass("btn-danger");
    let customer = $("#customer").val();
    let item = $("#item").val();
    let employee = $("#employee").val();
    let price = $("#price").val();

    if (customer == "" || item == "" || employee == "" || price == "") {
        alert("Please enter all information.");
    }
    else {
        var data = {
            Item_id: item, Customer_id: customer, Total_price: price,
            Employee_ssn: employee
        };

        $.ajax({
            url: "http://localhost:5252/order/add",
            type: "post",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (response) {
                $("#btn-save").prop('disabled', false);
                $("#btn-save").removeClass("btn-danger").addClass("btn-primary");
                // Refresh datatable without losing current page
                var table = $('#table-id').DataTable();
                table.ajax.reload(null, false);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                alert("Unsuccessful.");
                $("#btn-save").prop('disabled', false);
                $("#btn-save").removeClass("btn-danger").addClass("btn-primary");
            }
        });
    }

}
$("#btn-save").click(saveClick);

// Toggle visibility of add new order div
$("#toggle-order-btn").click(function () {
    $("#create-order").toggle(500);
    let btnText = $("#toggle-order-btn").text();

    if (btnText === "Create New Order") {
        $("#toggle-order-btn").html('Hide New Order');
    }
    else {
        $("#toggle-order-btn").html('Create New Order');
    }
});

// Clear Staff boxes when btn-clear-customer button clicked
function clearOrderClick() {
    $("#customer").val(""); //clear name box
    $("#item").val("");
    $("#employee").val("");
    $("#price").val("");
    $("#btn-clear-order").prop('disabled', true); // disable clear button
    $("#btn-save").prop('disabled', true); // disable clear button
}
$("#btn-clear-order").click(clearOrderClick);

// Check if text is entered in all customer data boxes, and enable save button if non-empty
function checkAllOrderFieldsNonEmpty() {
    let customer_text = $("#customer").val();
    let item_text = $("#item").val();
    let employee_text = $("#employee").val();
    let price_text = $("#price").val();

    // Check if all boxes are non-empty
    if (customer_text != "Please Make a Selection" && item_text != "Please Make a Selection" && employee_text != "Please Make a Selection" && price_text != "None available") {
        $("#btn-save").prop('disabled', false); // Enable the save button
    }
    else {
        $("#btn-save").prop('disabled', true); // Disable save button if one or both of boxes or empty
    }

    // Check if at least one box has text
    if (customer_text != "Please Make a Selection" || item_text != "Please Make a Selection" || employee_text != "Please Make a Selection" || price_text != "None available") {
        $("#btn-clear-order").prop('disabled', false); // Enable the clear button
    }
    else {
        $("#btn-clear-order").prop('disabled', true); // disable the clear button
    }
}

function getTotalPrice() {
    let item = $('#item').val();
    let itemReturnAmountURL = 'http://localhost:5252/order/totalPrice/' + item;

    // AJAX GET to get amount of that item purchased
    $.get(itemReturnAmountURL, function (data) {
        try{
            data = jQuery.parseJSON(data)
            let recievedData = data.data;
            let price = recievedData[0].Price;
            $('#price').val(price);
            checkAllOrderFieldsNonEmpty();
        }catch{
            $('#price').val("None available");
            checkAllOrderFieldsNonEmpty();
        }
    });
}

/* Dropdown fillers */
// AJAX GET to get customers and call buildCustomerDropdown
$.get("http://localhost:5252/customer/getCustomers", function (data) {
    data = jQuery.parseJSON(data);
    let recievedData = data.data;
    let emptyMessage = "Please Make a Selection"
    buildCustomerDropdown(recievedData, $("#customer"), emptyMessage); // build item-selection dropdown
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

// AJAX GET to get employees and call buildStaffDropdown
$.get("http://localhost:5252/order/getEmployees", function (data) {
  data = jQuery.parseJSON(data);
  let recievedData = data.data;
  let emptyMessage = "Please Make a Selection"
  buildStaffDropdown(recievedData, $("#employee"), emptyMessage); // build item-selection dropdown
});

function buildStaffDropdown(result, dropdown, emptyMessage) {
  // Remove current options
  dropdown.html('');

  // Add the empty option with the empty message
  dropdown.append('<option>' + emptyMessage + '</option>');

  // Check result isnt empty
  if (result != '') {
    // Loop through each of the results and append the option to the dropdown
    $.each(result, function (k, v) {
      dropdown.append('<option value="' + v.Ssn + '">' + v.Name + '</option>');
    });
  }
}

$.get("http://localhost:5252/order/getItems", function (data) {
  data = jQuery.parseJSON(data);
  let recievedData = data.data;
  let emptyMessage = "Please Make a Selection"
  buildItemDropdown(recievedData, $("#item"), emptyMessage); // build item-selection dropdown
});

function buildItemDropdown(result, dropdown, emptyMessage) {
  // Remove current options
  dropdown.html('');

  // Add the empty option with the empty message
  dropdown.append('<option>' + emptyMessage + '</option>');

  // Check result isnt empty
  if (result != '') {
    // Loop through each of the results and append the option to the dropdown
    $.each(result, function (k, v) {
      dropdown.append('<option value="' + v.Item_id + '">' + v.Name + '</option>');
    });
  }
}

// Call checkAllOrderFieldsNonEmpty whenever any text boxes modified
$("#customer").on('input', function (e) {
    checkAllOrderFieldsNonEmpty();
});
$("#item").on('input', function (e) {
    getTotalPrice();
});
$("#employee").on('input', function (e) {
    checkAllOrderFieldsNonEmpty();
});