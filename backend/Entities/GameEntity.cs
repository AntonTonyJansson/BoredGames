namespace backend.Entities;

public class GameEntity
{
    public Guid Id { get; set; }

    public Guid PlayerId { get; set; }
    public PlayerEntity Player { get; set; } = null!;

    public string Name { get; set; } = "";
    public string Status { get; set; } = "";
    public int CurrentPlayer { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}