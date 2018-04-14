/* Formatting function for row details - modify as you need */
function format(thisCustomersItems) {
        var trs = '';
        for(i in thisCustomersItems)
        {
            trs += 
            '<tr>' +
            '<td>Name:</td>' +
            '<td>' + thisCustomersItems[i].Item_Name + '</td>' +
            '<td>ID:</td>' +
            '<td>' + thisCustomersItems[i].Item_ID + '</td>' +
            '<td>Price:</td>' +
            '<td>' + '$' + thisCustomersItems[i].Price + '</td>' +
            '</tr>';
        }

        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
            trs +
        '</tbody></table>';
}

$(document).ready(function () {
    var table = $('#table-id').DataTable({
        ajax: "http://localhost:5252/customer-orders/all",
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
            { data: "Id_no"},
            { data: "Customer_Name" }
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
            let customerIdNo = row.data().Id_no;
            let ajaxUrl = 'http://localhost:5252/customer-orders/getCustomerItems/' + customerIdNo;

            // ajax GET here using ajaxURL created above
            var thisCustomersItems = $.ajax({
                url: ajaxUrl,
                async: false,
                dataType: 'json'
            }).responseJSON;

            row.child(format(thisCustomersItems)).show();
            tr.addClass('shown');
        }
    });
});