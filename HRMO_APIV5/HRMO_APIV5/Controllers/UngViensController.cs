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
    public class UngViensController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public UngViensController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/UngViens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UngVien>>> GetUngVien()
        {
            return await _context.UngVien.ToListAsync();
        }

        // GET: api/UngViens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UngVien>> GetUngVien(int id)
        {
            var ungVien = await _context.UngVien.FindAsync(id);

            if (ungVien == null)
            {
                return NotFound();
            }

            return ungVien;
        }

        // PUT: api/UngViens/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUngVien(int id, UngVien ungVien)
        {
            if (id != ungVien.IdungVien)
            {
                return BadRequest();
            }

            _context.Entry(ungVien).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UngVienExists(id))
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

        // POST: api/UngViens
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UngVien>> PostUngVien(UngVien ungVien)
        {
            _context.UngVien.Add(ungVien);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUngVien", new { id = ungVien.IdungVien }, ungVien);
        }

        // DELETE: api/UngViens/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UngVien>> DeleteUngVien(int id)
        {
            var ungVien = await _context.UngVien.FindAsync(id);
            if (ungVien == null)
            {
                return NotFound();
            }

            _context.UngVien.Remove(ungVien);
            await _context.SaveChangesAsync();

            return ungVien;
        }

        private bool UngVienExists(int id)
        {
            return _context.UngVien.Any(e => e.IdungVien == id);
        }

        [HttpPut("mangput")]
        public async Task<IActionResult> PutUngVien(UngVien[] ungVien)
        {
            foreach (UngVien item in ungVien)
            {
                //_context.BangLuong.Add(item);
                _context.Entry(item).State = EntityState.Modified;
            }
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
