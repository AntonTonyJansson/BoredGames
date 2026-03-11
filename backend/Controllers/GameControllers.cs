using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Entities;
using backend.Models.Requests;
using backend.Models.Responses;

namespace backend.Controllers;

[ApiController]
[Route("api/game")]
public class GameController : ControllerBase
{
    private readonly AppDbContext _db;

    public GameController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("player/{playerId:guid}")]
    public async Task<IActionResult> GetByPlayer(Guid playerId)
    {
        var games = await _db.Games
            .Include(g => g.Player)
            .Where(g => g.PlayerId == playerId)
            .OrderByDescending(g => g.CreatedAtUtc)
            .Select(g => new GameListItemResponse
            {
                Id = g.Id,
                GameName = g.Name,
                PlayerName = g.Player.Name,
                Status = g.Status,
                CurrentPlayer = g.CurrentPlayer,
                CreatedAtUtc = g.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(games);
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateGameRequest request)
    {
        var gameName = request.GameName.Trim();

        if (request.PlayerId == Guid.Empty)
            return BadRequest("Player is required.");

        if (string.IsNullOrWhiteSpace(gameName))
            return BadRequest("Game name is required.");

        var player = await _db.Players.FirstOrDefaultAsync(p => p.Id == request.PlayerId);

        if (player == null)
            return BadRequest("Invalid player.");

        var existingGame = await _db.Games.FirstOrDefaultAsync(g =>
            g.PlayerId == request.PlayerId && g.Name == gameName);

        if (existingGame != null)
            return Conflict("You already have a game with that name.");

        var game = new GameEntity
        {
            Id = Guid.NewGuid(),
            PlayerId = player.Id,
            Name = gameName,
            Status = "Created",
            CurrentPlayer = 1,
            CreatedAtUtc = DateTime.UtcNow
        };

        _db.Games.Add(game);
        await _db.SaveChangesAsync();

        var response = new CreateGameResponse
        {
            GameId = game.Id,
            GameName = game.Name,
            Status = game.Status,
            CreatedAtUtc = game.CreatedAtUtc
        };

        return Ok(response);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var game = await _db.Games.FirstOrDefaultAsync(g => g.Id == id);

        if (game == null)
            return NotFound();

        _db.Games.Remove(game);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}