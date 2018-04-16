$("#create-staff").hide(); // Hide create-staff div by default

/* Formatting function for row details - modify as you need */
function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>SSN:</td>' +
        '<td>' + d.Ssn + '</td>' +
        '<td>Super SSN:</td>' +
        '<td>' + d.Super_ssn + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Birthday:</td>' +
        '<td>' + d.Bdate + '</td>' +
        '<td>Address:</td>' +
        '<td>' + d.Address + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Sex:</td>' +
        '<td>' + d.Sex + '</td>' +
        '</tr>' +
        '</table>';
}

$(document).ready(function () {
    var table = $('#table-id').DataTable({
        ajax: "http://localhost:5252/staff/all",

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
            { data: "Name" },
            { data: "Position" },
            { data: "Salary",
              render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) }
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
    let name_text = $("#name").val();
    let ssn_text = $("#ssn").val();
    let birthday_text = $("#birthday").val();
    let address_text = $("#address").val();
    let sex_text = $("#sex").val();
    let salary_text = $("#salary").val();
    let superssn_text = $("#superssn").val();
    let position_text = $("#position").val();

    if (name_text == "" || ssn_text == "" || birthday_text == "" || address_text == "" || sex_text == "" || salary_text == "" || superssn_text == "" || position_text == "") {
        alert("Please enter all information.");
    }
    else {
        var data = {
            Name: name_text, Ssn: ssn_text, Bdate: birthday_text,
            Address: address_text, Sex: sex_text, Salary: salary_text, Super_ssn: superssn_text, Position: position_text
        };

        $.ajax({
            url: "http://localhost:5252/staff/add",
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

// Toggle visibility of add new customer div
$("#toggle-staff-btn").click(function () {
    $("#create-staff").toggle(500);
    let btnText = $("#toggle-staff-btn").text();

    if (btnText === "Create New Staff") {
        $("#toggle-staff-btn").html('Hide New Staff');
    }
    else {
        $("#toggle-staff-btn").html('Create New Staff');
    }
});

// Clear Staff boxes when btn-clear-customer button clicked
function clearStaffClick() {
    $("#name").val(""); //clear name box
    $("#ssn").val("");
    $("#birthday").val("");
    $("#address").val("");
    $("#sex").val("");
    $("#salary").val("");
    $("#superssn").val("");
    $("#position").val("");
    $("#btn-clear-staff").prop('disabled', true); // disable clear button
    $("#btn-save").prop('disabled', true); // disable clear button
}
$("#btn-clear-staff").click(clearStaffClick);

// Check if text is entered in all customer data boxes, and enable save button if non-empty
function checkAllStaffFieldsNonEmpty() {
    let name_text = $("#name").val();
    let ssn_text = $("#ssn").val();
    let birthday_text = $("#birthday").val();
    let address_text = $("#address").val();
    let sex_text = $("#sex").val();
    let salary_text = $("#salary").val();
    let superssn_text = $("#superssn").val();
    let position_text = $("#position").val();

    // Check if all boxes are non-empty
    if (name_text != "" && ssn_text != "" && birthday_text != "" && address_text != "" && sex_text != "" && salary_text != "" && superssn_text != "" && position_text != "") {
        $("#btn-save").prop('disabled', false); // Enable the save button
    }
    else {
        $("#btn-save").prop('disabled', true); // Disable save button if one or both of boxes or empty
    }

    // Check if at least one box has text
    if (name_text != "" || ssn_text != "" || birthday_text != "" || address_text != "" || sex_text != "" || salary_text != "" || superssn_text != "" || position_text != "") {
        $("#btn-clear-staff").prop('disabled', false); // Enable the clear button
    }
    else {
        $("#btn-clear-staff").prop('disabled', true); // disable the clear button
    }
}

/* Dropdown fillers */
// AJAX GET to get Superssn of supervisors and call buildSuperDropdown
$.get("http://localhost:5252/staff/getSuper", function (data) {
    data = jQuery.parseJSON(data);
    let recievedData = data.data;
    let emptyMessage = "Please Make a Selection"
    buildSuperDropdown(recievedData, $("#superssn"), emptyMessage); // build item-selection dropdown
});

// Builds dropdown for publisher 
function buildSuperDropdown(result, dropdown, emptyMessage) {
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

// Call checkAllStaffFieldsNonEmpty whenever any text boxes modified
$("#name").on('input', function (e) {
    checkAllStaffFieldsNonEmpty();
});
$("#ssn").on('input', function (e) {
    checkAllStaffFieldsNonEmpty();
});
$("#birthday").on('input', function (e) {
    checkAllStaffFieldsNonEmpty();
});
$("#address").on('input', function (e) {
    checkAllStaffFieldsNonEmpty();
});
$("#sex").on('input', function (e) {
    checkAllStaffFieldsNonEmpty();
});
$("#salary").on('input', function (e) {
    checkAllStaffFieldsNonEmpty();
});
$("#superssn").on('input', function (e) {
    checkAllStaffFieldsNonEmpty();
});
$("#position").on('input', function (e) {
    checkAllStaffFieldsNonEmpty();
});