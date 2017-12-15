$(document).ready(function () {

    $("#slika").change(function () {                //funkcija koja ispisuje naziv slike
        $("#slikaTekst").text(this.files[0].name);
    });

    $("#forma1").submit(function (e) {
        var osoba = new Object();
        osoba.Ime = $("#ime").val();
        osoba.Prezime = $("#prezime").val();
        osoba.Grad = $("#grad").val();
        osoba.Opis = $("#opis").val();
        osoba.Slika = slikaBin;
        osoba.UserId = $("#userId").val();
        $.ajax({
            url: "/api/Kontakt/DodajOsobu",
            processData: true,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(osoba)  
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

var slikaBin;

var uploadSlike = function (data) {
    var files = data.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload = function (dataReader) {
            var binaryString = dataReader.target.result;
            slikaBin = btoa(binaryString);
        };

        reader.readAsBinaryString(file);
    }
};

if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('slika').addEventListener('change', uploadSlike, false);
}