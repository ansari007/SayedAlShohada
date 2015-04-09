using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using Dapper;

namespace Infrastructure.Repository.Imp
{
    public class ArticlesRepository : DbRepository, IArticlesRepository
    {
        public void InsertArticles(Articles article)
        {
            using (var cnn = OpenConnection())
            {
                var id = cnn.Insert(article);
            }
        }


        public Articles[] SelectAllArticles()
        {
            using (var cnn = OpenConnection())
            {
                Articles[] tab = cnn.GetList<Articles>().OrderByDescending(x => x.Date).ToArray(); ;
                return tab;

            }
        }

        public void DeleteArticles(int val)
        {
            using (var cnn = OpenConnection())
            {
                cnn.Delete<Articles>(val);
            }
        }

        public void UpdateArticles(Articles news)
        {
            using (var cnn = OpenConnection())
            {
                cnn.Update(news);
            }
        }

        public Articles GetArticles(int id)
        {
            using (var cnn = OpenConnection())
            {
                var tab = cnn.Get<Articles>(id);
                return tab;

            }
        }


        public Articles[] Selectpage(int id, out int total)
        {
            using (var cnn = OpenConnection())
            {
                var tab = cnn.GetList<Articles>().OrderByDescending(x => x.Date).ToArray();
                var totalcount = tab.Count();
                var currentpage = id;
                const int pagesize = 3;
                total = (int)Math.Ceiling((double)totalcount / pagesize);
                var pagetab = tab.Skip((currentpage - 1) * pagesize)
                                    .Take(pagesize)
                                    .ToArray();
                return pagetab;

            }
        }

    }
}
