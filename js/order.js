
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