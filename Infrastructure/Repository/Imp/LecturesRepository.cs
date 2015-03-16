using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using Dapper;

namespace Infrastructure.Repository.Imp
{
    public class LecturesRepository : DbRepository, ILecturesRepository
    {



        public void InsertLectures(Lectures lectures)
        {

            using (var cnn = OpenConnection())
            {
                var id = cnn.Insert(lectures);
            }
        }


        public Lectures[] SelectAllLectures()
        {
            using (var cnn = OpenConnection())
            {
                var tab = cnn.GetList<Lectures>().OrderByDescending(x => x.Date).ToArray();
                return tab;

            }
        }

        public Lectures Getlecture(int id)
        {
            using (var cnn = OpenConnection())
            {
                var tab = cnn.Get<Lectures>(id);
                return tab;

            }
        }


        public void DeleteLectures(int val)
        {
            using (var cnn = OpenConnection())
            {
                cnn.Delete<Lectures>(val);
            }
        }

        public void UpdateLectures(Lectures lec)
        {
            using (var cnn = OpenConnection())
            {
                cnn.Update(lec);
                //cnn.Execute("update Table set val = @val where Id = @id", new { val, id = 1 });
            }
        }

        public void Publish(int id)
        {

            using (var cnn = OpenConnection())
            {

                cnn.Execute("update Lectures set Vstatus = 20 where Id = @id", new { id });
            }
        }

        public void Withdraw(int id)
        {

            using (var cnn = OpenConnection())
            {

                cnn.Execute("update Lectures set Vstatus = 30 where Id = @id", new { id });
            }
        }



        public Lectures[] Selectpage(int id, out int total)
        {
            using (var cnn = OpenConnection())
            {
                var tab = cnn.GetList<Lectures>().OrderByDescending(x => x.Date).ToArray();
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
