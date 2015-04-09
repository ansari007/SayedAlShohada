using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Infrastructure.Repository
{
   public interface IArticlesRepository
    {
        void InsertArticles(Articles v);
        Articles[] SelectAllArticles();
        void UpdateArticles(Articles v);
        void DeleteArticles(int v);
        Articles GetArticles(int id);
        Articles[] Selectpage(int id, out int total);
    }
}
