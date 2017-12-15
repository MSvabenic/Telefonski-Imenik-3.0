using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using TelefonskiImenik.Models;

namespace TelefonskiImenik.Controllers.API
{
    [Authorize]
    public class KontaktController : ApiController
    {
        /*---------------------------------------------------------------------------------------------------*/
        private ApplicationDbContext _context;
        /*---------------------------------------------------------------------------------------------------*/
        public KontaktController()
        {
            _context = new ApplicationDbContext();
        }

        /*---------------------------------------------------------------------------------------------------*/
        [Route("api/Kontakt/GetBroj/{id}")]
        [HttpGet]
        public IHttpActionResult GetBroj([FromUri] int id)
        {
            var broj = (from brojevi in _context.BrojeviOsobe
                        join brojtip in _context.BrojTipovi on brojevi.BrojTipId equals brojtip.BrojTipId
                        where brojevi.OsobaId == id
                        select new
                        {
                            Broj = brojevi.Broj,
                            BrojTip = brojtip.Naziv,
                            OpisBroja = brojevi.Opis
                        }).ToList();

            return Ok(broj);
        }

        /*---------------------------------------------------------------------------------------------------*/

        [Route("api/Kontakt/GetOsobaSlika/{id}")]
        [HttpGet]
        public IHttpActionResult GetOsobaSlika([FromUri] int id)
        {
            var osoba = _context.Osobe.Where(x => x.OsobaId == id).Select(x => new { x.Slika }).ToList();

            return Ok(osoba);

        }

        /*---------------------------------------------------------------------------------------------------*/
        [Route("api/Kontakt/GetOsobe")]
        [HttpGet]
        public IHttpActionResult GetOsobe()
        {
            var userId = User.Identity.GetUserId();

            var svibrojevi = from bro in _context.BrojeviOsobe.ToList()
                             group bro by bro.OsobaId into g
                             select new
                             {
                                 OsobaId = g.Key,
                                 Broj = string.Join(",", g.Select(x => x.Broj))
                             };

            var osoba = from brojevi in svibrojevi
                        join osobe in _context.Osobe on brojevi.OsobaId equals osobe.OsobaId
                        where userId == osobe.UserId
                        select new
                        {
                            OsobaId = osobe.OsobaId,
                            Ime = osobe.Ime,
                            Prezime = osobe.Prezime,
                            Grad = osobe.Grad,
                            Broj = brojevi.Broj,
                        };

            return Ok(osoba);
        }

        /*---------------------------------------------------------------------------------------------------*/
        [Route("api/Kontakt/GetOsoba/{id}")]
        [HttpGet]
        public IHttpActionResult GetOsoba([FromUri] int id)
        {
            var userId = User.Identity.GetUserId();

            var osoba = _context.Osobe.Where(x => x.OsobaId == id && x.UserId == userId).Select(x => new { x.Ime, x.Prezime, x.Grad, x.Opis }).ToList();

            return Ok(osoba);

        }

        /*---------------------------------------------------------------------------------------------------*/
        [Route("api/Kontakt/DodajBroj")]
        [HttpPost]
        public IHttpActionResult DodajBroj([FromBody]BrojeviOsoba broj)
        {
            if (ModelState.IsValid)
            {
                _context.BrojeviOsobe.Add(broj);
                _context.SaveChanges();

                return Ok(broj);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        /*---------------------------------------------------------------------------------------------------*/
        [Route("api/Kontakt/DodajOsobu")]
        [HttpPost]
        public IHttpActionResult DodajOsobu([FromBody]Osoba osoba)
        {
            if (ModelState.IsValid)
            {
                _context.Osobe.Add(osoba);
                _context.SaveChanges();

                return Ok(osoba);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}


