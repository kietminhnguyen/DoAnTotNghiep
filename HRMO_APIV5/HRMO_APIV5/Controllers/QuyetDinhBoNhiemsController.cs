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
    public class QuyetDinhBoNhiemsController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public QuyetDinhBoNhiemsController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/QuyetDinhBoNhiems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuyetDinhBoNhiem>>> GetQuyetDinhBoNhiem()
        {
            return await _context.QuyetDinhBoNhiem.ToListAsync();
        }

        // GET: api/QuyetDinhBoNhiems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuyetDinhBoNhiem>> GetQuyetDinhBoNhiem(int id)
        {
            var quyetDinhBoNhiem = await _context.QuyetDinhBoNhiem.FindAsync(id);

            if (quyetDinhBoNhiem == null)
            {
                return NotFound();
            }

            return quyetDinhBoNhiem;
        }

        // PUT: api/QuyetDinhBoNhiems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuyetDinhBoNhiem(int id, QuyetDinhBoNhiem quyetDinhBoNhiem)
        {
            if (id != quyetDinhBoNhiem.IdquyetDinhBn)
            {
                return BadRequest();
            }

            _context.Entry(quyetDinhBoNhiem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuyetDinhBoNhiemExists(id))
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

        // POST: api/QuyetDinhBoNhiems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<QuyetDinhBoNhiem>> PostQuyetDinhBoNhiem(QuyetDinhBoNhiem quyetDinhBoNhiem)
        {
            _context.QuyetDinhBoNhiem.Add(quyetDinhBoNhiem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuyetDinhBoNhiem", new { id = quyetDinhBoNhiem.IdquyetDinhBn }, quyetDinhBoNhiem);
        }

        // DELETE: api/QuyetDinhBoNhiems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<QuyetDinhBoNhiem>> DeleteQuyetDinhBoNhiem(int id)
        {
            var quyetDinhBoNhiem = await _context.QuyetDinhBoNhiem.FindAsync(id);
            if (quyetDinhBoNhiem == null)
            {
                return NotFound();
            }

            _context.QuyetDinhBoNhiem.Remove(quyetDinhBoNhiem);
            await _context.SaveChangesAsync();

            return quyetDinhBoNhiem;
        }

        private bool QuyetDinhBoNhiemExists(int id)
        {
            return _context.QuyetDinhBoNhiem.Any(e => e.IdquyetDinhBn == id);
        }
    }
}
