using Microsoft.AspNetCore.Mvc;
using Project.API.Data;
using Project.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;

        public ValuesController(DataContext context)
        {
            _context = context;
        }

        //Get api/values
        [HttpGet]
        public IActionResult GetValues()
        {
            var values = _context.Values.ToList();
            return Ok(values);
        }

        //Get api/values/5
        [HttpGet("{id}")]
        public IActionResult GetValue(int id)
        {
            var value = _context.Values.FirstOrDefault(x => x.Id == id);
            return Ok(value);
        }

        //Post api/values/
        [HttpPost]
        public IActionResult AddValue([FromBody] Value value)
        {
            _context.Values.Add(value);
            _context.SaveChanges();
            return Ok(value);
        }

        [HttpPut("{id}")]
        public IActionResult EditValue(int id, [FromBody] Value value)
        {
            var data = _context.Values.Find(id);
            data.Name = value.Name;
            _context.Values.Update(data);
            _context.SaveChanges();
            return Ok(data);
        }

        //Delete api/values/5
        [HttpDelete("{id}")]
        public IActionResult DeleteValue(int id)
        {
            var data = _context.Values.Find(id);

            if (data == null)
            {
                return NoContent();
            }


            _context.Values.Remove(data);
            _context.SaveChanges();
            return Ok(data);
        }

    }
}
