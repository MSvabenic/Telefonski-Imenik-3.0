namespace DataLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DodanaKolonaUserId : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Osoba", "UserId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Osoba", "UserId");
        }
    }
}
