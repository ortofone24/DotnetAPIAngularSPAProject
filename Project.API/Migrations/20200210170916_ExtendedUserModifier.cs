using Microsoft.EntityFrameworkCore.Migrations;

namespace Project.API.Migrations
{
    public partial class ExtendedUserModifier : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FriendsWouldDescribeMe",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "FriendeWouldDescribeMe",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FriendeWouldDescribeMe",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "FriendsWouldDescribeMe",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
