using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private IConfiguration _configuration;
        public ProductsController(IConfiguration configuration) 
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route ("GetProducts")]
        public JsonResult GetProducts()
        {
            string query = "select * from dbo.Products";
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
        [Route("AddProducts")]
        public JsonResult AddProducts([FromForm] int supplierID, string sku, string productName, 
            string productDesc, float price, int currentStock, int minStockLevel)
        {
            string query = "insert into dbo.Products values(@supplierID,@sku,@productName,@productDesc,@price,@currentStock,@minStockLevel)";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("it703DBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@supplierID", supplierID);
                    myCommand.Parameters.AddWithValue("@sku", sku);
                    myCommand.Parameters.AddWithValue("@productName", productName);
                    myCommand.Parameters.AddWithValue("@productDesc", productDesc);
                    myCommand.Parameters.AddWithValue("@price", price);
                    myCommand.Parameters.AddWithValue("@currentStock", currentStock);
                    myCommand.Parameters.AddWithValue("@minStockLevel", minStockLevel);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }
            }
            return new JsonResult("Product added");
        }

        [HttpDelete]
        [Route("DeleteProducts")]
        public JsonResult DeleteProducts(int productsID)
        {
            string query = "delete from dbo.Products where productsID=@productsID";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("it703DBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@productsID", productsID);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }
            }
            return new JsonResult("Product deleted");
        }


    }
}
