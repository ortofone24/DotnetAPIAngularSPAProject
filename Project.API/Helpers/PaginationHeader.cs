using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }     //numer wybranej strony
        public int ItemsPerPage { get; set; }    //rozmiar strony czyli ile elementow na stronie
        public int TotalItems { get; set; }      //całkowita liczba elementów
        public int TotalPages { get; set; }      //łączna liczba stron

        public PaginationHeader(int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            CurrentPage = currentPage;
            ItemsPerPage = itemsPerPage;
            TotalItems = totalItems;
            TotalPages = totalPages;
        }
    }
}
