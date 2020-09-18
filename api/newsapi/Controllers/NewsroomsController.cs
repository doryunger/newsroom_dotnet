using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using newsapi.Models;

namespace newsapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsroomsController : ControllerBase
    {
        private readonly newsContext _context;

        public NewsroomsController(newsContext context)
        {
            _context = context;
        }

        // GET: api/Newsrooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Newsroom>>> GetNewsroom()
        {
            return await _context.Newsroom.ToListAsync();
        }

        // GET: api/Newsrooms/5
        [HttpGet("{source}")]
        public async Task<ActionResult<Newsroom>> GetNewsroom(string source)
        {
            var newsroom = await _context.Newsroom.FirstOrDefaultAsync(p => p.Source == source); ;

            if (newsroom == null)
            {
                return NotFound();
            }

            return newsroom;
        }

        // PUT: api/Newsrooms/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNewsroom(int id, Newsroom newsroom)
        {
            if (id != newsroom.Id)
            {
                return BadRequest();
            }

            _context.Entry(newsroom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsroomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Newsrooms
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Newsroom>> PostNewsroom(Newsroom newsroom)
        {
            _context.Newsroom.Add(newsroom);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNewsroom", new { id = newsroom.Id }, newsroom);
        }

        // DELETE: api/Newsrooms/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Newsroom>> DeleteNewsroom(int id)
        {
            var newsroom = await _context.Newsroom.FindAsync(id);
            if (newsroom == null)
            {
                return NotFound();
            }

            _context.Newsroom.Remove(newsroom);
            await _context.SaveChangesAsync();

            return newsroom;
        }

        private bool NewsroomExists(int id)
        {
            return _context.Newsroom.Any(e => e.Id == id);
        }
    }
}
