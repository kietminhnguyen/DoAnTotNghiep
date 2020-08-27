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
    public class QuyetDinhKtsController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public QuyetDinhKtsController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/QuyetDinhKts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuyetDinhKt>>> GetQuyetDinhKt()
        {
            return await _context.QuyetDinhKt.ToListAsync();
        }

        // GET: api/QuyetDinhKts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuyetDinhKt>> GetQuyetDinhKt(int id)
        {
            var quyetDinhKt = await _context.QuyetDinhKt.FindAsync(id);

            if (quyetDinhKt == null)
            {
                return NotFound();
            }

            return quyetDinhKt;
        }

        // PUT: api/QuyetDinhKts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuyetDinhKt(int id, QuyetDinhKt quyetDinhKt)
        {
            if (id != quyetDinhKt.IdquyetDinhKt)
            {
                return BadRequest();
            }

            _context.Entry(quyetDinhKt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuyetDinhKtExists(id))
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

        // POST: api/QuyetDinhKts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<QuyetDinhKt>> PostQuyetDinhKt(QuyetDinhKt quyetDinhKt)
        {
            _context.QuyetDinhKt.Add(quyetDinhKt);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuyetDinhKt", new { id = quyetDinhKt.IdquyetDinhKt }, quyetDinhKt);
        }

        // DELETE: api/QuyetDinhKts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<QuyetDinhKt>> DeleteQuyetDinhKt(int id)
        {
            var quyetDinhKt = await _context.QuyetDinhKt.FindAsync(id);
            if (quyetDinhKt == null)
            {
                return NotFound();
            }

            _context.QuyetDinhKt.Remove(quyetDinhKt);
            await _context.SaveChangesAsync();

            return quyetDinhKt;
        }

        private bool QuyetDinhKtExists(int id)
        {
            return _context.QuyetDinhKt.Any(e => e.IdquyetDinhKt == id);
        }
    }
}
