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
    public class QuyetDinhKlsController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public QuyetDinhKlsController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/QuyetDinhKls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuyetDinhKl>>> GetQuyetDinhKl()
        {
            return await _context.QuyetDinhKl.ToListAsync();
        }

        // GET: api/QuyetDinhKls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuyetDinhKl>> GetQuyetDinhKl(int id)
        {
            var quyetDinhKl = await _context.QuyetDinhKl.FindAsync(id);

            if (quyetDinhKl == null)
            {
                return NotFound();
            }

            return quyetDinhKl;
        }

        // PUT: api/QuyetDinhKls/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuyetDinhKl(int id, QuyetDinhKl quyetDinhKl)
        {
            if (id != quyetDinhKl.IdquyetDinhKl)
            {
                return BadRequest();
            }

            _context.Entry(quyetDinhKl).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuyetDinhKlExists(id))
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

        // POST: api/QuyetDinhKls
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<QuyetDinhKl>> PostQuyetDinhKl(QuyetDinhKl quyetDinhKl)
        {
            _context.QuyetDinhKl.Add(quyetDinhKl);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuyetDinhKl", new { id = quyetDinhKl.IdquyetDinhKl }, quyetDinhKl);
        }

        // DELETE: api/QuyetDinhKls/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<QuyetDinhKl>> DeleteQuyetDinhKl(int id)
        {
            var quyetDinhKl = await _context.QuyetDinhKl.FindAsync(id);
            if (quyetDinhKl == null)
            {
                return NotFound();
            }

            _context.QuyetDinhKl.Remove(quyetDinhKl);
            await _context.SaveChangesAsync();

            return quyetDinhKl;
        }

        private bool QuyetDinhKlExists(int id)
        {
            return _context.QuyetDinhKl.Any(e => e.IdquyetDinhKl == id);
        }
    }
}
