using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using Dapper;

namespace Infrastructure.Repository.Imp
{
    public class LoginRepository : DbRepository, ILoginRepository
    {
        public Boolean Verification(Users us)
        {
           
        

            using (var cnn = OpenConnection())
            {
                string query = "select * from Users where Username=@Username and Password =@Password";
                var resultat = cnn.Query<Users>(query, new { Username = us.Username, Password = us.Password });
                //var resultat = cnn.Query<Users>("select Username = @Username, Password = @Password", new { Username = us.Username, Password = us.Password });
                if (resultat.Count() == 0)
                {
                    return false;
                }
                else { return true; }
                
            }
        

        }
    }
}
