using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Core.Models;
using Infrastructure.Repository;
using Infrastructure.Repository.Imp;
using SayedAlShohada.Models;
using SayedAlShohada.Models.Mappers;
using SayedAlShohada.Models.Mappers.Imp;

namespace SayedAlShohada.Controllers
{


    public class LecturesController : ApiController
    {

        private ILecturesRepository _lecturesRepository;
        private ILecturesMapper _lecturesMapper;
        public LecturesController()
        {
            _lecturesRepository = new LecturesRepository();
            _lecturesMapper = new LecturesMapper();
        }

        
     

         //GET api/values
          [HttpGet]
        public IEnumerable<Lectures> Getall()
        {
            Lectures[] lec = _lecturesRepository.SelectAllLectures();
            return lec;

        }



        // GET api/values/5
        [HttpGet]
        public IHttpActionResult Getlec(int id)
        {
            var n = _lecturesRepository.Getlecture(id);
            if (n == null)
            {
                return NotFound();
            }
            return Ok(n);
        }



        [HttpGet]
        public IHttpActionResult Getnext(int id)
        {
            var total = 0;
            var news = _lecturesRepository.Selectpage(id, out total);
            var data = new { news, total };
            return Ok(data);
        }


        // POST api/values
        public void Postlec([FromBody] LecturesForm form)
        {

           
            var map=_lecturesMapper.Map(form);
            _lecturesRepository.InsertLectures(map);
        }

        // PUT api/values/5
        [HttpPut]
        public void Putlec(int id, [FromBody] LecturesForm form)
        {
            var n = _lecturesRepository.Getlecture(id);
            var map = _lecturesMapper.Map(id, form, n.Vlocation);
            _lecturesRepository.UpdateLectures(map);
        }

        [HttpPut]

        public void Publish(int id)
        {
           
            _lecturesRepository.Publish(id);
        }

        [HttpPut]

        public void Withdraw(int id)
        {

            _lecturesRepository.Withdraw(id);
        }

        // DELETE api/values/5
        public void Deletelec([FromUri] int id)
        {

            _lecturesRepository.DeleteLectures(id);
        }
    }
}
