using System.Collections.Generic;

namespace Core.PushNotification
{
    public interface IPushNotificationService
    {
        void Stop();
        void Start();
        void SendMessage(string message,string msgcnt, List<PushDeviceInfo> devices);
    }
}
