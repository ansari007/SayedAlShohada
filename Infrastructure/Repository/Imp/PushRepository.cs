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
                 if (!resultat.Any())
                 {
                      var id = cnn.Insert(device);
                 }
                 else {

                     device.CreatedDate = resultat.SingleOrDefault().CreatedDate;
                     device.Id = resultat.SingleOrDefault().Id;
                  cnn.Update(device);
                 
                 }
                
                
             }
         }
    }
}
