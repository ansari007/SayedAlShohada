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

    public class MessagesController : ApiController
    {
       
        private INewsRepository _newsRepository;
        private INewsMapper _newsMapper;
        public MessagesController()
        {
            _newsRepository = new NewsRepository();
            _newsMapper = new NewsMapper();
        }


        
        [HttpGet]
        // GET api/default1
        public IEnumerable<News> Getall()
        {
            News[] news = _newsRepository.SelectAllNews();

            //return new string[] { "value1", "value2" };

            return news;
        }
        [HttpGet]
        // GET api/default1/5
        public IHttpActionResult  Getnew(int id)
        {
            News news = _newsRepository.GetNews(id);
          
            if (news == null)
            {
                return NotFound();
            }
            return Ok(news);
        }


        [HttpGet]
        public IHttpActionResult Getnext(int id)
        {
            var total = 0;
            var news = _newsRepository.Selectpage(id,out total);
            var data = new {news,total};
            return Ok(data);
        }
        // POST api/default1


        [HttpPost]
        [ActionName("Forminfo")]
        public void Forminfo([FromBody] NewsForm form)
        {

            var map = _newsMapper.Map(form);
            _newsRepository.InsertNews(map);
        }

        //[HttpPost]
        //[ActionName("Deletenews")]


        public void Deletenews([FromUri] int id)
        {
            _newsRepository.DeleteNews(id);
        }
        // PUT api/default1/5


        [HttpPut]
        public void Editnew([FromUri] int id, [FromBody] NewsForm form)
        {
            var map = _newsMapper.Map(id,form);
            _newsRepository.UpdateNews(map);


        }


    }
}
