using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Infrastructure.Repository
{
    public interface INewsRepository
    {
        void InsertNews(News v);
        News[] SelectAllNews();
        void UpdateNews(News v);
        void DeleteNews(int v);
        News GetNews(int id);
        News[] Selectpage(int id ,out int total);
    }
}
