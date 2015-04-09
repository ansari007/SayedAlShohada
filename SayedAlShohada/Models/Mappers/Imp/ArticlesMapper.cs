using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace SayedAlShohada.Models.Mappers.Imp
{
   public class ArticlesMapper:IArticlesMapper
    {
        public Articles Map(ArticlesForm form)
        {
            var articles = new Articles();
            articles.Title = form.Title;
            articles.Description = form.Description;
            articles.Date = DateTime.Now;

            return articles;
        }


        public Articles Map(int n, ArticlesForm form)
        {
            var articles = new Articles();
            articles.Id = n;
            articles.Title = form.Title;
            articles.Description = form.Description;
            articles.Date = DateTime.Now;

            return articles;
        }
    }
}
