using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRMO_APIV5.Models;

namespace HRMO_APIV5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanTocsController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public DanTocsController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/DanTocs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DanToc>>> GetDanToc()
        {
            return await _context.DanToc.ToListAsync();
        }

        // GET: api/DanTocs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DanToc>> GetDanToc(int id)
        {
            var danToc = await _context.DanToc.FindAsync(id);

            if (danToc == null)
            {
                return NotFound();
            }

            return danToc;
        }

        // PUT: api/DanTocs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDanToc(int id, DanToc danToc)
        {
            if (id != danToc.IddanToc)
            {
                return BadRequest();
            }

            _context.Entry(danToc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DanTocExists(id))
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

        // POST: api/DanTocs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DanToc>> PostDanToc(DanToc danToc)
        {
            _context.DanToc.Add(danToc);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDanToc", new { id = danToc.IddanToc }, danToc);
        }

        // DELETE: api/DanTocs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DanToc>> DeleteDanToc(int id)
        {
            var danToc = await _context.DanToc.FindAsync(id);
            if (danToc == null)
            {
                return NotFound();
            }

            _context.DanToc.Remove(danToc);
            await _context.SaveChangesAsync();

            return danToc;
        }

        private bool DanTocExists(int id)
        {
            return _context.DanToc.Any(e => e.IddanToc == id);
        }
    }
}
