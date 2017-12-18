$(document).ready(function () {

    $.getJSON("/api/Kontakt/GetTipBroj",
        function (data) {
            var lista = $('#brojTipId');
            lista.empty();
            $(function () {
                $("#brojTipId").prepend("<option value='' selected='selected'></option>");
            });
            $(data).each(function () {
                lista.append(
                    $('<option>',
                        {
                            value: this.BrojTipId
                        }).html(this.Naziv)
                );
            });
        });

    $.getJSON("/api/Kontakt/GetOsoba",
        function (data) {
            var lista = $('#osobaId');
            lista.empty();
            $(function () {
                $("#osobaId").prepend("<option value='' selected='selected'></option>");
            });
            $(data).each(function () {
                lista.append(
                    $('<option>',
                        {
                            value: this.OsobaId
                        }).html(this.Ime + " " + this.Prezime)
                );
            });
        });

    $("#forma1").submit(function (e) {
        var broj = new Object();
        broj.OsobaId = $("#osobaId").val();
        broj.BrojTipId = $("#brojTipId").val();
        broj.Broj = $("#broj").val();
        broj.Opis = $("#opis").val();
        $.ajax({
            url: "/api/Kontakt/DodajBroj",
            processData: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(broj)
        }).done(function () {
            alert('Uspješno spremljeno!'),
                window.location.href = "/KontaktMVC/DodajBroj";
        }).fail(function () {
            alert('Nešto je pošlo po krivu, molim pokušaj ponovno!'),
                window.setTimeout(window.location.reload.bind(window.location), 300);
        });
        e.preventDefault();
    });
});