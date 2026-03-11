namespace backend.Models.Requests;

public class MoveRequest
{
    public string GameId { get; set; } = "";
    public string PlayerId { get; set; } = "";
    public string Action { get; set; } = "";
}