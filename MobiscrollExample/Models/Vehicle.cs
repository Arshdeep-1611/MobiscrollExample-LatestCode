namespace Nestle.CH.HQ.RSL.WebApp.Models
{
    public class Vehicle
    {
        public int id { get; set; }
        public string? code { get; set; }
        public string? name { get; set; }
        public double capacity { get; set; }
        public string? modified_by { get; set; }
        public DateTime time_stamp { get; set; }
        public byte valid { get; set; }
    }
}