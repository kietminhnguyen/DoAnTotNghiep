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
    public class QuyetDinhsController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public QuyetDinhsController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/QuyetDinhs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuyetDinh>>> GetQuyetDinh()
        {
            return await _context.QuyetDinh.ToListAsync();
        }

        // GET: api/QuyetDinhs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuyetDinh>> GetQuyetDinh(int id)
        {
            var quyetDinh = await _context.QuyetDinh.FindAsync(id);

            if (quyetDinh == null)
            {
                return NotFound();
            }

            return quyetDinh;
        }

        // PUT: api/QuyetDinhs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuyetDinh(int id, QuyetDinh quyetDinh)
        {
            if (id != quyetDinh.IdquyetDinh)
            {
                return BadRequest();
            }

            _context.Entry(quyetDinh).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuyetDinhExists(id))
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

        // POST: api/QuyetDinhs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<QuyetDinh>> PostQuyetDinh(QuyetDinh quyetDinh)
        {
            _context.QuyetDinh.Add(quyetDinh);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuyetDinh", new { id = quyetDinh.IdquyetDinh }, quyetDinh);
        }

        // DELETE: api/QuyetDinhs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<QuyetDinh>> DeleteQuyetDinh(int id)
        {
            var quyetDinh = await _context.QuyetDinh.FindAsync(id);
            if (quyetDinh == null)
            {
                return NotFound();
            }

            _context.QuyetDinh.Remove(quyetDinh);
            await _context.SaveChangesAsync();

            return quyetDinh;
        }

        private bool QuyetDinhExists(int id)
        {
            return _context.QuyetDinh.Any(e => e.IdquyetDinh == id);
        }
    }
}
