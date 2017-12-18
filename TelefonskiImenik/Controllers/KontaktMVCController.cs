using System.Linq;
using System.Web;
using System.Web.Mvc;
using TelefonskiImenik.Models;
using Models.ViewModels;

namespace TelefonskiImenik.Controllers
{
    public class KontaktMVCController : Controller
    {
        public ActionResult DodajOsobu()
        {
            var viewModel = new OsobaViewModel();

            return View(viewModel);
        }

        public ActionResult DodajBroj()
        {
            var viewModel = new BrojViewModel();

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