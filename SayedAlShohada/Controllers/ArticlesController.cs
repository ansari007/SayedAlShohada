using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Core.Models;
using Infrastructure.Repository;
using Infrastructure.Repository.Imp;
using SayedAlShohada.Models;
using SayedAlShohada.Models.Mappers;
using SayedAlShohada.Models.Mappers.Imp;

namespace SayedAlShohada.Controllers
{
    public class ArticlesController : ApiController
    {
       private IArticlesRepository _ArticlesRepository;
        private IArticlesMapper _ArticlesMapper;
        public ArticlesController()
        {
            _ArticlesRepository = new ArticlesRepository();
            _ArticlesMapper = new ArticlesMapper();
        }


        
        [HttpGet]
        // GET api/default1
        public IEnumerable<Articles> Getall()
        {
            Articles[] articles = _ArticlesRepository.SelectAllArticles();

            //return new string[] { "value1", "value2" };

            return articles;
        }
        [HttpGet]
        // GET api/default1/5
        public IHttpActionResult  Getnew(int id)
        {
            Articles articles = _ArticlesRepository.GetArticles(id);
          
            if (articles == null)
            {
                return NotFound();
            }
            return Ok(articles);
        }


        [HttpGet]
        public IHttpActionResult Getnext(int id)
        {
            var total = 0;
            var articles = _ArticlesRepository.Selectpage(id,out total);
            var data = new {Articles = articles,total};
            return Ok(data);
        }
        // POST api/default1


        [HttpPost]
        [ActionName("Forminfo")]
        public void Forminfo([FromBody] ArticlesForm form)
        {

            var map = _ArticlesMapper.Map(form);
            _ArticlesRepository.InsertArticles(map);
        }

        //[HttpPost]
        //[ActionName("DeleteArticles")]


        public void DeleteArticles([FromUri] int id)
        {
            _ArticlesRepository.DeleteArticles(id);
        }
        // PUT api/default1/5


        [HttpPut]
        public void Editarticle([FromUri] int id, [FromBody] ArticlesForm form)
        {
            var map = _ArticlesMapper.Map(id,form);
            _ArticlesRepository.UpdateArticles(map);


        }

    }
}
