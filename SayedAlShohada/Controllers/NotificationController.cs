using Infrastructure.Repository;
using Infrastructure.Repository.Imp;
using SayedAlShohada.Models;
using SayedAlShohada.Models.Mappers;
using SayedAlShohada.Models.Mappers.Imp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SayedAlShohada.Controllers
{
    public class NotificationController : ApiController
    {
       private IPushRepository _pushRepository;
       private IPushMapper _pushMapper;
        public NotificationController()
        {
            _pushRepository = new PushRepository();
            _pushMapper = new PushMapper();
        }



        [HttpGet]
        public string Getdevice()
        {
            var data = "hello";
            return data;
        }
        [HttpPost]
        
        public void Insertinfo([FromBody] PushForm form)
        {

            var map = _pushMapper.Map(form);
            _pushRepository.InsertDevice(map);

        }
    }
}
