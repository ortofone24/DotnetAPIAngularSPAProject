using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Helpers
{
    public class PagedList<T> : List<T>
    {
        public int CurrentPage { get; set; }

        public int PageSize { get; set; }

        public int TotalCount { get; set; }

        public int TotalPages { get; set; }

        public PagedList(List<T> items, int totalCount, int pageNumber, int pageSize)
        {
            CurrentPage = pageNumber;
            PageSize = pageSize;
            TotalCount = totalCount;
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            this.AddRange(items);
        }

        public static async Task<PagedList<T>> CreateListAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var totalCount = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();    // chcemy strone 1 to 1-1 = 0 * page size to 0 i pobieramy te elementy
                                                                                                        // chcemy strone 2 to 2 - 1 = 1 * page size(np 5) 1 * 5 -> pomin pierwszych5 a pobrac 5 nastepnych
                                                                                                        // chcemy strone 3 to 3- 1 = 2 * pagesize(5)  2 * 5 = 10 pomijamy o pobrać następnych 5
            return new PagedList<T>(items, totalCount, pageNumber, pageSize);
        }
    }
}
