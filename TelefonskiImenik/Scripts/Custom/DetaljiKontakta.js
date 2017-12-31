var url = location.pathname.split('/')[3]; // uzima id iz URL-a da ga može proslijediti u getJSON kao varijablu.
var slika;
var dataSlika;

$(document).ready(function () {
    $.getJSON("/api/Kontakt/GetOsoba/id", { id: url },
        function (json) {
            $.each(json, function (i, item) {
                $("<dd>").html(item.Ime).appendTo("#1");
                $("<dd>").html(item.Prezime).appendTo("#2");
                $("<dd>").html(item.Grad).appendTo("#3");
                $("<dd>").html(item.Opis).appendTo("#4");
            });
        });
});


$(document).ready(function () {
    $.getJSON("/api/Kontakt/GetBroj/id", { id: url },
        function (json) {
            var tr;
            for (var i = 0; i < json.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + json[i].Broj + "</td>");
                tr.append("<td>" + json[i].BrojTip + "</td>");
                tr.append("<td>" + json[i].OpisBroja + "</td>");
                $('#tab1').append(tr);
            }
        });
});

$(document).ready(function () {
    $.getJSON("/api/Kontakt/GetOsobaSlika/id", { id: url },
        function (json) {
            data = json[0].Slika;
            $('#slika').html('<img src="data:image/jpeg;base64,' + dataSlika + '" class="img-thumbnail" width="250" />');
        });
});