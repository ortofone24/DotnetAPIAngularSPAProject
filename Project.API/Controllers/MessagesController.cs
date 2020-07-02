using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project.API.Data;
using Project.API.Dtos;
using Project.API.Helpers;
using Project.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Project.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [ApiController]
    [Route("api/users/{userId}/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public MessagesController(IUserRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var messageFromRepo = await _userRepo.GetMessage(id);

            if(messageFromRepo == null)
            {
                return NotFound();
            }

            return Ok(messageFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDto messageForCreationDto)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            messageForCreationDto.SenderId = userId;

            var recipient = await _userRepo.GetUser(messageForCreationDto.RecipientId);

            if(recipient == null)
            {
                return BadRequest("Nie można znalesc uzytkownika");
            }

            var message = _mapper.Map<Message>(messageForCreationDto);

            _userRepo.Add(message);

            var messageToReturn = _mapper.Map<MessageForCreationDto>(message);

            if(await _userRepo.SaveAll())
            {
                return CreatedAtRoute("GetMessage", new { id = message.Id}, messageToReturn);
            }

            throw new Exception("Utworzenie wiadomości nie powiodło się przy zapisie");
        }
    }
}
