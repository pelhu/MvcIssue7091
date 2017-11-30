using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
//using CryptologPirLib.Enums;
//using CryptologPirLib.Mongo;
//using CryptologPirLib.Mongo.Models;
using Microsoft.Extensions.Caching.Memory;
using CryptologPirAdmin.Models.TestViewModel;

namespace CryptologPirAdmin.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        //private readonly KasirgaMongoContext db = new KasirgaMongoContext();

        private IMemoryCache _cache;

        public HomeController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult ReproduceTheError()
        {
            //if (PiranhaConfig.DefaultTarantoolConnection.Value.IsNullOrWhiteSpace())//eğer boş ise bu yeni bir kurulum demektir. Burada hata veremeyiz
            //{
            //    return RedirectToAction("Piranha", "Config");
            //}

            var vm = new TestViewModel();

            vm.Dict = new Dictionary<string, int?>
            {
                ["Key1"] = null,
                ["Key2"] = null,
                ["Key3"] = null,
                ["Key4"] = null,
                ["INDEX"] = null
            };

            return View(vm);
        }

        [HttpPost]
        public IActionResult ReproduceTheError(TestViewModel vm)
        {
            //TDOD: save VM
            vm.Result = "Saved";
            return View(vm);
        }

        [HttpGet]
        public IActionResult NormalWork()
        {
            //if (PiranhaConfig.DefaultTarantoolConnection.Value.IsNullOrWhiteSpace())//eğer boş ise bu yeni bir kurulum demektir. Burada hata veremeyiz
            //{
            //    return RedirectToAction("Piranha", "Config");
            //}

            var vm = new TestViewModel();

            vm.Dict = new Dictionary<string, int?>
            {
                ["Key1"] = null,
                ["Key2"] = null,
                ["Key3"] = null,
                ["Key4"] = null,
                ["Key5"] = null
            };

            return View(vm);
        }

        [HttpPost]
        public IActionResult NormalWork(TestViewModel vm)
        {
            //TDOD: save VM
            vm.Result = "Saved";
            return View(vm);
        }



        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        [AllowAnonymous]
        public IActionResult Error()
        {
            return View();
        }
    }
}
