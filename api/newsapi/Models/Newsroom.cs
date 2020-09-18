using System;
using System.Collections.Generic;

namespace newsapi.Models
{
    public partial class Newsroom
    {
        public int Id { get; set; }
        public string Source { get; set; }
        public string Data { get; set; }
        public string Update { get; set; }
    }
}
