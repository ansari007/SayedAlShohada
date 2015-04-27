using System;

namespace Core.PushNotification
{
    public class PushDeviceInfo
    {
        public virtual Guid Id { get; set; }
        public virtual string DeviceType { get; set; }
        public virtual string Platform { get; set; }
        /// <summary>
        /// In WP8, its called "Device Registration Channel Uri"
        /// </summary>
        public virtual string DeviceToken { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual DateTime ModifiedDate { get; set; }
        public virtual bool IsActive { get; set; }
        public virtual string OsVer { get; set; }
        public virtual string AppVer { get; set; }
        public virtual string UdId { get; set; }
    }
}