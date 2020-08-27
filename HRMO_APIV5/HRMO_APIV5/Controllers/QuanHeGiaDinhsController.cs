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
    public class QuanHeGiaDinhsController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public QuanHeGiaDinhsController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/QuanHeGiaDinhs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuanHeGiaDinh>>> GetQuanHeGiaDinh()
        {
            return await _context.QuanHeGiaDinh.ToListAsync();
        }

        // GET: api/QuanHeGiaDinhs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuanHeGiaDinh>> GetQuanHeGiaDinh(int id)
        {
            var quanHeGiaDinh = await _context.QuanHeGiaDinh.FindAsync(id);

            if (quanHeGiaDinh == null)
            {
                return NotFound();
            }

            return quanHeGiaDinh;
        }

        // PUT: api/QuanHeGiaDinhs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuanHeGiaDinh(int id, QuanHeGiaDinh quanHeGiaDinh)
        {
            if (id != quanHeGiaDinh.IdquanHeGd)
            {
                return BadRequest();
            }

            _context.Entry(quanHeGiaDinh).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuanHeGiaDinhExists(id))
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

        // POST: api/QuanHeGiaDinhs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<QuanHeGiaDinh>> PostQuanHeGiaDinh(QuanHeGiaDinh quanHeGiaDinh)
        {
            _context.QuanHeGiaDinh.Add(quanHeGiaDinh);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuanHeGiaDinh", new { id = quanHeGiaDinh.IdquanHeGd }, quanHeGiaDinh);
        }

        // DELETE: api/QuanHeGiaDinhs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<QuanHeGiaDinh>> DeleteQuanHeGiaDinh(int id)
        {
            var quanHeGiaDinh = await _context.QuanHeGiaDinh.FindAsync(id);
            if (quanHeGiaDinh == null)
            {
                return NotFound();
            }

            _context.QuanHeGiaDinh.Remove(quanHeGiaDinh);
            await _context.SaveChangesAsync();

            return quanHeGiaDinh;
        }

        private bool QuanHeGiaDinhExists(int id)
        {
            return _context.QuanHeGiaDinh.Any(e => e.IdquanHeGd == id);
        }
    }
}
