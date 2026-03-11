namespace backend.Models.Requests;

public class CreateGameRequest
{
    public Guid PlayerId { get; set; }
    public string GameName { get; set; } = "";
}