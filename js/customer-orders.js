$(document).ready(function () {
    var table = $('#table-id').DataTable({
        ajax: "http://localhost:5252/customer-orders/all",
        "columns": [
            {
                data: 'Select',
                "orderable": false,
                "searchable": false,
                "render": function (data, type, row, meta) {
                    var a = '<a data-toggle="tooltip" data-placement="bottom" title="Show More Info"><i id="drop" class="fa fa-angle-right" style="cursor: pointer"></i></a>&nbsp;&nbsp;<a onclick="doAddressDel(\'' + row.Id_no + '\',\'' + row.Name + '\')" data-toggle="tooltip" data-placement="bottom" title="Delete Customer"><i class="fa fa-trash" style="cursor: pointer"></i></a>'
                    return a;
                },
                width: "10%"
            },
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
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
});