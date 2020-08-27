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
    public class ThuongNgayLesController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public ThuongNgayLesController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/ThuongNgayLes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ThuongNgayLe>>> GetThuongNgayLe()
        {
            return await _context.ThuongNgayLe.ToListAsync();
        }

        // GET: api/ThuongNgayLes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ThuongNgayLe>> GetThuongNgayLe(int id)
        {
            var thuongNgayLe = await _context.ThuongNgayLe.FindAsync(id);

            if (thuongNgayLe == null)
            {
                return NotFound();
            }

            return thuongNgayLe;
        }

        // PUT: api/ThuongNgayLes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutThuongNgayLe(int id, ThuongNgayLe thuongNgayLe)
        {
            if (id != thuongNgayLe.IdthuongLe)
            {
                return BadRequest();
            }

            _context.Entry(thuongNgayLe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThuongNgayLeExists(id))
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

        // POST: api/ThuongNgayLes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ThuongNgayLe>> PostThuongNgayLe(ThuongNgayLe thuongNgayLe)
        {
            _context.ThuongNgayLe.Add(thuongNgayLe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetThuongNgayLe", new { id = thuongNgayLe.IdthuongLe }, thuongNgayLe);
        }

        // DELETE: api/ThuongNgayLes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ThuongNgayLe>> DeleteThuongNgayLe(int id)
        {
            var thuongNgayLe = await _context.ThuongNgayLe.FindAsync(id);
            if (thuongNgayLe == null)
            {
                return NotFound();
            }

            _context.ThuongNgayLe.Remove(thuongNgayLe);
            await _context.SaveChangesAsync();

            return thuongNgayLe;
        }

        private bool ThuongNgayLeExists(int id)
        {
            return _context.ThuongNgayLe.Any(e => e.IdthuongLe == id);
        }
    }
}
