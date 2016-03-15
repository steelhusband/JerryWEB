
$.ajax({
    url: 'dataT.json',
    dataType: 'json',
    success: function (json) {
        example2 = $('#example2').columns({
            data: json
        });
    }
});

$('#theme').change(function () {
    $('#style').attr('href', 'css/' + $(this).val());
});
