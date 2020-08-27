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
    public class TrinhDoDaoTaosController : ControllerBase
    {
        private readonly HRMO_NhanSuContext _context;

        public TrinhDoDaoTaosController(HRMO_NhanSuContext context)
        {
            _context = context;
        }

        // GET: api/TrinhDoDaoTaos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TrinhDoDaoTao>>> GetTrinhDoDaoTao()
        {
            return await _context.TrinhDoDaoTao.ToListAsync();
        }

        // GET: api/TrinhDoDaoTaos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TrinhDoDaoTao>> GetTrinhDoDaoTao(int id)
        {
            var trinhDoDaoTao = await _context.TrinhDoDaoTao.FindAsync(id);

            if (trinhDoDaoTao == null)
            {
                return NotFound();
            }

            return trinhDoDaoTao;
        }

        // PUT: api/TrinhDoDaoTaos/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrinhDoDaoTao(int id, TrinhDoDaoTao trinhDoDaoTao)
        {
            if (id != trinhDoDaoTao.IdtrinhDo)
            {
                return BadRequest();
            }

            _context.Entry(trinhDoDaoTao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrinhDoDaoTaoExists(id))
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

        // POST: api/TrinhDoDaoTaos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TrinhDoDaoTao>> PostTrinhDoDaoTao(TrinhDoDaoTao trinhDoDaoTao)
        {
            _context.TrinhDoDaoTao.Add(trinhDoDaoTao);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrinhDoDaoTao", new { id = trinhDoDaoTao.IdtrinhDo }, trinhDoDaoTao);
        }

        // DELETE: api/TrinhDoDaoTaos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TrinhDoDaoTao>> DeleteTrinhDoDaoTao(int id)
        {
            var trinhDoDaoTao = await _context.TrinhDoDaoTao.FindAsync(id);
            if (trinhDoDaoTao == null)
            {
                return NotFound();
            }

            _context.TrinhDoDaoTao.Remove(trinhDoDaoTao);
            await _context.SaveChangesAsync();

            return trinhDoDaoTao;
        }

        private bool TrinhDoDaoTaoExists(int id)
        {
            return _context.TrinhDoDaoTao.Any(e => e.IdtrinhDo == id);
        }
    }
}
