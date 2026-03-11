using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Entities;
using backend.Models.Requests;
using backend.Models.Responses;

namespace backend.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;

    public AuthController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var playerName = request.PlayerName.Trim();

        if (string.IsNullOrWhiteSpace(playerName))
            return BadRequest("Player name is required.");

        var existingPlayer = await _db.Players
            .FirstOrDefaultAsync(p => p.Name == playerName);

        if (existingPlayer != null)
        {
            return Ok(new LoginResponse
            {
                PlayerId = existingPlayer.Id,
                PlayerName = existingPlayer.Name
            });
        }

        var player = new PlayerEntity
        {
            Id = Guid.NewGuid(),
            Name = playerName,
            CreatedAtUtc = DateTime.UtcNow
        };

        _db.Players.Add(player);
        await _db.SaveChangesAsync();

        return Ok(new LoginResponse
        {
            PlayerId = player.Id,
            PlayerName = player.Name
        });
    }
}