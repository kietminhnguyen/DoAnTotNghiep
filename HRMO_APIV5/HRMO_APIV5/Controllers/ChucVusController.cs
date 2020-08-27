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
    public class ChucVusController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public ChucVusController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/ChucVus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChucVu>>> GetChucVu()
        {
            return await _context.ChucVu.ToListAsync();
        }

        // GET: api/ChucVus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChucVu>> GetChucVu(int id)
        {
            var chucVu = await _context.ChucVu.FindAsync(id);

            if (chucVu == null)
            {
                return NotFound();
            }

            return chucVu;
        }

        // PUT: api/ChucVus/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChucVu(int id, ChucVu chucVu)
        {
            if (id != chucVu.IdchucVu)
            {
                return BadRequest();
            }

            _context.Entry(chucVu).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChucVuExists(id))
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

        // POST: api/ChucVus
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChucVu>> PostChucVu(ChucVu chucVu)
        {
            _context.ChucVu.Add(chucVu);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChucVu", new { id = chucVu.IdchucVu }, chucVu);
        }

        // DELETE: api/ChucVus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChucVu>> DeleteChucVu(int id)
        {
            var chucVu = await _context.ChucVu.FindAsync(id);
            if (chucVu == null)
            {
                return NotFound();
            }

            _context.ChucVu.Remove(chucVu);
            await _context.SaveChangesAsync();

            return chucVu;
        }

        private bool ChucVuExists(int id)
        {
            return _context.ChucVu.Any(e => e.IdchucVu == id);
        }
    }
}
