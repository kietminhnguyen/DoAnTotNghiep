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
    public class LoaiHopDongsController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public LoaiHopDongsController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/LoaiHopDongs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoaiHopDong>>> GetLoaiHopDong()
        {
            return await _context.LoaiHopDong.ToListAsync();
        }

        // GET: api/LoaiHopDongs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoaiHopDong>> GetLoaiHopDong(int id)
        {
            var loaiHopDong = await _context.LoaiHopDong.FindAsync(id);

            if (loaiHopDong == null)
            {
                return NotFound();
            }

            return loaiHopDong;
        }

        // PUT: api/LoaiHopDongs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoaiHopDong(int id, LoaiHopDong loaiHopDong)
        {
            if (id != loaiHopDong.IdloaiHd)
            {
                return BadRequest();
            }

            _context.Entry(loaiHopDong).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoaiHopDongExists(id))
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

        // POST: api/LoaiHopDongs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<LoaiHopDong>> PostLoaiHopDong(LoaiHopDong loaiHopDong)
        {
            _context.LoaiHopDong.Add(loaiHopDong);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLoaiHopDong", new { id = loaiHopDong.IdloaiHd }, loaiHopDong);
        }

        // DELETE: api/LoaiHopDongs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LoaiHopDong>> DeleteLoaiHopDong(int id)
        {
            var loaiHopDong = await _context.LoaiHopDong.FindAsync(id);
            if (loaiHopDong == null)
            {
                return NotFound();
            }

            _context.LoaiHopDong.Remove(loaiHopDong);
            await _context.SaveChangesAsync();

            return loaiHopDong;
        }

        private bool LoaiHopDongExists(int id)
        {
            return _context.LoaiHopDong.Any(e => e.IdloaiHd == id);
        }
    }
}
