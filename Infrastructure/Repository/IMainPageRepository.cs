using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Infrastructure.Repository
{
   public interface IMainPageRepository
   {
       Articles GetLastArticle();
       Lectures GetLastLec();
      News GetLastNews();
   }
}
