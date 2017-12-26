$(document).ready(function () {
    $.getJSON("/api/Kontakt/GetOsobe",
        function (json) {
            var tr;
            for (var i = 0; i < json.length; i++) {
                tr = $('<tr/>');
                tr.append("<td>" + json[i].OsobaId + "</td>");
                tr.append("<td>" + json[i].Ime + "</td>");
                tr.append("<td>" + json[i].Prezime + "</td>");
                tr.append("<td>" + json[i].Grad + "</td>");
                tr.append("<td>" + json[i].Broj + "</td>");
                tr.append("<td>" + json[i].Opcije + "</td>");
                $('table').append(tr);
            }
            var oko = '<i class="fa fa-eye fa-2x" aria-hidden="true" id="oko"></i>';
            var kanta = '<i class="fa fa-trash-o fa-2x" aria-hidden="true" id="kanta"></i>';
            var table = $('#osobe').DataTable({
                "autoWidth": true,
                "oLanguage": {
                    "sUrl": "https://cdn.datatables.net/plug-ins/1.10.16/i18n/Croatian.json"
                },
                "columnDefs": [
                    {
                        "className": "dt-center", "targets": "_all"
                    },
                    {
                        "targets": -1,
                        "data": null,
                        "render": function() {

                            return oko + ' ' + kanta;
                        }
                    },
                    {
                        "targets": [0],
                        "visible": false
                    }
                ]

            });
            $('#osobe tbody').on('click', '#oko', function () {
                var id = table.row($(this).parents('tr')).data()[0]; // dohvaća vrijednost skrivene ćelije u tablici 
                window.location.href = "/KontaktMVC/DetaljiKontakta/" + id;
            });
            $('#osobe tbody').on('click', '#kanta', function () {
                var id = table.row($(this).parents('tr')).data()[0]; // dohvaća vrijednost skrivene ćelije u tablici 
                $.ajax({
                    url: "/api/Kontakt/IzbrisiOsobu/" + id,
                    type: "DELETE"
                }).done(function () {
                    alert('Uspješno Izbrisano!'),
                        window.setTimeout(window.location.reload.bind(window.location), 300);
                }).fail(function () {
                    alert('Nešto je pošlo po krivu, molim pokušaj ponovno!'),
                        window.setTimeout(window.location.reload.bind(window.location), 300);
                });
            });
        });

});