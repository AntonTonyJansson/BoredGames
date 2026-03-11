namespace backend.Entities;

public class PlayerEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public DateTime CreatedAtUtc { get; set; }
}