namespace backend.Models.Responses;

public class LoginResponse
{
    public Guid PlayerId { get; set; }
    public string PlayerName { get; set; } = "";
}