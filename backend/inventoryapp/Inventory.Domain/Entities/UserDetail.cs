using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Domain.Entities
{
    public class UserDetail
    {
        public int Id { get; set; }

        // PERSONAL INFORMATION
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? EmployeeId { get; set; }

        public string? Gender { get; set; }

        public DateTime? Dob { get; set; }

        //public string? ProfileImage { get; set; }

        // CONTACT INFORMATION
        public string Email { get; set; }

        public string? Phone { get; set; }

        public string? AlternatePhone { get; set; }

        // ADDRESS INFORMATION
        public string? Address1 { get; set; }

        public string? Address2 { get; set; }

        public string? Country { get; set; }

        //public string? State { get; set; }

        public string? City { get; set; }

        //public string? PostalCode { get; set; }

        // SECURITY
        public string? Username { get; set; }

        public string PasswordHash { get; set; }

        public string? Role { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
