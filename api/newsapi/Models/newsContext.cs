using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace newsapi.Models
{
    public partial class newsContext : DbContext
    {
        public newsContext()
        {
        }

        public newsContext(DbContextOptions<newsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Newsroom> Newsroom { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql({connectionString})
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Newsroom>(entity =>
            {
                entity.ToTable("newsroom");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Data)
                    .HasColumnName("data")
                    .HasColumnType("character varying");

                entity.Property(e => e.Source)
                    .HasColumnName("source")
                    .HasColumnType("character varying");

                entity.Property(e => e.Update)
                    .HasColumnName("update")
                    .HasColumnType("character varying");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
