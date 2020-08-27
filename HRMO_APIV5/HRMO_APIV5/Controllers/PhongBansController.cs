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
    public class PhongBansController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public PhongBansController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/PhongBans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhongBan>>> GetPhongBan()
        {
            return await _context.PhongBan.ToListAsync();
        }

        // GET: api/PhongBans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PhongBan>> GetPhongBan(int id)
        {
            var phongBan = await _context.PhongBan.FindAsync(id);

            if (phongBan == null)
            {
                return NotFound();
            }

            return phongBan;
        }

        // PUT: api/PhongBans/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhongBan(int id, PhongBan phongBan)
        {
            if (id != phongBan.IdphongBan)
            {
                return BadRequest();
            }

            _context.Entry(phongBan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhongBanExists(id))
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

        // POST: api/PhongBans
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PhongBan>> PostPhongBan(PhongBan phongBan)
        {
            _context.PhongBan.Add(phongBan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhongBan", new { id = phongBan.IdphongBan }, phongBan);
        }

        // DELETE: api/PhongBans/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PhongBan>> DeletePhongBan(int id)
        {
            var phongBan = await _context.PhongBan.FindAsync(id);
            if (phongBan == null)
            {
                return NotFound();
            }

            _context.PhongBan.Remove(phongBan);
            await _context.SaveChangesAsync();

            return phongBan;
        }

        private bool PhongBanExists(int id)
        {
            return _context.PhongBan.Any(e => e.IdphongBan == id);
        }
    }
}
