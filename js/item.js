$("#create-item").hide(); // Hide create-item div by default

/* Formatting function for row details - modify as you need */
function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>ID:</td>' +
        '<td>' + d.Item_id + '</td>' +
        '<td>Name:</td>' +
        '<td>' + d.Name + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Publisher:</td>' +
        '<td>' + d.Publisher + '</td>' +
        '<td>Type:</td>' +
        '<td>' + d.Type + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Subject:</td>' +
        '<td>' + d.Subject + '</td>' +
        '<td>Description:</td>' +
        '<td>' + d.Description + '</td>' +
        '</tr>' +
        '<td>Number Available:</td>' +
        '<td>' + d.No_available + '</td>' +
        '<td>Price:</td>' +
        '<td>' + "$" + d.Price + '</td>' +
        '</tr>' +
        '</table>';
}
// Get items for the table from database using AJAX
$(document).ready(function () {
    var table = $('#table-id').DataTable({
        ajax: "http://localhost:5252/item/all",

        "columns": [
            {
                data: 'Select',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, row, meta) {
                    var a = '<a onclick="doSelectName(\'' + row.id + '\')" data-toggle="tooltip" data-placement="bottom" title="Select Name"><i class="fa fa-check"></i></a>&nbsp;&nbsp;<a onclick="doAddressDel(\'' + row.id + '\')" data-toggle="tooltip" data-placement="bottom" title="Delete Name"><i class="fa fa-trash"></i></a>'
                    return a;
                },
                width: "10%"
            },
            { data: "Item_id" },
            { data: "Name" },
            { data: "Type" },
            { data: "Price" }
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

    $('#table-id tbody').on('click', 'tr', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

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

function doAddressDel(id) {
    console.log(id);
}

// Toggle visibility of add new item div
$("#toggle-item-btn").click(function () {
    $("#create-item").toggle(500);
    let btnText = $("#toggle-item-btn").text();

    if (btnText === "Create New Item") {
        $("#toggle-item-btn").html('Hide New Item');
    }
    else {
        $("#toggle-item-btn").html('Create New Item');
    }
});

// Clear item boxes when btn-clear-item button clicked
function clearItemClick() {
    $("#name-item").val(""); //clear name box
    $("#publisher").val("");
    $("#type").val("");
    $("#subject").val("");
    $("#description").val("");
    $("#item-image").val("");
    $("#num-avail").val("");
    $("#price").val("");
    $("#btn-clear-item").prop('disabled', true); // disable clear button
    $("#btn-save").prop('disabled', true); // disable save button
}
$("#btn-clear-item").click(clearItemClick);

function saveClick() {
    $("#btn-save").prop('disabled', true);
    $("#btn-save").removeClass("btn-primary").addClass("btn-danger");
    let name_input = $("#name-item").val();
    let pub_input = $("#publisher").val();
    let type_input = $("#type").val();
    let subject_input = $("#subject").val();
    let desc_input = $("#description").val();
    let image_input = $("#item-image").val();
    let avail_input = $("#num-avail").val();
    let price_input = $("#price").val();

    if (name_input == "" || pub_input == "" || type_input == "" || subject_input == "" || desc_input == "" || image_input == "" || avail_input == "" || price_input == "") {
        alert("Please enter all information.");
    }
    else {
        var data = {
            name: name_input, publisher: pub_input, type: type_input,
            subject: subject_input, description: desc_input, image: image_input,
            num_avail: avail_input, price: price_input
        };

        $.ajax({
            url: "http://localhost:5252/item",
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

// Check if text is entered in all item data boxes, and enable save button if non-empty
function checkAllitemFieldsNonEmpty() {
    let name_text = $("#name-item").val();
    let pub_text = $("#publisher").val();
    let type_text = $("#type").val();
    let subject_text = $("#subject").val();
    let desc_text = $("#description").val();
    let image_text = $("#item-image").val();
    let avail_text = $("#num-avail").val();
    let price_text = $("#price").val();

    // Check if all boxes are non-empty
    if (name_text != "" && pub_text != "" && type_text != "" && subject_text != ""&& desc_text != "" && image_text != "" && avail_text != "" && price_text != "") {
        $("#btn-save").prop('disabled', false); // Enable the save button
    }
    else {
        $("#btn-save").prop('disabled', true); // Disable save button if one or both of boxes or empty
    }

    // Check if at least one box has text
    if (name_text != "" || pub_text != "" || type_text != "" || subject_text != "" || desc_text != "" || image_text != "" || avail_text != "" || price_text != "") {
        $("#btn-clear-item").prop('disabled', false); // Enable the clear button
    }
    else {
        $("#btn-clear-item").prop('disabled', true); // disable the clear button
    }
}
// Call checkAllitemFieldsNonEmpty whenever any text boxes modified
$("#name-item").on('input', function (e) {
    checkAllitemFieldsNonEmpty();
});
$("#publisher").on('input', function (e) {
    checkAllitemFieldsNonEmpty();
});
$("#subject").on('input', function (e) {
    checkAllitemFieldsNonEmpty();
});
$("#type").on('input', function (e) {
    checkAllitemFieldsNonEmpty();
});
$("#description").on('input', function (e) {
    checkAllitemFieldsNonEmpty();
});
$("#item-image").on('input', function (e) {
    checkAllitemFieldsNonEmpty();
});
$("#num-avail").on('input', function (e) {
    checkAllitemFieldsNonEmpty();
});    
$("#price").on('input', function (e) {
    checkAllitemFieldsNonEmpty();

});

