$(document).ready(function () {
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