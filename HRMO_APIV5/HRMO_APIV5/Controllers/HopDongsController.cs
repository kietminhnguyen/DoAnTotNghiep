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
    public class HopDongsController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public HopDongsController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/HopDongs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HopDong>>> GetHopDong()
        {
            return await _context.HopDong.ToListAsync();
        }

        // GET: api/HopDongs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HopDong>> GetHopDong(int id)
        {
            var hopDong = await _context.HopDong.FindAsync(id);

            if (hopDong == null)
            {
                return NotFound();
            }

            return hopDong;
        }

        // PUT: api/HopDongs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHopDong(int id, HopDong hopDong)
        {
            if (id != hopDong.IdhopDong)
            {
                return BadRequest();
            }

            _context.Entry(hopDong).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HopDongExists(id))
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

        // POST: api/HopDongs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<HopDong>> PostHopDong(HopDong hopDong)
        {
            _context.HopDong.Add(hopDong);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHopDong", new { id = hopDong.IdhopDong }, hopDong);
        }

        // DELETE: api/HopDongs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<HopDong>> DeleteHopDong(int id)
        {
            var hopDong = await _context.HopDong.FindAsync(id);
            if (hopDong == null)
            {
                return NotFound();
            }

            _context.HopDong.Remove(hopDong);
            await _context.SaveChangesAsync();

            return hopDong;
        }

        private bool HopDongExists(int id)
        {
            return _context.HopDong.Any(e => e.IdhopDong == id);
        }

        /////\\\\\
        [HttpPut("mangput")]
        public async Task<IActionResult> PutHopDong(HopDong[] hopDong)
        {
            foreach (HopDong item in hopDong)
            {
                //_context.BangLuong.Add(item);
                _context.Entry(item).State = EntityState.Modified;
            }
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
