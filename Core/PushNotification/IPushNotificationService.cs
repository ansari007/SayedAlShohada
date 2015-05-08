using System.Collections.Generic;

namespace Core.PushNotification
{
    public interface IPushNotificationService
    {
        void Stop();
        void Start();
        void SendMessage(string message, List<PushDeviceInfo> devices);
    }
}
