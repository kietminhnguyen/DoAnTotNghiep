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
    public class ChamCongsController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public ChamCongsController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/ChamCongs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChamCong>>> GetChamCong()
        {
            return await _context.ChamCong.ToListAsync();
        }

        // GET: api/ChamCongs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChamCong>> GetChamCong(DateTime id)
        {
            var chamCong = await _context.ChamCong.FindAsync(id);

            if (chamCong == null)
            {
                return NotFound();
            }

            return chamCong;
        }

        // PUT: api/ChamCongs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChamCong(DateTime id, ChamCong chamCong)
        {
            if (id != chamCong.NgayChamCong)
            {
                return BadRequest();
            }

            _context.Entry(chamCong).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChamCongExists(id))
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

        // POST: api/ChamCongs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChamCong>> PostChamCong(ChamCong chamCong)
        {
            _context.ChamCong.Add(chamCong);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ChamCongExists(chamCong.NgayChamCong))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetChamCong", new { id = chamCong.NgayChamCong }, chamCong);
        }

        // DELETE: api/ChamCongs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChamCong>> DeleteChamCong(DateTime id)
        {
            var chamCong = await _context.ChamCong.FindAsync(id);
            if (chamCong == null)
            {
                return NotFound();
            }

            _context.ChamCong.Remove(chamCong);
            await _context.SaveChangesAsync();

            return chamCong;
        }

        private bool ChamCongExists(DateTime id)
        {
            return _context.ChamCong.Any(e => e.NgayChamCong == id);
        }
    }
}
