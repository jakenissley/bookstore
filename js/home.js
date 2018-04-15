//Hide the alert by default
$('#alert').hide();

/* Begin Update Item Transaction Code */
console.log($("#item-selection").val());
$("#price-increase").on('input', function () {
    let increase_text = $("#price-increase").val();

    if (increase_text != "") {
        $("#btn-submit-item-update").prop('disabled', false); // Enable the submit button for item-update
    }
    else {
        $("#btn-submit-item-update").prop('disabled', true); // disable the submit button for item-update
    }
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
$("#btn-submit-item-update").click(itemIncreaseSubmitClick);
/* End Update Item Transaction Code */