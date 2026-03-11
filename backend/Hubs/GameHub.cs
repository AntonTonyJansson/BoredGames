using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs;

public class GameHub : Hub
{
    public async Task JoinGame(string gameId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
        await Clients.Group(gameId).SendAsync("PlayerJoined", gameId, Context.ConnectionId);
    }

    public async Task SendMove(string gameId, string playerId, string action)
    {
        await Clients.Group(gameId).SendAsync("MovePlayed", new
        {
            gameId,
            playerId,
            action,
            sentAtUtc = DateTime.UtcNow
        });
    }
}