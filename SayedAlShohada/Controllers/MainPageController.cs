using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Core.Models;
using Infrastructure.Repository;
using Infrastructure.Repository.Imp;

namespace SayedAlShohada.Controllers
{
    public class MainPageController : ApiController
    {


         private IMainPageRepository _mainPagerepository;
        
        public MainPageController()
        {
            _mainPagerepository = new MainPageRepository();
            
        }
        // GET: api/MainPage


        [HttpGet]
        public Articles Getarticle()
        {
            Articles n = _mainPagerepository.GetLastArticle();
            return n;
        }
         [HttpGet]
        public Lectures Getlecture()
        {
            Lectures n = _mainPagerepository.GetLastLec();
            return n;
        }
         [HttpGet]
        public News Getnews()
        {
            News n = _mainPagerepository.GetLastNews();
            return n;
        }

       
    }
}
