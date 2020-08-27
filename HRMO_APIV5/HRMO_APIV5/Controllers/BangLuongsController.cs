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
    public class BangLuongsController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public BangLuongsController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/BangLuongs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BangLuong>>> GetBangLuong()
        {
            return await _context.BangLuong.ToListAsync();
        }

        // GET: api/BangLuongs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BangLuong>> GetBangLuong(int id)
        {
            var bangLuong = await _context.BangLuong.FindAsync(id);

            if (bangLuong == null)
            {
                return NotFound();
            }

            return bangLuong;
        }

        // PUT: api/BangLuongs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBangLuong(int id, BangLuong bangLuong)
        {
            if (id != bangLuong.IdbangLuong)
            {
                return BadRequest();
            }

            _context.Entry(bangLuong).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BangLuongExists(id))
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

        // POST: api/BangLuongs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BangLuong>> PostBangLuong(BangLuong bangLuong)
        {
            _context.BangLuong.Add(bangLuong);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBangLuong", new { id = bangLuong.IdbangLuong }, bangLuong);
        }

        // DELETE: api/BangLuongs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BangLuong>> DeleteBangLuong(int id)
        {
            var bangLuong = await _context.BangLuong.FindAsync(id);
            if (bangLuong == null)
            {
                return NotFound();
            }

            _context.BangLuong.Remove(bangLuong);
            await _context.SaveChangesAsync();

            return bangLuong;
        }

        private bool BangLuongExists(int id)
        {
            return _context.BangLuong.Any(e => e.IdbangLuong == id);
        }

        /////////////\\\\\\\\\
        [HttpPost("mang")]
        public async Task<ActionResult<BangLuong>> PostBangLuong(BangLuong[] bangLuong)
        {
            foreach (BangLuong item in bangLuong)
            {
                _context.BangLuong.Add(item);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    if (BangLuongExists(item.Thang))
                    {
                        return Conflict();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return Ok();
        }

        /////\\\\\
        [HttpPut("mangput")]
        public async Task<IActionResult> PutBangLuong(BangLuong[] bangLuong)
        {
            foreach (BangLuong item in bangLuong)
            {
                //_context.BangLuong.Add(item);
                _context.Entry(item).State = EntityState.Modified;
            }
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
