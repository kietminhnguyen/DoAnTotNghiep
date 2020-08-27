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
    public class ChamCongTangCasController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public ChamCongTangCasController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/ChamCongTangCas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChamCongTangCa>>> GetChamCongTangCa()
        {
            return await _context.ChamCongTangCa.ToListAsync();
        }

        // GET: api/ChamCongTangCas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChamCongTangCa>> GetChamCongTangCa(DateTime id)
        {
            var chamCongTangCa = await _context.ChamCongTangCa.FindAsync(id);

            if (chamCongTangCa == null)
            {
                return NotFound();
            }

            return chamCongTangCa;
        }

        // PUT: api/ChamCongTangCas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChamCongTangCa(DateTime id, ChamCongTangCa chamCongTangCa)
        {
            if (id != chamCongTangCa.NgayChamCong)
            {
                return BadRequest();
            }

            _context.Entry(chamCongTangCa).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChamCongTangCaExists(id))
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

        // POST: api/ChamCongTangCas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChamCongTangCa>> PostChamCongTangCa(ChamCongTangCa chamCongTangCa)
        {
            _context.ChamCongTangCa.Add(chamCongTangCa);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ChamCongTangCaExists(chamCongTangCa.NgayChamCong))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetChamCongTangCa", new { id = chamCongTangCa.NgayChamCong }, chamCongTangCa);
        }

        // DELETE: api/ChamCongTangCas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChamCongTangCa>> DeleteChamCongTangCa(DateTime id)
        {
            var chamCongTangCa = await _context.ChamCongTangCa.FindAsync(id);
            if (chamCongTangCa == null)
            {
                return NotFound();
            }

            _context.ChamCongTangCa.Remove(chamCongTangCa);
            await _context.SaveChangesAsync();

            return chamCongTangCa;
        }

        private bool ChamCongTangCaExists(DateTime id)
        {
            return _context.ChamCongTangCa.Any(e => e.NgayChamCong == id);
        }
    }
}
