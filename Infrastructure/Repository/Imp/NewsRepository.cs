using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using Dapper;

namespace Infrastructure.Repository.Imp
{
  public  class NewsRepository: DbRepository, INewsRepository
    {
      public void InsertNews(News news)

      {
          using (var cnn = OpenConnection())
          {
            var id =   cnn.Insert(news);
          }
      }


      public News[] SelectAllNews()
      {
          using (var cnn = OpenConnection())
          {
              News[] tab = cnn.GetList<News>().OrderByDescending(x => x.Date).ToArray(); ;
              return tab;

          }
      }

      public void DeleteNews(int val)
      {
          using (var cnn = OpenConnection())
          {
               cnn.Delete<News>(val);
          }
      }

      public void UpdateNews(News news)
      {
          using (var cnn = OpenConnection())
          {
               cnn.Update(news);
          }
      }

      public News GetNews(int id)
      {
          using (var cnn = OpenConnection())
          {
              var tab = cnn.Get<News>(id);
              return tab;

          }
      }


      public News[] Selectpage(int id , out int total)
      {
          using (var cnn = OpenConnection())
          {
             var tab = cnn.GetList<News>().OrderByDescending(x => x.Date).ToArray();
              var totalcount = tab.Count();
              var currentpage = id;
               const int pagesize = 3;
               total = (int) Math.Ceiling((double)totalcount / pagesize);
               var pagetab = tab.Skip((currentpage - 1) * pagesize)
                                   .Take(pagesize)
                                   .ToArray();
              return pagetab;

          }
      }

    }
}
