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
    public class TaiKhoansController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public TaiKhoansController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/TaiKhoans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaiKhoan>>> GetTaiKhoan()
        {
            return await _context.TaiKhoan.ToListAsync();
        }

        // GET: api/TaiKhoans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaiKhoan>> GetTaiKhoan(string id)
        {
            var taiKhoan = await _context.TaiKhoan.FindAsync(id);

            if (taiKhoan == null)
            {
                return NotFound();
            }

            return taiKhoan;
        }

        // PUT: api/TaiKhoans/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaiKhoan(string id, TaiKhoan taiKhoan)
        {
            if (id != taiKhoan.Username)
            {
                return BadRequest();
            }

            _context.Entry(taiKhoan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaiKhoanExists(id))
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

        // POST: api/TaiKhoans
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TaiKhoan>> PostTaiKhoan(TaiKhoan taiKhoan)
        {
            _context.TaiKhoan.Add(taiKhoan);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TaiKhoanExists(taiKhoan.Username))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTaiKhoan", new { id = taiKhoan.Username }, taiKhoan);
        }

        // DELETE: api/TaiKhoans/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TaiKhoan>> DeleteTaiKhoan(string id)
        {
            var taiKhoan = await _context.TaiKhoan.FindAsync(id);
            if (taiKhoan == null)
            {
                return NotFound();
            }

            _context.TaiKhoan.Remove(taiKhoan);
            await _context.SaveChangesAsync();

            return taiKhoan;
        }

        private bool TaiKhoanExists(string id)
        {
            return _context.TaiKhoan.Any(e => e.Username == id);
        }

        /////////////\\\\\\\\\
        [HttpPost("mangpost")]
        public async Task<ActionResult<TaiKhoan>> PostTaiKhoan(TaiKhoan[] taiKhoan)
        {
            foreach (TaiKhoan item in taiKhoan)
            {
                _context.TaiKhoan.Add(item);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    if (TaiKhoanExists(item.Username))
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

        [HttpPut("mangput")]
        public async Task<IActionResult> PutTaiKhoan(TaiKhoan[] taiKhoan)
        {
            foreach (TaiKhoan item in taiKhoan)
            {
                //_context.BangLuong.Add(item);
                _context.Entry(item).State = EntityState.Modified;
            }
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
