using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Models
{
    public class Like
    {
        public int UserLikesId { get; set; }     // użytkownik lubi (np MOJE polubienia )
        public int UserIsLikedId { get; set; }   // użytkownik jest lubiany (JESTEM LUBIANY przez)
        public User UserLikes { get; set; }
        public User UserIsLiked { get; set; }
    }
}
