using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Core.Models;

namespace SayedAlShohada.Models.Mappers.Imp
{
    public class LecturesMapper:ILecturesMapper
    {
        public Lectures Map(LecturesForm form)
        {
            string ss = Staticcl.S;
            var lec = new Lectures
            {
                Vtitle = form.Title,
                Vdescription = form.Description,
                Date = DateTime.Now,
               
                Vlocation = ss,
                Vstatus = 10
            };
            return lec;
        }


        public Lectures Map(int n, LecturesForm form, string cloc)
        {
             string ss = Staticcl.S;
            var lec = new Lectures();
            lec.Id = n;
            lec.Vtitle = form.Title;
            lec.Vdescription = form.Description;
            lec.Date = DateTime.Now;
            lec.Vstatus = form.Status;
            if (Staticcl.S == null)
            {
                lec.Vlocation = cloc;
            }
            else
            {
                lec.Vlocation = ss;
            }
            return lec;
        }
    }
}