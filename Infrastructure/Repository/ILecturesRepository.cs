using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;

namespace Infrastructure.Repository
{
    public interface ILecturesRepository
    {
        void InsertLectures(Lectures v);
        Lectures[] SelectAllLectures();
        Lectures Getlecture(int id);
        void UpdateLectures(Lectures v);
        void DeleteLectures(int v);
        void Publish(int v);
        void Withdraw(int v);
        Lectures[] Selectpage(int id, out int total);
    }
}
