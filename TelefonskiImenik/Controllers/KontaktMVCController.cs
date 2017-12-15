using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using TelefonskiImenik.Models;
using Models.ViewModels;

namespace TelefonskiImenik.Controllers
{
    [Authorize]
    public class KontaktMVCController : Controller
    {
        private ApplicationDbContext _context;

        public KontaktMVCController()
        {
            _context = new ApplicationDbContext();
        }

        public ActionResult DodajOsobu()
        {
            var viewModel = new OsobaViewModel();
            return View(viewModel);
        }

        public ActionResult DodajBroj()
        {
            var userId = User.Identity.GetUserId();

            ViewBag.punoime = from osoba in _context.Osobe.ToList()
                              where userId == osoba.UserId
                              select new
                              {
                                  Id = osoba.OsobaId,
                                  punoime = osoba.Ime + " " + osoba.Prezime
                              };
            var viewModel = new BrojViewModel()
            {
                TipBroja = _context.BrojTipovi.ToList(),
                Osobe = _context.Osobe.ToList()

            };
            return View(viewModel);
        }

        public ActionResult DetaljiKontakta(int id)
        {
            return View();
        }

        public ActionResult SviKontakti()
        {
            return View();
        }
    }
}