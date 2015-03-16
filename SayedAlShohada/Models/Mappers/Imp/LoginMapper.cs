using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Core.Models;

namespace SayedAlShohada.Models.Mappers.Imp
{
    public class LoginMapper:ILoginMapper
    {
        public Users Map(Loginform form)
        {
            var us=new Users();
            us.Id = 0;
            us.Username = form.Username;
            us.Password = form.Password;
            us.Lastlogin=DateTime.Now;
            return us;
        }
    }
}