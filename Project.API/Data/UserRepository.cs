using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;
using Project.API.Helpers;
using Project.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Data
{
    public class UserRepository : GenericRepository, IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users =  _context.Users.Include(p => p.Photos);

            return await PagedList<User>.CreateListAsync(users, userParams.PageNumber, userParams.PageSize);
        }
        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            // var mainPhotoList = await _context.Photos.Where(u => u.UserId == userId).ToListAsync();

            // TODO wyselekcjonowac gdzie isMain jest true;
            // var mainPhoto = mainPhotoList.FirstOrDefault(s => s.IsMain == true);

            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(s => s.IsMain);

            // return mainPhoto;
        }
    }
}
