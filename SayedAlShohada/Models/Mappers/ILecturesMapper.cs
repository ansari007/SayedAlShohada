using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace SayedAlShohada.Models.Mappers
{
   public interface ILecturesMapper
    {
       //Lectures Map(LecturesForm form);
       Lectures Map( LecturesForm form);
       Lectures Map(int n, LecturesForm form,string s);
    }
}
