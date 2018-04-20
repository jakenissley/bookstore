$("#create-item").hide(); // Hide create-item div by default
$("#item-director-row").hide();
$("#item-author-row").hide();

/* Formatting function for row details - modify as you need */
function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td><img src=' + d.Item_image + ' width="50" height="70"></td>' +
        '<td>ID:</td>' +
        '<td>' + d.Item_id + '</td>' +
        '<td>Name:</td>' +
        '<td>' + d.Name + '</td>' +
        '<td>Author/Dirctor Name:</td>' +
        '<td>' + d.Author_name + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td></td>' +
        '<td>Publisher:</td>' +
        '<td>' + d.Publisher + '</td>' +
        '<td>Type:</td>' +
        '<td>' + d.Type + '</td>' +
        '<td>Number Available:</td>' +
        '<td>' + d.No_available + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td></td>' +
        '<td>Subject:</td>' +
        '<td>' + d.Subject_name + '</td>' +
        '<td>Description:</td>' +
        '<td>' + d.Description + '</td>' +
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
                    var a = '<a data-toggle="tooltip" data-placement="bottom" title="Show More Info"><i id="drop" class="fa fa-angle-right" style="cursor: pointer"></i></a>'
                    return a;
                },
                width: "10%"
            },
            { data: "Item_id" },
            { data: "Name" },
            { data: "Type" },
            {
                data: "Price",
                render: $.fn.dataTable.render.number(',', '.', 2, '$')
            }
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
    $("#publisher").val("Please Make a Selection");
    $("#type").val("Please Make a Selection");
    $("#subject").val("Please Make a Selection");
    $("#description").val("");
    $("#item-image").val("");
    $("#num-avail").val("");
    $("#price").val("");
    $("#director").val("");
    $("#author").val("");
    checkItemType(); // hides author/director row
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

    if (name_input === "" || pub_input === "" || type_input === "" || subject_input === "" || desc_input === "" || image_input === "" || avail_input === "" || price_input === "") {
        alert("Please enter all information.");
    }
    else {
        var data = {
            name: name_input, publisher: pub_input, type: type_input,
            subject: subject_input, description: desc_input, image: image_input,
            num_avail: avail_input, price: price_input
        };

        $.ajax({
            url: "http://localhost:5252/item/additem",
            type: "post",
            async: false,
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (response) {
                addAuthor();
                $("#btn-save").prop('disabled', false);
                $("#btn-save").removeClass("btn-danger").addClass("btn-primary");
                // Refresh datatable without losing current page
                var table = $('#table-id').DataTable();
                table.ajax.reload(null, true);
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

function addAuthor() {
    let name_input = $("#name-item").val();
    let author_input = $("#author").val();
    let director_input = $("#director").val();

    var data = {
        name: name_input, author: author_input, director: director_input
    }
    $.ajax({
        url: "http://localhost:5252/item/addauthor",
        type: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            $('#table-id').DataTable().ajax.reload();
        },
    });
}

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
    let author_text = $("#author").val();
    let director_text = $("#director").val();
    let makeSelection_text = "Please Make a Selection";

    // Check if all boxes are non-empty
    if (name_text != "" && pub_text != makeSelection_text && type_text != makeSelection_text && subject_text != makeSelection_text && desc_text != "" && image_text != "" && avail_text != "" && avail_text >= 0 && price_text != "" && price_text > 0 && (author_text != "" || director_text != "")) {
        $("#btn-save").prop('disabled', false); // Enable the save button
    }
    else {
        $("#btn-save").prop('disabled', true); // Disable save button if one or both of boxes or empty
    }
    // Check if at least one box has text
    if (name_text != "" || pub_text != makeSelection_text || type_text != makeSelection_text || subject_text != makeSelection_text || desc_text != "" || image_text != "" || avail_text != "" || price_text != "" || (author_text != "" || director_text != "")) {
        $("#btn-clear-item").prop('disabled', false); // Enable the clear button
    }
    else {
        $("#btn-clear-item").prop('disabled', true); // disable the clear button
    }
}

function checkItemType() {
    if ($("#type").val() === "Book" || $("#type").val() === "Periodical") {
        $("#item-author-row").show(500);
        $("#item-director-row").hide();
        $("#director").val("");
        $("#btn-save").prop('disabled', true);
    } else if ($("#type").val() === "Movie") {
        $("#item-author-row").hide();
        $("#author").val("");
        $("#item-director-row").show(500);
        $("#btn-save").prop('disabled', true);
    } else { // item type is equal to "Please Make a Selection" so hide author and director
        $("#item-author-row").hide(500);
        $("#author").val("");
        $("#item-director-row").hide(500);
        $("#director").val("");
        $("#btn-save").prop('disabled', true);
    }
}

/* Dropdown fillers */
// AJAX GET to get Publishers and call buildPublisherTypeDropdown
$.get("http://localhost:5252/item/getPublishers", function (data) {
    data = jQuery.parseJSON(data);
    let recievedData = data.data;
    let emptyMessage = "Please Make a Selection"
    buildPublisherDropdown(recievedData, $("#publisher"), emptyMessage); // build item-selection dropdown
});

// Builds dropdown for publisher 
function buildPublisherDropdown(result, dropdown, emptyMessage) {
    // Remove current options
    dropdown.html('');

    // Add the empty option with the empty message
    dropdown.append('<option>' + emptyMessage + '</option>');

    // Check result isnt empty
    if (result != '') {
        // Loop through each of the results and append the option to the dropdown
        $.each(result, function (k, v) {
            dropdown.append('<option>' + v.Name + '</option>');
        });
    }
}

// AJAX GET to get subjects and call buildSubjectDropdown
$.get("http://localhost:5252/item/getSubjects", function (data) {
    data = jQuery.parseJSON(data);
    let recievedData = data.data;
    let emptyMessage = "Please Make a Selection"
    buildSubjectDropdown(recievedData, $("#subject"), emptyMessage); // build item-selection dropdown
});

// Builds dropdown for subject
function buildSubjectDropdown(result, dropdown, emptyMessage) {
    // Remove current options
    dropdown.html('');

    // Add the empty option with the empty message
    dropdown.append('<option>' + emptyMessage + '</option>');

    // Check result isnt empty
    if (result != '') {
        // Loop through each of the results and append the option to the dropdown
        $.each(result, function (k, v) {
            dropdown.append('<option value="' + v.Subject_id + '">' + v.Subject_name + '</option>');
        });
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
    checkItemType();
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
    let enteredNum = $("#num-avail").val();
    let hasWhiteSpace = detectWhiteSpace(enteredNum);
    // check if enteredNum is actually a number with no whitespace
    if(hasWhiteSpace === true || +enteredNum != +enteredNum || enteredNum === ""){
        $("#num-avail").removeClass("is-valid");
        $("#num-avail").addClass("is-invalid");
    } else if (enteredNum < 0) {
            $("#num-avail").removeClass("is-valid");
            $("#num-avail").addClass("is-invalid");
    } else if (enteredNum >= 0) {
            $("#num-avail").removeClass("is-invalid");
            $("#num-avail").addClass("is-valid");
        }
});
$("#price").on('input', function (e) {
    checkAllitemFieldsNonEmpty();
    let enteredNum = $("#price").val();
    let hasWhiteSpace = detectWhiteSpace(enteredNum);
    // check if enteredNum is actually a number with no whitespace
    if(hasWhiteSpace === true || +enteredNum != +enteredNum || enteredNum === ""){
        $("#price").removeClass("is-valid");
        $("#price").addClass("is-invalid");
    } else if (enteredNum < 0) {
        $("#price").removeClass("is-valid");
        $("#price").addClass("is-invalid");
    } else if (enteredNum > 0) {
        $("#price").removeClass("is-invalid");
        $("#price").addClass("is-valid");
    }
});
$("#director").on('input', function (e) {
    checkAllitemFieldsNonEmpty();
});
$("#author").on('input', function (e) {
    checkAllitemFieldsNonEmpty();
});

function detectWhiteSpace(enteredString){
    if (/\s/.test(enteredString)) {
        // It has any kind of whitespace
        return true;
    }
    return false;
}

