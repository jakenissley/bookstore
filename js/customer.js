$("#create-customer").hide(); // Hide create-customer div by

/* Formatting function for row details - modify as you need */
function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Name:</td>' +
        '<td>' + d.Name + '</td>' +
        '<td>Username:</td>' +
        '<td>' + d.Username + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Address:</td>' +
        '<td>' + d.Address + '</td>' +
        '<td>Email:</td>' +
        '<td>' + d.Email + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>ID:</td>' +
        '<td>' + d.Id_no + '</td>' +
        '<td>Phone Number:</td>' +
        '<td>' + d.Phone_no + '</td>' +
        '</tr>' +
        '</table>';
}

$(document).ready(function () {
    var table = $('#table-id').DataTable({
        ajax: "http://localhost:5252/customer/all",

        "columns": [
            {
                data: 'Select',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, row, meta) {
                    var a = '<a onclick="doSelectName(\'' + row.Id_no + '\')" data-toggle="tooltip" data-placement="bottom" title="Show More Info"><i id="drop" class="fa fa-angle-right" style="cursor: pointer"></i></a>&nbsp;&nbsp;<a onclick="doAddressDel(\'' + row.Id_no + '\',\'' + row.Name + '\')" data-toggle="tooltip" data-placement="bottom" title="Delete Customer"><i class="fa fa-trash" style="cursor: pointer"></i></a>'
                    return a;
                },
                width: "10%"
            },
            { data: "Id_no" },
            { data: "Name" },
            { data: "Email" }
        ]
    });
    $('#table-id tbody').on('click', 'tr', function () {
        console.log(table.row(this).data());
    });
    $('#table-id tbody').on('click', 'td', function () {
        if (this == 'Select') {
            console.log(table.cell(this).data());
        }
        console.log(this);
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



function doSelectName(id) {
    console.log(id);
}

function doAddressDel(id, name) {
    $("#deleteModal").modal('toggle');
    $("#confirm-del-btn").click(function () {
        deleteClick(id);
    });
    console.log("Id: " + id + " Name: " + name);
    
}

// Toggle visibility of add new customer div
$("#toggle-customer-btn").click(function () {
    $("#create-customer").toggle(500);
    let btnText = $("#toggle-customer-btn").text();

    if (btnText === "Create New Customer") {
        $("#toggle-customer-btn").html('Hide New Customer');
    }
    else {
        $("#toggle-customer-btn").html('Create New Customer');
    }
});

// Clear Customer boxes when btn-clear-customer button clicked
function clearCustomerClick() {
    $("#name").val(""); //clear name box
    $("#email").val("");
    $("#username").val("");
    $("#password").val("");
    $("#address").val("");
    $("#phone").val("");
    $("#btn-clear-customer").prop('disabled', true); // disable clear button
    $("#btn-save").prop('disabled', true); // disable clear button
}
$("#btn-clear-customer").click(clearCustomerClick);

function saveClick() {
    $("#btn-save").prop('disabled', true);
    $("#btn-save").removeClass("btn-primary").addClass("btn-danger");
    let name_input = $("#name").val();
    let phone_input = $("#phone").val();
    let address_input = $("#address").val();
    let username_input = $("#username").val();
    let password_input = $("#password").val();
    let email_input = $("#email").val();

    if (name_input || phone_input || address_input || username_input || password_input || email_input == "") {
        alert("Please enter all information.");
    }
    else {
        var data = {
            name: name_input, phone: phone_input, address: address_input,
            username: username_input, password: password_input, email: email_input
        };

        $.ajax({
            url: "http://localhost:5252/customer/add",
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

// Send ID to AJAX to send DELETE Query
function deleteClick(id) {
    var data = {
        id_no: id
    };
    $.ajax({
        url: "http://localhost:5252/customer/delete",
        type: "delete",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            // Refresh datatable without losing current page
            var table = $('#table-id').DataTable();
            table.ajax.reload(null, false);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
            alert("Unsuccessful.");
        }
    });
}


// Check if text is entered in all customer data boxes, and enable save button if non-empty
function checkAllCustomerFieldsNonEmpty() {
    let name_text = $("#name").val();
    let email_text = $("#email").val();
    let username_text = $("#username").val();
    let password_text = $("#password").val();
    let address_text = $("#address").val();
    let phone_text = $("#phone").val();

    // Check if all boxes are non-empty
    if (name_text != "" && email_text != "" && username_text != "" && password_text != "" && address_text != "" && phone_text != "") {
        $("#btn-save").prop('disabled', false); // Enable the save button
    }
    else {
        $("#btn-save").prop('disabled', true); // Disable save button if one or both of boxes or empty
    }

    // Check if at least one box has text
    if (name_text != "" || email_text != "" || username_text != "" || password_text != "" || address_text != "" || phone_text != "") {
        $("#btn-clear-customer").prop('disabled', false); // Enable the clear button
    }
    else {
        $("#btn-clear-customer").prop('disabled', true); // disable the clear button
    }
}
// Call checkAllCustomerFieldsNonEmpty whenever any text boxes modified
$("#name").on('input', function (e) {
    checkAllCustomerFieldsNonEmpty();
});
$("#email").on('input', function (e) {
    checkAllCustomerFieldsNonEmpty();
});
$("#username").on('input', function (e) {
    checkAllCustomerFieldsNonEmpty();
});
$("#password").on('input', function (e) {
    checkAllCustomerFieldsNonEmpty();
});
$("#address").on('input', function (e) {
    checkAllCustomerFieldsNonEmpty();
});
$("#phone").on('input', function (e) {
    checkAllCustomerFieldsNonEmpty();
});