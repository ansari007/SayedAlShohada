using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Core.Models;

namespace SayedAlShohada.Models.Mappers.Imp
{
    public class NewsMapper:INewsMapper
    {
        public News Map(NewsForm form)
        {
            var news = new News();
            news.Title = form.Title;
            news.Description = form.Description;
            news.Date = DateTime.Now;

            return news;
        }


        public News Map(int n,NewsForm form)
        {
            var news = new News();
            news.Id = n;
            news.Title = form.Title;
            news.Description = form.Description;
            news.Date = DateTime.Now;

            return news;
        }
    }
}