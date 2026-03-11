namespace backend.Models.Responses;

public class GameListItemResponse
{
    public Guid Id { get; set; }
    public string GameName { get; set; } = "";
    public string PlayerName { get; set; } = "";
    public string Status { get; set; } = "";
    public int CurrentPlayer { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}