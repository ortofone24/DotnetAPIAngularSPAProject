using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Helpers
{
    public class UserParams
    {
        public const int MaxPageSize = 48;

        public int PageNumber { get; set; } = 1;

        private int pagesize = 24;

        public int PageSize
        {
            get { return pagesize; }
            set { pagesize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

    }
}
