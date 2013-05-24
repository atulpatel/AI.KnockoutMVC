using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AI.KnockoutMVC.Controllers.Api
{
    public class SampleController : ApiController
    {
        public Contact Get()
        {
            return new Contact()
                {
                    Name = new Name()
                        {
                            FirstName = "John",
                            LastName = "Smith"
                        },
                    Address = new Address()
                        {
                            Street = "1234 Main St",
                            City = "Dallas",
                            State = "TX"
                        },
                    Phone = "555-555-5555"
                };
        }
    }

    public class Contact
    {
        public Name Name { get; set; }
        public Address Address { get; set; }
        public string Phone { get; set; }
    }

    public class Name
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class Address
    {
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}
