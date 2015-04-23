using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SayedAlShohada.Models.Mappers
{
    public interface IPushMapper
    {
        Push Map(PushForm f);
    }
}
