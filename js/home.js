//Hide the alert by default
$('#alert').hide();
$('#alert-close').click(function() {
    $('#alert').toggle(500);
})

/* Begin Update Item Transaction Code */
function checkUpdateItemInputsFilled() {
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
    checkUpdateItemInputsFilled();
});

$("#item-selection").on('input', function (e) {
    checkUpdateItemInputsFilled();
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

        if(item_selection == "Please Make a Selection"){
            alert("Please select an item type.")
        }
        else{
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

/* Build Item Type Dropdowns */
// AJAX GET to get item types and call buildItemTypeDropdown
$.get( "http://localhost:5252/home/getItemTypes", function( data ) {
    data = jQuery.parseJSON(data);
    let sendData = data.data;
    let emptyMessage = "Please Make a Selection"
    buildItemTypeDropdown(sendData, $("#item-selection"), emptyMessage); // build item-selection dropdown
    buildItemTypeDropdown(sendData, $("#return-item-selection"), emptyMessage); // build return-item-selection dropdown
});

// Builds dropdown for item type 
function buildItemTypeDropdown(result, dropdown, emptyMessage)
{
    // Remove current options
    dropdown.html('');

    // Add the empty option with the empty message
    dropdown.append('<option>' + emptyMessage + '</option>');

    // Check result isnt empty
    if(result != ''){
        // Loop through each of the results and append the option to the dropdown
        $.each(result, function(k, v) {
            dropdown.append('<option>' + v.Type + '</option>');
        });
    }
}
/* End Build Item Type Dropdowns */