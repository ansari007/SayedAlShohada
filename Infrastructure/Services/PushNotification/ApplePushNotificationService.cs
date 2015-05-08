using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.PushNotification;
using Infrastructure.Repository;
using PushSharp;
using PushSharp.Apple;

namespace Infrastructure.Services.PushNotification
{
    public class ApplePushNotificationService : IApplePushNotificationService
    {

        private readonly PushBroker _pushBroker;
        private readonly IPushRepository _repository;
        private readonly int _timeToLive = 1800; // in seconds = 30 minutes
        private ApplePushChannelSettings _iphoneChannelSettings;
        private ApplePushChannelSettings _ipadChannelSettings;

        public bool isStarted;

        private string IPhoneAppName = "net.mentis.SayedAlShohada";
        private string IpadAppName = "generosoft.etejah.ipad";

        public ApplePushNotificationService(IPushRepository repository)
        {
            //this._repository = repository;
            this._pushBroker = new PushBroker();

            //Wire up the events for all the services that the broker registers            
            //this._pushBroker.OnNotificationSent += this.NotificationSent;
            //this._pushBroker.OnChannelException += this.ChannelException;
            //this._pushBroker.OnServiceException += this.ServiceException;
            //this._pushBroker.OnNotificationFailed += this.NotificationFailed;
            //this._pushBroker.OnDeviceSubscriptionExpired += this.DeviceSubscriptionExpired;
            //this._pushBroker.OnDeviceSubscriptionChanged += this.DeviceSubscriptionChanged;
            //this._pushBroker.OnChannelCreated += this.ChannelCreated;
            //this._pushBroker.OnChannelDestroyed += this.ChannelDestroyed;
            this.isStarted = false;
        }

        #region Start\Stop

        public void Start()
        {
            // Register IPhone Service
#if DEBUG
            bool isProduction = false;
            var iPhoneCertificate = Resources.Shared.Dev_Certificates;
#else
            bool isProduction = true;
            var iPhoneCertificate = Resources.Shared.Etejah_Pro_Certificates;
#endif
            this._iphoneChannelSettings = new ApplePushChannelSettings(isProduction, iPhoneCertificate,
                Resources.Shared.Apple_Certification_Password);
            this._pushBroker.RegisterAppleService(this._iphoneChannelSettings, IPhoneAppName); //Extension method
        }

        public void Stop()
        {
            //Stop and wait for the queues to drains
            this._pushBroker.StopAllServices();
        }

        #endregion

        public void SendMessage(string message, List<PushDeviceInfo> devices)
        {
            if (!this.isStarted) this.Start();
            this.isStarted = true;

            // Send to IPhone Application
            var iPhoneAppList = devices.Where(x => x.Platform.ToLower() == "apple").ToList();
            if (iPhoneAppList.Any())
            {
                //Logger.Debug(this, string.Format("IPhone Devices found: {0}", iPhoneAppList.Count));
                foreach (var item in iPhoneAppList)
                {
                    try
                    {
                        this._pushBroker.QueueNotification(new AppleNotification()
                            .ForDeviceToken(item.DeviceToken)
                            .WithAlert(message)
                            .WithBadge(0)
                            .WithExpiry(DateTime.UtcNow.AddSeconds(this._timeToLive))
                            .WithSound("default"), IPhoneAppName);
                    }
                    catch (Exception exc)
                    {
                        //Logger.Error(this,"Failed to sending message [" + message + "] to device token: [" + item.DeviceToken + "] ",exc);
                    }
                }
            }
        }
    }
}
