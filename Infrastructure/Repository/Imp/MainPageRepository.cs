using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using Dapper;

namespace Infrastructure.Repository.Imp
{
    public class MainPageRepository : DbRepository, IMainPageRepository
    {
        public News GetLastNews()
        {
            using (var cnn = OpenConnection())
            {
                string query = "select  Top 1 * from news order by Date Desc";
                var result = cnn.Query<News>(query);
                return result.FirstOrDefault();
            }
        }


        public Lectures GetLastLec()
        {
            using (var cnn = OpenConnection())
            {
                string query = "select  Top 1 * from lectures order by Date Desc";
                var result = cnn.Query<Lectures>(query);
                return result.FirstOrDefault();

            }
        }


        public Articles GetLastArticle()
        {
            using (var cnn = OpenConnection())
            {
                string query = "select Top 1 * from articles order by Date Desc";
                var result = cnn.Query<Articles>(query);

                return result.FirstOrDefault();

            }
        }
    }
}
