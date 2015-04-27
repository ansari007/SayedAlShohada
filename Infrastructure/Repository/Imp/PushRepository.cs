using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace Infrastructure.Repository.Imp
{
     public class PushRepository:DbRepository,IPushRepository
    {
         public void InsertDevice(Push device)
         {
             using (var cnn = OpenConnection())
             {


                 var query = "select * from Push where UdId=@UdId";
                 var resultat = cnn.Query<Push>(query, new { UdId = device.UdId});
                 if (resultat.Count() == 0)
                 {
                      var id = cnn.Insert(device);
                 }
                 else {
                     var tab = cnn.Get<Push>(device.UdId);
                     device.Id = tab.Id;
                  cnn.Update(device);
                 
                 }
                
                
             }
         }
    }
}
