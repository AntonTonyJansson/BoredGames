namespace backend.Models.Responses;

public class CreateGameResponse
{
    public Guid GameId { get; set; }
    public string GameName { get; set; } = "";
    public string Status { get; set; } = "";
    public DateTime CreatedAtUtc { get; set; }
}