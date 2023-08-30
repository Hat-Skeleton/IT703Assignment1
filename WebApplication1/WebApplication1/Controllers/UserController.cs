using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IConfiguration _configuration;
        public UserController(IConfiguration configuration) 
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route ("GetUsers")]
        public JsonResult GetUsers()
        {
            string query = "select * from dbo.Users";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("it703DBCon");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query,myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        [Route("AddUser")]
        public JsonResult AddUser([FromForm] string newUsername, string newPassword, string newFName, string newLName, string newAddress, string newPostcode, string newCity, string newCountry)
        {
            string query = "insert into dbo.Users values(@newUsername,@newPassword,@newFName,@newLName,'user',@newAddress,@newPostcode,@newCity,@newCountry)";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("it703DBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@newUsername", newUsername);
                    myCommand.Parameters.AddWithValue("@newPassword", newPassword);
                    myCommand.Parameters.AddWithValue("@newFName", newFName);
                    myCommand.Parameters.AddWithValue("@newLName", newLName);
                    myCommand.Parameters.AddWithValue("@newAddress", newAddress);
                    myCommand.Parameters.AddWithValue("@newPostcode", newPostcode);
                    myCommand.Parameters.AddWithValue("@newCity", newCity);
                    myCommand.Parameters.AddWithValue("@newCountry", newCountry);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }
            }
            return new JsonResult("User added");
        }


    }
}
