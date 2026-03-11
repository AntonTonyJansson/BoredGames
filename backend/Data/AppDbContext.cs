using Microsoft.EntityFrameworkCore;
using backend.Entities;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<GameEntity> Games => Set<GameEntity>();
    public DbSet<PlayerEntity> Players => Set<PlayerEntity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PlayerEntity>()
            .HasIndex(p => p.Name)
            .IsUnique();

        modelBuilder.Entity<GameEntity>()
            .HasOne(g => g.Player)
            .WithMany()
            .HasForeignKey(g => g.PlayerId);

        modelBuilder.Entity<GameEntity>()
            .HasIndex(g => new { g.PlayerId, g.Name })
            .IsUnique();
    }
}